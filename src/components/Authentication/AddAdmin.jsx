import React, { useState } from 'react';
import { signUp } from '../../api/api'; // Ensure the correct path to your API module
import styles from './AddAdmin.module.css';

const AddAdmin = () => {
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    role: '',
    warehouseId: 0,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: name === 'warehouseId' ? Number(value) : value, // Ensure warehouseId is a number
    }));
  };

  const handleSignUp = async () => {
    const { email, password, role, warehouseId } = newAdmin;

    // Validate input fields
    if (!email || !password || !role || warehouseId <= 0) {
      setError('Please fill in all fields with valid information.');
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      // Call the signUp API function
      await signUp(newAdmin);
      setSuccessMessage('New admin successfully added!');
      setNewAdmin({
        email: '',
        password: '',
        role: '',
        warehouseId: 0,
      }); // Clear the form fields after successful submission
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding new admin. Please try again.';
      setError(errorMessage);
      console.error('Error adding admin:', error);
    }
  };

  return (
    <div className={styles.addAdmin}>
      <h2 className={styles.heading}>Add New Admin</h2>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={newAdmin.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={newAdmin.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          value={newAdmin.role}
          onChange={handleInputChange}
          placeholder="Enter role (e.g. Admin)"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="warehouseId">Warehouse ID</label>
        <input
          type="number"
          name="warehouseId"
          value={newAdmin.warehouseId}
          onChange={handleInputChange}
          placeholder="Enter Warehouse ID"
          className={styles.input}
        />
      </div>

      <button onClick={handleSignUp} className={styles.submitButton}>
        Add Admin
      </button>
    </div>
  );
};

export default AddAdmin;
