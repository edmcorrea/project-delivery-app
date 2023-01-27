import { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import { requestProducts } from '../services/request.products';

function Checkout() {
  const [listProducts, setListProducts] = useState([]);
  const [itemStorage, setItemStorage] = useState([]);
  const [arrItems, setArrItems] = useState([]);

  const products = async () => {
    try {
      const getProducts = await requestProducts('/products');
      setListProducts(getProducts);
      // let arrItems;
      // console.log(itemStorage);
      itemStorage.forEach(({ id }) => {
        const filteredProducts = getProducts.filter((element) => element.id === id);
        setArrItems(filteredProducts);
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
  }, [listProducts]);

  return (
    <div>
      <NavBar />
      <div>
        {arrItems.map((element, indice) => (
          <div key={ indice }>
            <p>{element.id}</p>
            <p>{element.name}</p>
            <p>{element.price}</p>
            <p>{itemStorage.map((item) => item.quantity)}</p>
            <p>{element.price * itemStorage.find((i) => i.id === element.id).quantity}</p>
          </div>))}
      </div>
    </div>
  );
}

export default Checkout;
