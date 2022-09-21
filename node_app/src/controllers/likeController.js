const likeService = require("../services/likeService");

const addLike = async (req, res) => {
	try {
		const postId = parseInt(req.params["post_id"]);
		const userId = req.body.userId;

		if (!postId) {
			return res.statusCode(400).json({ message: INVALID_POST });
		}

		await likeService.addLike(postId, userId);

		return res.status(201).json({ message: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(statusCode || 500).json({ message: err.message });
	}
};

module.exports = {
	addLike,
};
