import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParentInput from './components/ParentInput';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParentInput />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;