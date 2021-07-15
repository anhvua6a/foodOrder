let  EnumCommon = require("../enum/Enumcommon.js");

let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    phoneNumber: String,
    passWord: String,
    name: String,
    address: String,
    role: {type: Number, default: EnumCommon.RoleUser.USER},
    status: {type: Number, default: EnumCommon.UserStatus.NORMAL},
    fcmToken: String
})

module.exports = mongoose.model('user', userSchema)