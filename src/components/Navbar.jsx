import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaHome, FaWarehouse, FaUser, FaCog } from 'react-icons/fa';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          <FaBars size={30} />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/warehouses">
              <FaHome className="icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/warehouses/lahore">
              <FaWarehouse className="icon" /> Lahore Warehouse
            </Link>
          </li>
          <li>
            <Link to="/warehouses/karachi">
              <FaWarehouse className="icon" /> Karachi Warehouse
            </Link>
          </li>
          <li>
            <Link to="/warehouses/islamabad">
              <FaWarehouse className="icon" /> Islamabad Warehouse
            </Link>
          </li>
          {/* <li>
            <Link to="/account">
              <FaUser className="icon" /> Account
            </Link>
          </li> */}
          {/* <li>
            <Link to="/settings">
              <FaCog className="icon" /> Settings
            </Link>
          </li> */}
        </ul>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
