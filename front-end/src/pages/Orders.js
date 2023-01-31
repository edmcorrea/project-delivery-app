import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import Context from '../Context/Context';
import { requestSales, setToken } from '../services/request.sale';

const numberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function Orders() {
  const {
    saleList,
    setSaleList,
  } = useContext(Context);

  const getSaleList = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      setToken(token);
      const sales = await requestSales('/sale');
      console.log(sales);
      setSaleList(sales);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().length === 1
      ? `0${newDate.getDate()}`
      : newDate.getDate();
    const month = (newDate.getMonth() + 1).toString().length === 1
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
    return `${day}/${month}/${newDate.getFullYear()}`;
  };

  useEffect(() => {
    getSaleList();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {saleList.map((sale, i) => (
          <Link key={ i + 1 } to={ `/customer/orders/${sale.id}` }>
            <div>
              <p data-testid={ `customer_orders__element-order-id-${sale.id}` }>
                { sale.id }
              </p>
              <p data-testid={ `customer_orders__element-delivery-status-${sale.id}` }>
                { sale.status }
              </p>
              <p data-testid={ `customer_orders__element-order-date-${sale.id}` }>
                { formatDate(sale.saleDate) }
              </p>
              <p data-testid={ `customer_orders__element-card-price-${sale.id}` }>
                { numberFormat.format(sale.totalPrice) }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Orders;
