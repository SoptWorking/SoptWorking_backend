var express = require("express");
var router = express.Router();
var profileController = require('../controllers/profile');
var postController = require('../controllers/post');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* ------회원가입(signup) & 로그인(login)------ */
// 회원가입
router.post("/signup", (req, res) => {});
// 로그인
router.post("/login", (req, res) => {});

/* ------게시글(post)------ */
// 일부 포스트 로딩(post-part)
router.get("/post/post-part", (req, res) => {});
// 해당 파트 포스트 로딩(part)
// (0-전체[기본] / 1-디자인 / 2-서버 / 3-안드 / 4-ios / 5-웹 )
router.get("/post/part/:part", (req, res) => {});
// 특정 포스트 로딩
router.get("/post/post/:id", postController.getPost());
// 포스트-좋아요(good)
router.put("/post/good", postController.modifyGood());

/* ———프로필(profile)——— */
// 기본정보 불러오기
router.get("/profile", profileController.getProfile());
// 프로필 등록
router.post("/profile", profileController.saveProfile());

module.exports = router;
