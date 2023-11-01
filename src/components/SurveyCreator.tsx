// src/components/SurveyCreator.tsx

import React, { useState } from "react";

const SurveyCreator: React.FC = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Survey Creator</h1>
      <div className="mb-4">
        <label htmlFor="surveyTitle" className="text-sm font-medium block">
          Survey Title
        </label>
        <input
          type="text"
          id="surveyTitle"
          value={surveyTitle}
          onChange={(e) => setSurveyTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium block">Questions</label>
        {questions.map((question, index) => (
          <input
            key={index}
            type="text"
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 mb-2"
          />
        ))}
        <button
          onClick={addQuestion}
          className="text-sm text-blue-500 hover:underline cursor-pointer"
        >
          + Add Question
        </button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Survey
      </button>
    </div>
  );
};

export default SurveyCreator;
