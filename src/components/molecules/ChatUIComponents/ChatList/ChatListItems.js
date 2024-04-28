import React from "react";
import Avatar from "./Avatar";
import "./chatList.scss"



const ChatListItems = ({ animationDelay, active, image, isOnline, name }) => {
  
  const selectChat = (e) => {
    const children = e.currentTarget.parentNode.children;
    for (let index = 0; index < children.length; index++) {
      children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  return (
    
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={selectChat}
      className={`chatList ${active ? active : ""}`}
    >
      <Avatar
        image={image ? image : "http://placehold.it/80x80"}
        isOnline={isOnline}
      />
      <div className="userMeta">
        <p>{name}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
    
  );
};

export default ChatListItems;
