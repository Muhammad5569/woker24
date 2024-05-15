const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String,
        required:true,
        trim:true
    }
})

const Job = mongoose.model('Job', jobSchemaSchema)
module.exports = Job