import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { AuthContext } from "./UserContext/UserContext";

const CheckOutForm = () => {
  const router = useRouter();
  const id = router.query.id;
  const [booking, setBooking] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      fetch(`https://descent-server.vercel.app/bookings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBooking(data);
        });
    }
  }, [id]);

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [completed, setCompleted] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    setSpinner(true);
    if (booking?.price) {
      const price = booking.price;
      fetch("https://descent-server.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setSpinner(false);
            setClientSecret(data.clientSecret);
          } else {
            setSpinner(false);
          }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [booking?.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setCardError(error.message);
      return;
    } else {
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        bookingId: booking?._id,
        productId: booking?.productId,
        transactionId: paymentIntent.id,
        buyerName: booking?.userName,
        buyerEmail: booking?.userEmail,
        quantity: booking?.quantity - 1,
      };
      fetch("https://descent-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            setCompleted(true);
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">
        Please Pay <strong>${booking?.price}</strong> For{" "}
        <strong>{booking?.productName}</strong>{" "}
      </h1>

      <>
        {spinner && <Spinner></Spinner>}
        {processing && <Spinner></Spinner>}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn bg-gradient-to-r from-primary to-secondary btn-sm mt-5 text-white"
            type="submit"
            disabled={!stripe || !clientSecret || completed}
          >
            Pay
          </button>
        </form>
        <p className="text-red-500">{cardError}</p>
        {success && (
          <div>
            <p className="text-green-500">{success}</p>
            <p>
              Your TransactionId : <strong>{transactionId}</strong>
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default CheckOutForm;
