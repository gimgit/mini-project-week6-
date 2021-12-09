const express = require('express');
const router = express.Router();
const User = require("../models/users")
const jwt = require('jsonwebtoken')
const auth = require("../middlewares/auth");
// const authMiddleware = require('../middlewares/auth_middleware.js');

router.post("/register", async (req, res, next)=>{
  console.log(req.body)
  const userId = req.body.userId
  const nickname = req.body.nickname
  const pw1 = req.body.pw1
  const pw2 = req.body.pw2
  const namingRule = /^[a-zA-z0-9]{3,999}$/
  const existingUser = await User.findOne({userId : userId});
  const existingName = await User.findOne({nickname : nickname});


    // id 양식 확인
    if (userId < 3 || namingRule.test(userId) == false){
      res.status(400).send({
        errorMessage: "아이디는 3자이상, 알파벳 대소문자, 숫자로 구성"
      })
      return;
    }
    // id 중복 확인
    if (existingUser !== null){
      res.status(400).send({
        errorMessage: "아이디 중복"
      })
      return;
    }
    // 닉네임 중복확인
    if (existingName !== null){
      res.status(400).send({
        errorMessage: "닉네임 중복"
      })
      return;
    }
    // 패스워드 양식 확인
    if (pw1.length < 4 || pw1.includes(userId) == true){
      res.status(400).send({
        errorMessage: "패스워드는 4자이상, 아이디를 포함하지 않음"
      })
      return;
    }
    // 패스워드 일치 확인
    if (pw1 !== pw2) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      return;
    }
    
      const user = new User({ 
      userId : userId, 
      pw : pw1
      });
      await user.save();
  
      res.redirect('/login') 
    })

    //로그인
router.post('/login', async (req, res) => {
    const { userId, pw } = req.body;

    const user = await User.findOne({ userId });

    if (!user || pw !== user.pw) {
      res.status(400).send({errorMessage : '아이디 또는 패스워드가 잘못됐습니다.'});
      return;
    }
    console.log(user)

    const token = jwt.sign(
      
      { userId: user.userId }, '99td');

    res.send({
      token: token
    });
});
    
    //미들웨어 붙여서 로그인한 유저 블락

  
    module.exports = router;