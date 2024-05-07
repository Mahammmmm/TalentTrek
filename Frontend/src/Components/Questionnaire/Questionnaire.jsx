import React , {useState,useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import "./Questionnaire.css";
import Footer from "../Footer/Footer";
import { user, peronality_predict_image, questionnair_image } from "../../assets/index-assets";

const Questionnaire = () => {

  const [userData, setUserData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/userData",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token:window.localStorage.getItem("token"),
      }),
    })
    .then((res)=>res.json())
    .then((data=>{
      console.log(data,"userData");
      setUserData(data.data);
    }));
  },[]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [questionnaireResults, setQuestionnaireResults] = useState(Array.from({ length: 72 }, () => 0)); // Initialize results array with 72 zeros

  const handleOptionChange = (e, questionIndex) => {
    const isChecked = e.target.checked;
    const newValue = isChecked ? 1 : 0;

    const updatedResults = [...questionnaireResults];
    updatedResults[questionIndex] = newValue;
    setQuestionnaireResults(updatedResults);
    
  };
  

  const handleNext = () => {
    console.log(questionnaireResults)
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // Submit results to the backend
      fetch("http://localhost:3002/updateQuestionnaireResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData._id,
          questionnaireResults: questionnaireResults,
        }),
      }).then(response => {
        if (response.ok) {
          // Redirect to results page or do something else
          window.location.href = "./QstRslt";
        } else {
          console.error("Failed to save questionnaire results");
        }
      });
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
  };

  const questions = [
    ["Build a kitchen Cabinet", "Study ways to reduce water pollution", "Write books or plays", "Teach children how to read", "Manage a retail store", "Load computer software into a large computer network"],
    ["Repair household appliances", "Develop a new medical treatment or procedure", "Play a musical instrument", "Work with mentally disabled children", "Sell telephone and other communication equipment", "Transfer funds between banks using a computer"],
    ["Grow fish in a special tank", "Diagnose and treat sick animals", "Perform comedy acts  in front of an audience", "Teach a primary school class", "Operate a beauty salon or barber shop", "Use a word processor to edit and format documents"],
    ["Build a brick walkway", "Conduct chemical experiments", "Act in a movie", "Supervise the activities of children at a camp", "Run a toy store", "Keep shipping and receiving records"],
    ["Drive a truck to deliver packages to offices and homes", "Investigate crimes", "Dance in a Stage show", "Help people with family-related problems", "Manage the operations of a hotel", "Type labels for envelopes and packages"],
    ["Paint houses", "Study the movement of planets", "Draw pictures", "Help elderly people with their daily activities", "Sell houses", "Count items using a hand-held computer"],
    ["Work on an offshore oil platform", "Examine blood samples using a microscope", "Lead a singing group", "Teach children how to play sports", "Sell refreshments at a movie theater", "Develop an office filing system"],
    ["Provide lawn maintenance services", "Investigate the cause of a fire", "Act in a play", "Teach sign language to people with hearing disabilities", "Start your own business", "Record rent payments"],
    ["Fix a broken tap", "Develop psychological profiles of criminals", "Write scripts for movies or television shows", "Help people who have problems with drugs or alcohol", "Market a new line of clothing", "Enter information into a database"],
    ["Do cleaning or maintenance work", "Develop a way to better predict the weather", "Direct a movie", "Teach disabled people work and living skills", "Sell products at a department superstore", "Keep inventory records"],
    ["Set up and operate machines to make products", "Do research on plants or animals", "Sing in a band", "Take care of children at a day-care center", "Sell automobiles", "Maintain employee records"],
    ["Put out forest fires", "Do laboratory tests to identify diseases", "Design artwork for magazines", "Teach students of 9th-12th grade", "Sell computer equipment in a store", "Handle customers’ bank transactions"]
  ];
  

  return (
    <div>

        <nav className='navbar2'>
              <div>
                  <a href='#' className='logo2'>
                      Talent<span className='brown2'>Trek</span>
                  </a>

              </div>
              <div>
              <div class="image-and-text-container2">
                <p className='welcome_uni'>{userData.name}{' '} </p>
                {userData.image ? (
                  <Link to="/userprofile"><img src={userData.image} alt='UserImage' className='UserImage_uni'></img></Link>
                ) : (
                  <Link to="/userprofile"><img src={user} alt='UserIcon' className='UserImage_uni'></img></Link>
                )}
              {/*} */}
              </div>
            </div>
                

              
        </nav>




      <section className='Qst_Sec1'>
        <div className='Qst_Sec1_Left'>
            <h4 className='Qst_quote'>Harmony in Career Discovery</h4>
            <p className='Qst_quote2'>Discover the true essence of your being <br /> Only then can you embark on the journey of career discovery, <br />where your authentic self finds its purpose and flourishes</p>
        </div>
        <div className='Qst_Sec1_Right'>
            <img src={peronality_predict_image} alt="Image 2" className='Qst_IMG'/>
        </div>
      </section>




      


    <section>
      <div className='Qst-FourthContainer'>
        <div className='Qst-ThirdContainer'> 
              <p className='Qst-Text2'>Want To Know Your Personality?</p>
              <p className='Qst-Text3'>Get to know it in 10 minutes</p>
        </div>

        <div className='Qst-QuestionContainer'>
          <Formik
            initialValues={{}}
            onSubmit={handleNext}
          >
            <Form className='Qst-form'>
              <br />
                <h6 style={{fontWeight:'bold',marginLeft:'3%'}}>   Shape Your Destiny by Selecting Your Preferences:</h6><br />
          
                {/* Render questions dynamically */}
                {questions[currentQuestionIndex].map((question, index) => (
                  <div key={index}>
                    <div >
                      <label style={{color:'#0f5c61'}}>
                      
                        <Field
                          type="checkbox"
                          name={`question${index + 1}`}
                          value={question}
                          onChange={(e) => handleOptionChange(e, currentQuestionIndex * 6 + index)} // Calculate question index dynamically
                          checked={questionnaireResults[currentQuestionIndex * 6 + index] === 1}
                          />
                        {question}
                      </label>
                    </div>
                  </div>
                ))}
                {/* Add "None" option */}
                <div>
                  <label style={{color:'#0f5c61'}}>
                    <Field
                      type="checkbox"
                      name={`None`}
                      value="None"
                      onChange={() => {
                        const updatedResults = [...questionnaireResults];
                        for (let i = currentQuestionIndex * 6; i < (currentQuestionIndex + 1) * 6; i++) {
                          updatedResults[i] = 0;
                        }
                        setQuestionnaireResults(updatedResults);
                      }}
                      checked={questionnaireResults.slice(currentQuestionIndex * 6, (currentQuestionIndex + 1) * 6).every(result => result === 0)}
                    />
                    None
                  </label>
                </div>

                {/* Add "Previous" and "Next" buttons */}
                <div className="Qst_ButtonContainer">
                  {currentQuestionIndex > 0 && (
                    <button type="button" onClick={handlePrevious} className='Qst_Buttonn'>Previous</button>
                  )}
                  <button type="submit" className='Qst_Buttonn'>Next</button>
                </div>
            </Form>
          </Formik>
        </div>
      </div>

      </section>
      <Footer/>
    </div>
   
  )
}

export default Questionnaire;