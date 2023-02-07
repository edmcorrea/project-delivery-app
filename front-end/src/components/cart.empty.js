import PropTypes from 'prop-types';

function CartEmpty({ dataTest }) {
  return (
    <div>
      {dataTest === 'checkout' && <p>Carrinho vazio</p>}
    </div>
  );
}

CartEmpty.propTypes = {
  dataTest: PropTypes.string.isRequired,
};

export default CartEmpty;
