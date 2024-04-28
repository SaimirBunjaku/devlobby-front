import React from "react";
import Avatar from "../ChatList/Avatar";

const ChatItem = ({ user, msg, image, onImageClick, challenge }) => {
  const isMediaMessage = React.isValidElement(msg) && (msg.type === 'img' || msg.type === 'video');
  const isChallengeMessage = challenge && challenge.link;

  return (
    <div style={{ animationDelay: `0.8s` }} className={`chat__item ${user ? user : ""}`}>
      <div className="chat__item__content">
        {isMediaMessage ? React.cloneElement(msg, { onClick: () => onImageClick(msg.props.src, msg.type === 'video') }) 
          : isChallengeMessage ? (
            <div className="chat__msg">
              <p>We have selected a challenge! The winner is: {user === 'me' ? 'Head' : 'Tail'}. The challenge is: {challenge.name}. Click to play <a href={challenge.link} target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
          ) : (
            <div className="chat__msg">{msg}</div>
          )
        }
      </div>
      <Avatar isOnline="active" image={image} />
    </div>
  );
};

export default ChatItem;
