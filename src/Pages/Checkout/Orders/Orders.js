import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../../api/axiosPrivate";
import auth from "../../../firebase.init";

const Orders = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      const email = user?.email;
      const url = `https://powerful-hollows-72000.herokuapp.com/order?email=${email}`;
      try {
        const { data } = await axiosPrivate.get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setOrders(data);
      } catch(error) {
        console.log(error.message);
        if(error.response.status === 401 || error.response.status === 403) {
            signOut(auth);
            navigate('/login');
        }
      }
    };
    getOrders();
  }, [user]);
  return (
    <div className="w-50 mx-auto">
      <h2>Your orders: {orders.length}</h2>
      {
        orders.map(order => <div className="bg-light mb-3 p-4" key={order._id}>
          <p>Name: {order.service}</p>
          <p>Email: {order.email}</p>
          <p>Phone: {order.phone}</p>
          <p>Address: {order.address}</p>
        </div>)
      }
    </div>
  );
};

export default Orders;
