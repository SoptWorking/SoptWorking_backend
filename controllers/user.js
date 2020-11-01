const encrypt = require("../modules/crypto");
const jwt = require("../modules/jwt");
const userModel = require("../model/user");
const util = require("../modules/util");
const userController = {
  /**
   * 이메일 중복 확인
   */
  checkEmail: async (req, res) => {
    const email = req.body.email;
    if (!email) {
      res.status(401).send(util.fail(401, "필수 정보를 입력하세요."));
      return;
    }
    // id 중복 확인
    try {
      const result = await userModel.findOne({
        email: email,
      });
      // email이 존재하면
      if (result) {
        // 이메일 인증을 한 경우
        res
          .status(201)
          .send(
            util.success(
              201,
              "이미 회원가입을 하셨습니다. 이메일 인증을 해주세요."
            )
          );
        return;
      }
    } catch (err) {
      if (err) {
        res.status(500).send(util.fail(500, "이메일 서버 에러"));
        return;
      }
    }
    res.status(200).send(util.success(200, "중복된 이메일이 없습니다."));
  },
  /**
   * 회원 가입
   */
  signUp: async (req, res) => {
    const {
      name,
      email,
      pw,
      birth,
      college,
      department,
      part,
      active,
      active_position,
    } = req.body;
    console.log(email);
    // 파라미터 확인
    if (
      !email ||
      !pw ||
      !name ||
      !birth ||
      !college ||
      !department ||
      !part ||
      !active ||
      !active_position
    ) {
      res.status(400).send(util.fail(400, "필수 정보를 입력하세요."));
      return;
    }

    const { salt, hashed } = await encrypt.encrypt(pw);
    console.log(salt);
    console.log(hashed);

    userController.saveUserInfo(
      email,
      hashed,
      salt,
      name,
      birth,
      college,
      department,
      active,
      active_position,
      part
    ); // 회원 정보 저장

    return res.status(200).send(util.success(200, "이메일 전송 완료"));
  },

  /**
   * 회원 정보 저장
   */
  saveUserInfo: async (
    email,
    password,
    salt,
    name,
    birth,
    college,
    department,
    active,
    active_position,
    part
  ) => {
    var user = new userModel();
    user.email = email;
    user.pw = password;
    user.salt = salt;
    user.name = name;
    user.birth = new Date(birth);
    user.college = college;
    user.department = department;
    user.active = active;
    user.active_position = active_position;
    user.part = part;
    await user.save();
  },

  /**
   * 이메일 인증 토큰 변경
   */
  changeAuthToken: async (email, token) => {
    const filter = {
      email: email,
    };
    const update = {
      authToken: token,
    };
    await adminModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  },

  /**
   * 이메일 인증
   */
  authenticate: async (req, res) => {
    const email = req.query.email;
    const token = req.query.token;

    // token 일치 시 auth를 true로 변경
    const filter = {
      email: email,
    };
    const update = {
      auth: true,
    };
    const result = await adminModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (result.authToken === undefined) {
      res.render("result", {
        result: "fail",
      });
    }
    if (result.authToken === token) {
      await adminModel.update(filter, {
        $unset: {
          authToken: 1,
        },
      }); // authToken 필드 삭제
      res.render("result", {
        result: "success",
      });
    } else {
      res.render("result", {
        result: "error",
      });
    }
  },

  /**
   * 로그인
   */
  signIn: async (req, res) => {
    const { email, pw } = req.body;

    const result = await userModel.findOne(
      {
        email: email,
      },
      {
        _id: 0,
        email: 1,

        salt: 1,
        pw: 1,
      }
    );

    if (result === null) {
      return res.status(401).send(util.fail(401, "이메일을 확인해주세요."));
    }

    const salt = result.salt;
    const hashed = await encrypt.encryptWithSalt(pw, salt);
    if (result.pw === hashed) {
      const { token, _ } = await jwt.sign(result);
      return res.status(200).send(
        util.success(200, "로그인 성공", {
          accessToken: token,
        })
      );
    } else {
      return res
        .status(400)
        .send(util.fail(400, "비밀번호가 일치하지 않습니다."));
    }
  },

  /**
   * 프로필 수정
   */
  editProfile: async (req, res) => {
    const userEmail = req.email;
    const { name, birth } = req.body;

    // 파라미터 확인
    if (!name || !birth) {
      return res.status(400).send(util.fail(400, "필수 정보를 입력하세요."));
    }

    const filter = {
      email: userEmail,
    };
    const update = {
      name: name,
      birth: birth,
    };
    await adminModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(util.success(200, "프로필 수정 성공"));
  },

  /**
   * 프로필 읽기
   */
  readProfile: async (req, res) => {
    const userEmail = req.email;

    const filter = {
      email: userEmail,
      auth: true,
    };
    const result = await adminModel.findOne(filter, {
      _id: 0,
      email: 1,
      name: 1,
      birth: 1,
    });

    return res
      .status(200)
      .send(util.success(200, "프로필 불러오기 성공", result));
  },

  /**
   * 토큰 검사 완료
   */
  checkToken: async (req, res) => {
    res.status(200).send(util.success(200, "토큰 검사 완료"));
  },
};

module.exports = userController;
