const express = require("express");
const router = express.Router(); // express 라우터 분리
// express 라우터를 분리하여 라우터 모듈 작성

router.get("/", (req, res) => {
	res.send("admin 이후 url");
});
router.get("/products", (req, res) => {
	res.send("admin products");
});

module.exports = router; // 작성한 모듈 내보내기

// 라우팅이란??
// 데이터 통신 간 최적의 경로를 선택하는 과정
