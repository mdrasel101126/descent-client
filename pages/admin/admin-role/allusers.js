import { async } from "@firebase/util";
import React, { useContext, useState } from "react";
import Layout from "../../../components/Layout";
import { AuthContext } from "../../../components/UserContext/UserContext";

const Allusers = ({ allUsers }) => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div className="my-20">
        <h1 className="text-xl text-center text-accent font-bold my-4">
          All Users Of This Website
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.map((buyer, index) => (
                  <tr key={buyer._id}>
                    <th>{index + 1}</th>
                    <td>{buyer.name}</td>
                    <td>{buyer.email}</td>
                    <td>{buyer.role}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteBuyer(buyer._id)}
                        disabled={user?.email === buyer.email}
                        className="btn btn-sm text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {allUsers?.length === 0 && (
          <p className="text-xl text-red-600 text-center">No Buyer Found!!</p>
        )}
      </div>
    </Layout>
  );
};

export default Allusers;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/users");
  const data = await res.json();

  return {
    props: {
      allUsers: data,
    },
  };
};
