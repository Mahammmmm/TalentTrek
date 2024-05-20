import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import "./EnterIdPage.css"



const EnterID = ()=>{
    const [input,setInput] = useState("");
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const userId = searchParams.get('userId');

    //console.log(userId);
    return(
        <div>
            <nav className="CounselorNav_nav">
                <a href="/CounselorHome" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
                <ul>
                    <li >
                        <Link to='/Messages'><a> Messages</a></Link>
                    </li>
                    <li>
                    <Link to='/CouselorRequests'><a> Requests</a></Link>
                    </li>
                    <li>
                    <Link to='/Schedule'><a> Schedule</a></Link>
                    </li>
                    <li>
                    <Link to='/Profile'><a> Profile</a></Link>
                    </li>
                </ul>
            </nav>

            <h3 className='counselorEneterId'>Initiate the Call</h3>
            <div className='counselorEneterIdDiv'>
                
                <input className="counselorEneterIdInput" value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Enter your name' />
                <Link to={`/Video/${encodeURIComponent(input)}`}><button className="startcall_button" >Start Call</button></Link>
                
            </div>
        </div>
    )
}
export default EnterID