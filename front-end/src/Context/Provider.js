import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [arrItems, setArrItems] = useState([]);
  const [productsOrder, setProductsOrder] = useState([]);
  const [saleList, setSaleList] = useState([]);
  const [userRole, setUserRole] = useState('');

  const productsContext = async () => {
    const search = [];
    items.forEach(({ id, quantity }) => {
      const findedProducts = listProducts.find((element) => element.id === id);
      findedProducts.quantity = quantity;
      search.push(findedProducts);
    });
    setArrItems(search);
  };

  const removeCart = (id) => {
    const removeLocalStorage = items.filter((elem) => elem.id !== id);
    const remove = arrItems.filter((elem) => elem.id !== id);
    const newtotalPrice = remove.reduce((acc, curr) => {
      acc += parseFloat(curr.price) * curr.quantity;
      return acc;
    }, 0);
    console.log(remove, newtotalPrice);
    localStorage.setItem('cart', JSON.stringify(removeLocalStorage));
    setItems(removeLocalStorage);
    setTotalPrice(newtotalPrice);
  };

  const productOrderDetails = (saleProducts) => {
    setProductsOrder(saleProducts);
  };

  useEffect(() => {
    productsContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice]);

  const context = useMemo(() => ({
    arrItems,
    totalPrice,
    setTotalPrice,
    items,
    setItems,
    listProducts,
    setListProducts,
    productsContext,
    removeCart,
    productOrderDetails,
    productsOrder,
    saleList,
    setSaleList,
    userRole,
    setUserRole,
  }), [totalPrice, items, arrItems, listProducts, saleList, productsOrder, userRole]);

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}
export default Provider;

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}.isRequired;
