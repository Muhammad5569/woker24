
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
        const places = await Place.find()
        const boolien = false
        places.forEach(place => {
            if(userData.id == place.id){
                return boolien = true;
            }
        });
        const newPlace = await Place.create(userData);
        res.json(newPlace)   
    } catch (error) {
        res.sendStatus(500).json({massege:error.massege})
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