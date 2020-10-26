const user  = require('../model/user');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');

/* ———프로필(profile)——— */
const profile = {
    // 기본정보 불러오기
    getProfile: (req,res)=>{
        
        const userData = req.user;

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.PROFILE_GET_SUCCESS,
            {
                name : userData.name,
                birth : userData.birth,
                college : userData.college,
                department : userData.department,
                active : userData.active,
                active_position : userData.active_position
            }));
    },
    // 프로필 등록
    saveProfile: (req,res)=>{
        const {
            name,
            birth,
            college,
            department,
            active,
            active_position,
            introduction,
            interest,
            dream,
            keywords,
            tendency,
            question
        } = req.body.data;
        if(!name ||
           !birth ||
           !college ||
           !department ||
           !active ||
           !active_position ||
           !introduction ||
           !interest ||
           !dream ||
           !keywords || 
           !tendency ||
           !question)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
            // req.data[0].like = 0;
        const userData = new user(req.body.data);

        userData.save((err, userInfo)=> {
            if(err) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.PROFILE_POST_FAIL));
            return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.PROFILE_POST_SUCCESS,
                {

                }));
        });
    }
}

module.exports = profile;
