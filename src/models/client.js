const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { stringify } = require('querystring')

mongoose.connect('mongodb://127.0.0.1:27017')
    .then(console.log('connected'))

const userSchema = mongoose.Schema({
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
    info:{
        pasportRaqam:{
            type:String,
            trim:true
        },
        adress:{
            type:String,
            trim:true
        },
        phone:{
            type:Number,
            trim:true
        },
        Age:{
            type:Number,
            trim:true
        },
        img:{
            type:String,
            trim:true
        },
    },
    gender:{
        type:String,
        trim:true
    }
})

          // Methods

const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const payload = {
        userId: user.Id,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

userSchema.statics.findByCredentials = async (username, password) => {
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


const User = mongoose.model('User', userSchema)
module.exports = User