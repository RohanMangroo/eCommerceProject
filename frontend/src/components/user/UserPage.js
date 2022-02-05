import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import utils from '../../utils';
import SimpleBar from 'simplebar-react';
import OrderHistory from './OrderHistory';
import 'simplebar/dist/simplebar.min.css';
import '../../styles/user-page.css';

export default function UserPage() {
  const [orderHistory, setOrdeHistory] = useState();
  const [userInfo, setUserInfo] = useState();
  const [toRender, setToRender] = useState('order-history');

  useEffect(() => {
    async function getUserInfo() {
      const token = localStorage.getItem('token');
      const config = { headers: { authorization: token } };

      const endPoint = 'http://localhost:5000/user/info';
      const response = await Axios.get(endPoint, config);

      setOrdeHistory(response.data.orderHistory);
      setUserInfo(response.data.userData);
    }

    getUserInfo();
  }, []);

  function handleClick(event) {
    const button = event.target.value;
    if (button === 'order-history') setToRender('order-history');
    if (button === 'user-info') setToRender('user-info');
  }

  let renderedComponent;

  if (orderHistory) {
    renderedComponent =
      toRender === 'user-info' ? (
        <UserInfo />
      ) : (
        <OrderHistory items={orderHistory} />
      );
  }
  return (
    <div className="user-page flex-col">
      <div className="cart-top flex-row">
        <section className="user-page-left flex-col">
          {renderedComponent}
        </section>
        <section onClick={handleClick} className="user-page-right center-items">
          <button value="order-history">Order History</button>
          <button value="user-info">User Info</button>
        </section>
      </div>
    </div>
  );
}

function UserInfo() {
  return <div className="user-info">This is USER INFO</div>;
}
