import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { EventsService } from "../../Events/api/event.service";

interface CheckoutFormProps {
  id: string;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [event, setEvent] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      setError(error.message || "Щось пішло не так");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/payment", {
        payment_method: paymentMethod.id,
        amount: 1999, // приклад: $19.99
      });

      if (data.success) {
        setSuccess(true);
      } else {
        setError("Не вдалося завершити оплату.");
      }
    } catch (err) {
      setError("Серверна помилка при оплаті.");
    }

    setLoading(false);
  };

  const handleGetEvent = async () => {
    try {
      console.log(id);
      const response = await EventsService.getOneById(id || "");

      if (response?.message) {
        toast.error("Виникла проблема із отримання івенту");
      }

      setEvent(response);
    } catch (err: any) {
      toast.error(err);
    }
  };

  useEffect(() => {
    handleGetEvent();
  }, []);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-xl shadow-xl border"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Оплата карткою
      </h2>
      <p className="text-gray-600 text-sm mb-6 text-center">
        Введіть дані вашої картки для завершення покупки
      </p>

      <div className="p-4 border rounded-lg bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
        />
      </div>

      {error && (
        <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-600 mt-2 text-sm text-center">
          Оплату успішно завершено! Дякуємо 💙
        </p>
      )}

      <motion.button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        whileTap={{ scale: 0.97 }}
      >
        {loading ? "Обробка..." : <div>Оплатити ₴{event.price}</div>}
      </motion.button>

      <div className="mt-4 text-xs text-gray-400 text-center">
        Здійснюючи оплату, ви погоджуєтесь з умовами Stripe.
      </div>
    </motion.form>
  );
};
