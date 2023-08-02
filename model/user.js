const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        requied: true
    },
    age : {
        type: Number,
        
    },
    email : {
        type: String,
        requied : true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User