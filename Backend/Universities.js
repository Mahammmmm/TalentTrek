const mongoose = require("mongoose");
const universitiesSchema = new mongoose.Schema({
  
    University_Name:String,
    University_City:String,
    University_Address:String,
    University_Contact:String,
    University_Email:String,
    University_URL:String,
},
{
collection:"Universities"}
)

mongoose.model("Universities",universitiesSchema)