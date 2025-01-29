const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true, unique: true },
  urlToImage: String,
  publishedAt: { type: Date, required: true },
  content: String,
}, { timestamps: true });

const NewsArticle = mongoose.model("NewsArticle", newsSchema);

module.exports = NewsArticle;
