import { useState, useEffect } from 'react';

const Quiz = ({ cid, lid }) => {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [totalScore, setTotalScore] = useState(null);

  const getQuestion = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/course/${cid}/lesson/${lid}/quiz/`);
      const data = await response.json();
      setQuestion(data.question);
      setIsCorrect(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const submitAnswer = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/course/${cid}/lesson/${lid}/quiz/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_answer: userAnswer }),
      });
      const data = await response.json();
      setQuestion(data.question);
      setIsCorrect(data.is_correct);
      if (data.message === 'Quiz completed') {
        setTotalScore(data.total_score);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  useEffect(() => {
    getQuestion(); // Initial fetch when the component mounts
  }, [cid, lid]);

  return (
    <div>
      {question && (
        <div>
          <p>{question.question}</p>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={choice}
                    checked={userAnswer === choice}
                    onChange={() => setUserAnswer(choice)}
                  />
                  {choice}
                </label>
              </li>
            ))}
          </ul>
          {isCorrect !== null && (
            <p>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
          )}
          <button onClick={submitAnswer}>Submit Answer</button>
        </div>
      )}
      {totalScore !== null && <p>Total Score: {totalScore}</p>}
    </div>
  );
};

export default Quiz;
