const express = require("express");
const router = express.Router({ mergeParams: true }); // express 라우터 분리

const methodOverride = require("method-override");
router.use(methodOverride("_method"));

const MongoClient = require("mongodb").MongoClient; // mongoDB 연동하기
const MONGO_URL =
	"mongodb+srv://sangwoong03:rlatkd6795@clustersw.kcid2.mongodb.net/woong_app?retryWrites=true&w=majority";
let db;
MongoClient.connect(MONGO_URL, (err, client) => {
	// 에러처리
	if (err) throw err;
	// woong_app이라는 db로 연결
	db = client.db("woong_app");
});

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
router.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		cookie: { httpOnly: true, secure: false },
	}),
);
router.use(passport.initialize());
router.use(passport.session());

// Login
router.get("/", (req, res) => {
	res.render("login/login.html");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/fail",
	}),
	(req, res) => {
		res.redirect("/admin/lists");
	},
);

function confirmLogin(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.send("로그인 해주세요");
		console.log("no user");
	}
}
router.get("/mypage", confirmLogin, (req, res) => {
	console.log(req.user);
	res.render("login/mypage.html");
});

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "pw",
			session: true,
			passReqToCallback: true,
		},
		// DB와 회원정보 검증
		function (email, pw, done) {
			db.collection("login").findOne({ email: email }, function (err, result) {
				if (err) return console.log(err);

				if (!result)
					return done(null, false, { message: "존재하지않는 아이디요" });
				// done(서버에러, 성공 시 사용자 DB데이터, 에러메시지)
				if (pw == result.pw) {
					return done(null, result);
				} else {
					return done(null, false, { message: "비번틀렸어요" });
				}
			});
		},
	),
);

// email을 이용해서 세션을 저장시키는 코드 (로그인 성공 시 함수 실행)
passport.serializeUser(function (user, done) {
	done(null, user.email);
});

// 세션 데이터를 가진 정보를 DB에서 찾는 함수 (eg.마이페이지 접속 시 실행)
// {} 정보를 객체로 출력할 수 있음.
passport.deserializeUser(function (email, done) {
	db.collection("login").findOne({ email: email }, (err, result) => {
		done(null, result);
	});
});

module.exports = router;
