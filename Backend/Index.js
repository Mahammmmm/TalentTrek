const express = require('express');
const multer = require("multer");
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));
var nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing



const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";




//mongodb connection
const mongoUrl = "mongodb+srv://mahammasood2001:MPZoHzPLMS84Pu9e@cluster0.51ggakp.mongodb.net/TalentTrek?retryWrites=true&w=majority"
mongoose.connect(mongoUrl, {
    useNewUrlParser:true,
})
.then(()=>{
    console.log("DB Connected");
}).catch((e)=>console.log(e));



//schema
require("./userDetails")
require("./Feedback")
require("./Jobs")
require("./Universities")
require("./Resume")
require("./Questions")

const User = mongoose.model("User");
const Feedback = mongoose.model("Feedback");
const Jobs = mongoose.model("Jobs");
const Universities = mongoose.model("Universities");
const Resume = mongoose.model("Resume");
const Questions = mongoose.model("Chatboard");
//API Calls



//signup api call
app.post("/register", async(req,res)=>{
    const {name,email,password,cPass,age,dateOfBirth,contact,city}=req.body;
  

    try{
        const oldUser= await User.findOne({email});

        if(oldUser){
            return res.send({error:"User exists"});
        }

        
        const user=await User.create({
            name,
            email,
            password,
            cPass,
            age,
            dateOfBirth,
            contact,
            city,
        });
        if (password === user.password) {
          const token = jwt.sign({email: user.email}, JWT_SECRET , {expiresIn:"24h"});
          //console.log(token);
          // Send the token as part of the response
          return res.json({ status: "ok", data: token });
      }
       // res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
});


//feedback api call
app.post("/feedback",async(req,res)=>{
    const {name,email,message}=req.body;
    
    try{
        
        await Feedback.create({
            name,
            email,
            message
        });
        res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
});




//login api call
app.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not Found" });
    }
    // Compare the provided password with the stored password in the database
    if (password === user.password) {
        const token = jwt.sign({email: user.email}, JWT_SECRET , {expiresIn:"24h"});
        //console.log(token);
        // Send the token as part of the response
        return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Invalid Password" });
});


//userData api call
app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user == "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }
  
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) { }
  });




//update user data api call
app.post("/updateUser", async(req,res) => {
     
    const {id , name ,age,  password, dateOfBirth , contact , city} = req.body;
    try{
        await User.updateOne({_id: id},
            {
                $set:{
                        name: name,
                        password:password,
                        age: age,
                        dateOfBirth: dateOfBirth,
                        contact: contact,
                        city: city
                }
            })
            return res.json({status: "ok", data:"updated"});

    }catch(error){
        return res.json({status: "error", data:error})
    }
});


