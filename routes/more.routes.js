const express = require('express');
const path = require('path');
const authMiddleware = require('../middlewares/auth');
const { upload } = require('../config/cloudinary.config');
const fileModel = require('../models/file.model');

const router = express.Router();

// Login route
router.get('/', (req, res) => {
  if (req.user) {
    return res.redirect('/homepage');
  }
  res.render('login');
});

// Homepage with user files
router.get('/homepage', authMiddleware, async (req, res) => {
  try {
    const userFiles = await fileModel.find({ user: req.user.userId });
    res.render('homepage', { user: req.user, files: userFiles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading homepage');
  }
});

// Upload route
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const newFile = await fileModel.create({
      path: req.file.path,
      originalName: req.file.originalname,
      user: req.user.userId,
    });
    console.log('Saved file:', newFile);
    res.redirect('/homepage');
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
});

// Download route
router.get('/download/:id', authMiddleware, async (req, res) => {
  try {
    const file = await fileModel.findOne({
      user: req.user.userId,
      _id: req.params.id,
    });

    if (!file) {
      return res.status(401).json({ message: 'unauthorised' });
    }

    if (file.path.startsWith('http')) {
      return res.redirect(file.path); // Cloudinary file
    }

    res.download(path.resolve(file.path), file.originalName); // Local file
  } catch (err) {
    console.error(err);
    res.status(500).send('Download failed');
  }
});

module.exports = router;
