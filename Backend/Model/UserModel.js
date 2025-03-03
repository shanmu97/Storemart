const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Enter Your Email"]
    },
    password: {
        type: String,
        required: [true, "Enter Your Password"]
    },
    phone: {
        type: String,
        required: [true, "Enter Your Number"]
    },
    gender: {
        type: String,
        enum:['Male','Female','Prefer not to say'],
        required: [true, "Enter Your Gender"]
    },
    role: {
        type: String,
        enum: ["Customer","Admin"],
        default:"Customer"
    },
}, {
    timestamps: true
},

)

module.exports= mongoose.model('User',userSchema)