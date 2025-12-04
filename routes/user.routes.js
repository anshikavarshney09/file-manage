const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const usermodel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware= require('../middlewares/auth')
router.get('/register', (req,res)=>{
    res.render('register')

})
router.post('/register', 
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
    async (req,res)=>{

        const errors = validationResult(req) 
        console.log(errors)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message: 'Invalid Data'


            })
        }
    
       const {username , email, password} = req.body
       const hashpass= await bcrypt.hash(password, 10)

       const newuser = await usermodel.create({
        username ,
        email,
        password:hashpass
       })
       
res.redirect('/user/login'); 

    })
router.get('/login',(req,res) =>{
    res.render('login')
})   
router.post('/login', 
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
    async (req,res)=>{

        const errors = validationResult(req) 
        console.log(errors)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message: 'Invalid Data'


            })
        } 
         const {username , password} = req.body
       
         const user = await usermodel.findOne({
            username:username
         })
         if(!user){
            return res.status(400).json({
                message :"username or password is incorrect"
            })
         }
         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.status(400).json({
                message: "username or password is incorrect"
            })
         }
         const token = jwt.sign({
            userId : user._id,
            email: user.email,
            username : user.username
         }, process.env.JWT_SECRET
        )
        res.cookie('token', token, {
    httpOnly: true,
    secure: false,     // 🔥 LOCALHOST ke liye IMPORTANT
    sameSite: "lax",   // strict mat rakhna
});


         res.redirect('/homepage');


    })
    router.get('/logout', (req, res) => {
    res.clearCookie('token'); 
    res.redirect('/user/login'); 
});

module.exports = router