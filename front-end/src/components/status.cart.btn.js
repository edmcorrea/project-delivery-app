import PropTypes from 'prop-types';
import { useContext } from 'react';
import Context from '../Context/Context';

function StatusCartBtn({ disableDelivered, disablePreparing, updateStatus, sellerId }) {
  return (
    <div>
    <button
      type="button"
      onClick={ () => updateStatus(sellerId, 'Pendente') }
      disabled={disablePreparing}
      data-testid= 'seller_order_details__button-preparing-check'
      id="preparing-check"
      name="preparing-check"
    >
      PREPARAR PEDIDO
    </button>
        <button
        type="button"
        onClick={ () => updateStatus(sellerId, 'Preparando') }
        disabled={disableDelivered}
        data-testid= 'seller_order_details__button-dispatch-check'
        id="dispatch-check"
        name="dispatch-check"
      >
        SAIU PARA ENTREGA
      </button>
      </div>
  );
}

StatusCartBtn.propTypes = {
  disableBtn: PropTypes.bool.isRequired,
  updateStatus: PropTypes.func.isRequired,
  sellerId: PropTypes.number.isRequired,

};

export default StatusCartBtn;
