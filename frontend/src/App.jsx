import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Movie_Offers from "./components/Movie_offers";
import Fashion_Offers from "./components/Fashion_offers";
import Food_Offers from "./components/Food_offers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Navigate to="/movie-offers" replace />} />
      <Route path="/movie-offers" element={<Movie_Offers />} />
      <Route path="/fashion-deals" element={<Fashion_Offers />} />
      <Route path="/food-specials" element={<Food_Offers />} />
    </Routes>
  );
}

export default App;