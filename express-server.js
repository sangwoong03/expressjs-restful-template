// express 기본 변수 저장
const express = require("express");
const app = express();
const port = 3000; // port number : ~ 60000

const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser"); // express의 내장 모듈이기 때문에 따로 설치할 필요가 없음.

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		cookie: { httpOnly: true, secure: false },
	}),
);
app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure("template", {
	autoescape: true,
	express: app,
});

// 라우터 모듈 불러오기
const admin = require("./routes/Admin");

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
// function primeMiddleware(req, res, next) {
// 	console.log("최우선 미들웨어");
// 	next();
// }

app.get("/", (req, res) => {
	res.send("Home");
}); // url  (메인 url에서 마지막 / 유무 상관 없음)

app.use("/admin", admin);
app.post("/add", admin);
app.delete("/delete", admin);
app.get("/edit/:id", admin);
app.put("/edit", admin);
// Login
// app.post(
// 	"/login",
// 	passport.authenticate("local", {
// 		failureRedirect: "/fail",
// 	}),
// 	(req, res) => {
// 		res.redirect("/");
// 	},
// );

// function confirmLogin(req, res, next) {
// 	if (req.user) {
// 		next();
// 	} else {
// 		console.log("no user");
// 	}
// }
// app.get("/mypage", confirmLogin, (req, res) => {
// 	console.log(req.user);
// 	res.render("admin/mypage.html");
// });

// passport.use(
// 	new LocalStrategy(
// 		{
// 			usernameField: "email",
// 			passwordField: "pw",
// 			session: true,
// 			passReqToCallback: true,
// 		},
// 		// DB와 회원정보 검증
// 		function (email, pw, done) {
// 			//console.log(입력한아이디, 입력한비번);
// 			db.collection("login").findOne({ email: email }, function (err, result) {
// 				if (err) return done(result);

// 				if (!result)
// 					return done(null, false, { message: "존재하지않는 아이디요" });
// 				// done(서버에러, 성공 시 사용자 DB데이터, 에러메시지)
// 				if (pw == result.pw) {
// 					return done(null, result);
// 				} else {
// 					return done(null, false, { message: "비번틀렸어요" });
// 				}
// 			});
// 		},
// 	),
// );

// email을 이용해서 세션을 저장시키는 코드 (로그인 성공 시 함수 실행)
// passport.serializeUser(function (user, done) {
// 	done(null, user.email);
// });

// 세션 데이터를 가진 정보를 DB에서 찾는 함수 (eg.마이페이지 접속 시 실행)
// {} 정보를 객체로 출력할 수 있음.
// passport.deserializeUser(function (email, done) {
// 	db.collection("login").findOne({ email: email }, (err, result) => {
// 		done(null, result);
// 	});
// });

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
