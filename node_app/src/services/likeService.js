const likeDao = require("../models/likeDao");

const addLike = async (postId, userId) => {
	return await likeDao.addLike(postId, userId);
};

const deleteLike = async (postId, userId) => {
	const checkLike = await likeDao.getLike(postId, userId)

	if (Number(Object.values(checkLike[0])[0])) {
		return await likeDao.deleteLike(postId, userId)
	}
}

module.exports = {
	addLike,
	deleteLike
};
