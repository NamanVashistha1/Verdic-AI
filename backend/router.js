const express = require("express");
const authController = require("./controllers/user.js")
const newsController = require("./controllers/news.js");

const router = express.Router();

router.post("/signup", authController.userSignup);
router.post("/signup/verify", authController.verifySignup);
router.post("/signup/name", authController.nameSignup);

router.get("/news", newsController.getNewsArticles);

module.exports = router;