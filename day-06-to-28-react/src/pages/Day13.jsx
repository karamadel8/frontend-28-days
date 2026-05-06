import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const Day13 = () => {
  const [copied, setcopied] = useState(false);
  const [text, settext] = useState(() => {
    return localStorage.getItem("markdown") || "";
  });
  const handlechange = (e) => {
    settext(e.target.value);
    localStorage.setItem("markdown", e.target.value);
  };
  const clear = () => {
    settext("");
    localStorage.removeItem("markdown");
  };
  const copy = () => {
    navigator.clipboard.writeText(text);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-lg overflow-hidden ">
        <div className="flex items-center justify-between bg-blue-800 p-4 rounded-t-2xl">
          <h1 className="text-lg text-white font-semibold">
            📝 Markdown Previewer
          </h1>
          <div>
            <button
              className="bg-white/20 border border-blue-800 px-3 py-1 rounded-lg text-white text-sm cursor-pointer mr-2 transition-all duration-200 hover:bg-white hover:text-blue-800"
              onClick={clear}
            >
              clear
            </button>
            <button
              className="bg-white/20 border border-blue-800 px-3 py-1 rounded-lg text-white text-sm cursor-pointer mr-2 transition-all duration-200 hover:bg-white hover:text-blue-800"
              onClick={copy}
            >
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="">
            <div className="flex justify-between items-center bg-gray-50  border-b border-gray-200 p-2 ">
              <p className="text-sm  text-gray-500">Editor</p>
              <p className="text-blue-800 bg-blue-100 rounded-lg text-xs font-medium p-1">
                Markdown
              </p>
            </div>
            <div>
              <textarea
                className="w-full h-80 bg-gray-50 p-3 text-sm font-mono resize-none focus:outline-none text-gray-700"
                value={text}
                placeholder="Type your markdown here..."
                onChange={(e) => handlechange(e)}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center bg-gray-50  border-b border-gray-200 p-2 ">
              <p className="text-sm  text-gray-500">Preview</p>
              <p className="text-blue-800 bg-blue-100 rounded-lg text-xs font-medium p-1">
                HTML
              </p>
            </div>
            <div className="prose prose-sm max-w-none h-80 w-full overflow-y-auto p-3">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-b-2xl border-t border-gray-200 text-xs text-gray-400">
          <p>words:{text.split(" ").filter((w) => w !== "").length}</p>
          <p>charachter:{text.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Day13;
