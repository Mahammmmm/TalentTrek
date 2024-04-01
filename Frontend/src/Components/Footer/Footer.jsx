import React from 'react'
import "./Footer.css"
import { twitter,facebookLogo,linkedIn } from '../../assets/index-assets'
const Footer = () => {
  return (
    <section id='Footer'>
      <div className="footer">
      
        <div className='AppHeading'>Talent<span className='brown'>Trek</span></div>
        <div className='info'>
          <div>2023 TalentTrek</div>
          <div>talenttrek58@gmail.com</div>
        </div>
        
        <div className="social-icons">
          <a href="#" target="_blank"><img src={facebookLogo} alt="Facebook" /></a>
          <a href="#" target="_blank"><img src={twitter} alt="Twitter" /></a>
          <a href="#" target="_blank"><img src={linkedIn} alt="LinkedIn" /></a>
        </div>
      
      <div>
        
        
      </div>
    </div>
    </section>
  )
}

export default Footer