var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: String, // 이름
    jsonWebToken: String, //토큰
    part: String, // 파트
    birth: Date, // 생년월일
    college: String, // 학교
    department: String, // 학과
    active: Number, // 활동 기수
    active_position: String, // OB,YB
    introduction: String, //자기소개
    interest: String, // 관심분야
    tendency: Array, // 작업 성향
    question: [Object], // 파트별 질문
    like: [String],
  },
  { versionKey: "_somethingElse" }
);

module.exports = mongoose.model("user", userSchema);
