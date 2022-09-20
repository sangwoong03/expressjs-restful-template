const BaseError = require("../middlewares/baseError");
const dataSource = require("./dataSource");

const addLike = async (postId, userId) => {
	try {
		return await dataSource.query(
			`
        INSERT INTO
          likes
          (user_id, post_id)
        VALUES
          (?, ?);
      `,
			[userId, postId],
		);
	} catch (err) {
		return new BaseError("INVALID_DATA", 400);
	}
};

const getLike = async (userId, postId) => {
	return await dataSource.query(
		`
      SELECT
        count(*) as like_count
      FROM likes l
      WHERE l.user_id = ${userId} AND l.post_id = ${postId}
    `,
	);
};

module.exports = {
	addLike,
	getLike,
};
