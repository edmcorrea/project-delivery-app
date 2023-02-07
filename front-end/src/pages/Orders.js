import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import Context from '../Context/Context';
import { requestSales, setToken } from '../services/request.sale';
import '../styles/orders.css';

const numberFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const numberFour = 4;

function Orders() {
  const { saleList, setSaleList } = useContext(Context);
  const [userRole, setUserRole] = useState('');

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
    const { role } = JSON.parse(localStorage.getItem('user'));
    setUserRole(role);
    getSaleList();
  }, []);

  function zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }

  return (
    <div>
      <NavBar />
      <div className="page-orders">
        {saleList.map((sale, i) => (
          <Link key={ i + 1 } to={ `/${userRole}/orders/${sale.id}` }>
            <div>
              <p>Pedido</p>
              <h3
                className="order-sale-id"
                data-testid={ `${userRole}_orders__element-order-id-${sale.id}` }
              >
                {zeroPad(sale.id, numberFour)}
              </h3>
            </div>
            <h3
              className={ `status-sale ${
                sale.status === 'Em Trânsito' ? 'EmTransito' : sale.status
              }` }
              data-testid={ `${userRole}_orders__element-delivery-status-${sale.id}` }
            >
              {sale.status}
            </h3>
            <div className="order">
              <h3
                data-testid={ `${userRole}_orders__element-order-date-${sale.id}` }
              >
                {formatDate(sale.saleDate)}
              </h3>
              <h3
                data-testid={ `${userRole}_orders__element-card-price-${sale.id}` }
              >
                {numberFormat.format(sale.totalPrice)}
              </h3>
              {userRole === 'seller' && (
                <h3
                  data-testid={ `seller_orders__element-card-address-${sale.id}` }
                >
                  {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
                </h3>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Orders;
