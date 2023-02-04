import PropTypes from 'prop-types';
import "../styles/products.list.css";
import { BsFillCartXFill } from "react-icons/bs";

function CartEmpty({ dataTest }) {
  return (
    <div className='page-cart-empty'>
      <BsFillCartXFill className='img-cart-empty'/>
      {dataTest === 'checkout' && <h1>Carrinho vazio</h1>}
    </div>
  );
}

CartEmpty.propTypes = {
  dataTest: PropTypes.string.isRequired,
};

export default CartEmpty;
