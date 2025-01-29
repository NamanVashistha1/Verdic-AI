from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from typing import List, Dict, Any
from datetime import datetime
import time
import random
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from requests.exceptions import RequestException, ConnectionError, Timeout
from langchain_community.llms import Ollama
from typing import List
from flask_cors import CORS
import tempfile
from math import ceil

app = Flask(__name__)
CORS(app)

PERSISTENT_DIR = "chroma_db"  # Directory to persist FAISS data

# Initialize embedding function and vector store
embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma(persist_directory=PERSISTENT_DIR, embedding_function=embedding_function)

API_KEY = "AIzaSyD-1OMuZ0CxGAek0PaXrzHOmcDWFvZQtm8"
SEARCH_ENGINE_ID = "877170db56f5c4629"

# Initialize the Llama model with Ollama
llm = Ollama(model="llama3.2")

def process_pdf(pdf_path: str):
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.split_documents(documents)

    # Set batch size for FAISS
    batch_size = 150
    num_batches = ceil(len(docs) / batch_size)

    # Add documents in batches
    for i in range(num_batches):
        batch_docs = docs[i * batch_size: (i + 1) * batch_size]
        db.add_documents(batch_docs)
    db.persist()

@app.route('/process_pdf', methods=['POST'])
def process_pdf_endpoint():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file temporarily
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)
        tmp_pdf_path = tmp_file.name
    
    # Process the PDF
    process_pdf(tmp_pdf_path)
    
    return jsonify({"message": "PDF processed and data added to the database successfully"})

@app.route('/query', methods=['POST'])
def query_document():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({"error": "Query not provided"}), 400
    
    # Step 2: Use symptoms to query the vector store
    search_results = db.similarity_search(query)
    context = [doc.page_content for doc in search_results]

    # Step 3: Generate final response using symptoms and context
    final_response = get_final_response(query, context)
    
    return jsonify({"response": final_response})

def get_final_response(query: str, context: List[str]) -> str:
    context_text = " ".join(context)
    prompt = (
        f"Based on the given query: {query}\n\n"
        f"Context from relevant sources:\n{context_text}\n\n"
        "Provide a direct answer without introductory phrases. Answer the query first, then include fines/penalties or case references **only if they are mentioned in the context**. Do not say 'No specific case' or 'Not mentioned'. The response must not exceed 100 words."
    )
    print(prompt)
    response = llm.invoke(prompt)
    unwanted_phrases = [
        "Here are the three points:",
        "1. Fines/Penalties:",
        "2. Case Reference:",
        "3. Other Provisions:",
        "No specific case reference is available",
        "Not mentioned in the provided text"
    ]
    
    clean_response = response
    for phrase in unwanted_phrases:
        clean_response = clean_response.replace(phrase, "").strip()

    return clean_response

def search_web_duckduckgo(query: str, num_results: int = 3, max_retries: int = 3) -> List[Dict[str, str]]:
    """
    Performs a web search using the Google Custom Search API.
    Returns a list of dictionaries containing search result title, link, and snippet.
    """
    api_key = "AIzaSyD-1OMuZ0CxGAek0PaXrzHOmcDWFvZQtm8"
    cse_id = "877170db56f5c4629"

    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
    ]

    for attempt in range(max_retries):
        try:
            headers = {'User-Agent': random.choice(user_agents)}
            
            service = build("customsearch", "v1", developerKey=api_key)

            res = service.cse().list(q=query, cx=cse_id, num=num_results).execute()

            results = []
            if "items" in res:
                for item in res["items"]:
                    result = {
                        "title": item["title"],
                        "link": item["link"],
                        "snippet": item.get("snippet", "")
                    }
                    results.append(result)
                    if len(results) == num_results:
                        break

            return results

        except HttpError as e:
            print(f"HTTP error occurred: {e}. Attempt {attempt + 1} of {max_retries}")
        except ConnectionError as e:
            print(f"Connection error occurred: {e}. Attempt {attempt + 1} of {max_retries}")
        except Timeout as e:
            print(f"Timeout error occurred: {e}. Attempt {attempt + 1} of {max_retries}")
        except RequestException as e:
            print(f"An error occurred during the request: {e}. Attempt {attempt + 1} of {max_retries}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}. Attempt {attempt + 1} of {max_retries}")

        # Exponential backoff
        time.sleep(2 ** attempt)

    print("Max retries reached. No results found.")
    return []

