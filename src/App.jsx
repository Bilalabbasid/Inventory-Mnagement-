import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Authentication/Login';
import AddAdmin from './components/Authentication/AddAdmin'; // Correctly import AddAdmin component
import ResetPassword from './components/Authentication/ResetPassword';
import CustomersList from './components/Customers/CustomersList';
import WarehouseList from './components/Warehouse/WarehouseList';
import WeatherForecast from './components/Weather/WeatherForecast';
import LahoreWarehouse from './components/Warehouse/LahoreWarehouse';
import KarachiWarehouse from './components/Warehouse/KarachiWarehouse';
import IslamabadWarehouse from './components/Warehouse/IslamabadWarehouse';
import MeterTypesList from './components/MeterTypes/MeterTypesList';
import WarehouseForm from './components/Warehouse/WarehouseForm';
import StocksList from './components/Stock/StockList'; 
import SalesList from './components/Sales/Sales'; 
import Invoice from './components/Invoice/Invoice'; 

const App = () => {
  const location = useLocation();

  // Hide Navbar for specific routes
  const showNavbar = !['/', '/signup', '/reset-password'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<AddAdmin />} /> {/* Add admin route */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/stocks" element={<StocksList />} />
        <Route path="/warehouses" element={<WarehouseList />} />
        <Route path="/warehouses/form" element={<WarehouseForm />} /> {/* Warehouse form route */}
        <Route path="/warehouses/:id" element={<WarehouseForm />} /> {/* Route for editing a warehouse */}

        {/* Warehouse-specific routes */}
        <Route path="/warehouses/lahore" element={<LahoreWarehouse />} />
        <Route path="/warehouses/karachi" element={<KarachiWarehouse />} />
        <Route path="/warehouses/islamabad" element={<IslamabadWarehouse />} />

        <Route path="/weather" element={<WeatherForecast />} />
        <Route path="/meter-type" element={<MeterTypesList />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </div>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
