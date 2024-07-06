import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MyComponent from './components/MyComponent';

function App() {
  return (
    <div className="App">
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">Home</Link>
          </li>
          <li>
            <Link to="/test" className="text-white">My Component</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/test" element={<MyComponent />} />
      </Routes>
    </div>
  );
}

export default App;
