const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const util = require('../modules/util');

/* ———프로필(profile)——— */
const profile = {
    // 기본정보 불러오기
    getProfile: (req,res)=>{
        
        const user = req.user;

        return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.PROFILE_GET_SUCCESS,
            {
                name : user.name,
                birth : user.birth,
                college : user.college,
                department : user.department,
                part : user.part,
                active : user.active,
                active_position : user.active_position
            }));
    },
    // 프로필 등록
    saveProfile: (req,res)=>{
        if(req.file === undefined){
            profileImg = null;
        }else{
            profileImg = req.file.location;
        }
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
        } = JSON.parse(req.body.Info);

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
           !question ||
           !profileImg)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
            
            let user = req.user;
            user.introduction = introduction;
            user.interest = interest;
            user.dream = dream;
            user.keywords = keywords;
            user.tendency = tendency;
            user.question = question;
            user.profileImg = profileImg;

        user.save((err, userInfo)=> {
            if(err) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,resMessage.PROFILE_POST_FAIL));
            return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.PROFILE_POST_SUCCESS));
        });
    }
}

module.exports = profile;
