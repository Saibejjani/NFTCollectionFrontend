import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./routes/Home/Home";
import Navbar from "./routes/Navbar/Navbar";

const App = () => {
  return (
    <Routes Routes >
      <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
      </Route>
    </Routes>
  );





}

export default App;
