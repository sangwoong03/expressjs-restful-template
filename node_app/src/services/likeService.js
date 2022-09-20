const likeDao = require("../models/likeDao");

const addLike = async (postId, userId) => {
	return await likeDao.addLike(postId, userId);
};

module.exports = {
	addLike,
};
