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


  const handleNext = (values) => {
    console.log("values:",values);

    const questionnaireResults = [
      values.question1 === "Like" ? 1 : 0,
      values.question2 === "Like" ? 1 : 0,
      values.question3 === "Like" ? 1 : 0,
      values.question4 === "Like" ? 1 : 0,
      values.question5 === "Like" ? 1 : 0,
      values.question6 === "Like" ? 1 : 0,
      values.question7 === "Like" ? 1 : 0,
      values.question8 === "Like" ? 1 : 0,
      values.question9 === "Like" ? 1 : 0,
      values.question10 === "Like" ? 1 : 0,
      values.question11 === "Like" ? 1 : 0,
      values.question12 === "Like" ? 1 : 0,
      values.question13 === "Like" ? 1 : 0,
      values.question14 === "Like" ? 1 : 0,
      values.question15 === "Like" ? 1 : 0,
      values.question16 === "Like" ? 1 : 0,
      values.question17 === "Like" ? 1 : 0,
      values.question18 === "Like" ? 1 : 0,
      values.question19 === "Like" ? 1 : 0,
      values.question20 === "Like" ? 1 : 0,
      values.question21 === "Like" ? 1 : 0,
      values.question22 === "Like" ? 1 : 0,
      values.question23 === "Like" ? 1 : 0,
      values.question24 === "Like" ? 1 : 0,
      values.question25 === "Like" ? 1 : 0,
      values.question26 === "Like" ? 1 : 0,
      values.question27 === "Like" ? 1 : 0,
      values.question28 === "Like" ? 1 : 0,
      values.question29 === "Like" ? 1 : 0,
      values.question30 === "Like" ? 1 : 0,
      values.question31 === "Like" ? 1 : 0,
      values.question32 === "Like" ? 1 : 0,
      values.question33 === "Like" ? 1 : 0,
      values.question34 === "Like" ? 1 : 0,
      values.question35 === "Like" ? 1 : 0,
      values.question36 === "Like" ? 1 : 0,
      values.question37 === "Like" ? 1 : 0,
      values.question38 === "Like" ? 1 : 0,
      values.question39 === "Like" ? 1 : 0,
      values.question40 === "Like" ? 1 : 0,
      values.question41 === "Like" ? 1 : 0,
      values.question42 === "Like" ? 1 : 0,
      values.question43 === "Like" ? 1 : 0,
      values.question44 === "Like" ? 1 : 0,
      values.question45 === "Like" ? 1 : 0,
      values.question46 === "Like" ? 1 : 0,
      values.question47 === "Like" ? 1 : 0,
      values.question48 === "Like" ? 1 : 0,
      values.question49 === "Like" ? 1 : 0,
      values.question50 === "Like" ? 1 : 0,
      values.question51 === "Like" ? 1 : 0,
      values.question52 === "Like" ? 1 : 0,
      values.question53 === "Like" ? 1 : 0,
      values.question54 === "Like" ? 1 : 0,
      values.question55 === "Like" ? 1 : 0,
      values.question56 === "Like" ? 1 : 0,
      values.question57 === "Like" ? 1 : 0,
      values.question58 === "Like" ? 1 : 0,
      values.question59 === "Like" ? 1 : 0,
      values.question60 === "Like" ? 1 : 0,
      values.question61 === "Like" ? 1 : 0,
      values.question62 === "Like" ? 1 : 0,
      values.question63 === "Like" ? 1 : 0,
      values.question64 === "Like" ? 1 : 0,
      values.question65 === "Like" ? 1 : 0,
      values.question66 === "Like" ? 1 : 0,
      values.question67 === "Like" ? 1 : 0,
      values.question68 === "Like" ? 1 : 0,
      values.question69 === "Like" ? 1 : 0,
      values.question70 === "Like" ? 1 : 0,
      values.question71 === "Like" ? 1 : 0,
      values.question72 === "Like" ? 1 : 0,
    
    ];

    fetch("http://localhost:3002/updateQuestionnaireResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userData._id,
        questionnaireResults: questionnaireResults,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Redirect to the next page or handle success/failure as needed
        window.location.href = "./qstrslt";
      })
      .catch((error) => console.error("Error updating questionnaire results:", error));
  };


  //const handleSubmit = (values) => {
    // Do something with the selected options, like sending them to an API or updating state
    //console.log('Selected Options:', values);
 //};

  

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
              <p className='Qst-Text2'>Personality Questionnaire</p>
              <p className='Qst-Text3'>Get to know your personality in 5 minutes</p>
        </div>
        <div className='Qst-QuestionContainer'>
          <Formik
            initialValues={{
              question1: '',
              question2: '',
              question3: '',
              question4: '',
              question5: '',
              question6: '',
              question7: '',
              question8: '',
              question9: '',
              question10: '',
              question11: '',
              question12: '',
              question13: '',
              question14: '',
              question15: '',
              question16: '',
              question17: '',
              question18: '',
              question19: '',
              question20: '',
              question21: '',
              question22: '',
              question23: '',
              question24: '',
              question25: '',
              question26: '',
              question27: '',
              question28: '',
              question29: '',
              question30: '',
              question31: '',
              question32: '',
              question33: '',
              question34: '',
              question35: '',
              question36: '',
              question37: '',
              question38: '',
              question39: '',
              question40: '',
              question41: '',
              question42: '',
              question43: '',
              question44: '',
              question45: '',
              question46: '',
              question47: '',
              question48: '',
              question49: '',
              question50: '',
              question51: '',
              question52: '',
              question53: '',
              question54: '',
              question55: '',
              question56: '',
              question57: '',
              question58: '',
              question59: '',
              question60: '',
              question61: '',
              question62: '',
              question63: '',
              question64: '',
              question65: '',
              question66: '',
              question67: '',
              question68: '',
              question69: '',
              question70: '',
              question71: '',
              question72: '',
              
            }}
            onSubmit={handleNext}
          >
            <Form className='Qst-form'>
              {/* Question 1 */}
              <br />
              <p className='Qst-question'>1. Build a kitchen Cabinet</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question1"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question1"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 2 */}
              <p className='Qst-question'>2. Study ways to reduce water pollution</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question2"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question2"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 3 */}
              <p className='Qst-question'>3. Write books or plays</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question3"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question3"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 4 */}
              <p className='Qst-question'>4. Teach children how to read</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question4"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question4"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 5 */}
              <p className='Qst-question'>5. Manage a retail store</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question5"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question5"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 6 */}
              <p className='Qst-question'>6. Load computer software into a large computer network</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question6"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question6"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 7 */}
              <p className='Qst-question'>7. Repair household appliances</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question7"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question7"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 8 */}
              <p className='Qst-question'>8. Develop a new medical treatment or procedure</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question8"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question8"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 9 */}
              <p className='Qst-question'>9. Play a musical instrument</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question9"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question9"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 10 */}
              <p className='Qst-question'>10. Work with mentally disabled children</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question10"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question10"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 11 */}
              <p className='Qst-question'>11. Sell telephone and other communication equipment</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question11"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question11"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 12 */}
              <p className='Qst-question'>12. Transfer funds between banks using a computer</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question12"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question12"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 13 */}
              <p className='Qst-question'>13. Grow fish in a special tank</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question13"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question13"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

                {/* Question 14 */}
              <p className='Qst-question'>14. Diagnose and treat sick animals</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question14"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question14"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 15 */}
              <p className='Qst-question'>15. Perform comedy acts  in front of an audience</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question15"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question15"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 16 */}
              <p className='Qst-question'>16. Teach a primary school class</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question16"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question16"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 17 */}
              <p className='Qst-question'>17. Operate a beauty salon or barber shop</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question17"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question17"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 18 */}
              <p className='Qst-question'>18. Use a word processor to edit and format documents</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question18"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question18"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 19 */}
              <p className='Qst-question'>19. Build a brick walkway</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question19"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question19"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 20 */}
              <p className='Qst-question'>20. Conduct chemical experiments</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question20"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question20"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 21 */}
              <p className='Qst-question'>21. Act in a movie</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question21"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question21"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 22 */}
              <p className='Qst-question'>22. Supervise the activities of children at a camp</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question22"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question22"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 23 */}
              <p className='Qst-question'>23. Run a toy store</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question23"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question23"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 24 */}
              <p className='Qst-question'>24. Keep shipping and receiving records</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question24"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question24"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 25 */}
              <p className='Qst-question'>25. Drive a truck to deliver packages to offices and homes</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question25"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question25"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 26 */}
              <p className='Qst-question'>26. Investigate crimes</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question26"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question26"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 27 */}
              <p className='Qst-question'>27. Dance in a Stage show</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question27"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question27"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 28 */}
              <p className='Qst-question'>28. Help people with family-related problems</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question28"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question28"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 29 */}
              <p className='Qst-question'>29. Manage the operations of a hotel</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question29"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question29"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>
              {/* Question 30 */}
              <p className='Qst-question'>30. Type labels for envelopes and packages</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question30"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question30"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 31 */}
              <p className='Qst-question'>31. Paint houses </p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question31"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question31"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 32 */}
              <p className='Qst-question'>32. Study the movement of planets</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question32"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question32"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 33 */}
              <p className='Qst-question'>33. Draw pictures</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question33"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question33"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 34 */}
              <p className='Qst-question'>34. Help elderly people with their daily activities</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question34"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question34"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 35 */}
              <p className='Qst-question'>35. Sell houses</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question35"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question35"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 36 */}
              <p className='Qst-question'>36. Count items using a hand-held computer</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question36"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question36"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 37 */}
              <p className='Qst-question'>37. Work on an offshore oil platform</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question37"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question37"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 38 */}
              <p className='Qst-question'>38. Examine blood samples using a microscope</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question38"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question38"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 39 */}
              <p className='Qst-question'>39. Lead a singing group</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question39"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question39"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 40 */}
              <p className='Qst-question'>40. Teach children how to play sports</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question40"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question40"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 41 */}
              <p className='Qst-question'>41. Sell refreshments at a movie theater</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question41"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question41"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 42 */}
              <p className='Qst-question'>42. Develop an office filing system</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question42"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question42"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 43 */}
              <p className='Qst-question'>43. Provide lawn maintenance services</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question43"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question43"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 44 */}
              <p className='Qst-question'>44. Investigate the cause of a fire</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question44"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question44"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 45 */}
              <p className='Qst-question'>45. Act in a play</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question45"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question45"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 46 */}
              <p className='Qst-question'>46. Teach sign language to people with hearing disabilities</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question46"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question46"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 47 */}
              <p className='Qst-question'>47. Start your own business</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question47"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question47"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 48 */}
              <p className='Qst-question'>48. Record rent payments</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question48"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question48"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 49 */}
              <p className='Qst-question'>49. Fix a broken tap</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question49"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question49"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 50 */}
              <p className='Qst-question'>50. Develop psychological profiles of criminals</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question50"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question50"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 51 */}
              <p className='Qst-question'>51. Write scripts for movies or television shows</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question51"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question51"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 52 */}
              <p className='Qst-question'>52. Help people who have problems with drugs or alcohol</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question52"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question52"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 53 */}
              <p className='Qst-question'>53. Market a new line of clothing</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question53"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question53"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 54 */}
              <p className='Qst-question'>54. Enter information into a database</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question54"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question54"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 55 */}
              <p className='Qst-question'>55. Do cleaning or maintenance work</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question55"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question55"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 56 */}
              <p className='Qst-question'>56. Develop a way to better predict the weather</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question56"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question56"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 57 */}
              <p className='Qst-question'>57. Direct a movie</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question57"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question57"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 58 */}
              <p className='Qst-question'>58. Teach disabled people work and living skills</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question58"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question58"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 59 */}
              <p className='Qst-question'>59. Sell products at a department superstore</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question59"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question59"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 60 */}
              <p className='Qst-question'>60. Keep inventory records</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question60"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question60"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 61 */}
              <p className='Qst-question'>61. Set up and operate machines to make products</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question61"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question61"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 62 */}
              <p className='Qst-question'>62. Do research on plants or animals</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question62"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question62"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 63 */}
              <p className='Qst-question'>63. Sing in a band</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question63"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question63"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 64 */}
              <p className='Qst-question'>64. Take care of children at a day-care center</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question64"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question64"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 65 */}
              <p className='Qst-question'>65. Sell automobiles</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question65"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question65"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 66 */}
              <p className='Qst-question'>66. Maintain employee records</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question66"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question66"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 67 */}
              <p className='Qst-question'>67. Put out forest fires</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question67"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question67"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 68 */}
              <p className='Qst-question'>68. Do laboratory tests to identify diseases</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question68"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question68"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 69 */}
              <p className='Qst-question'>69. Design artwork for magazines</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question69"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question69"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 70 */}
              <p className='Qst-question'>70. Teach students of 9th-12th grade</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question70"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question70"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              {/* Question 71 */}
              <p className='Qst-question'>71. Sell computer equipment in a store</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question71"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question71"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>

              
              

              {/* Question 72 */}
              <p className='Qst-question'>72. Handle customers’ bank transactions</p>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                    className='Qst-input'
                    type="radio"
                    name="question72"
                    value="Like"
                    required
                  />Like
                </label>
              </div>
              <div className='Qst-OptionContainer'>
                <label className='Qst-option'>
                  <Field
                  
                    className='Qst-input'
                    type="radio"
                    name="question72"
                    value="Dislike"
                    required
                  />Dislike
                </label>
              </div>
              <br /><br />
              <div>
              <button type="submit" className='Qst_Buttonn' >SUBMIT</button>
              {/* <Link to="/QstRslt"></Link>
               */}
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