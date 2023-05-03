
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    election: {
         type: String,
        required: true,
    },
    email:{
        type: String,
        required: false,
    },
    isVerified: {type: Boolean, default:false},
    password: {
        type: String,
        required: true,
    },
    Otp: {type: String},
    OtpExpires:{type: Date},
    role: {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    }
}


);

UserSchema.pre("save", async function(next){
    const user = this;
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password, this.password);
};
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("userlogin", UserSchema);
module.exports = User;
