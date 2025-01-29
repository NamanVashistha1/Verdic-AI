const mongoose = require("mongoose");
const NewsAPI = require("newsapi");
const NewsArticle = require("./models/newsSchema");

const newsapi = new NewsAPI("0c63a2c37fa6422baf9fc652d5b7a5cb");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/newsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Fetch and store articles
async function fetchAndStoreNews() {
  try {
    const response = await newsapi.v2.everything({
      sources: "bbc-news,the-verge",
      q: "legal news",
      language: "en",
      domains: "thehindu.com,hindustantimes.com,ndtv.com",
      from: "2024-12-29",
      to: "2025-12-29",
      sortBy: "relevancy",
      pageSize: 10,
      page: 1,
    });

    if (response.status === "ok" && response.articles.length > 0) {
      const articlesToInsert = response.articles.map(article => ({
        source: article.source,
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: new Date(article.publishedAt),
        content: article.content,
      }));

      await NewsArticle.insertMany(articlesToInsert, { ordered: false });
      console.log("News articles stored successfully!");
    } else {
      console.log("No new articles found.");
    }
  } catch (error) {
    console.error("Error fetching or storing news:", error);
  }
}

fetchAndStoreNews();
