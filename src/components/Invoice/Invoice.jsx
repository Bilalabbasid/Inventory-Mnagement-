import React, { useState, useEffect } from 'react';
import { fetchInvoices, createInvoice } from '../../api/api'; // Adjust import path as necessary
import { saveAs } from 'file-saver'; // For downloading CSV
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // For PDF generation
import styles from './Invoice.module.css';
import Papa from 'papaparse'; // Import PapaParse

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [dummySales, setDummySales] = useState(generateDummySales());
  const [newInvoice, setNewInvoice] = useState({
    invoiceType: 1,
    customerId: 0,
    saleId: 0,
    ntn: '',
    meterTypeCost: 0,
  });
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    contact: '',
    strn: '',
    ntn: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetchInvoices();
      setInvoices(response.data || []);
    } catch (error) {
      setError('Error fetching invoices. Please try again.');
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newInvoice.ntn || newInvoice.meterTypeCost <= 0) return;
    setError('');
    try {
      await createInvoice(newInvoice);
      setNewInvoice({
        invoiceType: 1,
        customerId: 0,
        saleId: 0,
        ntn: '',
        meterTypeCost: 0,
      });
      loadInvoices();
    } catch (error) {
      setError('Error creating invoice. Please try again.');
      console.error('Error creating invoice:', error);
    }
  };

  const handleGenerateInvoice = (sale) => {
    const totalCost = sale.quantity * sale.price;
    const tax = totalCost * 0.18; // Assuming 18% tax
    const grandTotal = totalCost + tax;

    const doc = new jsPDF();

    // Company Info
    doc.setFontSize(12);
    doc.text("IRHAJHUS TECHNICAL AND ENGINEERING SERVICES", 10, 10);
    doc.text("H-No 184, Street 12, E11/4 Islamabad", 10, 15);
    doc.text("NTN: 1227179 | STRN: 3277876240397", 10, 20);
    doc.text("Phone: 03012345686 | Email: info@irhajhus.com", 10, 25);

    // Customer Info (Dynamic)
    doc.setFontSize(10);
    doc.text(`Customer: ${customerDetails.name}`, 10, 35);
    doc.text(`Address: ${customerDetails.address}`, 10, 40);
    doc.text(`Contact: ${customerDetails.contact} | STRN: ${customerDetails.strn} | NTN: ${customerDetails.ntn}`, 10, 45);

    // Invoice Details
    doc.setFontSize(10);
    doc.text(`Sales Tax Invoice #: 177`, 150, 35); // Align to the right
    doc.text(`Date: 10 Oct 2024`, 150, 40); // Align to the right

    // Table for Sale
    doc.autoTable({
      head: [['Description', 'Quantity', 'Price (PKR)', 'Total (PKR)']],
      body: [[`Energy Analyzer TCM-T50P`, sale.quantity, sale.price, totalCost]],
      startY: 55, // Start the table lower in the document
    });

    // Subtotal, Tax, and Grand Total
    doc.text(`Subtotal: ${totalCost.toFixed(2)} PKR`, 150, doc.lastAutoTable.finalY + 10);
    doc.text(`Tax (18%): ${tax.toFixed(2)} PKR`, 150, doc.lastAutoTable.finalY + 15);
    doc.text(`Grand Total: ${grandTotal.toFixed(2)} PKR`, 150, doc.lastAutoTable.finalY + 20);

    // Undertaking Text
    const undertakingText = `
      Subject: Exemption from Deduction/Withholding Income Tax and Sales Tax

      Dear Sir,

      We would like to inform you that the supply being made to you through our Sales Tax Invoice has been imported by us as “Commercial Importer.” 
      Income Tax has already been paid at the import stage. Therefore, no further deduction of income or sales tax is required.

      Sincerely,
      IRHAJHUS TECHNICAL AND ENGINEERING SERVICES
      Payment Account: 
      MCB Islamic Bank Ltd. PK39 MCIB 1161 0039 6335 0001
      Dubai Islam Bank: PK95 DUIB 0000 0007 7456 5001
      Best Regards, Muhammad Islam Naqi, 0300-2345855
    `;

    doc.text(undertakingText, 10, doc.lastAutoTable.finalY + 30);

    // Save the PDF
    doc.save(`invoice_sale_${sale.saleId}.pdf`);
  };

  const exportToCSV = () => {
    try {
      const csv = Papa.unparse(invoices); // Convert invoices to CSV format
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'invoices.csv');
    } catch (err) {
      console.error('Error exporting to CSV:', err);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Invoices', 14, 10);
    doc.autoTable({
      head: [['NTN', 'Meter Type Cost']],
      body: invoices.map((invoice) => [invoice.ntn, `${invoice.meterTypeCost} PKR`]),
    });
    doc.save('invoices.pdf');
  };

  // Function to generate dummy sales data with random prices between 4000 and 14000 PKR
  function generateDummySales() {
    const sales = [];
    for (let i = 1; i <= 10; i++) {
      sales.push({
        saleId: i,
        quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
        price: Math.floor(Math.random() * (14000 - 4000 + 1)) + 4000, // Random price between 4000 and 14000
      });
    }
    return sales;
  }

  return (
    <div className={styles.invoiceContainer}>
      <h2 className={styles.heading}>Invoices</h2>
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.createInvoice}>
        <input
          type="text"
          value={newInvoice.ntn}
          onChange={(e) => setNewInvoice({ ...newInvoice, ntn: e.target.value })}
          placeholder="NTN"
          className={styles.input}
        />
        <input
          type="number"
          value={newInvoice.meterTypeCost}
          onChange={(e) => setNewInvoice({ ...newInvoice, meterTypeCost: Number(e.target.value) })}
          placeholder="Meter Type Cost"
          className={styles.input}
        />
        <button onClick={handleCreate} className={styles.createButton} disabled={!newInvoice.ntn || newInvoice.meterTypeCost <= 0}>
          Create Invoice
        </button>
      </div>

      <div className={styles.customerDetails}>
        <h3>Customer Details</h3>
        <input
          type="text"
          value={customerDetails.name}
          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
          placeholder="Customer Name"
          className={styles.input}
        />
        <input
          type="text"
          value={customerDetails.address}
          onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
          placeholder="Address"
          className={styles.input}
        />
        <input
          type="text"
          value={customerDetails.contact}
          onChange={(e) => setCustomerDetails({ ...customerDetails, contact: e.target.value })}
          placeholder="Contact Info"
          className={styles.input}
        />
        <input
          type="text"
          value={customerDetails.strn}
          onChange={(e) => setCustomerDetails({ ...customerDetails, strn: e.target.value })}
          placeholder="STRN"
          className={styles.input}
        />
        <input
          type="text"
          value={customerDetails.ntn}
          onChange={(e) => setCustomerDetails({ ...customerDetails, ntn: e.target.value })}
          placeholder="NTN"
          className={styles.input}
        />
      </div>

      <div className={styles.exportButtons}>
        <button onClick={exportToCSV} className={styles.exportButton}>Download CSV</button>
        <button onClick={exportToPDF} className={styles.exportButton}>Download PDF</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.invoiceList}>
          {dummySales.map((sale) => (
            <li key={sale.saleId} className={styles.invoiceCard}>
              <span>Sale ID: {sale.saleId}</span>
              <span>Quantity: {sale.quantity}</span>
              <span>Price: {sale.price} PKR</span>
              <button onClick={() => handleGenerateInvoice(sale)} className={styles.invoiceButton}>
                Generate Invoice
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Invoice;
