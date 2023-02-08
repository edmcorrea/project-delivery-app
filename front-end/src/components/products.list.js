import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import CartEmpty from './cart.empty';
import RemoveCartBtn from './remove.cart.btn';
import '../styles/products.list.css';

const numberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function ProductsListComponent({ dataTest }) {
  const { arrItems, totalPrice, productsOrder } = useContext(Context);
  const [arrMap, setArrMap] = useState([]);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    setUserRole(userObj.role);
  }, []);

  useEffect(() => {
    if (dataTest === 'checkout') {
      setArrMap(arrItems);
    } else {
      setArrMap(productsOrder);
    }
  }, [arrItems, productsOrder]);

  useEffect(() => {
    const newTotalPrice = arrMap.reduce((acc, curr) => {
      acc += Number(curr.price) * Number(curr.quantity);
      return acc;
    }, 0);
    setOrderTotalPrice(newTotalPrice);
  }, [arrMap]);

  return (
    <div className="component-products-list">
      {arrMap.length ? (
        <table className="product-list">
          <thead>
            <tr>
              <td>Item</td>
              <td>Descrição</td>
              <td>Quantidade</td>
              <td>Valor Unitário</td>
              <td>Sub-Total</td>
              {dataTest === 'checkout' && <td>Remover</td>}
            </tr>
          </thead>
          {arrMap.map((element, indice) => (
            <tbody key={ indice }>
              <tr>
                <td
                  data-testid={
                    `customer_${dataTest}__element-order-table-item-number-${indice}`
                  }
                >
                  {indice + 1}
                </td>
                <td
                  data-testid={
                    `customer_${dataTest}__element-order-table-name-${indice}`
                  }
                >
                  {element.name}
                </td>
                <td
                  data-testid={
                    `customer_${dataTest}__element-order-table-quantity-${indice}`
                  }
                >
                  {element.quantity}
                </td>
                <td
                  data-testid={
                    `customer_${dataTest}__element-order-table-unit-price-${indice}`
                  }
                >
                  {numberFormat.format(element.price)}
                </td>
                <td
                  data-testid={
                    `customer_${dataTest}__element-order-table-sub-total-${indice}`
                  }
                >
                  {numberFormat.format(
                    Number(element.quantity) * Number(element.price),
                  )}
                </td>
                {dataTest === 'checkout' && (
                  <td>
                    {dataTest === 'checkout' && (
                      <RemoveCartBtn id={ element.id } indice={ indice } />
                    )}
                  </td>
                )}
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <CartEmpty dataTest={ dataTest } />
      )}
      <div className="total-price-checkout">
        <h2>TOTAL</h2>
        <h2 data-testid={ `${userRole}_${dataTest}__element-order-total-price` }>
          {dataTest === 'checkout'
            ? numberFormat.format(totalPrice)
            : numberFormat.format(orderTotalPrice)}
        </h2>
      </div>
    </div>
  );
}

ProductsListComponent.propTypes = {
  dataTest: PropTypes.string.isRequired,
};

export default ProductsListComponent;
