const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
      name: String,
      email: {type: String, unique:true},
      message: String,
},
{
collection:"Feedback"}
)

mongoose.model("Feedback",feedbackSchema)