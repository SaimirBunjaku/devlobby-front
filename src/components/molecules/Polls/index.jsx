import React from 'react';
import './Polls.scss';
import { useState } from 'react';



const Question = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="poll-card">
      <p className="poll-question">{question}</p>
      <div className="poll-options">
        {options.map((option) => (
          <Option key={option.id} option={option} isSelected={selectedOption === option.id} onSelect={handleOptionChange} />
        ))}
      </div>
      <button className="vote-button">Vote</button>
    </div>
  );
};

const Option = ({ option, isSelected, onSelect }) => {
  const handleChange = (event) => {
    onSelect(option.id);
  };

  return (
    <div className={`poll-option ${isSelected ? 'poll-option-selected' : ''}`}>
      <input
        type={option.type}
        id={option.id}
        value={option.id}
        checked={isSelected}
        onChange={handleChange}
      />
      <label htmlFor={option.id}>{option.label}</label>
    </div>
  );
};
const Polls = () => {
  const questions = [
    {
      question: "What version of React do you primarily use in your projects?",
      options: [
        { type: "radio", id: "react-16", name: "react-version", label: "React 16" },
        { type: "radio", id: "react-17", name: "react-version", label: "React 17" },
        { type: "radio", id: "react-18", name: "react-version", label: "React 18 (if released)" }
      ]
    },
    {
      question: "What state management solution do you prefer with React?",
      options: [
        { type: "radio", id: "redux", name: "state-management", label: "Redux" },
        { type: "radio", id: "context-api", name: "state-management", label: "React Context API" },
        { type: "radio", id: "mobx", name: "state-management", label: "MobX" }
      ]
    },
    {
      question: "Do you prefer functional components or class components in React?",
      options: [
        { type: "radio", id: "functional-components", name: "component-type", label: "Functional Components" },
        { type: "radio", id: "class-components", name: "component-type", label: "Class Components" },
        { type: "radio", id: "both", name: "component-type", label: "Both" }
      ]
    },
    {
      question: "Which React Hooks do you use most frequently?",
      options: [
        { type: "checkbox", id: "useState", name: "hooks", label: "useState" },
        { type: "checkbox", id: "useEffect", name: "hooks", label: "useEffect" },
        { type: "checkbox", id: "useContext", name: "hooks", label: "useContext" }
      ]
    },
    {
      question: "How do you handle routing in your React applications?",
      options: [
        { type: "radio", id: "react-router", name: "routing", label: "React Router" },
        { type: "radio", id: "reach-router", name: "routing", label: "Reach Router" },
        { type: "radio", id: "other-routing", name: "routing", label: "Other" }
      ]
    },
    {
      question: "What testing library do you prefer for testing React components?",
      options: [
        { type: "radio", id: "jest", name: "testing-library", label: "Jest" },
        { type: "radio", id: "testing-library-react", name: "testing-library", label: "Testing Library for React" },
        { type: "radio", id: "other-testing-library", name: "testing-library", label: "Other" }
      ]
    },
    {
      question: "How do you manage styles in your React projects?",
      options: [
        { type: "radio", id: "inline-styles", name: "styles-management", label: "Inline Styles" },
        { type: "radio", id: "css-modules", name: "styles-management", label: "CSS Modules" },
        { type: "radio", id: "styled-components", name: "styles-management", label: "Styled Components" }
      ]
    },
    {
      question: "What is your preferred deployment platform for React applications?",
      options: [
        { type: "radio", id: "netlify", name: "deployment", label: "Netlify" },
        { type: "radio", id: "vercel", name: "deployment", label: "Vercel" },
        { type: "radio", id: "heroku", name: "deployment", label: "Heroku" }
      ]
    },
    {
      question: "Which React UI library or component library do you frequently use?",
      options: [
        { type: "radio", id: "material-ui", name: "ui-library", label: "Material-UI" },
        { type: "radio", id: "ant-design", name: "ui-library", label: "Ant Design" },
        { type: "radio", id: "chakra-ui", name: "ui-library", label: "Chakra UI" }
      ]
    },
    {
      question: "How do you handle internationalization (i18n) in your React projects?",
      options: [
        { type: "radio", id: "react-i18next", name: "i18n", label: "react-i18next" },
        { type: "radio", id: "formatjs", name: "i18n", label: "FormatJS (React Intl)" },
        { type: "radio", id: "other-i18n", name: "i18n", label: "Other" }
      ]
    }
  ];

  return (
    <div className="poll">
      <h3>Tell us what you think:</h3>
      {questions.map((question, index) => (
        <Question key={index} question={question.question} options={question.options} />
      ))}
    </div>
  );
};

export default Polls;
