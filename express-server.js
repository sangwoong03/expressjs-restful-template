// express 기본 변수 저장
const express = require("express");
const app = express();
const port = 3000; // port number : ~ 60000

const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser"); // express의 내장 모듈이기 때문에 따로 설치할 필요가 없음.

// 라우터 모듈 불러오기
const admin = require("./routes/Admin");
const contact = require("./routes/Contacts");

nunjucks.configure("template", {
	autoescape: true,
	express: app,
});

// API middleware setting
app.use(logger("dev"));
// body-parser (middle-ware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// static file
app.use("/uploads", express.static("uploads"));
// Global view variable
app.use((req, res, next) => {
	app.locals.isLogin = true; // 전역변수 isLogin을 어디서든 접근할 수 있음.
	app.locals.req_path = req.path; // express에서 현재 url을 보내줌.
	next();
});

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

app.use((req, res, next) => {
	res.status(400).render("common/404.html");
});
app.use((req, res, next) => {
	res.status(500).render("common/500.html");
});

// 웹 서버 실행
app.listen(port, () => {
	console.log("Express Listening on port", port);
});
