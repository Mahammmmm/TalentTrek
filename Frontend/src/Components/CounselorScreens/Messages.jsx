import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { user } from '../../assets/index-assets';
import { db } from '../../lib/firebase';
import {   doc, getDoc, getDocs, query, collection, where,updateDoc,addDoc } from "firebase/firestore";
import "./Messages.css"



export default function Messages(){


    const [mychat, setMychat] = useState([]);
    const [users, setUsers] = useState([]);
    const [counselor, setCounselor] = useState("");
    const [userDataFetched,setUserDataFetched]=useState(false);
    const [clickedCounselor, setClickedCounselor] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

  useEffect(() => {
      const token = window.localStorage.getItem("Counselortoken");
  
      if(token){
        fetch("http://localhost:3002/CounselorsData",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            token:token,
          }),
        })
        .then((res)=>res.json())
        .then((data=>{
          console.log(data,"counselorData");
          setCounselor(data.data);
          setUserDataFetched(true)
        }));
      }
      
    },[]);


    const userId=counselor._id
    console.log(userId)










    useEffect(() => {
        getUsers();
      }, []);

    const getUsers = async () => {
        try {
            const users = [];
            const querySnapshot = await getDocs(collection(db, 'users'));
        
            querySnapshot.forEach((doc) => {
              users.push(doc.data());
            });
        
            console.log("Users:", users);
            setUsers(users)
            return users;
          } catch (error) {
            console.error('Error fetching users:', error);
            return [];
          }
      };







    useEffect(() => {
        if(userDataFetched){
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

    const matchedUsers = users.filter(user => mychat.some(chat => chat.sender === user.userId));
    const matchedUserNames = matchedUsers.map(user => user.name);

    console.log("Matched User Names:", matchedUserNames);


    
    const getMessages = async (Userid) => {

        const documentRef = doc(db, "chats", `${Userid}${userId}`);
        const messagesCollectionRef = collection(documentRef, "messages");
        try {
        const querySnapshot = await getDocs(messagesCollectionRef);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        console.log("chat", data)
        setMessages(data.sort((a, b) => a.createdAt - b.createdAt));
        setClickedCounselor(Userid);
        
        } catch (error) {
        console.error("Error fetching documents:", error);
        }
    };
    //console.log("Clicked counselor id:",clickedCounselor)


      
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
    const [selectedUserName, setSelectedUserName] = useState("");
    const handleCounselorClick = (index, userId,username) => {
      setSelectedUserIndex(index);
      setSelectedUserName(username);
      getMessages(userId);
    };




    







  const onSend = async (StudentId,message) => {
    const msg = messages[0];
    const currentTime = new Date().getTime();
    const myMsg = {
      ...msg,
      text: message,
      sendBy: userId,
      sendTo: StudentId,
      createdAt: currentTime,
    };
    console.log("Message is",myMsg);
    setMessages(previousMessages => [...previousMessages, myMsg]);
  
    const chatId1 = userId + StudentId;
    const chatId2 = StudentId + userId;
    // const chatRef1 = doc(db, "chats", chatId1);
    // const chatRef2 = doc(db, "chats", chatId2);
  
    const chatCollectionRef1 = collection(db, "chats");
    const chatCollectionRef2 = collection(db, "chats");

    const chatDoc1Ref = doc(db, "chats", `${userId}${StudentId}`);
    const chatDoc2Ref = doc(db, "chats", `${StudentId}${userId}`);

    try {
    // Check if the chat document exists for receiver
    const chatDoc1 = await getDoc(chatDoc2Ref);
    if (chatDoc1.exists()) {
        await updateDoc(chatDoc2Ref,{
        sender: userId,
        receiver: StudentId,
        });
    } else {
        chatDoc2Ref.set({
        sender: userId,
        receiver: StudentId,
        });
    }

    // Check if the chat document exists for sender
    const chatDoc2 = await getDoc(chatDoc1Ref);
    if (chatDoc2.exists()) {
        await updateDoc(chatDoc1Ref,{
        sender: StudentId,
        receiver: userId,
        });
    } else {
        chatDoc1Ref.set({
        sender: StudentId,
        receiver: userId,
        });
    }

    // Add the message to the messages collection of both chats
    const messagesCollectionRef1 = collection(chatDoc1Ref, "messages");
    await addDoc(messagesCollectionRef1, myMsg);

    const messagesCollectionRef2 = collection(chatDoc2Ref, "messages");
    await addDoc(messagesCollectionRef2, myMsg);
    } catch (error) {
    console.error("Error updating chats:", error);
    }
    setMessageText('');

    };

    const handleSendClick = (UserId) => {
        // Call onSend function with counselorId and messageText
        onSend(UserId, messageText);
    };
  



    return(
        <div className='CounselorChatDiv'>
        <nav className="CounselorNav_nav">
                <a href="/CounselorHome" className="CounselorNav_site-title">Talent<span className="CounselorNav_trek">Trek</span></a>
                <ul>
                    <li >
                        <Link to='/Messages'><a style={{fontWeight:'bold'}}> Messages</a></Link>
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
            
            

            <section className='MainDivChat'>

                <div className='ChatsMainDiv'>


                    <div className='ChatsDiv'>
                        <div className='ChatsDivTop'>
                            <h3>Inbox</h3>
                        </div>

                        <div className='ChatsDivBottom'>
                            <div className="user-list-chat">
                                {matchedUsers.map((users, index) => (
                                    <div key={index} className="user-item-chat">
                                        <img src={user} alt={`${users.name} profile`} className="user-image-chat" />
                                        <button 
                                        onClick={() => handleCounselorClick(index, users.userId,users.name)}
                                        style={{ fontWeight: selectedUserIndex === index ? 'bold' : 'normal' }}
                                        >
                                        {users.name}
                                        </button>
                                    </div>
                                    ))}
                            </div>
                        </div> 
                    </div>




                    <div className='ChatDiv'>
                        {selectedUserName && (
                            <div className='ChatDivTop'>
                                <img src={user} alt={user} className="user-image-chats" />
                                <p className='UserNameChat'>{selectedUserName}</p>
                            </div>
                    )}

                    {messages.length > 0 && (
                        <div className='ChatDivBottom'>
                            <div className="message-container-userchat">
                            {messages.slice(0).reverse().map((message, index) => (
                                <div key={index} className={`message ${message.sendBy === userId ? 'sentt' : 'received'}`}>
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
                    </div>
                </div>
            </section>
        </div>
        
    ) 
}







