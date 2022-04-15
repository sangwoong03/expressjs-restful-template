const express = require("express");
const router = express.Router({ mergeParams: true }); // express 라우터 분리
// express 라우터를 분리하여 라우터 모듈 작성
// mergeParams >> 부모 라우터의 파라미터 상속
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

// middleware module
// function testMiddleware(req, res, next) {
// 	console.log("첫번째 미들웨어");
// 	next();
// }
// function testMiddleware2(req, res, next) {
// 	console.log("첫번째 미들웨어");
// 	next();
// }

// rotuer "/" url로 이동 >> testMiddleware1, 2를 거치고 >> router res.send 실행
router.get("/", (req, res) => {
	res.send("Main Page");
	console.log();
});

router.get("/lists", fetchData);

router.get("/lists/write", (req, res) => {
	res.render("admin/write.html");
});

router.get("/login", (req, res) => {
	res.render("admin/login.html");
});

router.get("/edit/:id", (req, res) => {
	const urlId = parseInt(req.params.id);
	db.collection("post").findOne({ _id: urlId }, (err, result) => {
		res.render("admin/edit.html", { list: result });
	});
});

router.get("/mypage", (req, res) => {
	console.log(req.params.user);
	res.render("admin/mypage.html");
});

router.post("/add", addData);

router.delete("/delete", deleteData);

router.put("/edit", editData);

// FETCH
function fetchData(req, res) {
	db.collection("post")
		.find()
		.toArray(function (err, result) {
			res.render("admin/lists.html", { lists: result });
		});
}

// ADD
// _id 값의 경우 입력하지 않으면 object("문자문자문자~~")와 같은 임의 값 저장 됨.

// DELETE
function deleteData(req, res) {
	const _id = parseInt(req.body._id);
	db.collection("post").deleteOne({ _id }, function (err, result) {
		if (err) return console.log("삭제 실패");
		db.collection("counter").updateOne(
			{ name: "numOfLists" },
			{ $inc: { totalLists: -1 } },
			function (err, result) {
				if (err) return console.log("수정 실패");
			},
		);
	});
	res.redirect("admin/lists");
}
// ADD
function addData(req, res) {
	db.collection("counter").findOne(
		{ name: "numOfLists" },
		function (err, result) {
			if (err) return console.log("리스트 개수 찾기 실패");
			let id = result.totalLists;

			db.collection("post").insertOne(
				{
					user_name: req.body.name,
					user_number: req.body.phone_number,
					user_id: req.body.user_id,
					_id: id + 1,
				},
				function (err, result) {
					if (err) return console.log("저장 실패"); // 삭제 시 id값을 수정을 안해주면 남아있는 id값과 추가돼야 되는 id값이 겹쳐 에러발생
					console.log("저장완료");
					db.collection("counter").updateOne(
						{ name: "numOfLists" },
						{ $inc: { totalLists: 1 } },
						function (err, result) {
							if (err) return console.log("증가 실패");
							console.log("증가 성공");
						},
					);
				},
			);
		},
	);
	res.redirect("admin/lists");
}
// EDIT
function editData(req, res) {
	const editId = parseInt(req.body.edit_id);
	const user_name = req.body.name;
	const user_number = req.body.phone_number;
	const user_id = req.body.user_id;
	db.collection("post").updateOne(
		{ _id: editId },
		{ $set: { user_name, user_number, user_id } },
		(err, result) => {
			if (err) throw err;
		},
	);
	res.redirect("admin/lists");
}

module.exports = router; // 작성한 모듈 내보내기
