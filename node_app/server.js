require("dotenv").config();

const { createApp } = require("./app");
const { dataSource } = require("./src/models/dataSource");

const startServer = async () => {
	const app = createApp();

	app.get("/ping", (req, res) => {
		res.json({ message: "pong" });
	});

	// 특정 요청에 cors 요청을 설정하는 방법
	// app.get("/ping", cors(),(req, res) => {
	//     res.json({ message: "pong" });
	// });

	const PORT = process.env.PORT;

	await dataSource
		.initialize()
		.then(() => {
			console.log("Data Source has been initialized");
		})
		.catch((err) => {
			console.error("Error during Data Source initialization", err);
			dataSource.destroy();
		});

	app.listen(PORT, () => {
		console.log(`Listening on Port ${PORT}`);
	});
};

startServer();
