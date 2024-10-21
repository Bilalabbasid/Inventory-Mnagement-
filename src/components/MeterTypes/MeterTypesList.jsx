import React, { useState, useEffect } from 'react';
import { fetchMeterTypes, createMeterType, updateMeterType, deleteMeterType } from '../../api/api';
import styles from './MeterTypes.module.css';

function MeterTypesList() {
  const [meterTypes, setMeterTypes] = useState([]);
  const [newMeterType, setNewMeterType] = useState('');
  const [selectedMeterType, setSelectedMeterType] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [fetchedMeterType, setFetchedMeterType] = useState(null); 
  const [viewedMeterTypeId, setViewedMeterTypeId] = useState(null); 

  useEffect(() => {
    const getMeterTypes = async () => {
      try {
        const response = await fetchMeterTypes();
        setMeterTypes(response.data);
      } catch (error) {
        console.error('Error fetching meter types:', error);
      }
    };
    getMeterTypes();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await createMeterType({ name: newMeterType });
      setMeterTypes([...meterTypes, response.data]);
      setNewMeterType('');
    } catch (error) {
      console.error('Error creating meter type:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateMeterType(id, { name: updateName });
      const updatedMeterTypes = meterTypes.map((meterType) =>
        meterType.id === id ? { ...meterType, name: updateName } : meterType
      );
      setMeterTypes(updatedMeterTypes);
      setSelectedMeterType(null);
      setUpdateName('');
    } catch (error) {
      console.error('Error updating meter type:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMeterType(id);
      setMeterTypes(meterTypes.filter((meterType) => meterType.id !== id));
    } catch (error) {
      console.error('Error deleting meter type:', error);
    }
  };

  const handleFetchMeterType = async (id) => {
    // Toggle: close details if the same ID is clicked again
    if (viewedMeterTypeId === id) {
      setViewedMeterTypeId(null);
      setFetchedMeterType(null);
      return;
    }

    try {
      const response = await fetchMeterTypes(); // Fetch all meter types
      const selectedType = response.data.find(type => type.id === id); // Find the specific meter type by ID
      setFetchedMeterType(selectedType); // Set the fetched meter type
      setViewedMeterTypeId(id); // Track which meter type ID is being viewed
    } catch (error) {
      console.error('Error fetching meter type by id:', error);
    }
  };

  return (
    <div className={styles.meterTypesList}>
      <h2 className={styles.heading}>Meter Types</h2>

      <div className={styles.createMeterType}>
        <input
          type="text"
          value={newMeterType}
          onChange={(e) => setNewMeterType(e.target.value)}
          placeholder="New Meter Type"
          className={styles.input}
        />
        <button onClick={handleCreate} className={styles.createButton}>Create Meter Type</button>
      </div>

      <ul className={styles.meterTypesList}>
        {meterTypes.map((meterType) => (
          <li key={meterType.id} className={`${styles.meterTypeCard} ${(viewedMeterTypeId === meterType.id || selectedMeterType === meterType.id) ? styles.active : ''}`}>
            <span>{meterType.name}</span>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => handleFetchMeterType(meterType.id)}
                className={styles.viewButton}
              >
                View
              </button>
              <button onClick={() => {
                setSelectedMeterType(meterType.id);
                setUpdateName(meterType.name);
              }} className={styles.updateButton}>Update</button>
              <button onClick={() => handleDelete(meterType.id)} className={styles.deleteButton}>Delete</button>
            </div>

            {/* Update Menu */}
            {selectedMeterType === meterType.id && (
              <div className={styles.updateMenu}>
                <input
                  type="text"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  placeholder="Update Meter Type Name"
                  className={styles.input}
                />
                <button onClick={() => handleUpdate(meterType.id)} className={styles.createButton}>Save</button>
              </div>
            )}

            {/* View Details */}
            {fetchedMeterType && viewedMeterTypeId === meterType.id && (
              <div className={styles.fetchedMeterTypeDetails}>
                <h3>Details:</h3>
                <p>ID: {fetchedMeterType.id}</p>
                <p>Name: {fetchedMeterType.name}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeterTypesList;
