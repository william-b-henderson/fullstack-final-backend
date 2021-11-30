const mongoose = require('mongoose');
const Schema = mongoose.Schema

const occasionSchema = new Schema({
    id: {
        type: String,
        required: true,
    }, 
    name: {
        type: String,
        required: true,
    }, 
    occasion_type: {
        type: String,
        required: true,
    }, 
    image_url: {
        type: String,
        required: true,
    }, 
    url: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    }, 
    price: {
        type: String,
        required: true,
    }, 
    phone: {
        type: String,
        required: true,
    }, 
    location: {
        type: String,
        required: true,
    }, 
}, {collection: 'occasionsCollections'})

module.exports = mongoose.model('Occasion', occasionSchema)
