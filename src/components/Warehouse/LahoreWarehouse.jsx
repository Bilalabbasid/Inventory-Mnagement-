import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, RadarController, Title, PointElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './Dashboard.css'
// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, RadarController, Title, PointElement);

const LahoreWarehouse = () => {
    const revenueData = {
        labels: ['Weekly', 'Monthly', 'Annual'],
        datasets: [
            {
                label: 'Revenue in PKR',
                data: [600000, 1800000, 9500000],  // Dummy static data
                backgroundColor: ['#8e44ad', '#2980b9', '#d35400'],
            },
        ],
    };

    const totalStockData = {
        labels: ['Total Stock', 'Sold Stock', 'Remaining Stock'],
        datasets: [
            {
                label: 'Stock Overview',
                data: [800, 200, 600], // Total, Sold, Remaining
                backgroundColor: ['#27ae60', '#c0392b', '#2980b9'],
            },
        ],
    };

    const challengeCountData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Stock Adjustments (Monthly)',
                data: [4, 5, 7, 3, 6, 8, 5, 9, 8, 11, 10, 12],  // Dummy static data
                borderColor: '#2980b9',
                backgroundColor: 'rgba(41, 128, 185, 0.3)',
                fill: true,
            },
        ],
    };

    const platformAdoptionData = {
        labels: ['Adopted', 'Not Adopted'],
        datasets: [
            {
                label: 'Platform Adoption',
                data: [60, 40],  // Dummy static data
                backgroundColor: ['#27ae60', '#c0392b'],
            },
        ],
    };

    return (
        <div className="dashboard-container" style={{ padding: '20px' }}>
            <h1>Lahore Warehouse Dashboard</h1>

            {/* Stage Cards */}
            <div className="stages-container">
                <div className="stage-card">
                    <h2>Stock Review Needed</h2>
                    <p>30</p>
                    <span>5 adjustments need your attention</span>
                </div>
                <div className="stage-card">
                    <h2>Stock Levels Stable</h2>
                    <p>12</p>
                    <span>No adjustments needed</span>
                </div>
                <div className="stage-card">
                    <h2>Inventory Replenishment</h2>
                    <p>3</p>
                    <span>1 stock levels need your attention</span>
                </div>
            </div>

            {/* Inventory and Revenue Cards */}
            <div className="cards-container">
                <div className="card">
                    <h3>Total Inventory</h3>
                    <p>800 units</p>  {/* Static dummy data */}
                </div>
                <div className="card">
                    <h3>Total Revenue</h3>
                    <p>9,500,000 PKR</p>  {/* Static dummy data */}
                </div>
                <div className="card">
                    <h3>Tasks Completed</h3>
                    <p>28</p>  {/* Static dummy data */}
                </div>
                <div className="card">
                    <h3>Pending Adjustments</h3>
                    <p>40</p>  {/* Static dummy data */}
                </div>
                <div className="card">
                    <h3>Adjustment Success Rate</h3>
                    <p>85%</p>  {/* Static dummy data */}
                </div>
            </div>

            {/* Line Chart for Stock Adjustments Count */}
            <div 
                className="chart-container" 
                style={{ width: '100%', height: '300px', marginBottom: '20px', position: 'relative' }}
            >
                <h4>Stock Adjustments (Monthly)</h4>
                <Line 
                    data={challengeCountData} 
                    options={{ 
                        maintainAspectRatio: false, 
                        responsive: true 
                    }} 
                    style={{ width: '100% !important', height: '100% !important' }} 
                />
            </div>

            {/* Bar Chart for Revenue Overview */}
            <div 
                className="chart-container" 
                style={{ width: '100%', height: '300px', marginBottom: '20px', position: 'relative' }}
            >
                <h4>Revenue Overview</h4>
                <Bar 
                    data={revenueData} 
                    options={{ 
                        maintainAspectRatio: false, 
                        responsive: true 
                    }} 
                    style={{ width: '100% !important', height: '100% !important' }} 
                />
            </div>

            {/* Pie Chart for Stock Overview */}
            <div 
                className="chart-container" 
                style={{ width: '100%', height: '300px', marginBottom: '20px', position: 'relative' }}
            >
                <h4>Stock Overview</h4>
                <Pie 
                    data={totalStockData} 
                    options={{ 
                        maintainAspectRatio: false, 
                        responsive: true 
                    }} 
                    style={{ width: '100% !important', height: '100% !important' }} 
                />
            </div>

            {/* Small Pie Chart for Platform Adoption */}
            <div 
                className="chart-container" 
                style={{ width: '100%', height: '300px', marginBottom: '20px', position: 'relative' }}
            >
                <h4>Platform Adoption</h4>
                <Pie 
                    data={platformAdoptionData} 
                    options={{ 
                        maintainAspectRatio: false, 
                        responsive: true 
                    }} 
                    style={{ width: '100% !important', height: '100% !important' }} 
                />
            </div>
        </div>
    );
};

export default LahoreWarehouse;
