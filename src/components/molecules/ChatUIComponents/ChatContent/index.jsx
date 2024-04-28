import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './ChatContent.scss';
import Avatar from '../ChatList/Avatar';
import ChatItem from './ChatItem';
import ImageZoomModal from './ImageZoomModal';

const ChatContent = () => {
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [currentZoomImage, setCurrentZoomImage] = useState('');
  const chatContentRef = useRef(null);
  const [chat, setChat] = useState([
    {
      key: Date.now(),
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: '',
      msg: 'Hi, How are you?',
    },
    {
      key: Date.now() + 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      type: 'other',
      msg: 'I am fine.',
    },
  ]);
  const [msg, setMsg] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const sendMessage = () => {
    if (msg !== '' || imagePreview !== null || videoPreview !== null) {
      const newChatMessage = {
        key: Date.now(),
        type: 'me',
        msg: imagePreview ? <img src={imagePreview} alt="attachment" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            : videoPreview ? <video src={videoPreview} controls style={{ maxWidth: '200px', maxHeight: '200px' }} />
            : msg,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
      };
      setChat([...chat, newChatMessage]);
      setMsg('');
      setImagePreview(null);
      setVideoPreview(null);
      scrollToBottom();
      removeMediaPreview();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (file.type.startsWith('image/')) {
          setImagePreview(ev.target.result);
        } else if (file.type.startsWith('video/')) {
          setVideoPreview(ev.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeMediaPreview = () => {
    setImagePreview(null);
    setVideoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageClick = (mediaSrc, isVideo = false) => {
    if (!isVideo) {
      setCurrentZoomImage(mediaSrc);
      setIsZoomModalOpen(true);
    }
  };

  const selectChallenge = () => {
    const challenges = [
      { name: "Bug Bash Bonanza	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/1' },
      { name: "CodeMaster Challenge", link: 'http://localhost:3000/playcodearena/practical/challenge-code/2' },
      { name: "Hackathon Hustle	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/3' },
      { name: "Hackathon Hustle	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/4' },
      { name: "DevOps Duel	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/5' },
      { name: "Bug Bash Bonanza	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/6' },
      { name: "Hackathon Hustle	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/7' },
      { name: "Algorithm Adventure	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/8' },
      { name: "CodeMaster Challenge	", link: 'http://localhost:3000/playcodearena/practical/challenge-code/9' },
      { name: "DevOps Duel", link: 'http://localhost:3000/playcodearena/practical/challenge-code/10' },
    ];
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const selectedChallenge = challenges[randomChallengeIndex];
    const winner = Math.random() < 0.5 ? 0 : 1;
    const winnerChallenge = winner === 0 ? selectedChallenge.link : challenges[(randomChallengeIndex + 1) % challenges.length].link;
    setChat(prevChat => [
      ...prevChat,
      {
        key: Date.now(),
        type: 'challenge',
        msg: `We have selected a challenge! The winner is: ${winner === 0 ? 'Head' : 'Tail'}. The challenge is: ${selectedChallenge.name}. Click here to play.`,
        challenge: selectedChallenge,
      }
    ]);
    scrollToBottom();
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar isOnline="active" image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" />
            <p>StarLabs</p>
          </div>
        </div>
        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg" onClick={selectChallenge}>
              <FontAwesomeIcon icon={faPlus} /> Roll for the challenge
            </button>
          </div>
        </div>
      </div>
      <div className="content__body" ref={chatContentRef}>
        {chat.map((itm) => (
          <ChatItem
            key={itm.key}
            user={itm.type ? itm.type : 'me'}
            msg={itm.msg}
            image={itm.image}
            onImageClick={handleImageClick}
            challenge={itm.challenge}
          />
        ))}
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles" onClick={triggerFileInput}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {imagePreview && (
            <div className="image-preview" onClick={() => { setIsZoomModalOpen(true); setCurrentZoomImage(imagePreview); }}>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
              <div className="image-preview__close" onClick={(e) => { e.stopPropagation(); removeMediaPreview(); }}>X</div>
            </div>
          )}
          {videoPreview && (
            <div className="video-preview" onClick={() => { setIsZoomModalOpen(true); setCurrentZoomImage(videoPreview); }}>
              <video src={videoPreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} controls />
              <div className="video-preview__close" onClick={(e) => { e.stopPropagation(); removeMediaPreview(); }}>X</div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
          <input
            type="text"
            placeholder="Type a message here..."
            onChange={onStateChange}
            value={msg}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
      {isZoomModalOpen && (
        <ImageZoomModal src={currentZoomImage} onClose={() => setIsZoomModalOpen(false)} />
      )}
    </div>
  );
};

export default ChatContent;
