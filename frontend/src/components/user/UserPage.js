import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import OrderHistory from './OrderHistory';
import Favorites from './Favorites';
import '../../styles/user-page.css';
import { useViewport } from '../../components/customHooks';

export default function UserPage() {
  const [orderHistory, setOrdeHistory] = useState();
  const [userInfo, setUserInfo] = useState();
  const { width } = useViewport();

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem('token');
      const config = { headers: { authorization: token } };

      const endPoint = '/user/info';
      const response = await Axios.get(endPoint, config);

      setOrdeHistory(response.data.orderHistory);
      setUserInfo(response.data.userData);
    }

    getUserInfo();
  }, []);

  let renderedComponent;

  if (orderHistory) renderedComponent = <OrderHistory items={orderHistory} />;
  else renderedComponent = <></>;
  return (
    <div className="user-page flex-col">
      <div className="cart-top flex-row">
        <section className="user-page-left flex-col">
          {renderedComponent}
        </section>
        <section className="user-page-right center-items">
          {width > 768 && <Favorites />}
        </section>
      </div>
    </div>
  );
}
