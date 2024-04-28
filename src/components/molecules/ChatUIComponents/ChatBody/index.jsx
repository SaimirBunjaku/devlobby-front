import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatList from "../ChatList";
import ChatContent from "../ChatContent";
import "./ChatBody.scss";

const ChatBody = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {isLoggedIn ? (
        <div className="first_chatbody">
          <ChatList />
          <ChatContent />
        </div>
      ) : (
        console.log("You need to be logged in before using Chat")
      )}
    </>
  );
};

export default ChatBody;
