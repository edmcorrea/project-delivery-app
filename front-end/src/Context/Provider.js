import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
    items.forEach(({ id, quantity }) => {
      // const filterNotId = arrItems.filter(({ element }) => id !== element.id) || [];
      // console.log('filterNotId', filterNotId);
      const findedProducts = listProducts.find((element) => element.id === id);
      findedProducts.quantity = quantity;
      setArrItems([...arrItems, findedProducts]);
    })
  };

  useEffect(() => {
    productsContext();
  }, [totalPrice])

  const context = {
    arrItems,
    totalPrice,
    setTotalPrice,
    items,
    setItems,
    listProducts,
    setListProducts,
    productsContext
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}
export default Provider;

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}.isRequired;
