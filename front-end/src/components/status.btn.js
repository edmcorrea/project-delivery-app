import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function StatusBtn({
  disableSaiuParaEntrega,
  disablePrepararPedido,
  disableMarcarComoEntregue,
  updateStatus,
  sellerId,
}) {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const { role } = JSON.parse(localStorage.getItem('user'));
    setUserRole(role);
  }, []);

  return (
    <div className="status-buttons">
      {userRole === 'seller' ? (
        <>
          <button
            className="status-btn"
            type="button"
            onClick={ () => updateStatus(sellerId) }
            disabled={ disablePrepararPedido }
            data-testid="seller_order_details__button-preparing-check"
            id="preparing-check"
            name="preparing-check"
          >
            PREPARAR PEDIDO
          </button>
          <button
            className="status-btn"
            type="button"
            onClick={ () => updateStatus(sellerId) }
            disabled={ disableSaiuParaEntrega }
            data-testid="seller_order_details__button-dispatch-check"
            id="dispatch-check"
            name="dispatch-check"
          >
            SAIU PARA ENTREGA
          </button>
        </>
      ) : (
        <button
          className="status-btn"
          type="button"
          onClick={ () => updateStatus(sellerId) }
          disabled={ disableMarcarComoEntregue }
          data-testid="customer_order_details__button-delivery-check"
          id="delivery-check"
          name="delivery-check"
        >
          Marcar Como Entregue
        </button>
      )}
    </div>
  );
}

StatusBtn.propTypes = {
  disablePrepararPedido: PropTypes.bool.isRequired,
  disableSaiuParaEntrega: PropTypes.bool.isRequired,
  disableMarcarComoEntregue: PropTypes.bool.isRequired,
  updateStatus: PropTypes.func.isRequired,
  sellerId: PropTypes.number.isRequired,
};

export default StatusBtn;
