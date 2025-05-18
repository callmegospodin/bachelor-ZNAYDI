import { FC } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./components/CheckoutForm";

const stripePromise = loadStripe("your-publishable-key");

export const Checkout: FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm id={id!} />
    </Elements>
  );
};
