const mongoose = require('mongoose');

const schedulesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    enrolled: { type: Date, required: true }
})


const Schedules = mongoose.model('Schedules', scheduylesSchema);

module.exports = Schedules;