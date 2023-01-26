import { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import { requestProducts } from '../services/request.products';

function Checkout() {
  const [listProducts, setListProducts] = useState([]);
  const [itemStorage, setItemStorage] = useState([]);

  const products = async () => {
    try {
      const getProducts = await requestProducts('/products');
      // setListProducts(getProducts);
      console.log(itemStorage);
      itemStorage.forEach(({ id }) => {
        const filteredProducts = getProducts.filter((element) => element.id === id);
        setListProducts(...filteredProducts);
        // console.log('oi');
      });
      // console.log(listProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setItemStorage(JSON.parse(localStorage.getItem('cart')) || []);
    products();
  }, []);

  return (
    <div>
      <NavBar />

    </div>
  );
}

export default Checkout;
