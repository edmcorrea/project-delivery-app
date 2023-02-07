import React from 'react';
import gif from '../images/animation.gif';
import '../styles/adress.delivery.css';

function BuySucess() {
  return (
    <div className="page-buy-sucess">
      <img
        alt="customer_product"
        src={ gif }
        style={ { width: '350px', height: '350px' } }
      />
      <h2>Compra Realizada Com Sucessso</h2>
    </div>
  );
}
export default BuySucess;
