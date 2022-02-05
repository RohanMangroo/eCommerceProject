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
          {/* {renderedComponent} */}
        </section>
      </div>
    </div>
  );
}

function UserInfo() {
  return <div className="user-info">This is USER INFO</div>;
}
