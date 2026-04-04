import React from "react";

export const QuestionGeneratorForm = ({
  question, setQuestion,
  choice1, setChoice1,
  choice2, setChoice2,
  choice3, setChoice3,
  choice4, setchoice4,
  answer, setAnswer,
  questions,
  handleAddQuestion,
}) => {
  return (
    <>
      <div>
        <label className="text-white">Question</label>
        <br />
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter Question here"
          className="w-full bg-black border border-red-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-white">First</label>
            <input
              type="text"
              value={choice1}
              onChange={(e) => setChoice1(e.target.value)}
              placeholder="Enter first choice"
              className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-white">Second</label>
            <input
              type="text"
              value={choice2}
              onChange={(e) => setChoice2(e.target.value)}
              placeholder="Enter second choice"
              className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-white">Third</label>
            <input
              type="text"
              value={choice3}
              onChange={(e) => setChoice3(e.target.value)}
              placeholder="Enter third choice"
              className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-white">Fourth</label>
            <input
              type="text"
              value={choice4}
              onChange={(e) => setchoice4(e.target.value)}
              placeholder="Enter fourth choice"
              className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="w-full">
            <label>Choose Answer</label>
            <select
              value={answer || ""}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full bg-black border border-red-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select an answer</option>
              <option value={choice1}>{choice1}</option>
              <option value={choice2}>{choice2}</option>
              <option value={choice3}>{choice3}</option>
              <option value={choice4}>{choice4}</option>
            </select>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              className="w-full h-[40px] mt-5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="mt-4 mb-2 font-semibold">View All Questions</p>
      </div>
      
      <div className="w-full">
        {questions?.length > 0 ? (
          questions.map((q, index) => (
            <div key={index} className="mb-4 bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold text-white mb-2">{`${index + 1}. ${q.question}`}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <p>{`A. ${q.choice1}`}</p>
                <p>{`B. ${q.choice2}`}</p>
                <p>{`C. ${q.choice3}`}</p>
                <p>{`D. ${q.choice4}`}</p>
              </div>
              <p className="mt-2 text-green-400 text-sm">Correct Answer: {q.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-sm">No questions added yet.</p>
        )}
      </div>
    </>
  );
};
