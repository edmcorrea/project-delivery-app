import { useEffect, useState } from 'react';
import { requestProducts } from '../services/request.products';

function ProductsAvailable() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState({});
  const [listProducts, setListProducts] = useState([]);
  const products = async () => {
    try {
      const getProducts = await requestProducts('/products');
      setListProducts(getProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = (productId) => {
    setItems(
      [...items, { id: (productId),
        quantity: (items.find(({ id }) => id === productId).quantity || 0) + 1 }],
    );
    localStorage.setItem('cart', JSON.stringify(items));
  };
  const removeItem = (productId) => {
    setItems({ ...items, [productId]: Math.max(0, (items[productId] || 0) - 1) });
    localStorage.setItem('cart', JSON.stringify(items));
  };
  const setItemQuantity = (productId, quantity) => {
    if (!Number.isNaN(quantity) && quantity >= 0) {
      setItems({ ...items, [productId]: parseInt(quantity, 10) });
      // setItems({ ...items, id: [productId]: parseInt(quantity, 10) });
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  useEffect(() => {
    let total = 0;
    Object.keys(items).forEach((productId) => {
      const product = listProducts.find((p) => p.id === parseInt(productId, 10));
      total += product.price * items[productId];
    });
    setTotalPrice(total);
  }, [items, listProducts]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    products();
  }, []);

  return (
    <div>
      {listProducts.map((prod, i) => (
        <div key={ i + 1 }>
          <p
            data-testid={ `customer_products__element-card-price-${i + 1}` }
          >
            {prod.price.replace(/\./, ',')}
          </p>
          <img
            alt="customer_product"
            data-testid={ `customer_products__img-card-bg-image-${i + 1}` }
            src={ prod.urlImage }
            style={ { width: '200px', height: '200px' } }
          />
          <p
            data-testid={ `customer_products__element-card-title-${i + 1}` }
          >
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
            value={ items[prod.id] || 0 }
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
