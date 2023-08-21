const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true},
    quote:{type: String},
},{
     collation: { locale: 'en_US', strength: 1 } 
})

const model = mongoose.model('UserData',User)

module.exports = model