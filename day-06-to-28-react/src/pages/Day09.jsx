import { useEffect, useState } from "react";

const Day09 = () => {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(16);
  const [uppercase, setuppercase] = useState(true);
  const [lowercase, setlowercase] = useState(true);
  const [numbers, setnumbers] = useState(true);
  const [symbols, setsymbols] = useState(true);
  const [copied, setcopied] = useState(false);
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const generatepassword = () => {
    let chars = "";
    if (uppercase) chars += uppercaseChars;
    if (lowercase) chars += lowercaseChars;
    if (numbers) chars += numberChars;
    if (symbols) chars += symbolChars;
    if (chars === "") return;
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomindex = Math.floor(Math.random() * chars.length);
      result += chars[randomindex];
    }
    setpassword(result);
    setcopied(false);
  };
  const getstrength = () => {
    let score = 0;
    if (length > 8) score++;
    if (length > 12) score++;
    if (length > 16) score++;
    if (uppercase) score++;
    if (lowercase) score++;
    if (numbers) score++;
    if (symbols) score++;
    if (score < 2)
      return { label: "weak", color: "bg-red-500", width: "w-1/4" };
    if (score < 4)
      return { label: "fair", color: "bg-yellow-500", width: "w-2/4" };
    if (score < 6)
      return { label: "good", color: "bg-blue-500", width: "w-3/4" };
    return { label: "strong", color: "bg-green-500", width: "w-full" };
  };
  const strength = getstrength();
  const copytoclipboard = () => {
    if (password === "") return;
    navigator.clipboard.writeText(password);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  };
  useEffect(() => {
    generatepassword();
  }, []);
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-sm w-full bg-gray-100 rounded-2xl p-6 border-2 border-gray-100">
        <div className="bg-blue-800 text-center rounded-xl p-4 mb-4">
          <h1 className="text-xl font-semibold text-white">
            Password Generator
          </h1>
          <p className="text-sm text-gray-300">
            Generate secure passwords instantly
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3 flex justify-between items-center">
          <span className="text-blue-800 font-mono text-sm break-all flex-1 mr-2 p-2">
            {password || "Click generate ..."}
          </span>
          <button
            onClick={copytoclipboard}
            className={`p-2 rounded-lg text-sm cursor-pointer hover:bg-blue-700 transition-all duration-200 ${copied ? "bg-green-600" : "bg-blue-800"} text-white`}
          >
            {copied ? "copied!" : "copy"}
          </button>
        </div>
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-gray-500 text-sm">strength</span>
            <span
              className={`text-sm font-semibold ${strength.label === "weak" ? "text-red-500" : strength.label === "fair" ? "text-yellow-500" : strength.label === "good" ? "text-blue-500" : "text-green-500"}`}
            >
              {strength.label}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 transition-all duration-700 rounded-full ${strength.color}  ${strength.width} `}
            ></div>
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl mb-3">
          <div className="flex justify-between items-center ">
            <span className="text-sm text-gray-600">password length</span>
            <span className="text-sm text-gray-600">{length}</span>
          </div>
          <div className="p-2">
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setlength(Number(e.target.value))}
              className="w-full accent-blue-800  "
            />
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-3 shadow-sm rounded-xl mb-3 text-sm text-gray-600 leading-loose">
          <div className="flex justify-between items-center border-b border-b-gray-200  ">
            <label>Uppercase Letters (A-Z)</label>
            <div
              onClick={() => setuppercase(!uppercase)}
              className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${uppercase ? "bg-blue-800" : "bg-gray-300"} `}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-500 ${uppercase ? "left-5.5" : "left-0.5"}`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-200  ">
            <label>Lowercase Letters (a-z)</label>
            <div
              onClick={() => setlowercase(!lowercase)}
              className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${lowercase ? "bg-blue-800" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-500 ${lowercase ? "left-5.5" : "left-0.5"}`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center border-b border-b-gray-200  ">
            <label>Numbers (0-9)</label>
            <div
              onClick={() => setnumbers(!numbers)}
              className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${numbers ? "bg-blue-800" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-500 ${numbers ? "left-5.5" : "left-0.5"}`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center  ">
            <label>Symbols (!@#$%)</label>
            <div
              onClick={() => setsymbols(!symbols)}
              className={`w-10 h-5 rounded-full cursor-pointer transition-colors relative ${symbols ? "bg-blue-800" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-500 ${symbols ? "left-5.5" : "left-0.5"}`}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-xl text-center p-3 mb-3 transition duration-200 hover:bg-blue-700 cursor-pointer ">
          <button
            className="cursor-pointer text-sm font-semibold text-gray-100"
            onClick={generatepassword}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day09;
