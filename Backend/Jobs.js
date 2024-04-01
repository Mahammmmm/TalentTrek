const mongoose = require("mongoose");
const jobsSchema = new mongoose.Schema({
    Job_Title: String,
    company_name: String,
    Location: String,
    Company_link: String,
    Hiring: String,
    Date: String
},
{
collection:"Jobs"}
)

mongoose.model("Jobs",jobsSchema)
