const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  personalDetails: {
    fullName: String,
    profession: String,
    city: String,
    country: String,
    phoneNumber: String,
    email: String,
  },
  workExperience: [
    {
      jobTitle: String,
      employer: String,
      location: String,
      jobDescription: String,
      startDate: Date,
      endDate: Date,
      currentJob: Boolean,
    },
  ],
  education: [
    {
      schoolName: String,
      schoolLocation: String,
      degree: String,
      fieldOfStudy: String,
      graduationDate: Date,
    },
  ],
  professionalSummary: {
    type: String,
    default: '', // Add a default value
  },
  skills: [String],
  
},
{collection:"Resume"}
)

mongoose.model("Resume", resumeSchema);
