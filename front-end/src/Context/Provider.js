import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  // const [radioSearch, setRadioSearch] = useState('');
  // const [inputSearch, setInputSearch] = useState('');
  // const [apiData, setApiData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [arrItems, setArrItems] = useState([]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [totalPrice, items, arrItems, listProducts]);

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}
export default Provider;

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}.isRequired;
