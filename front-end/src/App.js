import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Provider from './Context/Provider';
import AdminManage from './pages/AdminManage';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import OrderDetail from './pages/OrderDetail';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Provider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route exact path="/login" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/customer/products" element={ <Products /> } />
        <Route exact path="/customer/checkout" element={ <Checkout /> } />
        <Route exact path="/customer/orders" element={ <Orders /> } />
        <Route exact path="/customer/orders/:id" element={ <OrderDetail /> } />
        <Route exact path="/seller/orders" element={ <Orders /> } />
        <Route exact path="/admin/manage" element={ <AdminManage /> } />
      </Routes>
    </Provider>
  );
}

export default App;
