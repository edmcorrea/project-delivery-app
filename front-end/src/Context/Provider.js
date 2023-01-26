import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [radioSearch, setRadioSearch] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [apiData, setApiData] = useState([]);

  const context = {
    radioSearch,
    setRadioSearch,
    setInputSearch,
    setApiData,
    inputSearch,
    apiData };

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
