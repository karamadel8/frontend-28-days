import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Day06 from "./pages/Day06";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Day06" element={<Day06 />} />
    </Routes>
  );
}

export default App;
