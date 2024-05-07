

const mongoose = require("mongoose");
const userDetailsSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique:true},
    password: String,
    cPass: String,
    age: String,
    dateOfBirth: String,
    contact: String,
    city: String,
    Qualification: String,
    image: String,
    education: [
        {
            type: {
                type: String,
                enum: ["O_Levels", "A_Levels", "Matric","Intermediate"],
            },
            major: String,
            subjects: [String],
            totalMarks: String,
            obtainedMarks: String,
            educationBoard: String,
        },
    ],
    disabilities: [
        {
          type: String, 
        },
    ],
    questionnaireResults: {
        type: [Number],
        default: [],
    },
    personality: [
        {
            type: String,
            enum: ["Conventional", "Realistic", "Artistic", "Investigative","Social","Enterprising"], // Assuming personality type can be one of these values
        },
    ],

},
{collection:"User"}
)

mongoose.model("User",userDetailsSchema)