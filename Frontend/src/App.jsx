import React from 'react'
import { Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/LoginPage/LoginPage.jsx"
import Signup from "./Components/SignUpPage/SignUpPage.jsx"
import Main from "./Components/Header/Header.jsx"
import ForgetPassword from "./Components/ForgotPassword/ForgotPassword.jsx"
import ResumeTemplates from "./Components/ResumeTemplates/ResumeTemplates.jsx"
import ResumeTemplates2 from "./Components/ResumeTemplates/ResumeTemplates2.jsx"

import ResumeForm from "./Components/ResumePrimePersona/ResumeForm_PD.jsx"
import ResumeFormWorkExp from "./Components/ResumePrimePersona/ResumeForm_WE.jsx"
import ResumeFormWorkExp2 from "./Components/ResumePrimePersona/ResumeForm_WE2.jsx"
import ResumeFormEdu from "./Components/ResumePrimePersona/ResumeForm_E.jsx"
import ResumeFormEdu2 from "./Components/ResumePrimePersona/ResumeForm_E2.jsx"
import ResumeFormSkills from "./Components/ResumePrimePersona/ResumeForm_Skills.jsx"
import ResumeFormS from "./Components/ResumePrimePersona/ResumeForm_S.jsx"
import ResumeFormF from "./Components/ResumePrimePersona/ResumeForm_Final.jsx"

import ResumeForm_pinnacle from "./Components/ResumePinnacle/ResumeForm_PD.jsx"
import ResumeFormWorkExp_pinnacle from "./Components/ResumePinnacle/ResumeForm_WE.jsx"
import ResumeFormWorkExp2_pinnacle from "./Components/ResumePinnacle/ResumeForm_WE2.jsx"
import ResumeFormEdu_pinnacle from "./Components/ResumePinnacle/ResumeForm_E.jsx"
import ResumeFormEdu2_pinnacle from "./Components/ResumePinnacle/ResumeForm_E2.jsx"
import ResumeFormSkills_pinnacle from "./Components/ResumePinnacle/ResumeForm_Skills.jsx"
import ResumeFormS_pinnacle from "./Components/ResumePinnacle/ResumeForm_S.jsx"
import ResumeFormF_pinnacle from "./Components/ResumePinnacle/ResumeForm_Final.jsx"

import ResumeForm_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_PD.jsx"
import ResumeFormWorkExp_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_WE.jsx"
import ResumeFormWorkExp2_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_WE2.jsx"
import ResumeFormEdu_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_E.jsx"
import ResumeFormEdu2_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_E2.jsx"
import ResumeFormSkills_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_Skills.jsx"
import ResumeFormS_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_S.jsx"
import ResumeFormF_SummitStyle from "./Components/ResumeSummitStyle/ResumeForm_Final.jsx"

import ResumeForm_Impactful from "./Components/ResumeImpactful/ResumeForm_PD.jsx"
import ResumeFormWorkExp_Impactful from "./Components/ResumeImpactful/ResumeForm_WE.jsx"
import ResumeFormWorkExp2_Impactful from "./Components/ResumeImpactful/ResumeForm_WE2.jsx"
import ResumeFormEdu_Impactful from "./Components/ResumeImpactful/ResumeForm_E.jsx"
import ResumeFormEdu2_Impactful from "./Components/ResumeImpactful/ResumeForm_E2.jsx"
import ResumeFormSkills_Impactful from "./Components/ResumeImpactful/ResumeForm_Skills.jsx"
import ResumeFormS_Impactful from "./Components/ResumeImpactful/ResumeForm_S.jsx"
import ResumeFormF_Impactful from "./Components/ResumeImpactful/ResumeForm_Final.jsx"

import UserProfile from "./Components/UserProfile/UserProfile.jsx"
import Feedback from "./Components/Feedback/Feedback.jsx"
import Chatboard from "./Components/Chatboard/Chatboard.jsx"
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword.jsx"
import CounsellersPage from "./Components/Counselling/CounsellersPage.jsx"
import Questionnaire from "./Components/Questionnaire/Questionnaire.jsx"
import QstRslt from "./Components/Questionnaire/QuestionnaireResults.jsx"
import PredictedStudyArea from "./Components/Questionnaire/PredictedStudyArea.jsx"
import PredictedStudyArea2 from "./Components/Questionnaire/PredictedStudyArea2.jsx"
import PredictedCareers from "./Components/Questionnaire/PredictedCareers.jsx"
import PredictedCareers2 from "./Components/Questionnaire/PredictedCareers2.jsx"
import PredictedInstitutes from "./Components/Questionnaire/PredictedInstitutes.jsx"
import PredictedInstitutes2 from "./Components/Questionnaire/PredictedInstitutes2.jsx"
import ViewInstitutes from "./Components/Institutes/ViewInstitutes.jsx"
import ViewJobs from "./Components/Jobs/ViewJobs.jsx"
import EducationForm from "./Components/EducationForm/EducationForm.jsx"
import Main2 from "./Components/Header/Header2.jsx"
import Trends from "./Components/Trends/Trends.jsx"
import FirstPage from "./Components/Header/FirstScreen.jsx"
import CounselorHome from "./Components/CounselorScreens/HomePage.jsx"
import CounselorLogin from "./Components/CounselorScreens/Login.jsx"
import Schedule from './Components/CounselorScreens/Schedule.jsx'
import Messages from './Components/CounselorScreens/Messages.jsx'
import Profile from './Components/CounselorScreens/Profile.jsx'
import EditProfile from "./Components/CounselorScreens/EditProfile.jsx"
// import BookCounselor from "./Components/Counselling/BookCounselor.jsx"


const App = () => {

const isLoggedIn = window.localStorage.getItem("loggedIn");
const CounselorloggedIn=window.localStorage.getItem("CounselorloggedIn");
  return (
      <Routes>
        {/* <Route path='/' element={<FirstPage/>}/> */}
        {/* <Route path="/" element={isLoggedIn == "true" ?<Main2 /> : <FirstPage/>} />
        <Route path="/" element={CounselorloggedIn == "true" ?<CounselorHome /> : <FirstPage/>} /> */}

        <Route path="/" element={isLoggedIn ? <Main2 /> : CounselorloggedIn ? <CounselorHome /> : <FirstPage />} />
        <Route path="CounselorLogin" element={<CounselorLogin />} />
        <Route path="CounselorHome" element={<CounselorHome />} />
        <Route path="Schedule" element={<Schedule />} />
        <Route path="Messages" element={<Messages />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="EditProfile" element={<EditProfile />} />





        <Route path="main" element={<Main />} />
        <Route path="main2" element={<Main2 />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgetpassword" element={<ForgetPassword />}/>
        <Route path="resumetemplates" element={<ResumeTemplates/>}/>
        <Route path="resumetemplates2" element={<ResumeTemplates2/>}/>
        
        <Route path="resumeform" element={<ResumeForm/>}/>
        <Route path="ResumeFormWorkExp" element={<ResumeFormWorkExp/>}/>
        <Route path="ResumeFormWorkExp2" element={<ResumeFormWorkExp2/>}/>
        <Route path="ResumeFormEdu" element={<ResumeFormEdu/>}/>
        <Route path="ResumeFormEdu2" element={<ResumeFormEdu2/>}/>
        <Route path="ResumeFormSkills" element={<ResumeFormSkills/>}/>
        <Route path="ResumeFormS" element={<ResumeFormS/>}/>
        <Route path="ResumeFormF" element={<ResumeFormF/>}/>

        <Route path="ResumeForm_pinnacle" element={<ResumeForm_pinnacle/>}/>
        <Route path="ResumeFormWorkExp_pinnacle" element={<ResumeFormWorkExp_pinnacle/>}/>
        <Route path="ResumeFormWorkExp2_pinnacle" element={<ResumeFormWorkExp2_pinnacle/>}/>
        <Route path="ResumeFormEdu_pinnacle" element={<ResumeFormEdu_pinnacle/>}/>
        <Route path="ResumeFormEdu2_pinnacle" element={<ResumeFormEdu2_pinnacle/>}/>
        <Route path="ResumeFormSkills_pinnacle" element={<ResumeFormSkills_pinnacle/>}/>
        <Route path="ResumeFormS_pinnacle" element={<ResumeFormS_pinnacle/>}/>
        <Route path="ResumeFormF_pinnacle" element={<ResumeFormF_pinnacle/>}/>

        <Route path="ResumeForm_SummitStyle" element={<ResumeForm_SummitStyle/>}/>
        <Route path="ResumeFormWorkExp_SummitStyle" element={<ResumeFormWorkExp_SummitStyle/>}/>
        <Route path="ResumeFormWorkExp2_SummitStyle" element={<ResumeFormWorkExp2_SummitStyle/>}/>
        <Route path="ResumeFormEdu_SummitStyle" element={<ResumeFormEdu_SummitStyle/>}/>
        <Route path="ResumeFormEdu2_SummitStyle" element={<ResumeFormEdu2_SummitStyle/>}/>
        <Route path="ResumeFormSkills_SummitStyle" element={<ResumeFormSkills_SummitStyle/>}/>
        <Route path="ResumeFormS_SummitStyle" element={<ResumeFormS_SummitStyle/>}/>
        <Route path="ResumeFormF_SummitStyle" element={<ResumeFormF_SummitStyle/>}/>

        <Route path="ResumeForm_Impactful" element={<ResumeForm_Impactful/>}/>
        <Route path="ResumeFormWorkExp_Impactful" element={<ResumeFormWorkExp_Impactful/>}/>
        <Route path="ResumeFormWorkExp2_Impactful" element={<ResumeFormWorkExp2_Impactful/>}/>
        <Route path="ResumeFormEdu_Impactful" element={<ResumeFormEdu_Impactful/>}/>
        <Route path="ResumeFormEdu2_Impactful" element={<ResumeFormEdu2_Impactful/>}/>
        <Route path="ResumeFormSkills_Impactful" element={<ResumeFormSkills_Impactful/>}/>
        <Route path="ResumeFormS_Impactful" element={<ResumeFormS_Impactful/>}/>
        <Route path="ResumeFormF_Impactful" element={<ResumeFormF_Impactful/>}/>


        <Route path="userprofile" element={<UserProfile />}/>
        <Route path="feedback" element={<Feedback/>}/>
        <Route path="Chatboard" element={<Chatboard/>}/>
        <Route path="updatepassword" element={<UpdatePassword/>}/>
        <Route path="viewinstitutes" element={<ViewInstitutes/>}/>
        <Route path="viewjobs" element={<ViewJobs/>}/>
        <Route path="Trends" element={<Trends/>}/>
        <Route path="CounsellersPage" element={<CounsellersPage/>}/>
        <Route path="q1" element={<Questionnaire />} />
        <Route path="educationform" element={<EducationForm/>}/>
        <Route path="qstrslt" element={<QstRslt />} />
        <Route path="PredictedStudyArea" element={<PredictedStudyArea />} />
        <Route path="PredictedStudyArea2" element={<PredictedStudyArea2 />} />
        <Route path="PredictedCareers/:studyArea" element={<PredictedCareers />} />
        <Route path="PredictedCareers2/:studyArea" element={<PredictedCareers2 />} />
        <Route path="PredictedInstitutes/:careerName" element={<PredictedInstitutes />} />
        <Route path="PredictedInstitutes2/:careerName" element={<PredictedInstitutes2 />} />
        {/* <Route path="BookCounselor/:counseloremail" element={<BookCounselor/>}/> */}
      </Routes>
    
  );
};

export default App;
