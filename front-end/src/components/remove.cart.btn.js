import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from '../Context/Context';

function RemoveCartBtn({ dataTest, id, indice }) {
  const { removeCart } = useContext(Context);
  return (
    <button
      type="button"
      onClick={ () => removeCart(id) }
      data-testid={ `customer_${dataTest}__element-order-table-remove-${indice}` }
    >
      Remover
    </button>
  );
}

RemoveCartBtn.propTypes = {
  dataTest: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  indice: PropTypes.number.isRequired,
};

export default RemoveCartBtn;
