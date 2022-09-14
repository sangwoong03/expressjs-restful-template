const postService = require("../services/postService");

const getPostByUserId = async (req, res) => {
	try {
		const userId = req.params["user_id"];

		if (!userId) {
			return res.status(404).json({ meesage: "INVALID_RESOURCE" });
		}

		const data = await postService.getPostByUserid(userId);

		return res.status(200).send(data);
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ messgae: err.messgae });
	}
};

const getPostByPostId = async (req, res) => {
	try {
		const postId = req.params("post_id");

		if (!postId) {
			return res.status(404).json({ meesage: "INVALID_RESOURCE" });
		}

		const data = await postService.getPostByPostId(postId);

		return res.status(200).send(data);
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const getAllPosts = await postService.getAllPosts();

		return res.status(200).json(getAllPosts);
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const addPost = async (req, res) => {
	try {
		const { title, content, user_id, image_url } = req.body;

		if (!title | !content | !user_id | !image_url) {
			return res.status(400).json({ message: "KEY_ERROR" });
		}

		await postService.addPost(title, content, user_id, image_url);

		return res.status(201).json({ message: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const postId = req.params["post_id"];

		if (!postId) {
			return res.status(404).json({ message: "INVALID_RESOURCE" });
		}

		await postService.deletePost(postId);

		return res.status(201).json({ message: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

const updatePost = async (req, res) => {
	try {
		const postId = req.params["post_id"];

		if (!postId) {
			return res.status(404).json({ messgae: "INVALID_RESOURCE" });
		}

		await postService.updatePost(postId);

		return res.status(201).json({ messgae: "SUCCESS" });
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode || 500).json({ message: err.message });
	}
};

module.exports = {
	getPostByUserId,
	getPostByPostId,
	getAllPosts,
	addPost,
	deletePost,
	updatePost,
};
