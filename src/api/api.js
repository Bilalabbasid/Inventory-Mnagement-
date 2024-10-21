import axios from 'axios';

// Use import.meta.env to access environment variables in Vite
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:44381', // Change here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication
export const login = (data) => api.post('/api/Account/AdminSignIn', data);
export const signUp = (data) => api.post('/api/Account/Signup', data);
export const resetPassword = (data) => api.post('/api/Account/ResetPassword', data);
export const logout = (data) => api.post('/api/Account/Logout', data);

// Customers
export const fetchCustomers = () => api.get('/api/Customer/GetAllCustomers');
export const fetchCustomerById = (id) => api.get(`/api/Customer/GetCustomerById?id=${id}`);
export const createCustomer = (data) => api.post('/api/Customer/CreateCustomer', data);
export const updateCustomer = (id, data) => api.put(`/api/Customer/UpdateCustomer?id=${id}`, data);
export const deleteCustomer = (id) => api.delete(`/api/Customer/DeleteCustomer?id=${id}`);
// Invoice CRUD
export const createInvoice = (data) => api.post('/api/Invoice', data);
export const fetchInvoices = () => api.get('/api/Invoice');
export const fetchInvoiceById = (id) => api.get(`/api/Invoice/${id}`);


// Meter Types CRUD
export const fetchMeterTypes = () => api.get('/api/MeterType/GetMeterTypes');
export const fetchMeterType = (id) => api.get(`/api/MeterType/GetMeterType?id=${id}`);
export const createMeterType = (data) => api.post('/api/MeterType/CreateMeterType', data);
export const updateMeterType = (id, data) => api.put(`/api/MeterType/UpdateMeterType?id=${id}`, data);
export const deleteMeterType = (id) => api.delete(`/api/MeterType/DeleteMeterType?id=${id}`);

// Stock CRUD
export const fetchStocks = () => api.get('/api/Stock/GetAllStocks');
export const fetchStockById = (id) => api.get(`/api/Stock/GetStockById?id=${id}`);
export const createStock = (data) => api.post('/api/Stock/AddStock', data);
export const updateStock = (id, data) => api.put(`/api/Stock/UpdateStock?id=${id}`, data);
export const deleteStock = (id) => api.delete(`/api/Stock/DeleteStock?id=${id}`);

// Warehouse CRUD
export const fetchWarehouses = () => api.get('/api/Warehouse/GetAllWarehouse');
export const fetchWarehouseById = (id) => api.get(`/api/Warehouse/GetWarehouseById?id=${id}`);
export const createWarehouse = (data) => api.post('/api/Warehouse/AddWarehouse', data);
export const updateWarehouse = (id, data) => api.put(`/api/Warehouse/UpdateWarehouse?id=${id}`, data);
export const deleteWarehouse = (id) => api.delete(`/api/Warehouse/DeleteWarehouse?id=${id}`);

// Sales
export const recordSale = (data) => api.post('/api/Sale/RecordSale', data);
export const updateSale = (id, data) => api.put(`/api/Sale/UpdateSale?id=${id}`, data);
export const deleteSale = (id) => api.delete(`/api/Sale/DeleteSale?id=${id}`);
export const fetchSaleById = (id) => api.get(`/api/Sale/GetSaleById?id=${id}`);
export const fetchAllSales = () => api.get('/api/Sale/GetAllSales');
export const fetchMySales = () => api.get('/api/Sale/GetMySales');
export const fetchSalesByCustomer = (customerId) => api.get(`/api/Sale/GetSalesByCustomer?customerId=${customerId}`);
export const fetchSalesByWarehouse = (warehouseId) => api.get(`/api/Sale/GetSalesByWarehouse?warehouseId=${warehouseId}`);


// Weather Forecast
export const getWeatherForecast = () => api.get('/WeatherForecast');
