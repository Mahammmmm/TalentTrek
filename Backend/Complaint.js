const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
      name: String,
      email: {type: String, unique:true},
      complaint: String,
},
{
collection:"Complaints"}
)

mongoose.model("Complaints",complaintSchema)