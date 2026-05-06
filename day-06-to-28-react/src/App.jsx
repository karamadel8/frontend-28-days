import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Day06 from "./pages/Day06";
import Day07 from "./pages/Day07";
import Day08 from "./pages/Day08";
import Day09 from "./pages/Day09";
import Day10 from "./pages/Day10/Index";
import Recipedetails from "./pages/Day10/Recipedetails";
import Day11 from "./pages/Day11";
import Day12 from "./pages/Day12";
import Day13 from "./pages/Day13";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day-06" element={<Day06 />} />
      <Route path="/day-07" element={<Day07 />} />
      <Route path="/day-08" element={<Day08 />} />
      <Route path="/day-09" element={<Day09 />} />
      <Route path="/day-10" element={<Day10 />} />
      <Route path="/day-10/:id" element={<Recipedetails />} />
      <Route path="/day-11" element={<Day11 />} />
      <Route path="/day-12" element={<Day12 />} />
      <Route path="/day-13" element={<Day13 />} />
    </Routes>
  );
}

export default App;
