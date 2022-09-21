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

const getLike = async (postId, userId) => {
	return await dataSource.query(
		`
      SELECT
        count(*) as like_count
      FROM likes l
      WHERE l.post_id = ? AND l.user_id = ?
    `, [postId, userId]
	);
};

const deleteLike = async (postId, userId) => {
	return await dataSource.query(`
		DELETE FROM 
			likes l
		WHERE
			l.post_id = ? AND l.user_id = ?
	`, [postId, userId])
}

module.exports = {
	addLike,
	getLike,
	deleteLike
};
