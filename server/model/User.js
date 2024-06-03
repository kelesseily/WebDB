// models/User.js
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    role: { type: String} // Embedded array of roles
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
