const http = require("http");
require("dotenv").config();

const { createApp } = require("./app");

const startServer = async () => {
    const app = createApp();

    app.get("/ping", (req, res) => {
        res.json({ message: "pong" });
    });

    // 특정 요청에 cors 요청을 설정하는 방법
    // app.get("/ping", cors(),(req, res) => {
    //     res.json({ message: "pong" });
    // });

    const server = http.createServer(app);
    const PORT = process.env.PORT;

    server.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`);
    });
}

startServer(); 