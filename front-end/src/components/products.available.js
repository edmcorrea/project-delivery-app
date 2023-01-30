import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';
import { requestProducts } from '../services/request.products';

function ProductsAvailable() {
  const history = useNavigate();
  const {
    totalPrice,
    setTotalPrice,
    items,
    setItems,
    listProducts,
    setListProducts,
    productsContext,
  } = useContext(Context);
  const [disable, setDisable] = useState(true);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [items, setItems] = useState([]);
  // const [listProducts, setListProducts] = useState([]);
  const products = async () => {
    try {
      const getProducts = await requestProducts('/products');
      setListProducts(getProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = (productId) => {
    const filterNotProductId = items.filter(({ id }) => id !== productId);
    const findId = items.find(({ id }) => id === productId) || {
      id: productId,
      quantity: 0,
    };
    setItems([
      ...filterNotProductId,
      { id: findId.id, quantity: findId.quantity + 1 },
    ]);
    productsContext();
  };

  const removeItem = (productId) => {
    const filterNotProductId = items.filter(({ id }) => id !== productId);
    const findId = items.find(({ id }) => id === productId) || {
      id: productId,
      quantity: 0,
    };
    if (findId.quantity === 0) {
      return;
    }
    setItems([
      ...filterNotProductId,
      { id: findId.id, quantity: findId.quantity - 1 },
    ]);
    productsContext();
  };

  const setItemQuantity = (productId, quantity) => {
    const newItems = items.map((product) => {
      if (product.id === productId) {
        product.quantity = quantity === 0 ? quantity : Number(quantity);
      }
      return product;
    });
    /* if (quantity === 0) {
      localStorage.removeItem(productId);
    } */ // teste 
    setItems(newItems);
  };

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      const product = listProducts.find((p) => p.id === item.id);
      total += parseFloat(product.price) * item.quantity;
    });
    setTotalPrice(total);
    const itemsNotQttNull = items.filter(({quantity}) => quantity !== 0);
    localStorage.setItem('cart', JSON.stringify(itemsNotQttNull));
  }, [items]);

  useEffect(() => {
    products();
  }, []);

  useEffect(() => {
    if (totalPrice === 0) {
      return setDisable(true);
    }
    return setDisable(false);
  }, [totalPrice]);

  return (
    <div>
      {listProducts.map((prod, i) => (
        <div key={ i + 1 }>
          <p data-testid={ `customer_products__element-card-price-${i + 1}` }>
            {prod.price.replace(/\./, ',')}
          </p>
          <img
            alt="customer_product"
            data-testid={ `customer_products__img-card-bg-image-${i + 1}` }
            src={ prod.urlImage }
            style={ { width: '200px', height: '200px' } }
          />
          <p data-testid={ `customer_products__element-card-title-${i + 1}` }>
            {prod.name}
          </p>

          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${i + 1}` }
            onClick={ () => removeItem(prod.id) }
          >
            -
          </button>
          <input
            name="Qtdd-Item"
            value={
              items.find(({ id }) => id === prod.id)
                ? items.find(({ id }) => id === prod.id).quantity
                : 0
            }
            data-testid={ `customer_products__input-card-quantity-${i + 1}` }
            onChange={ (e) => setItemQuantity(prod.id, e.target.value) }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${i + 1}` }
            onClick={ () => addItem(prod.id) }
          >
            +
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history('/customer/checkout') }
        disabled={ disable }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          Total: R$
          {' '}
          {totalPrice.toFixed(2).replace('.', ',')}
        </p>
      </button>
    </div>
  );
}

export default ProductsAvailable;

