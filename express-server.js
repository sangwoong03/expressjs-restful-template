const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("hello express");
}); // url 추가

app.get("/sangwoong", (req, res) => {
	res.send("hello sangwoong");
}); // url 추가

app.listen(port, () => {
	console.log("Express Listening on port", port);
}); // 웹 서버를 띄우는 createServer 역할

// npm i express
// node (file name).js

// It's annoying that I have to reopen server whenever I edit file
// So I can use tihs command:
// npm i -g nodemon
//"nodemon (file name).js" ... node monitoring
