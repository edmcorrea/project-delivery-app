import { useContext } from "react";
import Context from "../Context/Context";

function RemoveCartBtn({ dataTest, id, indice }) {
  const { removeCart } = useContext(Context);
  return (
    <button
      type="button"
      onClick={() => removeCart(id)}
      data-testid={`customer_${dataTest}__element-order-table-remove-${indice}`}
    >
      Remover
    </button>
  );
}

export default RemoveCartBtn;
