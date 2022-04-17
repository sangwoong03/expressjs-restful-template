// express 기본 변수 저장
const express = require("express");
const app = express();
const port = 3000; // port number : ~ 60000

const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser"); // express의 내장 모듈이기 때문에 따로 설치할 필요가 없음.

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

nunjucks.configure("template", {
	autoescape: true,
	express: app,
});

// 라우터 모듈 불러오기
const admin = require("./routes/Admin");
const login = require("./routes/Login");

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

app.get("/", (req, res) => {
	res.redirect("/login");
}); // url  (메인 url에서 마지막 / 유무 상관 없음)

// router
app.use("/admin", admin);
app.use("/login", login);

// admin
app.post("/add", admin);
app.delete("/delete", admin);
app.get("/edit/:id", admin);
app.put("/edit", admin);

// Login
app.post("/login", login);
app.get("/mypage", login);

app.use((req, res, next) => {
	res.status(400).render("common/404.html");
});
app.use((req, res, next) => {
	res.status(500).render("common/500.html");
});
app.listen(port, () => {
	console.log("Express Listening on port", port);
});
// 웹 서버 실행
// app.listen(port, () => {
// 	console.log("Express Listening on port", port);
// });
