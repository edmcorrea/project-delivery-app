import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [name, setName] = useState('');
  const history = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('user');
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
      <h2
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </h2>
      <h2 data-testid="customer_products__element-navbar-link-orders">
        MEUS PEDIDOS
      </h2>
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
