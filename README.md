## node.js express Stuyding

---

<br>

### 📌 why?

---

1. daily-planner repository의 로컬스토리지를 통한 로그인 및 일정관리 기능을 서버 통신으로 변경.
2. portfolio email 전송 기능을 추가하기 위함.
3. Node.Js의 Non-blocking이라는 특징.
   - 일반적인 언어로 구성된 서버와 다르게 요청 순서를 조정하여 요청 중 중단을 멈추지 않음.
     <br>  
     <br>

### 📌 Ref:

---

- 공식 문서 [Express Mdn](https://developer.mozilla.org/ko/docs/Learn/Server-side/Express_Nodejs/Introduction)
- 깃헙 자료 [parkjunyoung](https://github.com/parkjunyoung/express-online)
- 블로그 [inu](https://inuplace.tistory.com/643?category=933545)
- 유튜브 [코딩애플](https://www.youtube.com/channel/UCSLrpBAzr-ROVGHQ5EmxnUg)
  <br>  
  <br>

### 📌 Index:

---

1. express start (express-server.js)
   ```
   npm i express
   node ("main js file name").js
   ```
2. nodemon (express-server.js)
   ```
   npm i install -g nodemon
   nodemon -e js, html ("main js file name").js
   ```
3. Router (rotues/Admin.js, routes/README.md)
4. view engine (template/README.md, template/layout/base.html)
5. Middlewares (middleware/README.md)
6. Error handling (template/common/404, 500.html)
7. Macro (template/macro/link/html, template/layout/base.html)
8. Static files (uploads/README.md)
   <br>
   <br>

### 📌 Server:

---

<br>

- 요청을 하면 요청한 내용을 보내주는 프로그램.
- 쉽게 말해 서빙하는 역할을 함.
- 비유 ) 클라이언트 = 식당 손님 / 서버 = 식당 알바생
- HTTP 요청 방식 4가지
  1.  읽기 (GET)
  2.  쓰기 (POST)
  3.  수정 (PUT)
  4.  삭제 (DELETE)
      <br>
      <br>

### 📌 REST API:

---

<br>

- 웹 개발 시 API (Application Programming Interface)

  - 웹 서버와 클라이언트의 소통 방법
  - 예시) get`("url", ...))`

- REST API (Representational State Transfer API, Roy Fielding):

  **[REST 원칙 6개]**

  1.  Uniform Interface (중요)
      - 하나의 자료는 하나의 url.
      - 예측 가능성
      - 요청과 응답은 정보가 충분히 들어가있어야 함.
  2.  Client - Server 역할 구분
      - 브라우저는 요청만
      - 서버는 응답만
  3.  Stateless
      - 요청1, 요청2 즉 각각의 요청들은 의존성이 없어야 함.
  4.  Cacheable
      - 서버에서 보내주는 정보들은 캐싱이 가능해야 함.
      - 캐싱을 위한 버전 관리도 잘해야 함. (브라우저 역)
  5.  Layered System
      - 컴포넌트의 그룹화 및 계층 구조화
  6.  Code on Demand - 클라이언트의 요청에 따른 소통이 필요  
      <br>
      <br>
      **[이름짓기 원칙]**

  - url을 명사로 작성
  - 하위 문서를 명시할 땐 /파일확장자(.html) 쓰지 않기
  - 띄어쓰기는 대시(-) 이용
  - 자료 하나 당 하나의 url
