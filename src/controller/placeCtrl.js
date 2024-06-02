
const Place = require('../models/places')


exports.getAllPlaces = async(req, res)=>{
    try {
        const places = await Place.find();
        res.json(places)
    } catch (error) {
        res.send(500).json({massege:error.massege})
    }
}

exports.createPlace = async(req,res)=>{
    try {
        const userData = req.body;
        const newPlace = await Place.create(userData);
        res.json(newPlace)   
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            const field = Object.keys(error.keyValue)[0];
            const errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} already taken`;
            res.status(400).send({ message: errorMessage });
          } else {
            // Other errors
            res.status(500).send({ message: error.code});
          }     
    }
}
exports.getPlaceById = async(req, res)=>{
    try {
        const id = await Place.find(id)
        res.json(id)
    } catch (error) {
        res.sendStatus(500).json({massege:error.massege})
    }
}
exports.deletePlaceById = async(req,res)=>{
    try {
        const id = req.body.id;
        await Place.deleteOne({id:id})
            .then((result=>{
                res.json(result)
            }))
        
    } catch (error) {
        res.sendStatus(500).json({massege:error.massege})
    }
}