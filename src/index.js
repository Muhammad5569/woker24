const express = require('express')
const mongoose = require('mongoose')
const Client = require('./routes/Client')
const Worker = require('./routes/Worker')
const place = require('./routes/Places')

const app = express()

const dbURL = 'mongodb://127.0.0.1:27017';

mongoose.connect(dbURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const port = process.env.PORT || 5000

app.use(express.json())

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use('/api/users/clients', Client)
app.use('/api/users/workers', Worker)

app.use('/api/places', place)

app.post('/user',(req,res)=>{
    console.log(req.body);
    res.send('Testing!')
})

app.listen(port, ()=> console.log('server running on port: ', port))