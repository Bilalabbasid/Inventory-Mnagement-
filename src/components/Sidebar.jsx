import React from 'react';
import './Sidebar.css'; // Ensure correct CSS import

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      <h2>Navigation</h2>
      <ul>
        <li><button onClick={() => console.log("Lahore")}>Lahore</button></li>
        <li><button onClick={() => console.log("Karachi")}>Karachi</button></li>
        <li><button onClick={() => console.log("Islamabad")}>Islamabad</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
