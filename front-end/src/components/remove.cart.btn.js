import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from '../Context/Context';

function RemoveCartBtn({ id, indice }) {
  const { removeCart } = useContext(Context);
  return (
    <button
      className='product-list-btn'
      type="button"
      onClick={ () => removeCart(id) }
      data-testid={ `customer_checkout__element-order-table-remove-${indice}` }
    >
      Remover
    </button>
  );
}

RemoveCartBtn.propTypes = {
  id: PropTypes.number.isRequired,
  indice: PropTypes.number.isRequired,
};

export default RemoveCartBtn;
