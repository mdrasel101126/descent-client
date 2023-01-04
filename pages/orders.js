import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../components/UserContext/UserContext";

const UserOrders = () => {
  const { user } = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data);
      });
  }, [user?.email]);

  return (
    <Layout>
      <div className="my-16">
        <h1 className="text-2xl text-accent font-bold text-center my-6">
          My Orders
        </h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myOrders &&
                  myOrders.map((order) => (
                    <tr key={order._id}>
                      <th>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={order.image} alt="" />
                          </div>
                        </div>
                      </th>
                      <td>{order.productName}</td>
                      <td>{order.price}</td>
                      <td>
                        {parseInt(order?.quantity) > 0 && !order.paid && (
                          <Link href={`payment/${order._id}`}>
                            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary btn-sm">
                              Pay
                            </button>
                          </Link>
                        )}
                        {order.paid && <p className="text-green-700">Paid</p>}
                        {parseInt(order?.quantity) < 1 && !order.paid && (
                          <p className="text-red-700">Unavailable</p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {myOrders?.length === 0 && (
          <p className="text-xl text-red-600 text-center">No Orders Found!!</p>
        )}
      </div>
    </Layout>
  );
};

export default UserOrders;
