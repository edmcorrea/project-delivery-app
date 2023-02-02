import PropTypes from 'prop-types';

function BtnCustomerEntregue({ disableBtn, updateStatus, sellerId }) {
  console.log(sellerId);
  return (
    <button
      type="button"
      onClick={ () => updateStatus(sellerId) }
      disabled={ disableBtn }
      data-testid="customer_order_details__button-delivery-check"
      id="delivery-check"
      name="delivery-check"
    >
      Marcar Como Entregue
    </button>
  );
}

BtnCustomerEntregue.propTypes = {
  disableBtn: PropTypes.bool.isRequired,
  updateStatus: PropTypes.func.isRequired,
  sellerId: PropTypes.number.isRequired,
};

export default BtnCustomerEntregue;
