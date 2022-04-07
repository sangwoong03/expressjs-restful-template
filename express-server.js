const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");

// 라우터 모듈 불러오기
const admin = require("./routes/Admin");
const contact = require("./routes/Contacts");

const app = express();
const port = 3000;

nunjucks.configure("template", {
	autoescape: true,
	express: app,
});

// middleware setting
app.use(logger("dev"));
// 우선순위가 높은 미들웨어
function primeMiddleware(req, res, next) {
	console.log("최우선 미들웨어");
	next();
}

app.get("/", (req, res) => {
	res.send("hello express");
}); // url  (메인 url에서 마지막 / 유무 상관 없음)

app.get("/sangwoong", (req, res) => {
	res.send("hello sangwoong");
});

//라우터 모듈 연동하기
app.use("/admin", primeMiddleware, admin);
app.use("/contact", contact);

app.listen(port, () => {
	console.log("Express Listening on port", port);
}); // 웹 서버를 띄우는 createServer 역할

// npm i express
// node (file name).js

// It's annoying that I have to reopen server whenever I edit file
// So I can use tihs command:
// npm i -g nodemon
//"nodemon (file name).js" ... node monitoring
