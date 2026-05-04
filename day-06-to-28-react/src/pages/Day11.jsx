import { useMemo } from "react";
import { useEffect, useState, useRef } from "react";

const Day11 = () => {
  const [quest, setquest] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [score, setscore] = useState(0);
  const [index, setindex] = useState(0);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [finished, setfinished] = useState(false);
  const order = quest.length > 0 ? ((index + 1) / quest.length) * 100 : 0;
  const decodehtml = (text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };

  const questfetch = async () => {
    setloading(true);
    seterror(null);
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple",
      );
      const data = await res.json();
      if (!data.results || data.results.length === 0)
        throw new Error("no questions");
      setquest(
        data.results.map((q) => ({
          ...q,
          category: decodehtml(q.category),
          question: decodehtml(q.question),
          correct_answer: decodehtml(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((a) => decodehtml(a)),
        })),
      );
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    questfetch();
  }, []);
  const currentQuestion = quest[index];
  const answers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);
  }, [index]);

  const handleanswer = (answer) => {
    if (selectedAnswer) return;
    setselectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      setscore(score + 1);
    }
  };
  const nextquest = () => {
    if (index + 1 >= quest.length) {
      setfinished(true);
    } else {
      setindex(index + 1);
      setselectedAnswer(null);
    }
  };
  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-sm w-full bg-white rounded-2xl border border-white p-10 text-center ">
          <p className="text-4xl">🏆</p>
          <h2 className="font-bold text-2xl mb-3">Quiz Complete! </h2>
          <p className="text-4xl text-blue-800 font-bold">
            {score}/{quest.length}
          </p>
          <p className="text-sm text-gray-600 mt-2">{`Great job! You scored  ${Math.round(order)} %`}</p>
          <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <div className="text-center bg-gray-100 border border-gray-100 rounded-xl p-4 ">
              <span className="text-green-600">{score}</span>
              <p className="text-sm font-semibold text-gray-500">Correct</p>
            </div>
            <div className="text-center bg-gray-100 border border-gray-100 rounded-xl p-4 ">
              <span className="text-red-600">{quest.length - score}</span>
              <p className="text-sm font-semibold text-gray-500">Wrong</p>
            </div>
            <div className="text-center bg-gray-100 border border-gray-100 rounded-xl p-4 ">
              <span className="text-black">{quest.length}</span>
              <p className="text-sm font-semibold text-gray-500">Total</p>
            </div>
            <div className="text-center bg-gray-100 border border-gray-100 rounded-xl p-4 ">
              <span className="text-blue-800">{Math.round(order)}%</span>
              <p className="text-sm font-semibold text-gray-500">Accuracy</p>
            </div>
          </div>
          <div className="p-2 bg-blue-800 text-center rounded-xl border border-blue-800  text-white cursor-pointer transition-all duration-200 hover:bg-blue-700">
            <button
              className="cursor-pointer"
              onClick={() => {
                setindex(0);
                setscore(0);
                setfinished(false);
                setselectedAnswer(null);
                questfetch();
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full bg-gray-50 rounded-2xl border border-gray-50 ">
        <div className="bg-blue-800 p-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-white text-xl font-semibold">🧠 Quiz App </h1>
            <p className="bg-white/20 text-white text-xs px-4 py-1 border border-blue-800 rounded-full font-semibold ">
              Score: {score}
            </p>
          </div>
          <div className="bg-white/20 w-full h-2 rounded-full">
            <div
              className={`h-2 bg-white  rounded-full transition-all duration-300`}
              style={{ width: `${order}%` }}
            ></div>
          </div>
          <div className="text-gray-200 text-xs font-semibold mt-2">
            Question {index + 1} of 10{" "}
          </div>
        </div>
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center bg-red-100 rounded-xl p-6 m-3">
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-gray-400 text-xs">Please check app later</p>
          </div>
        )}
        {quest.length > 0 && !error && (
          <div className="p-4">
            <h2 className="bg-blue-100 inline-block py-1 px-4 rounded-full border border-blue-300 text-sm font-semibold text-blue-800 m-4">
              {quest[index].category}
            </h2>
            <p className=" text-gray-800 text-sm font-medium leading-relaxed mb-2">
              {quest[index].question}
            </p>
            {answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleanswer(answer)}
                className={`w-full text-left p-3 rounded-xl border mb-2 transition duration-200 cursor-pointer text-sm text-gray-700 ${!selectedAnswer ? "border-gray-200 hover:border-blue-500 hover:bg-blue-50" : ""}${selectedAnswer && answer === currentQuestion.correct_answer ? "bg-green-100 border-green-500 text-green-700" : ""}${selectedAnswer && selectedAnswer === answer && answer !== currentQuestion.correct_answer ? "bg-red-100 border-red-500 text-red-700" : ""}`}
              >
                {answer}
              </button>
            ))}
          </div>
        )}

        <div
          className={`p-2 bg-blue-800 text-center rounded-xl border border-blue-800 m-4 text-white cursor-pointer transition-all duration-300 hover:bg-blue-700 ${selectedAnswer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
          onClick={nextquest}
        >
          <button onClick={nextquest} className="cursor-pointer">
            {index + 1 >= quest.length ? "See Results" : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day11;
