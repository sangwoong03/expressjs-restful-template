const BaseError = require("../middlewares/baseError");
const dataSource = require("./dataSource");

const getPostByUserId = async (userId) => {
	try {
		return await dataSource.query(
			`
        SELECT
          id,
          title,
          content,
          image_url
        FROM posts p
				INNER JOIN users u
				ON u.id = p.user_id
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const getPostByPostId = async (postId) => {
	try {
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
					u.email userEmail,
				FROM posts p
				INNER JOIN users u
				ON u.id = p.user_id
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
          p.id postId,
          p.title postTitle,
          p.content postContent,
          p.image_url postImageUrl,
          u.id as userId,
          u.email userEmail,
          u.profile_img_url userImage
        FROM posts p
        JOIN users u ON u.id = user_id
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
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
        VALUE (?,?,?,?)
      `,
			[title, content, userId, image_url],
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const deletePost = async (postId) => {
	try {
		return await dataSource.query(
			`
        DELETE FROM
          posts
        WHERE
         posts.id = ${postId}
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
	}
};

const updatePost = async (title, content, userId, imageUrl) => {
	try {
		return await dataSource.query(
			`
        UPDATE
          posts
        SET
          title = "${title}",
          content = "${content}"
          image_url
        WHERE 
      `,
		);
	} catch (err) {
		throw new BaseError("INVALID_DATA_INPUT", 400);
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
