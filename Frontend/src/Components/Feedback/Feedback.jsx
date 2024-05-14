
import React,{ Component ,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Feedback.css'; // Import the CSS file for styling
import { feedback2 } from '../../assets/index-assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Feedback extends Component {

  
  



    constructor(props) {
        super(props);
        this.state = {
          userData: "",
          name: "",
          email: "",
          meassage: "",
        };
        this.handleSubmit=this.handleSubmit.bind(this);
      }

      componentDidMount() {
        fetch("http://localhost:3002/userData", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userData");
            this.setState({ userData: data.data });
          });
      }

      

      handleSubmit(e){
     
        e.preventDefault();
        const {name,email,message} = this.state;
        console.log(name,email,message);
    
        fetch("http://localhost:3002/feedback",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            name,
            email,
            message,
          }),
        })
        .then((res)=>res.json())
        .then((data=>{
          console.log(data,"Feedback submitted");
          if (data.status === "ok") {
            alert("Feedback Submitted");
          }
        })
        )
      }


      

      

    render(){
      
      const requests = () => {
        window.location.href = "./Requests";
      }
      const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./login";
      }
      const profile = () => {;
        window.location.href = "./userprofile";
      }
      const chatboard = () => {
        window.location.href = "./Chatboard";
      }
      const { name, email } = this.state.userData; // Destructuring userData

        return (
            <div className="feed-app-container">
        
        
            <div className="feed-left-section">
            <div className='feed-back_logo'>
            <a href='/'><Link to="/"><FontAwesomeIcon icon={faArrowLeft} className="feed-back-icon" /></Link></a>
                    <div className="feed-logo">Talent <span className='feed_Brown'>Trek</span></div>
                 </div>
                 <div class="user-list">
                    <a href="#profile"  className='user_menu' onClick={profile}>Profile</a>
                    <br />
                    <a href="#feedback" className='user_boldness'>Feedback/Complaint</a>
                    <br />
                    <a href="#chatboard" className='user_menu' onClick={chatboard}>Chatboard</a>
                    <br />
                    <a href="#requests" className="user_menu" onClick={requests}>
                      View Requests
                    </a>
                    <br />
                    <a href="#logout" className='user_menu' onClick={logOut}>Logout</a>
                  </div>
              
                <div className="feed-footer">
                    <p>&copy;  2023  TalentTrek</p>
                    <p>talenttrek58@gmail.com</p>
                </div>
            </div>
        
            <div className="feed-right-section">
            <h1 className="user-profile">Feedback</h1>
                <div className="feed-blur-container">
                    
                    <div className='feed-formstyle'>
                        <form className='feed-form' onSubmit={this.handleSubmit}>
                            <div className='feed-div'>
                                <label className='feed-label'>Name:</label>
                                <input
                                    className='feed-input'
                                    type="text"
                                    id="name"
                                    value={name} required
                                />
                            </div>
                            <div className='feed-div'>
                                <label className='feed-label'>Email:</label>
                                <input
                                    className='feed-input'
                                    type="email"
                                    id="email"
                                    value={email}required
                                />
                            </div>
                            <div className='feed-div'>
                                <label className='feed-label'>Message:</label>
                                <textarea
                                    className='feed-textarea'
                                    id="message"
                                    onChange={(e)=>this.setState({message:e.target.value})} required
                                ></textarea>
                            </div>
                            <button type="submit" className='feed-button'>Submit</button>
                        </form>
                    </div>
                      
                  </div>
                
              </div>
            </div>
          );
    }
  
}

export default Feedback;
