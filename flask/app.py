from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains import RetrievalQA
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
        f"Based on the potential condition: {query}\n\n"
        f"Context from relevant sources:\n{context_text}\n\n"
        "Provide Ayurvedic Remedies:\n"
        "1. Remedy 1: Brief description\n"
        "2. Remedy 2: Brief description\n"
        "3. Remedy 3: Brief description"
    )
    print(prompt)
    response = llm.invoke(prompt)
    return response  # Directly return the response as a string


if __name__ == '__main__':
    app.run(debug=True, port=8080)
