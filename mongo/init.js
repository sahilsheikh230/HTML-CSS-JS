const mongoose = require("mongoose");

// Define schema directly using mongoose.Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

// Create model from schema
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
