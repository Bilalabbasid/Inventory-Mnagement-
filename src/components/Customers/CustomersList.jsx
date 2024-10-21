import React, { useState, useEffect, useRef } from 'react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../api/api';
import styles from './CustomersList.module.css';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [updateData, setUpdateData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const updateMenuRef = useRef(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await fetchCustomers();
      if (response.data && response.data.length > 0) {
        setCustomers(response.data);
      } else {
        setCustomers([]); // No customers available
      }
    } catch (error) {
      setError('Error fetching customers. Please try again.');
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) return;
    setError('');

    try {
      await createCustomer(newCustomer);
      setNewCustomer({ name: '', email: '', phone: '' }); // Clear the input fields
      loadCustomers(); // Refresh the list of customers
    } catch (error) {
      setError('Error creating customer. Please try again.');
      console.error('Error creating customer:', error);
    }
  };

  const handleUpdate = async (id) => {
    if (!updateData.name || !updateData.email || !updateData.phone) return;
    setError('');

    try {
      await updateCustomer(id, updateData);
      setUpdateData({ name: '', email: '', phone: '' }); // Clear update fields
      setSelectedCustomer(null); // Deselect the customer
      loadCustomers(); // Refresh the list
    } catch (error) {
      setError('Error updating customer. Please try again.');
      console.error('Error updating customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      loadCustomers(); // Refresh the list after deletion
    } catch (error) {
      setError('Error deleting customer. Please try again.');
      console.error('Error deleting customer:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (updateMenuRef.current && !updateMenuRef.current.contains(event.target)) {
      setSelectedCustomer(null); // Close the update menu
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customersList}>
      <h2 className={styles.heading}>Customers</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.createCustomer}>
        <input
          type="text"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          placeholder="Customer Name"
          className={styles.input}
          aria-label="Customer Name"
        />
        <input
          type="email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          placeholder="Email"
          className={styles.input}
          aria-label="Customer Email"
        />
        <input
          type="text"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          placeholder="Phone"
          className={styles.input}
          aria-label="Customer Phone"
        />
        <button
          onClick={handleCreate}
          className={styles.createButton}
          disabled={!newCustomer.name || !newCustomer.email || !newCustomer.phone}
        >
          Create Customer
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.customerList}>
          {customers.map((customer) => (
            <li key={customer.id} className={`${styles.customerCard} ${(selectedCustomer === customer.id) ? styles.active : ''}`}>
              <span
                onClick={() => setSelectedCustomer(customer.id)}
                className={styles.customerName}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedCustomer(customer.id); }}
              >
                {customer.name} ({customer.email}, {customer.phone})
              </span>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setUpdateData({ name: customer.name, email: customer.email, phone: customer.phone });
                  }}
                  className={styles.updateButton}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(customer.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>

              {/* Update Menu */}
              {selectedCustomer === customer.id && (
                <div ref={updateMenuRef} className={styles.updateMenu}>
                  <input
                    type="text"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                    placeholder="Customer Name"
                    className={styles.input}
                  />
                  <input
                    type="email"
                    value={updateData.email}
                    onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                    placeholder="Email"
                    className={styles.input}
                  />
                  <input
                    type="text"
                    value={updateData.phone}
                    onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })}
                    placeholder="Phone"
                    className={styles.input}
                  />
                  <button onClick={() => handleUpdate(customer.id)} className={styles.saveButton}>
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

export default CustomersList;
