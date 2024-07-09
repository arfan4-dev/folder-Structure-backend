import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        index: true, // if you want any field is smooth in searching in DB, index property is very useful here
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        lowercase: true,
        required: true,
        index: true, // if you want any field is smooth in searching in DB, index property is very useful here
        trim: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    avatar: {
        type: String, // cloudaniry Url
        required: true
    },
    coverImage: {
        type: String, // cloudaniry Url
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    refreshToken: {
        type: String
    }
    ,

}, { timestamps })

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateTokenAccess = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}


const User = mongoose.model("User", userSchema);
export { User }