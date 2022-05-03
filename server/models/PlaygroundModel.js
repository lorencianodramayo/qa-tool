const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const PlaygroundSchema = new Schema({
    partnerId: String,
    conceptId: String,
    templates: Array,
    baseUrl: String,
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model("PlaygroundModel", PlaygroundSchema);
