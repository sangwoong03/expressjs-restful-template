## View enginde (templating engine)

---

<br>

- 데이터의 내용을 HTML 렌더링에 도움.
- html 파일 내부에서 조건문, 반복문 등을 통해 데이터를 이용할 수 있음.

- command

  ```
  npm install nunjucks
  ```

### **[Nunjucks]**

---

<br>

렌더링하는 js 파일 상단 부분에 nunjucks 불러오기

- 작성 예시  
  **main (express-server.js) js file 내부 코드**

  ```javascript
    const express = require("express");
    const app = express();
    const nunjucks = require("nunjucks");

    nunjucks.configure("template", { // template 사용
      autoescape: true / false ,  // 보안상 true
      express: app; // 사용 주체
    })
  ```

  **routes/Admin.js 내부 코드**

  - 라우팅을 사용했기 때문에 해당하는 template폴더 내부에 해당하는 폴더를 만들어주어야 함.

  ```javascript
  router.get("url", (req, res) => {
  	res.render("template/admin/lists.html");
  });
  //=================================================//
  // cf. without nunjucks, in the main js file ... in this repo, the "express-server.js"
  // example
  app.get("url", (req, res) => {
  	res.sendFile(__dirname + "file.html");
  });
  ```

- 데이터 값이 img태그이거나 html태그의 경우, autoescape로 인해 태그까지 문자열로 출력될 수 있음.
- 이를 방지하기 위해 " | safe"를 데이터 값과 같이 작성해줌

view engine (template engine) ... "ejs, pug, nunjucks"
using JS, module for rendering HTML
npm i nunjucks

### **[템플릿 상속]**

---

<br>

- 공통된 템플릿을 지정하여 필요할 때마다 호출하여 사용하기
- template/layout/base.html 파일 참고.
- 반복과 비효율성에서 벗어날 수 있음.
- 작성 예시  
  **template/layout/base.html**

  ```html
  <html>
  	<head>
  		...
  	</head>
  	<body>
  		{%block content %} {% endblock%}
  	</body>
  </html>
  ```

  **template/admin/write**

  ```html
  {%set title = "회원 등록" %} {% extends "layout/base.html" %} {% block content
  %}
  <!-- 내부 코드 작성 -->
  <!-- 기본 레이아웃인 base.html에 적용되는 부분-->
  {% endblock%}
  ```

### **[Error Handling]**

---

<br>

**commom/404.html, commom/500.html 참조**

1. 404 Error!

   ```javascript
   // express-server.js >>> code referred
   // web-server.js >>> error status description referred

   //400번대 에러 (요청오류)
   app.use((req, res, next) => {
   	res.status(400).render("common/404.html");
   });

   // 500번대 에러 (서버오류)
   app.use((req, res, _) => {
   	res.status(500).render("common/500.html");
   });
   // 사용하지 않는 파라미터는 언더바("_")로 대체할 수 있음.
   ```

### **[Nunjucks Macro]**

---

<br>

**template/macro/link.html 참조**

- 상단 메뉴 클릭 시 활성화 기능 추가 (url 비교에 따른 html element class 추가 및 삭제)
- 작성 예시  
  **temlplate/macro/link.html** 내부 코드

  ```html
  {% macro link (params) %}
  <!-- link 자리에 사용하고자 하는 매크로 이름 설정-->
  <!-- 내부 매크로 코드 작성 -->
  <!-- marco.html 파일 참조할 것 -->
  {% endmacro%}
  ```

  **template/layout/base.html** 내부 코드 중..

  ```html
  {% from "macro/link.html" import link %}
  <!-- express-server.js 내부에 언급된 req_path 참조 -->
  {{ link ("/admin/lists", "List", req_path) }} {{ link ("/admin/lists/write",
  "Write", req_path) }}
  ```
