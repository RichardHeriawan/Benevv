import { useEffect } from "react";
import { useAxios } from "./hooks/useAxios";
import { paymentApi } from "./ApiInstances";

const fetchURL =
  "https://carefulqueen.backendless.app/api/services/PaymentService";

export const createPaymentIntentPOST = ({ stripeCustomerId, amount }) =>
  paymentApi
    .post(`/create-payment-intent`, {
      stripeCustomerId,
      amount,
    })
    .then((r) => r.data);

export const useCreatePaymentIntentPOST = ({ stripeCustomerId, amount }) => {
  return useAxios(fetchURL + "/create-payment-intent", {
    method: "post",
    data: { stripeCustomerId, amount },
  });
};

export const FetchCreatePaymentIntentPOST = (props) => {
  const { children, stripeCustomerId, amount } = props;

  const [{ loading, error, response }] = useAxios(
    fetchURL + "/create-payment-intent",
    {
      method: "post",
      data: { stripeCustomerId, amount },
    }
  );

  useEffect(() => {
    if (error) {
      console.error(
        "Fetch error: " + error.response.status + " " + error.message
      );
      console.error(error);
    }
  }, [error]);

  return children({ loading, error, response });
};
