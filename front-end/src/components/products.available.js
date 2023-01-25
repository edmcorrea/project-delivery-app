import { useEffect, useState } from 'react';
import { requestProducts } from '../services/request.products';

function ProductsAvailable() {
  const [listProducts, setListProducts] = useState([]);
  const [inputValue] = useState(0);
  const products = async () => {
    try {
      const getProducts = await requestProducts('/products');
      setListProducts(getProducts);
    } catch (error) {
      console.log(error);
    }
  };

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
          >
            -
          </button>
          <input
            name="Qtdd-Item"
            value={ inputValue }
            data-testid={ `customer_products__input-card-quantity-${i + 1}` }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${i + 1}` }
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsAvailable;
