import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Chatboard.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

const App = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState([]);
  const [likedQuestions, setLikedQuestions] = useState([]);

  useEffect(() => {
    // Fetch user data on component mount
    fetchUserData();
    // Fetch questions on component mount
    fetchQuestions();
  }, []);

  const fetchUserData = () => {
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
        setUserData(data.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  const fetchQuestions = () => {
    // Fetch questions from the backend and update the state
    fetch("http://localhost:3002/getQuestions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched questions:", data);
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const postQuestion = () => {
    // Post a new question to the backend
    fetch("http://localhost:3002/postQuestion", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        question: newQuestion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Refresh the list of questions after posting
        fetchQuestions();
        // Clear the newQuestion input
        setNewQuestion("");
      })
      .catch((error) => console.error("Error posting question:", error));
  };

  const postAnswer = (questionId) => {
    // Post a new answer to the backend for a specific question
    fetch("http://localhost:3002/postReply", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        questionId,
        reply: newAnswer[questionId],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Refresh the list of questions after posting
        fetchQuestions();
        // Clear the newAnswer input
        setNewAnswer({ ...newAnswer, [questionId]: '' });
      })
      .catch((error) => console.error("Error posting answer:", error));
  };


 
  const handleLikeQuestion = (questionId) => {
    if (likedQuestions.includes(questionId)) {
      console.log('You have already liked this question');
      return;
    }
  
    fetch('http://localhost:3002/likeQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
        questionId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) =>
          question._id === questionId ? { ...question, likes: data.data.likes, dislikes: data.data.dislikes } : question
        );
  
        setQuestions(updatedQuestions);
        setLikedQuestions([...likedQuestions, questionId]);
      })
      .catch((error) => console.error('Error liking question:', error));
  };
  
  const handleDislikeQuestion = (questionId) => {
    if (likedQuestions.includes(questionId)) {
      console.log('You have already disliked this question');
      return;
    }
  
    fetch('http://localhost:3002/dislikeQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
        questionId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) =>
          question._id === questionId ? { ...question, likes: data.data.likes, dislikes: data.data.dislikes } : question
        );
  
        setQuestions(updatedQuestions);
        setLikedQuestions([...likedQuestions, questionId]);
      })
      .catch((error) => console.error('Error disliking question:', error));
  };
  
  const handleLikeReply = (questionId, replyId) => {
    if (likedQuestions.includes(questionId)) {
      console.log('You have already liked this question');
      return;
    }
  
    fetch('http://localhost:3002/likeReply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
        questionId,
        replyId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) => {
          if (question._id === questionId) {
            const updatedReplies = question.replies.map((reply) =>
              reply._id === replyId ? { ...reply, likes: data.data.replies.likes, dislikes: data.data.replies.dislikes } : reply
            );
            return { ...question, replies: updatedReplies };
          }
          return question;
        });
  
        setQuestions(updatedQuestions);
        setLikedQuestions([...likedQuestions, questionId]);
      })
      .catch((error) => console.error('Error liking reply:', error));
  };
  
  const handleDislikeReply = (questionId, replyId) => {
    if (likedQuestions.includes(questionId)) {
      console.log('You have already disliked this question');
      return;
    }
  
    fetch('http://localhost:3002/dislikeReply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
        questionId,
        replyId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedQuestions = questions.map((question) => {
          if (question._id === questionId) {
            const updatedReplies = question.replies.map((reply) =>
              reply._id === replyId ? { ...reply, likes: data.data.replies.likes, dislikes: data.data.replies.dislikes } : reply
            );
            return { ...question, replies: updatedReplies };
          }
          return question;
        });
  
        setQuestions(updatedQuestions);
        setLikedQuestions([...likedQuestions, questionId]);
      })
      .catch((error) => console.error('Error disliking reply:', error));
  };
  
  

  const logOut = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const feedback = () => {
    navigate("/feedback");
  };

  const profile = () => {
    navigate("/userprofile");
  };
  const requests = () => {
    window.location.href = "./Requests";
  }

  return (
    <div className="user-app-container_chat">
      <div className="user-left-section_chat">
        <div className="user-back_logo">
          <Link to="/main2">
            <FontAwesomeIcon icon={faArrowLeft} className="user-back-icon" />
          </Link>
          <div className="user-logo">
            Talent <span className="user-Brown">Trek</span>
          </div>
        </div>
        <div className="user-list-chatboard">
          <a href="#profile" className="user_menu" onClick={profile}>
            Profile
          </a>
          <br />
          <a href="#feedback" className="user_menu" onClick={feedback}>
            Feedback/Complaint
          </a>
          <br />
          <a href="#chatboard" className="user_boldness">
            Chatboard
          </a>
          <br />
          <a href="#requests" className="user_menu" onClick={requests}>
                View Requests
              </a>
              <br />
          <a href="#logout" className="user_menu" onClick={logOut}>
            Logout
          </a>
        </div>

        <div className="user-footer_chat">
          <p>&copy; 2023 TalentTrek</p>
          <p>talenttrek58@gmail.com</p>
        </div>
      </div>

      <div className="user_right_section">
        <h1 className="user-profile_chat">ChatBoard</h1>

        <div className="AskQuestionCont">
          <h1 className="user-profile_qst">Have a question?</h1>
          <input
            placeholder="Write question..."
            className="askQstTextArea"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <br />
          <button className="askQstBtn" onClick={postQuestion}>
            Post Question
          </button>
        </div>

        <div className="QstsContn">
    {questions.map((question) => (
    <div key={question._id} className="question-container">
        <div className="circle-question-container">
            <div className="circle_chatbord">
                <p>{question.email?.charAt(0).toUpperCase()}</p>
            </div>
            <div className="question-email">
                <p className="question_chatbord">{question.question}</p>
                <p className="email_chatbord">{question.email}</p>
            </div>
        </div>  
        <div className="like-dislike_QST">
                <div
                    className="icon"
                    onClick={() => handleLikeQuestion(question._id)}
                >
                    <AiFillLike />
                    <span style={{ color: "black" }}>{question.likes}</span>
                </div>
                <div
                    className="icon"
                    onClick={() => handleDislikeQuestion(question._id)}
                >
                    <AiFillDislike />
                    <span style={{ color: "black" }}>{question.dislikes}</span>
                </div>
        </div>

        <div className="replyToQuestionCont">
                <input
                    placeholder="Reply to question..."
                    className="replyToQstTextArea"
                    value={newAnswer[question._id] || ''}
                    onChange={(e) => setNewAnswer({ ...newAnswer, [question._id]: e.target.value })}
                />
                <button
                    className="replyToQstBtn"
                    onClick={() => postAnswer(question._id)}
                >
                    Post Answer
                </button>
        </div>

        <h3 className="reply">Replies</h3>

        {question.replies.map((reply) => (
        <div key={reply._id} className="reply-container">
                    <div className="circle-answer-container">
                                <div className="circle_reply">
                                    <p>{reply.email?.charAt(0).toUpperCase()}</p>
                                </div>
                                <div className="answer-details">
                                                <div className="email_reply">
                                                    <p>{reply.email}</p>
                                                </div>

                                                <div className="answer_reply">
                                                    <p>{reply.reply}</p>
                                                </div>

                                                <div className="like-dislike">
                                                    <div
                                                        className="icon"
                                                        onClick={() => handleLikeReply(question._id, reply._id)}
                                                    >
                                                        <AiFillLike />
                                                        <span style={{ color: "black" }}>{reply.likes}</span>
                                                    </div>
                                                    <div
                                                        className="icon"
                                                        onClick={() => handleDislikeReply(question._id, reply._id)}
                                                    >
                                                        <AiFillDislike />
                                                        <span style={{ color: "black" }}>{reply.dislikes}</span>
                                                    </div>
                                                </div>
                                </div>
                    </div>
        </div>
        ))}
      
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default App;
