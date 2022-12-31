import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
const inter = Inter({ subsets: ["latin"] });
import { Navigation } from "swiper";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

export default function Home() {
  const [shirts, setShirts] = useState(null);
  const [tshirts, setTshirts] = useState(null);
  const [pants, setPants] = useState(null);
  const [spinner1, setSpinner1] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const [spinner3, setSpinner3] = useState(false);
  useEffect(() => {
    setSpinner1(true);
    fetch("http://localhost:5000/products/shirts?len=3")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setSpinner1(false);
        setShirts(data);
      });
  }, []);

  useEffect(() => {
    setSpinner2(true);
    fetch("http://localhost:5000/products/tshirts?len=3")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setSpinner2(false);
        setTshirts(data);
      });
  }, []);
  useEffect(() => {
    setSpinner3(true);
    fetch("http://localhost:5000/products/pants?len=3")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setSpinner3(false);
        setPants(data);
      });
  }, []);
  return (
    <Layout>
      <Head>
        <title>Descent-Home</title>
      </Head>
      <div>
        <Swiper navigation={true} modules={[Navigation]}>
          <SwiperSlide>
            <div className="relative">
              <img
                src="/Images/shirt.png"
                style={{ width: "100vw", height: "60vh" }}
                alt=""
              />

              <div className="absolute transform -translate-y-1/2 left-10 top-1/2">
                <h1 className="text-4xl font-bold text-accent">
                  Welcome to Descent
                </h1>
                <p className="text-accent mt-4 font-semibold">
                  We Providing Good Quality Shirt
                </p>
                <Link href="/products/shirts/shirts">
                  <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-10 mt-6 text-white">
                    Sell ALL
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img
                src="/Images/tshirt.png"
                style={{ width: "100vw", height: "60vh" }}
                alt=""
              />

              <div className="absolute transform -translate-y-1/2 left-10 top-1/2">
                <h1 className="text-4xl font-bold text-accent">
                  Welcome to Descent
                </h1>
                <p className="text-accent mt-4 font-semibold">
                  We Providing Good Quality T-Shirt
                </p>
                <Link href="/products/tshirts/tshirts">
                  <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-10 mt-6 text-white">
                    Sell ALL
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img
                src="/Images/pant.png"
                style={{ width: "100vw", height: "60vh" }}
                alt=""
              />

              <div className="absolute transform -translate-y-1/2 left-10 top-1/2">
                <h1 className="text-4xl font-bold text-accent">
                  Welcome to Descent
                </h1>
                <p className="text-accent mt-4 font-semibold">
                  We Providing Good Quality Pant
                </p>
                <Link href="/products/pants/pants">
                  <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-10 mt-6 text-white">
                    Sell ALL
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="my-14">
        <h1 className="text-4xl text-accent font-bold text-center">Shirts</h1>
        <p className="text-center">We Providing Best Quality Shirts</p>
        {spinner1 ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 gap-8">
            {shirts?.map((shirt) => (
              <div
                key={shirt._id}
                className="card card-compact bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={shirt.image} alt="" className="h-40 w-auto p-4" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{shirt.productName}</h2>
                  <p>Price: {shirt.price}</p>
                  <div className="text-center">
                    <Link href={`/products/shirts/${shirt._id}`}>
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
        <div className="text-center">
          <Link href="/products/shirts/shirts">
            <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-8 mt-6 text-white">
              View All
            </button>
          </Link>
        </div>
      </div>
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
        <div className="text-center">
          <Link href="/products/tshirts/tshirts">
            <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-8 mt-6 text-white">
              View All
            </button>
          </Link>
        </div>
      </div>
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
                    <Link href={`/products/pants/${pant._id}`}>
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
        <div className="text-center">
          <Link href="/products/pants/pants">
            <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-8 mt-6 text-white">
              View All
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
