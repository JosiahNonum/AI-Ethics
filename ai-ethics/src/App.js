import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import components 
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import AIGlossary from "./aiGlossary";
import Homepage from "./components/homepage";
import UserProfile from "./UserProfile";
import LoginForm from "./Loginform";
import Registration from "./Registration";
import { auth } from './firebase';
import Lessons from "./components/lessons";
import Leaderboard from "./components/leaderboard";
import Welcome from "./components/welcome";
import Account from "./components/account";
import Help from "./components/help";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} /> 
      <Route path="/register" element={<Registration />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/account" element={<Account />} />
    </Routes>
    <Sidebar />
    <div className="main-content-area">
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/modules" element={<Lessons />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/Userprofile" element={<UserProfile />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/help" element={<Help />} />
      <Route path="/logout" element={<h1>Logout</h1>} />
      <Route path="/databaseTest" element={<DatabaseManTester />} />
      <Route path="/ai-term-glossary" element={<AIGlossary />} />
    </Routes>
    </div>
  </Router>
  );
}

export default App;
