// express 기본 변수 저장
const express = require("express");
const app = express();
const port = 3000; // port number : ~ 60000

const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser"); // express의 내장 모듈이기 때문에 따로 설치할 필요가 없음.

const MongoClient = require("mongodb").MongoClient; // mongoDB 연동하기
let db;
MongoClient.connect(
	"mongodb+srv://sangwoong03:rlatkd6795@clustersw.kcid2.mongodb.net/woong_app?retryWrites=true&w=majority",
	(err, client) => {
		// 에러처리
		if (err) return console.log("err");

		// woong_app이라는 db로 연결
		db = client.db("woong_app");

		// post라는 폴더에 data 저장
		// 새로고침 or 저장할 때마다 데이터베이스에 저장됨;;
		// db.collection("post").insertOne(
		// 	{ 이름: "sangwoong", 나이: 27 },
		// 	(err, result) => {
		// 		console.log("저장완료");
		// 	},
		// );

		app.listen(port, () => {
			console.log("Express Listening on port", port);
		});
	},
);

// 라우터 모듈 불러오기
const admin = require("./routes/Admin");
const contact = require("./routes/contacts");

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
	app.locals.user_name = req.name;
	app.locals.user_number = req.phone_number;
	next();
});

// 우선순위가 높은 미들웨어
// function primeMiddleware(req, res, next) {
// 	console.log("최우선 미들웨어");
// 	next();
// }

app.get("/", (req, res) => {
	res.send("hello express");
}); // url  (메인 url에서 마지막 / 유무 상관 없음)

app.get("/sangwoong", (req, res) => {
	res.send("hello sangwoong");
});

//라우터 모듈 연동하기
app.use("/admin", admin);
app.use("/contact", contact);

// 라우터 모듈을 미들웨어로 불러오고 다음 실행 함수로 DB저장하기
// _id 값의 경우 입력하지 않으면 object("문자문자문자~~")와 같은 임의 값 저장 됨.
app.post("/add", admin, (req, res) => {
	db.collection("post").insertOne(
		{
			이름: req.body.name,
			전화번호: req.body.phone_number,
			_id: req.body.user_id,
		},
		(err, client) => {
			console.log("저장완료");
		},
	);
});

app.use((req, res, next) => {
	res.status(400).render("common/404.html");
});
app.use((req, res, next) => {
	res.status(500).render("common/500.html");
});

// 웹 서버 실행
// app.listen(port, () => {
// 	console.log("Express Listening on port", port);
// });
