import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WarehouseList.css';

const WarehouseList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const mockCards = [
          { id: 1, name: 'Warehouse List', description: 'Manage warehouses', path: '/warehouses/form', color: 'red' },
          { id: 2, name: 'Meter Type', description: 'View meter types', path: '/meter-type', color: 'green' },
          { id: 3, name: 'Customer', description: 'Customer management', path: '/customers', color: 'orange' },
          { id: 4, name: 'Stock', description: 'View stock details', path: '/stocks', color: 'blue' },
          { id: 5, name: 'Sales', description: 'Sales information', path: '/sales', color: 'purple' },
          { id: 6, name: 'Invoice', description: 'Manage invoices', path: '/invoice', color: 'yellow' },
          { id: 7, name: 'Add Admin', description: 'Add a new admin', path: '/signup', color: 'red' },
          { id: 8, name: 'Purchase Order', description: 'Manage purchase orders', path: '/purchase-order', color: 'green' },
          { id: 9, name: 'Quotation Management', description: 'Manage quotations', path: '/quotation-management', color: 'orange' },
          { id: 10, name: 'Report Generation', description: 'Generate reports', path: '/report-generation', color: 'blue' },
        ];
        setCards(mockCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    getCards();
  }, []);

  return (
    <div className="warehouse-list">
      <h1 className="main-heading">Management Dashboard</h1>
      <div className="warehouse-cards">
        {cards.map((card) => (
          <Link key={card.id} to={card.path} className={`warehouse-card ${card.color}`}>
            <div className="warehouse-content">
              <h2>{card.name}</h2>
              <p>{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WarehouseList;
