import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from 'react-monaco-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './QuestionCodeEditor.scss';
import challenges from './challenges';

const ChallengeCode = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const challenge = challenges[id];
  const [editorCode, setEditorCode] = useState('// Enter your code here');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  useEffect(() => {
    if (challenge) {
      setEditorCode(`// Enter your code ...`);
    }
  }, [id, challenge]);

  const handleRunCode = () => {
    challenge && challenge.test(editorCode);
  };

  const handleSubmitCode = () => {
    toast.info('Write Code');
  };

  const handleNextQuestion = () => {
    const allChallengeIds = Object.keys(challenges);
    const currentIdx = allChallengeIds.indexOf(id);

    if (currentIdx >= 0 && currentIdx < allChallengeIds.length - 1) {
      const nextId = allChallengeIds[currentIdx + 1];
      navigate(`/playcodearena/practical/challenge-code/${nextId}`);
    } else {
      console.log('No more questions.');
      toast.info('This is the last question.');
    }
  };

  return (
    <div className="challenge-code-container">
      <ToastContainer />
      <div className="language-dropdown">
        <label className='dropdownLabel' htmlFor="languageDropdown">Select language:</label>
        <select
          id="languageDropdown"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="editor-wrapper">
        <MonacoEditor
          width="800"
          height="600"
          language={selectedLanguage}
          theme="vs-dark"
          value={editorCode}
          options={{
            fontSize: 16,
            automaticLayout: true,
          }}
          editorDidMount={(editor) => editor.focus()}
          onChange={setEditorCode}
        />
      </div>
      <div className="action-buttons">
        <button className="run-code-button" onClick={handleRunCode}>
          Run Code
        </button>
        {/* <button className="submit-code-button" onClick={handleSubmitCode}>
          Submit Code
        </button> */}
        <button className="next-question-button" onClick={handleNextQuestion}>
          Next Question
        </button>
      </div>
    </div>
  );
};

export default ChallengeCode;
