var express = require("express");
var router = express.Router();

const profileController = require("../controllers/profile");
const postController = require("../controllers/post");
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const upload = require('../middlewares/multer');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});


/* ------회원가입(signup) & 로그인(login)------ */
// 회원가입
router.post("/signup", userController.signUp);
// 로그인
router.post("/login", userController.signIn);



/* ------게시글(post)------ */
// 해당 파트 포스트 로딩(part)
// (0-전체[기본] / 1-디자인 / 2-서버 / 3-안드 / 4-ios / 5-웹 )
router.get(
  "/post/part/:part",
  authMiddleware.checkToken,
  postController.getPartPost
);
// 특정 포스트(1개) 로딩
router.get("/post/post/:id", authMiddleware.checkToken, postController.getPost);
// 포스트-좋아요(good)
router.put("/post/good", authMiddleware.checkToken, postController.modifyGood);



/* ———프로필(profile)——— */
// 기본정보 불러오기
router.get("/profile", authMiddleware.checkToken, profileController.getProfile);
// 프로필 등록
router.post(
  "/profile",
  authMiddleware.checkToken,
  upload.single('profileImg'),
  profileController.saveProfile
);

module.exports = router;
