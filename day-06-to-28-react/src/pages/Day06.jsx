import { useState } from "react";
const Day06 = () => {
  const [count, setcount] = useState(0);
  const [step, setstep] = useState(1);
  const [history, sethistory] = useState([]);
  const increment = () => {
    setcount(count + step);
    sethistory([
      ...history,
      { action: "Incremented", step: `+${step}`, result: step + count },
    ]);
  };
  const decrement = () => {
    setcount(count - step);
    sethistory([
      ...history,
      { action: "Incremented", step: `-${step}`, result: count - step },
    ]);
  };
  const reset = () => {
    setcount(0);
    sethistory([...history, { action: "Reset", step: "0", result: 0 }]);
  };
  let status = "At Zero";
  if (count > 0) status = "Above Zero";
  if (count < 0) status = "Below Zero";
  const colorclass =
    count > 0 ? "text-green-500" : count < 0 ? "text-red-500" : "text-blue-500";
  return (
    <div className="min-h-screen bg-gray-100 p-8 max-w-sm w-full mx-auto rounded-4xl shadow-lg ">
      <div className="bg-white rounded-2xl shadow-lg text-center p-10 mb-6">
        <h1 className=" text-gray-500 mb-4">Counter</h1>
        <p className={`text-4xl font-bold mb-4 ${colorclass}`}>{count}</p>
        <p className=" text-gray-500">{status}</p>
      </div>
      <div className="flex items-center  mt-4 mb-4">
        <span className="text-gray-500">step:</span>
        <input
          type="number"
          value={step}
          onChange={(e) => setstep(Number(e.target.value))}
          className="text-center border-2 border-gray-300  rounded-xl bg-white p-2 ml-2 flex-1  "
        />
      </div>

      <div className="flex items-center justify-center gap-4 my-4">
        <button className="btn" onClick={decrement}>
          -
        </button>
        <button className="btn " onClick={reset}>
          Reset
        </button>
        <button className="btn " onClick={increment}>
          +
        </button>
      </div>
      <ul className="bg-white  border-gray-200 border-2 rounded-lg p-4 text-gray-500 font-semibold text-sm ">
        <h2 className="mb-2">History</h2>
        {history.length === 0 ? (
          <p className="text-center text-gray-400">No actions yet</p>
        ) : (
          [...history].reverse().map((item, index) => (
            <li
              key={index}
              className="flex justify-between border-b-2 border-b-gray-100 mb-2 p-0.5"
            >
              <span>{item.action}</span>
              <span className="text-blue-800">
                {item.action === "Reset"
                  ? `${item.result}`
                  : `${item.step} → ${item.result}`}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Day06;