@app.route('/legalcost', methods=['POST'])
def estimate_legal_costs() -> Dict[str, Any]:
    """
    Estimates legal costs based on case type, complexity, and location in India.
    Accepts JSON input with 'case_type', 'complexity', and 'state'.
    """
    data = request.get_json()

    if not data or "case_type" not in data or "complexity" not in data or "state" not in data:
        return jsonify({"error": "Missing required fields: 'case_type', 'complexity', 'state'"}), 400

    case_type = data["case_type"]
    complexity = data["complexity"]
    state = data["state"]

    # Adjusted legal fee structure for India (per hour in INR)
    base_costs = {
        "Simple": (1000, 3000),  # ₹1000 - ₹3000 per hour
        "Moderate": (3000, 7000),  # ₹3000 - ₹7000 per hour
        "Complex": (7000, 15000)  # ₹7000 - ₹15000 per hour
    }
    
    case_type_multipliers = {
        "Civil Litigation": 1.1,
        "Criminal Law": 1.4,
        "Family Law": 1.0,
        "Business Law": 1.2,
        "Intellectual Property": 1.3,
        "Employment Law": 1.1,
        "Immigration Law": 1.0,
        "Real Estate Law": 1.2,
        "Personal Injury": 1.3,
        "Tax Law": 1.4,
    }
    
    estimated_hours = {
        "Simple": (5, 20),  # Lower case durations in India
        "Moderate": (20, 80),
        "Complex": (80, 200)
    }

    if complexity not in base_costs:
        return jsonify({"error": "Invalid complexity level"}), 400

    min_rate, max_rate = base_costs[complexity]
    multiplier = case_type_multipliers.get(case_type, 1.0)
    min_rate *= multiplier
    max_rate *= multiplier

    min_hours, max_hours = estimated_hours[complexity]
    min_total = min_rate * min_hours
    max_total = max_rate * max_hours

    cost_breakdown = {
        "Hourly rate range": f"₹{min_rate:.2f} - ₹{max_rate:.2f}",
        "Estimated hours": f"{min_hours} - {max_hours}",
        "Total cost range": f"₹{min_total:.2f} - ₹{max_total:.2f}",
    }

    search_query = f"{case_type} legal costs in {state}, India"
    web_search_results = search_web_duckduckgo(search_query, num_results=3)

    high_cost_areas = [
        "Senior advocates and top-tier law firms charge significantly higher fees",
        "Lengthy litigation processes can increase costs",
        "Expert witnesses and forensic analysis (common in criminal and IP cases)",
        "Multiple appeals and higher court involvement",
        "Cases requiring extensive documentation and legal research"
    ]

    cost_saving_tips = [
        "Opt for alternative dispute resolution methods like mediation or Lok Adalat",
        "Choose a lawyer with relevant expertise to avoid unnecessary delays",
        "Discuss a fixed-fee arrangement instead of hourly billing where possible",
        "Use legal aid services if eligible (e.g., NALSA, state legal aid commissions)",
        "File online through e-courts to reduce procedural delays"
    ]

    lawyer_tips = [
        "Check the Bar Council of India (BCI) registration of the lawyer",
        "Compare legal fees across multiple lawyers before hiring",
        "Read client reviews and seek references from trusted sources",
        "Prefer advocates experienced in district/high courts for lower fees",
        "Ensure clear communication and written agreement on fees before hiring"
    ]

    return jsonify({
        "cost_breakdown": cost_breakdown,
        "high_cost_areas": high_cost_areas,
        "cost_saving_tips": cost_saving_tips,
        "finding_best_lawyer_tips": lawyer_tips,
        "web_search_results": web_search_results
    })

def search_web(query: str, num_results: int = 3) -> List[Dict[str, str]]:
    """
    Searches Google for legal-related content based on the query.
    Returns the top results filtered for relevance.
    """
    try:
        print("Hitting")
        service = build("customsearch", "v1", developerKey=API_KEY)
        
        # Add legal-specific terms to improve search relevance
        # legal_query = f"legal {query} law case precedent in India" 
        legal_query = f"{query} India" 
        
        # Execute the search request
        res = service.cse().list(q=legal_query, cx=SEARCH_ENGINE_ID, num=num_results * 2).execute()
        
        results = []
        if "items" in res:
            for item in res["items"]:
                # Filter results containing relevant legal terms
                if any(keyword in item["title"].lower() or keyword in item["snippet"].lower() 
                       for keyword in ["law", "legal", "court", "case", "attorney", "lawyer"]):
                    result = {
                        "title": item["title"],
                        "link": item["link"],
                        "snippet": item["snippet"]
                    }
                    results.append(result)
                    if len(results) == num_results:
                        break
        
        return results
    except Exception as e:
        print(f"Error performing web search: {e}")
        return []

@app.route('/websearch', methods=['POST'])
def search_api():
    """
    API endpoint for performing a legal web search.
    Accepts JSON input with 'query' and optional 'num_results'.
    Returns the raw search results.
    """
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "Missing required field: 'query'"}), 400

    query = data["query"]
    num_results = 3
    print(query)
    # Directly return the results from the search_web function
    return jsonify(search_web(query, num_results))

if __name__ == '__main__':
    app.run(debug=True, port=8080)
