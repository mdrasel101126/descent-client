import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Spinner from "../../../components/Spinner";

const Tshirts = () => {
  const [spinner2, setSpinner2] = useState(false);
  const [tshirts, setTshirts] = useState(null);

  useEffect(() => {
    setSpinner2(true);
    fetch("http://localhost:5000/products/tshirts")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setSpinner2(false);
        setTshirts(data);
      });
  }, []);
  return (
    <Layout>
      <div className="my-14">
        <h1 className="text-4xl text-accent font-bold text-center">Tshirts</h1>
        <p className="text-center">We Providing Best Quality Tshirts</p>
        {spinner2 ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 gap-8">
            {tshirts?.map((tshirt) => (
              <div
                key={tshirt._id}
                className="card card-compact bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={tshirt.image} alt="" className="h-40 w-auto p-4" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{tshirt.productName}</h2>
                  <p>Price: {tshirt.price}</p>
                  <div className="text-center">
                    <Link href={`/products/tshirts/${tshirt._id}`}>
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

export default Tshirts;
