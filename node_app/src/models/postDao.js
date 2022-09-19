const BaseError = require("../middlewares/baseError");
const { dataSource } = require("./dataSource");

const getDetailPost = async (postId) => {
	try {
		console.log(postId);
		return await dataSource.query(
			`
				SELECT
					p.id,
					p.title,
					p.content,
					p.image_url,
					p.user_id userId,
					p.created_at createdAt,
					p.updated_at updatedAt,
					u.id,
					u.emial
				FROM users u, posts p
				WHERE u.id = p.user_id AND p.id = ${postId}
			`,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const getAllPosts = async () => {
	try {
		return await dataSource.query(
			`
				SELECT
				 p.title,
				 p.content,
				 u.email
				FROM users u, posts p
			`,
		);
	} catch (err) {
		console.log(err);
		throw new BaseError("NOTHING_POSTS", 400);
	}
};

const addPost = async (title, content, userId, image_url) => {
	try {
		return await dataSource.query(
			`
        INSERT INTO
          posts (
            title,
            content,
            user_id,
            image_url
          )
        VALUES (?,?,?,?)
      `,
			[title, content, userId, image_url],
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const deletePost = async (postId, userId) => {
	try {
		return await dataSource.query(
			`
        DELETE FROM
          posts p
        WHERE
         p.id = ${postId} AND p.user_id = ${userId}
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const updatePost = async (title, content, userId, imageUrl, postId) => {
	try {
		await dataSource.query(
			`
        UPDATE
          posts
        SET
          title = "${title}",
          content = "${content}"
          image_url = "${imageUrl}"
        WHERE id = "${postId}" AND user_id = ${userId}
      `,
		);
		return await dataSource.query(
			`
				SELECT
					p.title,
					p.content,
					p.user_id userid,
					p.created_at createdAt,
					p.updated_at updatedAt,
				FROM users u, posts p
				WHERE u.id = ${userId} AND p.id = ${postId}
			`,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

module.exports = {
	getDetailPost,
	getAllPosts,
	addPost,
	deletePost,
	updatePost,
};
