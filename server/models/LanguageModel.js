const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    country: String,
    paragraph: String,
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model("LanguageModel", LanguageSchema);
