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
    userRole,
    setUserRole,
  } = useContext(Context);

  const getSaleList = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      setToken(token);
      const sales = await requestSales('/sale');
      setSaleList(sales);
    } catch (error) {
      console.log(error.message);
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
    const { role } = JSON.parse(localStorage.getItem('user'));
    setUserRole(role);
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {saleList.map((sale, i) => (
          <Link key={ i + 1 } to={ `/${userRole}/orders/${sale.id}` }>
            <div>
              <p data-testid={ `${userRole}_orders__element-order-id-${sale.id}` }>
                { sale.id }
              </p>
              <p data-testid={ `${userRole}_orders__element-delivery-status-${sale.id}` }>
                { sale.status }
              </p>
              <p data-testid={ `${userRole}_orders__element-order-date-${sale.id}` }>
                { formatDate(sale.saleDate) }
              </p>
              <p data-testid={ `${userRole}_orders__element-card-price-${sale.id}` }>
                { numberFormat.format(sale.totalPrice) }
              </p>
              { userRole === 'seller' && (
                <p data-testid={ `seller_orders__element-card-address-${sale.id}` }>
                  { `${sale.deliveryAddress}, ${sale.deliveryNumber}` }
                </p>
              ) }
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Orders;
