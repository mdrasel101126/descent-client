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

export default function Home() {
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
                <h1 className="text-4xl font-bold text-primary">
                  Welcome to Descent
                </h1>
                <p className="text-primary mt-4 font-semibold">
                  We Providing Good Quality Shirt
                </p>
                <Link href="">
                  <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-10 mt-6">
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
                <h1 className="text-4xl font-bold text-primary">
                  Welcome to Descent
                </h1>
                <p className="text-primary mt-4 font-semibold">
                  We Providing Good Quality T-Shirt
                </p>
                <Link href="">
                  <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-10 mt-6">
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
                <h1 className="text-4xl font-bold text-primary">
                  Welcome to Descent
                </h1>
                <p className="text-primary mt-4 font-semibold">
                  We Providing Good Quality Pant
                </p>
                <Link href="">
                  <button className="btn btn-primary  bg-gradient-to-r from-primary to-secondary px-10 mt-6">
                    Sell ALL
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Layout>
  );
}
