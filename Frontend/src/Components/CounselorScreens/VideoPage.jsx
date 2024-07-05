import React, { useState,useEffect } from 'react'
import { Link ,useParams,useLocation} from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from './constant';
import "./VideoPage.css"
import { db } from '../../lib/firebase';
import {   doc, getDoc, getDocs, query, collection, where,updateDoc,addDoc } from "firebase/firestore";





const EnterID = ()=>{
    const { id } = useParams();

    


    const roomID = id;
    let myMeeting = async (element) => {
    const appID = APP_ID;
    const serverSecret = SERVER_SECRET;
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),"Enter Name");


   // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
        sharedLinks: [
        {
          name: 'Copy link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
        
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, 
      },
    });


};

const handleJoinButtonClick = () => {
    console.log("Join button clicked");
};
    return(
        <div>
           
            <div ref={myMeeting} className='VideoDiv'> </div>
        </div>
    )
}
export default EnterID