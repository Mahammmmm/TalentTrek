import React , { Component } from 'react';
import "./ForgotPassword.css";
import {Graduation,} from '../../assets/index-assets'
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';


class Reset extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
     
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const {email} = this.state;
    console.log(email);

    fetch("http://localhost:3002/forgot-password",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        email,
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data,"userRegister");
      alert(data.status)

    });
    
  }
  render(){
    return (
      <div className='fp_main_container'>
        <div className='fp-container'>
          <div className='fp_left-section'>
            
            <img src={Graduation} className='imageGrad' alt='Graduation' />
          </div>
    
          <div className='fp_right-section'>
          
            <div className='fp_login-form'>
              <h1>Forgot Password</h1>
              <form onSubmit={this.handleSubmit} className='fp_form'>
                
                <label htmlFor='email'>Email<i className='fas fa-lock'></i></label>
                <input type='email' id='email' name='email' placeholder='Email' 
                onChange={(e)=>this.setState({email:e.target.value})} required 
                />
                  <button type='submit' className='fp_loginButton'>Submit</button>
                  
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Reset;
