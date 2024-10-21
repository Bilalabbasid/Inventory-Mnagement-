import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWarehouses, createWarehouse, updateWarehouse, deleteWarehouse } from '../../api/api';
import styles from './WarehouseForm.module.css';

const WarehouseForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', location: '' });
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [updateData, setUpdateData] = useState({ name: '', location: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const updateMenuRef = useRef(null);

  useEffect(() => {
    loadWarehouses();
  }, []);

  const loadWarehouses = async () => {
    setLoading(true);
    try {
      const response = await fetchWarehouses();
      if (response.data && response.data.length > 0) {
        setWarehouses(response.data);
      } else {
        // Set default warehouses if no data is fetched
        setWarehouses([
          { id: 1, name: 'Lahore Warehouse', location: 'lahore' },
          { id: 2, name: 'Karachi Warehouse', location: 'karachi' },
          { id: 3, name: 'Islamabad Warehouse', location: 'islamabad' },
        ]);
      }
    } catch (error) {
      setError('Error fetching warehouses. Please try again.');
      console.error('Error fetching warehouses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newWarehouse.name || !newWarehouse.location) return;
    setError('');

    try {
      await createWarehouse(newWarehouse);
      setNewWarehouse({ name: '', location: '' }); // Clear the input fields
      loadWarehouses(); // Refresh the list of warehouses
    } catch (error) {
      setError('Error creating warehouse. Please try again.');
      console.error('Error creating warehouse:', error);
    }
  };

  const handleUpdate = async (id) => {
    if (!updateData.name || !updateData.location) return;
    setError('');

    try {
      await updateWarehouse(id, updateData);
      setUpdateData({ name: '', location: '' }); // Clear update fields
      setSelectedWarehouse(null); // Deselect the warehouse
      loadWarehouses(); // Refresh the list
    } catch (error) {
      setError('Error updating warehouse. Please try again.');
      console.error('Error updating warehouse:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWarehouse(id);
      loadWarehouses(); // Refresh the list after deletion
    } catch (error) {
      setError('Error deleting warehouse. Please try again.');
      console.error('Error deleting warehouse:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (updateMenuRef.current && !updateMenuRef.current.contains(event.target)) {
      setSelectedWarehouse(null); // Close the update menu
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewClick = (location) => {
    navigate(`/warehouses/${location}`); // Navigate to the specific warehouse route
  };

  return (
    <div className={styles.warehouseForm}>
      <h2 className={styles.heading}>Warehouses</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.createWarehouse}>
        <input
          type="text"
          value={newWarehouse.name}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
          placeholder="Warehouse Name"
          className={styles.input}
          aria-label="Warehouse Name"
        />
        <input
          type="text"
          value={newWarehouse.location}
          onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
          placeholder="Location"
          className={styles.input}
          aria-label="Warehouse Location"
        />
        <button
          onClick={handleCreate}
          className={styles.createButton}
          disabled={!newWarehouse.name || !newWarehouse.location}
        >
          Create Warehouse
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.warehouseList}>
          {warehouses.map((warehouse) => (
            <li key={warehouse.id} className={`${styles.warehouseCard} ${(selectedWarehouse === warehouse.id) ? styles.active : ''}`}>
              <span
                onClick={() => setSelectedWarehouse(warehouse.id)}
                className={styles.warehouseName}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedWarehouse(warehouse.id); }}
              >
                {warehouse.name} ({warehouse.location})
              </span>
              <div className={styles.buttonGroup}>
                <button 
                  onClick={() => handleViewClick(warehouse.location)} // Handle view click
                  className={styles.viewButton}
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setSelectedWarehouse(warehouse.id);
                    setUpdateData({ name: warehouse.name, location: warehouse.location });
                  }}
                  className={styles.updateButton}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(warehouse.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>

              {/* Update Menu */}
              {selectedWarehouse === warehouse.id && (
                <div ref={updateMenuRef} className={styles.updateMenu}>
                  <input
                    type="text"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                    placeholder="Warehouse Name"
                    className={styles.input}
                  />
                  <input
                    type="text"
                    value={updateData.location}
                    onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                    placeholder="Location"
                    className={styles.input}
                  />
                  <button onClick={() => handleUpdate(warehouse.id)} className={styles.saveButton}>
                    Save
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WarehouseForm;
