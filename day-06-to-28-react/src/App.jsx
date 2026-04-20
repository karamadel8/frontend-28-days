import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Day06 from "./pages/Day06";
import Day07 from "./pages/Day07";
import Day08 from "./pages/Day08";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Day06" element={<Day06 />} />
      <Route path="/Day07" element={<Day07 />} />
      <Route path="/Day08" element={<Day08 />} />
    </Routes>
  );
}

export default App;
