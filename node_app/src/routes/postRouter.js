const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const errorHandler = require("../middlewares/errorHandler");
const { validateToken } = require("../middlewares/auth");

// router.get("/:user_id", errorHandler(postController.getPostByUserId));
router.get("/:post_id", errorHandler(postController.getDetailPost));
router.get("/", errorHandler(postController.getAllPosts));
router.post("/", validateToken, errorHandler(postController.addPost));
router.delete(
	"/:post_id",
	validateToken,
	errorHandler(postController.deletePost),
);
router.patch(
	"/:post_id",
	validateToken,
	errorHandler(postController.revisePost),
);

module.exports = {
	router,
};
