
const mongoose = require("mongoose");
const counselorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    qualifications: {
        type: [String], 
        required: true
    },
    specialization: {
        type: [String], 
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    availability: [{
        day: {
            type: String,
            required: true
        },
        time_slots: [{
            time: {
                type: String,
                required: true
            },
            available: {
                type: String,
                enum: ["yes", "no"],
                default: "yes"
            }
        }]
    }],
    ratings: {
        type: Number,
        required: true
    }
    
},{collection:"Counsellors"})

mongoose.model("Counsellors",counselorSchema)