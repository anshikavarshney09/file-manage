const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: [true, 'Original name is required']
    },

    url: {
        type: String,
        required: [true, 'URL is required']   // Cloudinary secure_url
    },

    publicId: {
        type: String,
        required: [true, 'publicId is required']  // Cloudinary public_id
    },

    format: {
        type: String   // optional (pdf/jpg/png)
    },

    resourceType: {
        type: String   // image/raw/video
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',      // 👈 YOUR user model name (correct!)
        required: [true, 'user is required']
    },

    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('file', fileSchema);
