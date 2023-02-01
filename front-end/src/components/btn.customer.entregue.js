import PropTypes from "prop-types";
import { useContext } from "react";
import Context from "../Context/Context";

function BtnCustomerEntregue({ disableBtn, updateStatus, sellerId }) {
  const { removeCart } = useContext(Context);
  return (
    <button
      type="button"
      onClick={() => updateStatus(sellerId, 'Em Trânsito')}
      disabled={disableBtn}
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
