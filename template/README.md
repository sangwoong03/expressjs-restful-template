[nunjucks settings]

렌더링하는 js 파일 상단 부분에 nunjucks 불러오기
const nunjucks = require("nunjucks");

작성부분

```javascript

  nunjucks.configure("folder name", {
    autoescape: ...,
    express: express();
  })

```

데이터 값이 img태그이거나 html태그의 경우 autoescape로 인해 태그까지 문자열로 출력될 수 있음.
이를 방지하기 위해 " | safe"를 데이터 값과 같이 작성해줌

view engine (template engine) ... "ejs, pug, nunjucks"
using JS, module for rendering HTML
npm i nunjucks

[템플릿 상속]

공통된 템플릿을 지정하여 필요할 때마다 호출하여 사용하기
