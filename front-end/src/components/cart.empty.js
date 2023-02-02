import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from '../Context/Context';

function CartEmpty({ dataTest }) {
  return (
    <div>
      {/* {dataTest === 'checkout' && <p>Carrinho vazio</p>} */}
      <p>Carrinho vazio</p>
    </div>
  );
}

CartEmpty.propTypes = {
  dataTest: PropTypes.string.isRequired,
};

export default CartEmpty;
