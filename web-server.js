//express를 사용하지 않고 내장 모듈을 이용한 웹서버 가동

const http = require("http");

http
	.createServer((request, response) => {
		response.writeHead(200, { "Content-Type": "text/plain" }); // status code
		// 1xx : 조건부응답
		// 2xx : 응답성공
		// 3xx : 리다이렉션
		// 4xx : 요청오류 (ex: 404 Not Found)
		// 5xx : 서버오류
		response.write("Hello Server"); // print the strings on the viewport
		response.end();
	})
	.listen(3000); // 포트 번호 = 3000
