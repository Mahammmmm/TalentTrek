import { Link } from 'react-router-dom';
import React from 'react';
export default function Schedule(){
    return(
        <div>
        <nav className="CounselorNav_nav">
                <a href="/CounselorHome" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
                <ul>
                    <li >
                        <Link to='/Messages'><a> Messages</a></Link>
                    </li>
                    <li>
                    <Link to='/Schedule'><a> Schedule</a></Link>
                    </li>
                    <li>
                    <Link to='/Profile'><a> Profile</a></Link>
                    </li>
                </ul>
            </nav>
            <h1>Schedule</h1>
        </div>
        
    )
}