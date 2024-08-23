import React from "react";
import "./styles/main.css";

import Home from "./pages/Home";
import Tests from "./pages/Tests";
import CreatePost from "./pages/CreatePost";
import UserRegister from "./pages/LoginReg";
//import CreatePost from "./pages/new";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <header className="app-header">
      <Router>
        <Link to="/home"> Home Page</Link>
        <Link to="/tests"> Tests Page</Link>
        <Link to="/createpost"> Createpost Page</Link>
        <Link to="/register"> Register</Link>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </Router>

      </header>
    </div>
  );
}

export default App;