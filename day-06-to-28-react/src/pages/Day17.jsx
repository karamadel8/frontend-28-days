import { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeleft, settimelef] = useState(1500);
  const [totalsec, settotalsec] = useState(1500);
  const [isrunning, setisrunning] = useState(false);
  const [mode, setmode] = useState("work");
  const [work, setwork] = useState(25);
  const [Sbreak, setSbreak] = useState(5);
  const [Lbreak, setLbreak] = useState(15);
  const [count, setcount] = useState(1);
  const [pomodoros, setpomodoros] = useState(0);
  const min = String(Math.floor(timeleft / 60)).padStart(2, "0");
  const sec = String(timeleft % 60).padStart(2, "0");
  const progress = (1 - timeleft / totalsec) * 100;
  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine"; // Type of sound wave
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5); // Play for 0.5 seconds
  };
  const play = () => {
    isrunning === true ? setisrunning(false) : setisrunning(true);
  };
  const reset = () => {
    if (mode === "work") {
      settimelef(1500);
      settotalsec(1500);
    } else if (mode === "shortBreak") {
      settimelef(300);
      settotalsec(300);
    } else {
      settimelef(900);
      settotalsec(900);
    }
  };
  const nextsession = () => {
    if (mode === "work") {
      if (count !== 4) {
        setmode("shortBreak");
        setcount((prev) => prev + 1);
        setpomodoros((prev) => prev + 1);
        settimelef(Sbreak * 60);
        settotalsec(Sbreak * 60);
      } else {
        setmode("longBreak");
        setcount(1);
        settimelef(Lbreak * 60);
        settotalsec(Lbreak * 60);
      }
    } else {
      setmode("work");
      settimelef(work * 60);
      settotalsec(work * 60);
    }
  };
  useEffect(() => {
    if (!isrunning) return;

    const interval = setInterval(() => {
      settimelef((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isrunning]);
  useEffect(() => {
    if (timeleft !== 0) return;
    playBeep();
    setTimeout(() => {
      nextsession();
    }, 0);
  }, [timeleft, mode, count, work, Sbreak, Lbreak]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-sm w-full bg-gray-900 border border-gray-200 rounded-2xl">
        <div
          className={` p-4 rounded-t-2xl ${
            mode === "work"
              ? "bg-blue-800"
              : mode === "shortBreak"
                ? "bg-green-800"
                : "bg-purple-800"
          }`}
        >
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setmode("work");
                settimelef(work * 60);
                settotalsec(work * 60);
              }}
              className={`text-sm font-semibold px-3 py-1.5  rounded-2xl cursor-pointer ${mode === "work" ? "bg-gray-400/60 text-gray-100 " : "bg-gray-400/30 text-gray-300/80"}`}
            >
              🍅 Work
            </button>
            <button
              onClick={() => {
                setmode("shortBreak");
                settimelef(Sbreak * 60);
                settotalsec(Sbreak * 60);
              }}
              className={`text-sm font-semibold px-3 py-1.5  rounded-2xl cursor-pointer ${mode === "shortBreak" ? "bg-gray-400/60 text-gray-100 " : "bg-gray-400/30 text-gray-300/80"}`}
            >
              ☕ Short Break
            </button>
            <button
              onClick={() => {
                setmode("longBreak");
                settimelef(Lbreak * 60);
                settotalsec(Lbreak * 60);
              }}
              className={`text-sm font-semibold px-3 py-1.5  rounded-2xl cursor-pointer ${mode === "longBreak" ? "bg-gray-400/60 text-gray-100 " : "bg-gray-400/30 text-gray-300/80"}`}
            >
              🌴 Long Break
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div
              className="w-52 h-52 rounded-full flex items-center justify-center p-2"
              style={{
                background: `conic-gradient(
                white ${progress}%, 
                rgba(255,255,255,0.15) ${progress}%
            )`,
              }}
            >
              <div
                className={`w-48 h-48  rounded-full flex items-center justify-center p-2 ${mode === "work" ? "bg-blue-900" : "bg-green-900"}`}
              >
                <div className="text-center">
                  <p className="text-4xl font-bold text-white block tracking-widest">
                    {min} : {sec}
                  </p>
                  <p className="text-xs text-gray-300 ">
                    {mode === "work" ? "Focus Time" : "Break Time"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3 mb-2">
            {[1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className={`w-2.5 h-2.5 rounded-full ${
                  dot < count ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={reset}
              className="w-12 h-12 rounded-full bg-gray-400/30 text-white text-xl cursor-pointer"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button
              onClick={play}
              className={`w-12 h-12 rounded-full ${isrunning ? "bg-white text-blue-800 w-15 h-15" : "bg-gray-400/30 text-white"}  text-xl cursor-pointer`}
            >
              <i
                className={`fa-solid ${isrunning ? "fa-pause" : "fa-play"}`}
              ></i>
            </button>
            <button
              className="w-12 h-12 rounded-full bg-gray-400/30 text-white text-xl cursor-pointer"
              onClick={nextsession}
            >
              <i className="fa-solid fa-forward-step"></i>
            </button>
          </div>
          <p className="text-center text-sm text-gray-300">{`${mode === "work" ? `session ${count} of 4` : "Take a rest! Back to work soon ☕"}`}</p>
        </div>
        <div className="p-2 mt-2">
          <h2 className="text-gray-400 text-lg font-semibold">⚙️ Settings</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-center">
              <h2 className="text-white text-center">work</h2>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    const newworktime = work - 1;
                    setwork(newworktime);
                    if (mode === "work") {
                      settimelef(newworktime * 60);
                      settotalsec(newworktime * 60);
                    }
                  }}
                >
                  -
                </button>
                <span className="text-white font-bold w-6 text-center">
                  {work}
                </span>

                <button
                  className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    const newworktime = work + 1;
                    setwork(newworktime);
                    if (mode === "work") {
                      settimelef(newworktime * 60);
                      settotalsec(newworktime * 60);
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-center">
              <h2 className="text-white text-center">Short Break</h2>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    const newsbreaktime = Sbreak - 1;
                    setSbreak(newsbreaktime);
                    if (mode === "shortBreak") {
                      settimelef(newsbreaktime * 60);
                      settotalsec(newsbreaktime * 60);
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={Sbreak}
                  className="text-white outline-none  w-5 text-center"
                />
                <button
                  className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    const newsbreaktime = Sbreak + 1;
                    setSbreak(newsbreaktime);
                    if (mode === "shortBreak") {
                      settimelef(newsbreaktime * 60);
                      settotalsec(newsbreaktime * 60);
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-center">
              <h2 className="text-white text-center">Long Break</h2>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    const newlbreaktime = Lbreak - 1;
                    setLbreak(newlbreaktime);
                    if (mode === "longBreak") {
                      settimelef(newlbreaktime * 60);
                      settotalsec(newlbreaktime * 60);
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  readOnly
                  value={Lbreak}
                  className="text-white outline-none  w-5 text-center"
                />
                <button
                  className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center hover:bg-gray-600 cursor-pointer"
                  onClick={() => {
                    const newlbreaktime = Lbreak + 1;
                    setLbreak(newlbreaktime);
                    if (mode === "longBreak") {
                      settimelef(newlbreaktime * 60);
                      settotalsec(newlbreaktime * 60);
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 border-t border-gray-600 mt-2">
          <h2 className=" text-gray-400 text-lg font-semibold">
            📊 Today's Stats
          </h2>
          <div className="flex items-center justify-center gap-2 p-4">
            <div className="bg-gray-800 border rounded-xl p-3 flex-1">
              <p className="text-white text-xl text-center">🍅 {pomodoros}</p>
              <p className="text-xs text-center text-gray-500">Pomodoros</p>
            </div>
            <div className="bg-gray-800 border rounded-xl p-3 flex-1">
              <p className="text-white text-xl text-center">
                ⏱{(pomodoros * work) / 60} h
              </p>
              <p className="text-xs text-center text-gray-500">Focus Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
