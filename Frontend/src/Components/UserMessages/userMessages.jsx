import React, { useState, useEffect } from 'react'
import "./userMessages.css"
import { user } from '../../assets/index-assets'
import { Link } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { setDoc,doc, getDoc, getDocs, query, collection, where,updateDoc,addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';




export default function Header() {

  const [mychat, setMychat] = useState([]);
  const [setusers, setUsers] = useState([]);
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [userData, setUserData] = useState("");
  const [clickedCounselor, setClickedCounselor] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3002/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data => {
          //console.log(data,"userData");
          setUserData(data.data);
          setUserDataFetched(true)
        }));
    }

  });

  const userId = userData._id



  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const users = [];
      const querySnapshot = await getDocs(collection(db, 'counselors'));

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      console.log("Counselors:", users);
      setUsers(users)
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  useEffect(() => {
    if (userDataFetched) {
      const fetchData = async () => {
        try {
          await getChats();


        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };

      fetchData();
    }
  }, [userDataFetched, userId]);


  const getChats = async () => {
    try {
      const chats = [];
      const querySnapshot = await getDocs(query(collection(db, 'chats'), where('receiver', '==', userId)));

      querySnapshot.forEach((doc) => {
        chats.push(doc.data());
      });

      console.log("Chats:", chats);
      setMychat(chats);
      

      return chats;
    } catch (error) {
      console.error('Error fetching chats:', error);
      return [];
    }
  };



  const matchedCounselors = setusers.filter(user => mychat.some(chat => chat.sender === user.counselorId));
  const matchedCounselorNames = matchedCounselors.map(counselor => counselor.name);
  //console.log("Matched Counselor Names:", matchedCounselors);





  const getMessages = async (counselorid) => {

    const documentRef = doc(db, "chats", `${userId}${counselorid}`);
    const messagesCollectionRef = collection(documentRef, "messages");
    try {
      const querySnapshot = await getDocs(messagesCollectionRef);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      console.log("chat", data)
      setMessages(data.sort((a, b) => a.createdAt - b.createdAt));
      setClickedCounselor(counselorid);
      
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  //console.log("Clicked counselor id:",clickedCounselor)







  const onSend = async (counselorId,message) => {
    const msg = messages[0];
    const currentTime = new Date().getTime();
    const myMsg = {
      ...msg,
      text: message,
      sendBy: userId,
      sendTo: counselorId,
      createdAt: currentTime,
    };
    console.log("Message is",myMsg);
    setMessages(previousMessages => [...previousMessages, myMsg]);
  
    const chatId1 = userId + counselorId;
    const chatId2 = counselorId + userId;
    // const chatRef1 = doc(db, "chats", chatId1);
    // const chatRef2 = doc(db, "chats", chatId2);
  
    const chatCollectionRef1 = collection(db, "chats");
    const chatCollectionRef2 = collection(db, "chats");

    const chatDoc1Ref = doc(db, "chats", `${userId}${counselorId}`);
    const chatDoc2Ref = doc(db, "chats", `${counselorId}${userId}`);

try {
  // Check if the chat document exists for sender
  const chatDoc1 = await getDoc(chatDoc1Ref);
  if(!chatDoc1.exists()) {
    await setDoc(chatDoc1Ref,{
      sender: userId,
      receiver: counselorId,
    });
  }
  if (chatDoc1.exists()) {
    await updateDoc(chatDoc1Ref,{
      sender: userId,
      receiver: counselorId,
    });
  } 
  

  // Check if the chat document exists for receiver
  const chatDoc2 = await getDoc(chatDoc2Ref);
  if (chatDoc2.exists()) {
    await updateDoc(chatDoc2Ref,{
      sender: counselorId,
      receiver: userId,
    });
  } 
  if(!chatDoc2.exists()) {
    await setDoc(chatDoc2Ref,{
      sender: counselorId,
      receiver: userId,
    });
  }

  // Add the message to the messages collection of both chats
  const messagesCollectionRef1 = collection(chatDoc1Ref, "messages");
  await addDoc(messagesCollectionRef1, myMsg);

  // const messagesCollectionRef2 = collection(chatDoc2Ref, "messages");
  // await addDoc(messagesCollectionRef2, myMsg);
} catch (error) {
  console.error("Error updating chats:", error);
}
setMessageText('');

  };

  const handleSendClick = (counselorId) => {
    // Call onSend function with counselorId and messageText
    onSend(counselorId, messageText);
  };


  const [showChat, setShowChat] = useState(false);
  const [selectedCounselorIndex, setSelectedCounselorIndex] = useState(-1);
  const [selectedCounselorName, setSelectedCounselorName] = useState("");
  const handleCounselorClick = (index, counselorId,counselorName) => {
    setSelectedCounselorIndex(index);
    setSelectedCounselorName(counselorName);
    getMessages(counselorId);
    setShowChat(true);
  };
  const handleBackButtonClick = () => {
    setSelectedCounselorIndex(null);
    setSelectedCounselorName('');
    setShowChat(false);
};




  return (
    <div>
      <header>
        <nav className='nav_first'>
          <div>
            <a href='/' className='logo2'>
              Talent<span className='brown2'>Trek</span>
            </a>
          </div>
          {<div>
            <ul>
              <li>
                <Link to="/UserMessages" className="noUnderline">Messages</Link>
              </li>

              <li>
                <Link to="/q1" className="noUnderline">Career Test</Link>
              </li>

              <li>
                <Link to="/CounsellersPage" className="noUnderline">Counsellors</Link>
              </li>

              <li>
                <Link to="/viewinstitutes" className="noUnderline">Universities</Link>
              </li>
              <li>
                <Link to="/resumetemplates2" className="noUnderline">Resume Builder</Link>
              </li>

            </ul>
          </div>}
          <div>
            <div class="image-and-text-container2">
              <p className='welcome_uni'>{userData.name}{' '} </p>
              {userData.image ? (
                <Link to="/userprofile"><img src={userData.image} alt='UserImage' className='UserImage_uni'></img></Link>
              ) : (
                <Link to="/userprofile"><img src={user} alt='UserIcon' className='UserImage_uni'></img></Link>
              )}
            </div>

          </div>

        </nav>

      </header>



      <section className='User_MainDivChat'>

        <div className={`User_ChatsMainDiv ${showChat ? 'show-chat' : ''}`}>


          <div className='User_ChatsDiv'>
            <div className='ChatsDivTop'>
              <h3>Inbox</h3>
            </div>

            <div className='ChatsDivBottom'>
              <div className="user-list-chat">
                {setusers.map((counselor, index) => (
                  <div key={index} className="user-item-chat-user">
                    <img src={user} alt={`${counselor.name} profile`} className="user-image-chat-user" />
                    <button 
                      onClick={() => handleCounselorClick(index, counselor.counselorId,counselor.name)}
                      style={{ fontWeight: selectedCounselorIndex === index ? 'bold' : 'normal' }}
                    >
                      {counselor.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>



          {selectedCounselorName && (
          <div className='ChatDiv' style={{ display: selectedCounselorIndex !== null ? 'block' : 'none' }}>

            
              <div className='User_ChatDivTop'>
                 <FontAwesomeIcon icon={faArrowLeft} onClick={handleBackButtonClick} className="back-icon"/>
                <img src={user} alt={user} className="user-image-chats" />
                <p className='UserNameChat'>{selectedCounselorName}</p>
                
              </div>
           

            {messages && (
              <div className='ChatDivBottom'>
              
                <div className="message-container-userchat">
                  {messages.slice(0).reverse().map((message, index) => (
                    <div key={index} className={`message ${message.sendBy === userId ? 'sent' : 'received'}`}>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
                <div className="input-container-userchat">
                  <input type="text" placeholder="Type your message..." value={messageText} onChange={(e) => setMessageText(e.target.value)}/>
                  <button onClick={() => handleSendClick(clickedCounselor)}>Send</button>
                </div>
              </div>
            )}
          </div> )}
        </div>
      </section>



    </div>
  )
}

