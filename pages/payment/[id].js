import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../components/CheckOutForm";
import Layout from "../../components/Layout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const Payment = () => {
  return (
    <Layout>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
      </div>
    </Layout>
  );
};

export default Payment;