//forgot password api call
app.post("/forgot-password",async(req,res)=>{
    const{email}=req.body;
    try{
        const oldUser = await User.findOne({email});
        if(!oldUser){
            return res.json({status:"User Does Not Exist!!!"});
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email: oldUser.email , id: oldUser._id}, secret,{expiresIn:'5m'});
        const link=`http://localhost:3002/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'talenttrek58@gmail.com',
              pass: 'niilqwrybyqplbyr',
            }
          });
          
          var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: link,
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        console.log(link);
    }catch(error){}
});

//reset-password api
app.get("/reset-password/:id/:token",async(req,res)=>{
    const {id, token} = req.params;
    console.log(req.params); 
    const oldUser = await User.findOne({_id: id});
    if(!oldUser){
        return res.json({status:"User Does Not Exist!!!"});
    }  
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token,secret);
       // res.send("Verified");
       res.render("index", {email:verify.email, status:" Not Verified"});
    }catch(error){
        console.log(error);
        res.send("Not Verified")
    }
});


app.post("/reset-password/:id/:token",async(req,res)=>{
    const {id, token} = req.params;
    const {password} = req.body;

    const oldUser = await User.findOne({_id: id});
    if(!oldUser){
        return res.json({status:"User Does Not Exist!!!"});
    }  
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token,secret);
        //const encryptedPassword = await bcrypt.hash(password,10);
        const newPass = password;
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set:{
                    password:newPass,
                }
            }
        );
       //res.json({status:"Password Updated"});
       res.render("index", {email:verify.email, status:"verified"});
    }catch(error){
        console.log(error);
        res.json({status:"Something Wrong"});
    }
});


 //view jobs api call
app.get('/getJobs', (req,res) => {
    Jobs.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.json(err))
});



//view universities api call
app.get('/getUniversities', (req,res) => {
    Universities.find()
    .then(universities => res.json(universities))
    .catch(err => res.json(err))
});



// Update user education data
app.post("/updateEducation", async (req, res) => {
    const { id, education } = req.body;

    try {
        await User.updateOne(
            { _id: id },
            {
                $set: {
                    education: education,
                },
            }
        );

        return res.json({ status: "ok", data: "Education data updated" });
    } catch (error) {
        return res.json({ status: "error", data: error });
    }
});

// Update user questionnaire results
app.post("/updateQuestionnaireResults", async (req, res) => {
  const { id, questionnaireResults } = req.body;

  try {
    // Logging the received data
    console.log("Received data:", { id, questionnaireResults });

    await User.updateOne(
      { _id: id },
      {
        $set: {
          questionnaireResults: questionnaireResults,
        },
      }
    );

    return res.json({ status: "ok", data: "Questionnaire results updated" });
  } catch (error) {
    // Logging any errors that occur
    console.error("Error updating questionnaire results:", error);
    return res.json({ status: "error", data: error });
  }
});

// Endpoint for handling image uploads
app.post("/uploadImage", async (req, res) => {
  try {
    const { id,image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image data received." });
    }
    // Save the image data in your MongoDB database
    await User.updateOne(
      { _id: id },
       { 
        $set:{
          image: image 
        },
      }
    );
    res.json({ status: "ok", message: "Image uploaded successfully." });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


// handle personal details storage
app.post('/personal-details', async (req, res) => {
    const personalDetailsData = req.body;
  
    try {
      // Create a new document in the Resume collection with personal details
      const result = await Resume.create({ personalDetails: personalDetailsData });
      res.json({ status: 'ok', data: result });
    } catch (error) {
      console.error('Error storing personal details:', error);
      res.json({ status: 'error', error: 'Failed to store personal details' });
    }
  });

// API to store work experience details
app.post('/work-experience', async (req, res) => {
    try {
      const { email, jobTitle, employer, location, jobDescription, startDate, endDate, currentJob } = req.body;
  
      let resume = await Resume.findOne({ 'personalDetails.email': email });
  
      if (!resume) {
        return res.status(404).json({ status: 'error', message: 'Resume not found.' });
      }
  
      resume.workExperience.push({
        jobTitle,
        employer,
        location,
        jobDescription,
        startDate,
        endDate,
        currentJob,
      });
  
      await resume.save();
  
      res.json({ status: 'ok', message: 'Work experience data saved successfully.' });
    } catch (error) {
      console.error('Error storing work experience data:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
  });



 // API to store education details
app.post('/education', async (req, res) => {
    try {
      const { email, schoolName, schoolLocation, degree, fieldOfStudy, graduationDate } = req.body;
  
      let resume = await Resume.findOne({ 'personalDetails.email': email });
  
      if (!resume) {
        return res.status(404).json({ status: 'error', message: 'Resume not found.' });
      }
  
      resume.education.push({
        schoolName,
        schoolLocation,
        degree,
        fieldOfStudy,
        graduationDate,
      });
  
      await resume.save();
  
      res.json({ status: 'ok', message: 'Education details saved successfully.' });
    } catch (error) {
      console.error('Error storing education details:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
});



// API to store skills
app.post('/skills', async (req, res) => {
  try {
    const { email, skills } = req.body;

    let resume = await Resume.findOne({ 'personalDetails.email': email });

    if (!resume) {
      return res.status(404).json({ status: 'error', message: 'Resume not found.' });
    }

    // If skills are provided, update the skills field
    if (skills !== null) {
      resume.skills = skills;
    } else {
      // If disableSecondSet is selected, set skills to an empty array
      resume.skills = [];
    }

    await resume.save();

    res.json({ status: 'ok', message: 'Skills saved successfully.' });
  } catch (error) {
    console.error('Error storing skills:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});




// API to store professional summary
app.post('/professional-summary', async (req, res) => {
    try {
      const { email, professionalSummary } = req.body;
  
      let resume = await Resume.findOne({ 'personalDetails.email': email });
  
      if (!resume) {
        return res.status(404).json({ status: 'error', message: 'Resume not found.' });
      }
  
      resume.professionalSummary = professionalSummary;
  
      await resume.save();
  
      res.json({ status: 'ok', message: 'Professional summary saved successfully.' });
    } catch (error) {
      console.error('Error storing professional summary:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
  });
  


  // API to fetch resume data based on email
app.get('/getResume', async (req, res) => {
  const { email } = req.query;

  try {
    const resume = await Resume.findOne({ 'personalDetails.email': email });

    if (!resume) {
      return res.status(404).json({ status: 'error', message: 'Resume not found.' });
    }

    res.json({
      status: 'ok',
      data: {
        personalDetails: resume.personalDetails,
        workExperienceData: resume.workExperience,
        educationData: resume.education,
        SkillsData: resume.skills,
        SummaryData: {
          professionalSummary: resume.professionalSummary,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching resume data:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});



// Add this endpoint to handle question posting
app.post('/postQuestion', async (req, res) => {
  const { token, question } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);

    const newQuestion = await Questions.create({
      user: {
        _id: user._id,
        email: user.email, // Include email in the user field
      },
      email: user.email, // Include email in the question itself
      question,
    });

    res.json({ status: 'ok', data: newQuestion });
  } catch (error) {
    console.error('Error posting question:', error);
    res.json({ status: 'error', error: 'Failed to post question' });
  }
});


// Add this endpoint to handle reply posting
app.post('/postReply', async (req, res) => {
  const { token, questionId, reply } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);

    const updatedQuestion = await Questions.findByIdAndUpdate(
      questionId,
      {
        $push: {
          replies: {
            user: user._id,
            email: user.email, // Include email in replies
            reply,
          },
        },
      },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ status: 'error', error: 'Question not found' });
    }
    res.json({ status: 'ok', data: updatedQuestion });
  } catch (error) {
    console.error('Error posting reply:', error);
    res.json({ status: 'error', error: 'Failed to post reply' });
  }
});

// Like a Question
app.post('/likeQuestion', async (req, res) => {
  const { token, questionId } = req.body;

  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const updatedQuestion = await Questions.findByIdAndUpdate(
      questionId,
      {
        $inc: { likes: 1 }, // Increment likes by 1
        $addToSet: { likedBy: email }, // Add user's email to likedBy array
      },
      { new: true }
    );

    res.json({ status: 'ok', data: updatedQuestion });
  } catch (error) {
    console.error('Error liking question:', error);
    res.json({ status: 'error', error: 'Failed to like question' });
  }
});

// Dislike a Question
app.post('/dislikeQuestion', async (req, res) => {
  const { token, questionId } = req.body;

  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const updatedQuestion = await Questions.findByIdAndUpdate(
      questionId,
      {
        $inc: { dislikes: 1 }, // Increment dislikes by 1
        $addToSet: { dislikedBy: email }, // Add user's email to dislikedBy array
      },
      { new: true }
    );

    res.json({ status: 'ok', data: updatedQuestion });
  } catch (error) {
    console.error('Error disliking question:', error);
    res.json({ status: 'error', error: 'Failed to dislike question' });
  }
});

// Like a Reply
app.post('/likeReply', async (req, res) => {
  const { token, questionId, replyId } = req.body;

  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const updatedQuestion = await Questions.findOneAndUpdate(
      { _id: questionId, 'replies._id': replyId },
      {
        $inc: { 'replies.$.likes': 1 }, // Increment likes of the specific reply by 1
        $addToSet: { 'replies.$.likedBy': email }, // Add user's email to likedBy array of the reply
      },
      { new: true }
    );

    res.json({ status: 'ok', data: updatedQuestion });
  } catch (error) {
    console.error('Error liking reply:', error);
    res.json({ status: 'error', error: 'Failed to like reply' });
  }
});

// Dislike a Reply
app.post('/dislikeReply', async (req, res) => {
  const { token, questionId, replyId } = req.body;

  try {
    const { email } = jwt.verify(token, JWT_SECRET);

    const updatedQuestion = await Questions.findOneAndUpdate(
      { _id: questionId, 'replies._id': replyId },
      {
        $inc: { 'replies.$.dislikes': 1 }, // Increment dislikes of the specific reply by 1
        $addToSet: { 'replies.$.dislikedBy': email }, // Add user's email to dislikedBy array of the reply
      },
      { new: true }
    );

    res.json({ status: 'ok', data: updatedQuestion });
  } catch (error) {
    console.error('Error disliking reply:', error);
    res.json({ status: 'error', error: 'Failed to dislike reply' });
  }
});


// Define the route to get questions
app.get('/getQuestions', async (req, res) => {
  try {
    // Retrieve all questions from the database
    const questions = await Questions.find().populate('user', 'email'); // Assuming 'user' is the reference to the User model in your Chatboard schema

    // Send the questions as JSON response
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






// API endpoint to fetch feedback
app.get('/getFeedback', async (req, res) => {
  try {
    const feedbackData = await Feedback.find();
    res.json(feedbackData);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ status: 'error', error: 'Internal server error.' });
  }
});


//server
app.listen(3002,()=>{
    console.log("Server started");
});


