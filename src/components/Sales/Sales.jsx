import React, { useState, useEffect } from 'react';
import { fetchAllSales, recordSale, updateSale, deleteSale } from '../../api/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Papa from 'papaparse'; // Import PapaParse
import styles from './Sales.module.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ customerId: '', warehouseId: '', productId: '', quantity: '', price: '' });
  const [selectedSale, setSelectedSale] = useState(null);
  const [updateData, setUpdateData] = useState({ quantity: '', price: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load dummy sales data
    loadDummySales();
  }, []);

  const loadDummySales = () => {
    const dummySales = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      customerId: `Customer ${index + 1}`,
      warehouseId: `Warehouse ${Math.ceil((index + 1) / 5)}`, // 2 warehouses for simplicity
      productId: `Product ${index + 1}`,
      quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
      price: (Math.random() * 100 + 20).toFixed(2), // Random price between $20 and $120
    }));
    setSales(dummySales);
  };

  const handleRecordSale = async () => {
    if (!newSale.customerId || !newSale.warehouseId || !newSale.productId || !newSale.quantity || !newSale.price) {
      setError('All fields are required to record a sale.');
      return;
    }

    try {
      await recordSale(newSale); // Assuming this function sends newSale to the server
      setNewSale({ customerId: '', warehouseId: '', productId: '', quantity: '', price: '' });
      loadDummySales(); // Reload dummy sales for the demo
    } catch (error) {
      if (error.response) {
        console.error('Error recording sale:', error.response.data);
        setError(`Error recording sale: ${error.response.data.message || 'Please try again.'}`);
      } else {
        console.error('Error recording sale:', error.message);
        setError('Error recording sale. Please try again.');
      }
    }
  };

  const handleUpdateSale = async (id) => {
    if (!updateData.quantity && !updateData.price) return;
    setError('');

    try {
      await updateSale(id, updateData); // Assuming this function updates the sale in the server
      setUpdateData({ quantity: '', price: '' });
      setSelectedSale(null);
      loadDummySales(); // Reload dummy sales for the demo
    } catch (error) {
      setError('Error updating sale. Please try again.');
      console.error('Error updating sale:', error);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      await deleteSale(id); // Assuming this function deletes the sale in the server
      loadDummySales(); // Reload dummy sales for the demo
    } catch (error) {
      setError('Error deleting sale. Please try again.');
      console.error('Error deleting sale:', error);
    }
  };

  const exportToCSV = () => {
    try {
      const csv = Papa.unparse(sales); // Convert sales to CSV format
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'sales_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error exporting to CSV:', err);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Sale ID', 'Customer ID', 'Warehouse ID', 'Product ID', 'Quantity', 'Price', 'Total'];
    const tableRows = [];

    sales.forEach((sale) => {
      const totalPrice = (sale.quantity * sale.price).toFixed(2); // Calculate total price
      const saleData = [sale.id, sale.customerId, sale.warehouseId, sale.productId, sale.quantity, `$${sale.price}`, `$${totalPrice}`];
      tableRows.push(saleData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save('sales_data.pdf');
  };

  return (
    <div className={styles.sales}>
      <h2 className={styles.heading}>Sales</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.recordSale}>
        <h3>Record New Sale</h3>
        <input
          type="text"
          value={newSale.customerId}
          onChange={(e) => setNewSale({ ...newSale, customerId: e.target.value })}
          placeholder="Customer ID"
          className={styles.input}
        />
        <input
          type="text"
          value={newSale.warehouseId}
          onChange={(e) => setNewSale({ ...newSale, warehouseId: e.target.value })}
          placeholder="Warehouse ID"
          className={styles.input}
        />
        <input
          type="text"
          value={newSale.productId}
          onChange={(e) => setNewSale({ ...newSale, productId: e.target.value })}
          placeholder="Product ID"
          className={styles.input}
        />
        <input
          type="number"
          value={newSale.quantity}
          onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
          placeholder="Quantity"
          className={styles.input}
        />
        <input
          type="number"
          value={newSale.price}
          onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
          placeholder="Price"
          className={styles.input}
        />
        <button onClick={handleRecordSale} className={styles.createButton}>
          Record Sale
        </button>
      </div>

      <div className={styles.exportButtons}>
        <button onClick={exportToCSV} className={styles.exportButton}>
          Download CSV
        </button>
        <button onClick={exportToPDF} className={styles.exportButton}>
          Download PDF
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.salesList}>
          {sales.map((sale) => (
            <li key={sale.id} className={styles.saleCard}>
              <span>{`Sale ID: ${sale.id}, Customer ID: ${sale.customerId}, Warehouse ID: ${sale.warehouseId}, Product ID: ${sale.productId}, Quantity: ${sale.quantity}, Price: $${sale.price}`}</span>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => {
                    setSelectedSale(sale.id);
                    setUpdateData({ quantity: sale.quantity, price: sale.price });
                  }}
                  className={styles.updateButton}
                >
                  Update
                </button>
                <button onClick={() => handleDeleteSale(sale.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>

              {selectedSale === sale.id && (
                <div className={styles.updateMenu}>
                  <input
                    type="number"
                    value={updateData.quantity}
                    onChange={(e) => setUpdateData({ ...updateData, quantity: e.target.value })}
                    placeholder="New Quantity"
                    className={styles.input}
                  />
                  <input
                    type="number"
                    value={updateData.price}
                    onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })}
                    placeholder="New Price"
                    className={styles.input}
                  />
                  <button onClick={() => handleUpdateSale(sale.id)} className={styles.saveButton}>
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

export default Sales;
