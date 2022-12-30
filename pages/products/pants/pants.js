import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";

const Pants = () => {
  const [spinner3, setSpinner3] = useState(false);
  const [pants, setPants] = useState(null);
  useEffect(() => {
    setSpinner3(true);
    fetch("http://localhost:5000/products/pants")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setSpinner3(false);
        setPants(data);
      });
  }, []);
  return (
    <Layout>
      <div className="my-14">
        <h1 className="text-4xl text-accent font-bold text-center">Pants</h1>
        <p className="text-center">We Providing Best Quality Pants</p>
        {spinner3 ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 gap-8">
            {pants?.map((pant) => (
              <div
                key={pant._id}
                className="card card-compact bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={pant.image} alt="" className="h-40 w-auto p-4" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{pant.productName}</h2>
                  <p>Price: {pant.price}</p>
                  <div className="text-center">
                    <Link href="">
                      <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-8 mt-6 text-white">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Pants;
