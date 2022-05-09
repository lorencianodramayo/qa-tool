const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    conceptId: String,
    template: Object,
    baseUrl: String,
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model("TemplateModel", TemplateSchema);
