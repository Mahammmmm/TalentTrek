import React from 'react';
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./EducationForm.css"
import {UserIcon,careeer1,matric_inter,matric_inter2} from "../../assets/index-assets"
import Select from 'react-select';
import Footer from "../Footer/Footer";
import axios from 'axios';


const matric_options = [
    { value: 'biology', label: 'Biology' },
    { value: 'computerScience', label: 'Computer Science' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'english', label: 'English' },
    { value: 'urdu', label: 'Urdu' },
    { value: 'islamiyat', label: 'Islamiyat' },
    { value: 'pakstudies', label: 'Pakstudies' },
    { value: 'ethics', label: 'Ethics' },
  ];

const intermediate_option = [
    { value: 'biology', label: 'Biology' },
    { value: 'computerScience', label: 'Computer Science' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'english', label: 'English' },
    { value: 'urdu', label: 'Urdu' },
    { value: 'islamiyat', label: 'Islamiyat' },
    { value: 'pakstudies', label: 'Pakstudies' },
    { value: 'ethics', label: 'Ethics' },
    { value: 'statistics', label: 'Statistics' },
    { value: 'geography', label: 'Geography' },
    { value: 'englishLiterature', label: 'English Literature' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'advanceUrdu', label: 'Advance Urdu' },
    { value: 'french', label: 'French' },
    { value: 'persian', label: 'Persian' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'civics', label: 'Civics' },
    { value: 'fineArts', label: 'Fine Arts' },
    { value: 'education', label: 'Education' },
    { value: 'economics', label: 'Economics' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'businessMath', label: 'Business Math' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'banking', label: 'Banking' },
  ];

