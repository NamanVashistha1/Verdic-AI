const NewsArticle = require("../models/newsSchema"); // Ensure the correct path

// Fetch all news articles
const getNewsArticles = async (req, res) => {
  try {
    const articles = await NewsArticle.find().sort({ publishedAt: -1 }); // Sorting by latest first
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news articles", error });
  }
};

module.exports = { getNewsArticles };
