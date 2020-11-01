var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: String, // 이메일
    name: String, // 이름 
    pw: String, // 토큰 
    salt : String, // 솔트
    profileImg : String, // 프로필 이미지 
    part: String, // 파트 
    birth: Date, // 생년월일
    college: String, // 학교
    department: String, // 학과
    active: Number, // 활동 기수
    profile_image: String, // 프로필 이미지
    active_position: String, // OB,YB
    introduction: String, //자기소개
    interest: String, // 관심분야
    dream: String, // 꿈꾸는 앱잼의 모습
    keywords: [String], // 키워드
    tendency: Array, // 작업 성향
    question: [Object], // 파트별 질문
    like: [String],
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("user", userSchema);
