const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { stringify } = require('querystring')

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(console.log('connected'))

const workerSchema = mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:false,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email address!')
            }
        }
    },
    username:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    abilities:{
        gender:{
            type:String,
            trim:true
        },
        height:{
            type:Number,
        },
        weight:{
            type:Number
        },
        job:{
            type:String,
            trim:true,
            required:true
        }
    }
})

          // Methods

const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

workerSchema.methods.generateAuthToken = async function () {
    const user = this
    const payload = {
        userId: user.Id,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

workerSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username:username })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = password == user.password
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}


const Worker = mongoose.model('Worker', workerSchema)
module.exports = Worker