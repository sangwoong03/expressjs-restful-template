const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const createApp = () => {
    const app = express();

    app.use(cors()); // 전체 요청에 대한 cors 요청 설정
    // 특정 요청에 대한 예시는 server.js 파일의 주석 확인.
    app.use(morgan('dev'));
    app.use(express.json());

    return app;
}

module.exports = { createApp }; 