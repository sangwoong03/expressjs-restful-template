const express = require("express");
const router = express.Router(); // express 라우터 분리
// express 라우터를 분리하여 라우터 모듈 작성

// middleware module
function testMiddleware(req, res, next) {
	console.log("첫번째 미들웨어");
	next();
}
function testMiddleware2(req, res, next) {
	console.log("첫번째 미들웨어");
	next();
}

// rotuer "/" url로 이동 >> testMiddleware1, 2를 거치고 >> router res.send 실행
router.get("/", testMiddleware, testMiddleware2, (req, res) => {
	res.send("admin 이후 url");
});

router.get("/lists", (req, res) => {
	// res.send("admin products"); >> 화면 메시지
	res.render("admin/lists.html", {
		message: "USING VIEW ENGINE!!!!!!!!!!!!!!",
		name: "<h1>sangwoong</h1>",
	});
});

module.exports = router; // 작성한 모듈 내보내기

// 라우팅이란??
// 데이터 통신 간 최적의 경로를 선택하는 과정
