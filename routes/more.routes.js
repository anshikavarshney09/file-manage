const express = require('express');
const authMiddleware = require('../middlewares/auth')

const router = express.Router();
const { cloudinary, upload } = require('../config/cloudinary.config');
const path= require('path')
const fileModel = require('../models/file.model')
router.get('/', (req, res) => {
  if (req.user) {
    // If user is authenticated, go to homepage
    return res.redirect('/homepage');
  }
  // Otherwise, render login view
  res.render('login'); 
});


router.get('/homepage' , authMiddleware, async (req,res) =>{
    const userFiles = await fileModel.find({
        user: req.user.userId
    })
    console.log(userFiles)

    res.render('homepage',{
        user: req.user,
        files:userFiles
    })
})
router.post('/upload',  authMiddleware ,upload.single('file'), async (req,res) =>{
    const newFile = await fileModel.create({
        path:req.file.path,
        originalName:req.file.originalname,
        user:req.user.userId
    })
    res.redirect('/homepage');
})
router.get('/download/:id', authMiddleware, async (req,res)=>{
    const loggedInUserId=req.user.userId
   
    const file = await fileModel.findOne({
        user : loggedInUserId,
        _id:req.params.id

    })
    if(!file){
        return res.status(401).json({
            message: 'unauthorised'
        })


    }
    if (file.path.startsWith('http')) {
    return res.redirect(file.path);
  }


  // If file is stored locally, send it
  res.download(path.resolve(file.path), file.originalName);
});


module.exports = router