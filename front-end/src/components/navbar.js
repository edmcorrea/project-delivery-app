import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';

function NavBar() {
  const [name, setName] = useState('');
  const history = useNavigate();
  const { userRole, setItems } = useContext(Context);

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setItems([]);
    history('/login');
  };

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    if (userObj) {
      setName(userObj.name);
    }
  }, []);

  return (
    <div>
      {userRole === 'customer' && (
        <button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ () => history('/customer/products') }
        >
          PRODUTOS
        </button>)}
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ () => history('/customer/orders') }
      >
        MEUS PEDIDOS
      </button>
      <h2 data-testid="customer_products__element-navbar-user-full-name">
        {name}
      </h2>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ logoutUser }
      >
        logout
      </button>
    </div>
  );
}

export default NavBar;
