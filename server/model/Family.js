// models/User.js
const mongoose = require("mongoose");


const FamilySchema = new mongoose.Schema({
    familyName: { type: String },
    familyAddress: { type: String },
    familyTelephone: { type: String },
    numFamilyMembers: { type: Number }
});

const FamilyModel = mongoose.model("Family", FamilySchema, "family");

module.exports = FamilyModel;
