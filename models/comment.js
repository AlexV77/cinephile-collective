const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bestRating: { type: Number, required: true },
    worstRating: { type: Number, required: true },
    starRating: {type: String, required: true },
})


const Ratings = mongoose.model('Ratings', classSchema);

module.exports = Courses;