const express = require("express");
const router = express.Router();

const { upload } = require("../config/cloudinary.config");
const File = require("../models/file.model");
const authMiddleware = require("../middlewares/auth");

// LOGIN PAGE
router.get("/", (req, res) => {
    if (req.user) return res.redirect("/homepage");
    res.render("login");
});

// HOMEPAGE (SHOW FILES)
router.get("/homepage", authMiddleware, async (req, res) => {
    try {
        const userFiles = await File.find({ user: req.user.userId }).sort({ uploadedAt: -1 });

        res.render("homepage", {
            user: req.user,
            files: userFiles
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading homepage");
    }
});

// UPLOAD ROUTE (CLOUDINARY + DB)
router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    async (req, res) => {
        try {
            await File.create({
                originalName: req.file.originalname,
                url: req.file.path,              // Cloudinary URL
                publicId: req.file.filename,     // Cloudinary public_id
                format: req.file.format,
                resourceType: req.file.resource_type,
                user: req.user.userId
            });

            res.redirect("/homepage");
        } catch (err) {
            console.error(err);
            res.status(500).send("Upload failed!");
        }
    }
);

module.exports = router;
