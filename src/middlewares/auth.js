const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
	try {
		const token = await req.header("Authorization");

		const decodedToken = await jwt.verify(token, secretKey);
		console.log(decodedToken);

		req.body.userId = decodedToken.aud;

		next();
	} catch (err) {
		res.status(401).json({ message: "INVALID_TOKEN" });
	}
};

module.exports = {
	validateToken,
};
