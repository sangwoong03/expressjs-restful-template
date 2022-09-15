const postDao = require("../models/postDao");

const getPostByUserId = async () => {};

const getPostByPostId = async () => {};

const getAllPosts = async () => {
	const fetchAllposts = await postDao.getAllPosts();
	return fetchAllposts;
};

const addPost = async (title, content, userId, imageUrl) => {
	const posting = await postDao.addPost(title, content, userId, imageUrl);
	return posting;
};

const deletePost = async (postId) => {
	const postDelete = await postDao.deletePost(postId);
	return postDelete;
};

const updatePost = async (title, content, userId, imageUrl, postId) => {
	const postUpdate = await postDao.updatePost(
		title,
		content,
		userId,
		imageUrl,
		postId,
	);
	return postUpdate;
};

module.exports = {
	getPostByUserId,
	getPostByPostId,
	getAllPosts,
	addPost,
	deletePost,
	updatePost,
};
