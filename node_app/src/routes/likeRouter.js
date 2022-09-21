const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeController");
const errorHandler = require("../middlewares/errorHandler");
const { validateToken } = require("../middlewares/auth");

router.post("/", validateToken, errorHandler(likeController.addLike));

module.exports = {
	router,
};
