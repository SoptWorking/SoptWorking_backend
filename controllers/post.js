const { user } = require("../model/user");
const statusCode = require("../modules/statusCode");
const resMessage = require("../modules/responseMessage");
const util = require("../modules/util");
const userModel = require("../model/user");
/* ------게시글(post)------ */
const post = {
  // 특정 포스트 로딩
  getPartPost: async (req, res) => {
    const part = req.params.part;
    const result = await userModel.find({ part: part });
    return res.status(200).send(util.success(200, { result: result }));
  },
  getPost: async (req, res) => {
    const id = req.params.id;
    const result = await userModel.findById(id);
    return res.status(200).send(util.success(200, { result: result }));
  },
  // 포스트-좋아요(good)
  modifyGood: async (req, res) => {
    const id = req.body.id;
    const userId = req.user._id;
    const result = await userModel.findById(id);
    const found = result.like.indexOf(userId);
    if (found == -1) {
      result.like.push(userId);
    } else {
      result.like.splice(found, 1);
    }
    await result.save();
    return res
      .status(200)
      .send(util.success(200, { likeCount: result.like.length }));
  },
};

module.exports = post;
