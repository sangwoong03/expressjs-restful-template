const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./src/routes/index");

const createApp = () => {
	const app = express();

	/*
		app.use()
		
		Middleware 개념부터 알아보면,,
	*/

	app.use(cors()); // 전체 요청에 대한 cors 정책 설정 (1)
	// 특정 요청에 대한 예시는 server.js 파일의 주석 확인.

	app.use(morgan("dev")); // 서버의 log를 확인하기 위함 (디버깅 목적) (2)
	// 개발 목적

	app.use(express.json()); // express.json() 요청을 json 형태로 바꾸어서 API함수에 넣을 수 있도록 변환

	app.use(routes); // 서버로 전송된 요청 = req를 router 모듈로 전송함.

	return app;
};

module.exports = { createApp };
