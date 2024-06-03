const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: { type: String }
})

/* {collection: "role"} */   //specific name 

const RoleModel = mongoose.model("roles", RoleSchema)

module.exports = RoleModel
