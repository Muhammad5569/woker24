const mongoose = require('mongoose')

const placeSchema = mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
    }

})

const Place = mongoose.model('Place', placeSchema)
module.exports = Place