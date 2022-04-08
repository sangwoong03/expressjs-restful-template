## Router

---

<br>

### **[Routing]**

---

<br>

데이터 통신 간 최적의 경로를 선택하는 과정

- 새로운 주소, 렌더링 해야되는 페이지가 많을 수록 하나의 파일 (main js file)에서 코드를 추가한다면 코드 관리가 어려워질 것.
- Router라는 모듈을 이용하여 특정 주소 패턴별로 파일을 따로 만들어 관리.

- 작성 예시  
  **routes/Admin.js 내부 코드**

  ```javascript
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res) => {
  	res.send("admin 이후 url"); // 화면에 "admin 이후 url" 표시
  });

  router.get("/lists", (req, res) => {
  	res.send("admin lists"); // 화면에 "admin lists" 표시
  });

  module.exports = router;
  ```

  **main (express-server.js) js file 내부 코드 변경**

  ```javascript
  // routes 폴더의 admin파일을 import
  const admin = require("./routes/admin");

  // main page에서 렌더링 되는 코드
  app.get("/", (req, res) => {
  	res.send("hello express");
  });

  // /admin이 포함된 주소는 admin (router객체)을 참조하여 렌더링
  app.use("/admin", admin);
  ```

📌 **리액트를 사용한 프로젝트의 경우 리액트 자체의 라우팅 기능을 활용할 수도 있다.** 📌