const Questionnaire = () => {
  
    const [matricselectedOptions, setMatricSelectedOptions] = useState([]);
    const [intermediateselectedOptions, setIntermediateSelectedOptions] = useState([]);
    

    const [matricData, setMatricData] = useState({
        major: '',
        totalMarks: '',
        obtainedMarks: '',
        educationBoard: ''
      });
    
      const [intermediateData, setIntermediateData] = useState({
        major: '',
        totalMarks: '',
        obtainedMarks: '',
        educationBoard: ''
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const matricDataToSubmit = {
          type: 'Matric',
          major: matricData.major,
          subjects: matricselectedOptions.map(option => option.value),
          totalMarks: matricData.totalMarks,
          obtainedMarks: matricData.obtainedMarks,
          educationBoard: matricData.educationBoard,
        };
    
        const intermediateDataToSubmit = {
          type: 'Intermediate',
          major: intermediateData.major,
          subjects: intermediateselectedOptions.map(option => option.value),
          totalMarks: intermediateData.totalMarks,
          obtainedMarks: intermediateData.obtainedMarks,
          educationBoard: intermediateData.educationBoard,
        };
    
        const educationData = [matricDataToSubmit, intermediateDataToSubmit];
    
        try {
          const response = await axios.post("http://localhost:3002/updateEducation", {
            id: userData._id,
            education: educationData,
          });
    
          if (response.data.status === "ok") {
            alert("Form Submitted successfully!");
            // Redirect or perform any other action upon successful submission
          } else {
            alert("Failed to submit form");
          }
        } catch (error) {
          console.error("Error submitting education data:", error);
        }
      };



    


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


  

    
  return (
    <div>

        <nav className='navEF'>
            <div>
                <a href='#' className='logo'>
                    Talent<span className='brown'>Trek</span>
                </a>
            </div>
            <div>
                <ul>
                
                    <li>
                        <div class="image-and-text-container">
                            <Link to="/userprofile"><img src={UserIcon} alt='UserIcon' className='UserImage'></img></Link>
                            <p className='welcome'>Welcome <span style={{color:'#BB7C1E'}}>{userData.name}</span> </p>
                        </div>
                    </li>
                </ul>
            </div>

        
        </nav>

      <section className='EduForm_Sec1'>
        <div className='EduForm_Sec1_Left'>
            <h4 className='EFquote'>Harmony in Career Discovery</h4>
        </div>
        <div className='EduForm_Sec1_Right'>
            <img src={careeer1} alt="Image 2" className='EFIMG'/>
        </div>
      </section>
        

        

        <div className='Edu-ThirdContainer'> 
            <p className='Edu-Text2'>Provide us your educational details!</p>
        </div>





         {/* Matric Section */}
      <div className="Edu-blur-container1">
        <div className="Edu-upper-section1">
          <h2 className='Edu-us1'>MATRIC</h2>
        </div>
        <div className="Edu-lower-section1">
          <div className="form-container1">
            <form className='edu-form'>

              <label htmlFor="matricMajor">Major:</label>
              <select
                id="matricMajor"
                name="matricMajor"
                value={matricData.major}
                onChange={(e) => setMatricData({ ...matricData, major: e.target.value })}
              >
                <option value="">Select Major</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
              </select>

              <label>Select Subjects:</label>
              <Select
                className='Select'
                isMulti
                options={matric_options}
                value={matricselectedOptions}
                onChange={(selected) => setMatricSelectedOptions(selected)}
              />

              <label htmlFor="matricTotalMarks">Total Marks:</label>
              <select
                id="matricTotalMarks"
                name="matricTotalMarks"
                value={matricData.totalMarks}
                onChange={(e) => setMatricData({ ...matricData, totalMarks: e.target.value })}
              >
                 <option value="">Select Total Marks</option>
                <option value="1100">1100</option>
                <option value="1050">1050</option>
              </select>

              <label htmlFor="matricObtainedMarks">Obtained Marks:</label>
              <input
                type="text"
                id="matricObtainedMarks"
                name="matricObtainedMarks"
                className='matric-input'
                value={matricData.obtainedMarks}
                onChange={(e) => setMatricData({ ...matricData, obtainedMarks: e.target.value })}
              />

              <label htmlFor="matricEducationBoard">Board Name:</label>
              <input
                type="text"
                id="matricEducationBoard"
                name="matricEducationBoard"
                className='matric-input'
                value={matricData.educationBoard}
                onChange={(e) => setMatricData({ ...matricData, educationBoard: e.target.value })}
              />
            </form>
          </div>
          <div className="image-container1">
            <img src={matric_inter} alt="Image Description" className='matric' />
          </div>
        </div>
      </div>



        {/* Intermediate Section */}
        <div className="Edu-blur-container2">
            <div className="Edu-upper-section2">
                <h2 className='Edu-us2'>INTERMEDIATE</h2>
            </div>
            <div className="Edu-lower-section2">
                <div class="image-container222">
                    <img src={matric_inter2} alt="Image Description" className='matric2'/>
                </div>
                <div class="form-container2">
                    <form className='edu-form'>
                            <label for="intermediateMajor">Major:</label>
                            <select 
                            id="intermediateMajor"
                            name="intermediateMajor"
                            value={intermediateData.major}
                            onChange={(e) => setIntermediateData({ ...intermediateData, major: e.target.value })}
                          >
                                <option value="">Select Major</option>
                                <option value="Pre-Engineering">Pre-Engineering</option>
                                <option value="Pre-Medical">Pre-Medical</option>
                                <option value="FA">FA</option>
                                <option value="ICS">ICS</option>
                                <option value="ICOM">ICOM</option>
                            </select>

                            <label >Select Subjects:</label>
                            <Select
                                className='Select'
                                isMulti
                                options={intermediate_option}
                                value={intermediateselectedOptions}
                                onChange={(selected) => setIntermediateSelectedOptions(selected)}
              
                            />

                            <label for="intermediateTotalMarks">Total Marks:</label>
                            <select 
                             id="intermediateTotalMarks"
                             name="intermediateTotalMarks"
                             value={intermediateData.totalMarks}
                             onChange={(e) => setIntermediateData({ ...intermediateData, totalMarks: e.target.value })}
                           >
                                <option value="">Select Total Marks</option>
                                <option value="1100">1100</option>
                                <option value="1050">1050</option>
                            </select>

                            <label for="intermediateObtainedMarks">Obtained Marks:</label>
                            <input 
                              type="text"
                              id="intermediateObtainedMarks"
                              name="intermediateObtainedMarks"
                              className='matric-input'
                              value={intermediateData.obtainedMarks}
                              onChange={(e) => setIntermediateData({ ...intermediateData, obtainedMarks: e.target.value })}
                            />

                            <label for="intermediateEducationBoard">Board Name:</label>
                            <input 
                             type="text"
                             id="intermediateEducationBoard"
                             name="intermediateEducationBoard"
                             className='matric-input'
                             value={intermediateData.educationBoard}
                             onChange={(e) => setIntermediateData({ ...intermediateData, educationBoard: e.target.value })}
                           />
    
                    </form>
                </div>
                
            </div>
            
        </div>

        <Link to="/q1"><button type="button" className='eduForm-Button' onClick={handleSubmit}>Submit</button></Link>

        <Footer/>
        
        
        
    </div>   
  )
}

export default Questionnaire