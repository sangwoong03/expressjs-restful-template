const postService = require("../services/postService");

const getDetailPost = async (req, res) => {
	try {
		const postId = parseInt(req.params["post_id"]);
		console.log(typeof postId);
		if (!postId) {
			return res.status(404).json({ message: "INVALID_RESOURCE" });
		}

		const data = await postService.getDetailPost(postId);

		return res.status(200).send(data);
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const result = await postService.getAllPosts();

		return res.status(200).json({ result });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const addPost = async (req, res) => {
	try {
		const { title, content, userId, imageUrl } = req.body;

		if (!title | !content) {
			return res.status(400).json({ message: "KEY_ERROR" });
		}

		await postService.addPost(title, content, userId, imageUrl);

		return res.status(201).json({ message: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const postId = req.params["post_id"];
		const { userId } = req.body.userId;

		if (!postId) {
			return res.status(404).json({ message: "INVALID_RESOURCE" });
		}

		await postService.deletePost(postId, userId);

		return res.status(201).json({ message: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const updatePost = async (req, res) => {
	try {
		const { title, content, imageUrl } = req.body;
		const postId = req.params["post_id"];
		// const userId = ??? tokenValidator에서 딸려나온 userId

		if (!postId) {
			return res.status(404).json({ message: "INVALID_RESOURCE" });
		}

		await postService.updatePost(title, content, imageUrl, postId, userId);

		return res.status(201).json({ message: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

module.exports = {
	// getPostByUserId,
	getDetailPost,
	getAllPosts,
	addPost,
	deletePost,
	updatePost,
};
