import React from 'react';
import './App.css';
import Home from './components/Home';
import RepoDetails from './components/RepoDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
