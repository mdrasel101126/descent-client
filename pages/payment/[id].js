import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckOutForm from "../../components/CheckOutForm";
import Layout from "../../components/Layout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const Payment = () => {
  const router = useRouter();
  const id = router.query.id;
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/bookings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBooking(data);
        });
    }
  }, [id]);
  return (
    <Layout>
      <div>
        <h1 className="text-xl font-semibold">
          Please Pay <strong>${booking?.price}</strong> For{" "}
          <strong>{booking?.productName}</strong>{" "}
        </h1>
        <div className="w-96 my-12">
          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
