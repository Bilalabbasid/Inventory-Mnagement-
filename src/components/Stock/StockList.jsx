import React, { useState, useEffect } from 'react';
import styles from './StocksList.module.css'; // Import the CSS module

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [editStock, setEditStock] = useState(null);
  const [newStock, setNewStock] = useState({
    warehouseId: 0,
    meterTypeId: 0,
    quantity: 0,
    sold: 0,
    remaining: 0,
  });

  // Dummy stock data
  const dummyStocks = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    warehouseId: 1,
    meterTypeId: 1,
    quantity: Math.floor(Math.random() * 200) + 100,
    sold: Math.floor(Math.random() * 100),
    remaining: Math.floor(Math.random() * 100),
    name: `Meter ${index + 1}`,
    price: 4000 + index * 100, // Price from 4000 PKR to 4900 PKR
  }));

  // Simulate fetching stocks when component mounts
  useEffect(() => {
    const loadStocks = async () => {
      setTimeout(() => {
        setStocks(dummyStocks);
        setLoading(false);
      }, 1000);
    };
    loadStocks();
  }, []);

  // Create a new stock
  const handleCreateStock = async () => {
    try {
      if (newStock.warehouseId <= 0 || newStock.meterTypeId <= 0) {
        alert('Invalid warehouse or meter type ID.');
        return;
      }

      const newStockEntry = {
        ...newStock,
        id: stocks.length + 1, // Assign a new ID for the dummy data
        name: `Meter ${stocks.length + 1}`, // Example: Meter 11, Meter 12, etc.
        price: Math.floor(Math.random() * 100) + 4000, // Random price from 4000 PKR to 4900 PKR
      };
      setStocks([...stocks, newStockEntry]); // Update stocks list with the new stock
      setNewStock({
        warehouseId: 0,
        meterTypeId: 0,
        quantity: 0,
        sold: 0,
        remaining: 0,
      }); // Reset form fields
    } catch (error) {
      console.error('Error creating stock:', error.message);
      alert('Error creating stock: ' + error.message);
    }
  };

  // Delete stock
  const handleDeleteStock = async (id) => {
    try {
      const filteredStocks = stocks.filter((stock) => stock.id !== id);
      setStocks(filteredStocks); // Remove the deleted stock from the state
      setSelectedStock(null);
      setEditStock(null);
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  // Open edit menu
  const handleEditClick = (stock) => {
    if (editStock && editStock.id === stock.id) {
      // Close edit if already open
      setEditStock(null);
    } else {
      // Close view if open
      setSelectedStock(null);
      setEditStock(stock);
    }
  };

  // Open view menu
  const handleViewClick = (stock) => {
    if (selectedStock && selectedStock.id === stock.id) {
      // Close view if already open
      setSelectedStock(null);
    } else {
      // Close edit if open
      setEditStock(null);
      setSelectedStock(stock);
    }
  };

  // Update stock details
  const handleUpdateStock = async () => {
    if (editStock) {
      const updatedStocks = stocks.map((stock) =>
        stock.id === editStock.id ? editStock : stock
      );
      setStocks(updatedStocks);
      setEditStock(null);
    }
  };

  if (loading) return <p>Loading stocks...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stock List</h1>

      <ul className={styles.stockList}>
        {stocks.map((stock) => (
          <li key={stock.id} className={styles.stockItem}>
            <p>
              <span className={styles.stockName}>{stock.name}</span> - 
              PKR {stock.price} - Sold: {stock.sold} - Remaining: {stock.remaining}
              <button className={styles.viewButton} onClick={() => handleViewClick(stock)}>View</button>
              <button className={styles.editButton} onClick={() => handleEditClick(stock)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDeleteStock(stock.id)}>Delete</button>
            </p>
            {editStock && editStock.id === stock.id && (
              <div className={styles.editForm}>
                <label htmlFor="editQuantity" className={styles.label}>Quantity</label>
                <input
                  id="editQuantity"
                  type="number"
                  value={editStock.quantity}
                  onChange={(e) => setEditStock({ ...editStock, quantity: parseInt(e.target.value) })}
                  className={styles.input}
                />
                <label htmlFor="editSold" className={styles.label}>Sold Quantity</label>
                <input
                  id="editSold"
                  type="number"
                  value={editStock.sold}
                  onChange={(e) => setEditStock({ ...editStock, sold: parseInt(e.target.value) })}
                  className={styles.input}
                />
                <label htmlFor="editRemaining" className={styles.label}>Remaining Quantity</label>
                <input
                  id="editRemaining"
                  type="number"
                  value={editStock.remaining}
                  onChange={(e) => setEditStock({ ...editStock, remaining: parseInt(e.target.value) })}
                  className={styles.input}
                />
                <button className={styles.updateButton} onClick={handleUpdateStock}>Update Stock</button>
              </div>
            )}
            {selectedStock && selectedStock.id === stock.id && (
              <div className={styles.selectedStock}>
                <h3>Stock Details</h3>
                <p>Name: {selectedStock.name}</p>
                <p>Price: PKR {selectedStock.price}</p>
                <p>Quantity: {selectedStock.quantity}</p>
                <p>Sold: {selectedStock.sold}</p>
                <p>Remaining: {selectedStock.remaining}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Create Stock Form */}
      <h2 className={styles.formTitle}>Create New Stock</h2>
      <div className={styles.form}>
        <label htmlFor="warehouseId" className={styles.label}>Warehouse ID</label>
        <input
          id="warehouseId"
          type="number"
          placeholder="Enter Warehouse ID (e.g., 1)"
          value={newStock.warehouseId}
          onChange={(e) => setNewStock({ ...newStock, warehouseId: parseInt(e.target.value) })}
          className={styles.input}
        />

        <label htmlFor="meterTypeId" className={styles.label}>Meter Type ID</label>
        <input
          id="meterTypeId"
          type="number"
          placeholder="Enter Meter Type ID (e.g., 1)"
          value={newStock.meterTypeId}
          onChange={(e) => setNewStock({ ...newStock, meterTypeId: parseInt(e.target.value) })}
          className={styles.input}
        />

        <label htmlFor="quantity" className={styles.label}>Quantity</label>
        <input
          id="quantity"
          type="number"
          placeholder="Enter Quantity (e.g., 100)"
          value={newStock.quantity}
          onChange={(e) => setNewStock({ ...newStock, quantity: parseInt(e.target.value) })}
          className={styles.input}
        />

        <label htmlFor="sold" className={styles.label}>Sold Quantity</label>
        <input
          id="sold"
          type="number"
          placeholder="Enter Sold Quantity (e.g., 20)"
          value={newStock.sold}
          onChange={(e) => setNewStock({ ...newStock, sold: parseInt(e.target.value) })}
          className={styles.input}
        />

        <label htmlFor="remaining" className={styles.label}>Remaining Quantity</label>
        <input
          id="remaining"
          type="number"
          placeholder="Enter Remaining Quantity (e.g., 80)"
          value={newStock.remaining}
          onChange={(e) => setNewStock({ ...newStock, remaining: parseInt(e.target.value) })}
          className={styles.input}
        />

        <button className={styles.addButton} onClick={handleCreateStock}>Add Stock</button>
      </div>
    </div>
  );
};

export default StockList;
