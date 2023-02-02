import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import Context from '../Context/Context';
import CartEmpty from './cart.empty';
import RemoveCartBtn from './remove.cart.btn';

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
    if (userObj) {
      setUserRole(userObj.role);
    }
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
    <div>
      {arrMap.length ? (
        <div>
          {arrMap.map((element, indice) => (
            <div key={ indice }>
              <p
                data-testid={
                  `customer_${dataTest}__element-order-table-item-number-${indice}`
                }
              >
                {indice + 1}
              </p>
              <p
                data-testid={ `customer_${dataTest}__element-order-table-name-${indice}` }
              >
                {element.name}
              </p>
              <p
                data-testid={
                  `customer_${dataTest}__element-order-table-quantity-${indice}`
                }
              >
                {element.quantity}
              </p>
              <p
                data-testid={
                  `customer_${dataTest}__element-order-table-unit-price-${indice}`
                }
              >
                {numberFormat.format(element.price)}
              </p>
              <p
                data-testid={
                  `customer_${dataTest}__element-order-table-sub-total-${indice}`
                }
              >
                {numberFormat.format(
                  Number(element.quantity) * Number(element.price),
                )}
              </p>
              {dataTest === 'checkout' && (
                <RemoveCartBtn
                  id={ element.id }
                  indice={ indice }
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <CartEmpty dataTest={ dataTest } />
      )}
      <p data-testid={ `${userRole}_${dataTest}__element-order-total-price` }>
        {(dataTest === 'checkout')
          ? totalPrice.toFixed(2).replace('.', ',')
          : orderTotalPrice.toFixed(2).replace('.', ',')}
      </p>
    </div>
  );
}

ProductsListComponent.propTypes = {
  dataTest: PropTypes.string.isRequired,
};

export default ProductsListComponent;
