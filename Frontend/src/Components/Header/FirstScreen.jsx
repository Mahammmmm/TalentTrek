import React ,{useState,useEffect} from 'react'
import "./FirstScreen.css"
import {FirstScreenStudent,FirstScreenCounselor} from '../../assets/index-assets'



const TalentTrek = () =>{
    const handleCounselor = (e) => {
        e.preventDefault();
        window.location.href = "./CounselorLogin"
      };
    
      const handleStudent = (e) => {
        e.preventDefault();
        window.location.href = "./main"
      };
    
    return(
        <div className='FirstScreenBg'>

            
            <div className='firstDiv' >
                <h1 className='FirstScreenH1'>Talent</h1>
                <h3 className='FirstScreenH3'>I'm here for counseling</h3>
                <img src={FirstScreenCounselor} alt="Counselor" className='Counselor_Bg'/>
                <button className='FirstScreenButton' onClick={handleCounselor}>Start As Counsellor</button>
            </div>
            
            <div className='secondDiv'>
                <h1 className='FirstScreenH2'>Trek</h1>
                <h3 className='FirstScreenH3'>I'm ready to explore</h3>
                <img src={FirstScreenStudent} alt="Counselor" className='Student_Bg' />
                <button className='FirstScreenButton2' onClick={handleStudent}>Start As Student</button>
            </div>

        </div>
    )
}
export default TalentTrek