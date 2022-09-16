const postDao = require("../models/postDao");

// const getPostByUserId = async (userId) => {
// 	const fetchPostByUserId = await postDao.getPostByUserId(userId);
// 	return fetchPostByUserId;
// };

const getDetailPost = async (postId) => {
	const fetchPostByPostId = await postDao.getDetailPost(postId);
	return fetchPostByPostId;
};

const getAllPosts = async () => {
	return await postDao.getAllPosts();
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
	// getPostByUserId,
	getDetailPost,
	getAllPosts,
	addPost,
	deletePost,
	updatePost,
};
