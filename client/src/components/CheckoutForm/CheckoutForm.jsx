/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import './checkoutForm.css'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function CheckoutForm({apartmentId,price,range}) {
  console.log(price)

  const stripe = useStripe();
  const elements = useElements();
  const userId= useSelector(state=>state.user?.user?._id)
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log(email);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
  
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:5173/success?id=${apartmentId}&total_price=${price}&from=${range.from.toISOString()}&to=${range.to.toISOString()}&userId=${userId}`,
      },
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      setIsLoading(false);
      return;
    }
    toast.success("Payment confirmed!", {
      position: toast.POSITION.TOP_RIGHT
    });
    setIsLoading(false);
  };


  const paymentElementOptions = {
    layout: "tabs"
  }
  

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="payNow">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>

    </form>
  );
}