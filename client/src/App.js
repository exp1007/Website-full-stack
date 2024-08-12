import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Tests from "./pages/Tests";
//import CreatePost from "./pages/new";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Link to="/home"> Home Page</Link>
        <Link to="/tests"> Tests Page</Link>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
      </Router>

      </header>
    </div>
  );
}

export default App;