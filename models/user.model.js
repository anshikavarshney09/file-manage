const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique:true,
        minlength : [3,'username must have atleast 3 character']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique:true,
        minlength : [13,'email must have atleast 13 character']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength : [8,'password must have atleast 8 character']

    }
})
const user = mongoose.model('user' , userSchema)

module.exports= user