import axiosInstance from "@/modules/shared/services/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";
import { isAxiosError } from "axios";
import { redirect, type LoaderFunctionArgs } from "react-router";
import { CheckCircle, Gift, Sparkles } from "lucide-react";
import { AlertTriangle, RefreshCw, CreditCard } from "lucide-react";
import { useState } from "react";

export async function confirmPayment({ params }: LoaderFunctionArgs) {
  if (!params.sessionId) {
    throw new Error("Session id is required!!");
  }

  try {
    await axiosInstance.post("/orders/checkout", {
      session_id: params.sessionId,
      payment_method: "card",
    });
    return redirect("../succes");
  } catch (e) {
    if (!isAxiosError(e)) throw e;
    return redirect("../cancel");
  }
}

export const PaymentSuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 to-teal-200 p-4">
      <div className="w-full max-w-md transform rounded-2xl bg-white p-8 text-center shadow-2xl transition-all duration-300 hover:scale-105">
        <div className="relative">
          <CheckCircle
            className="mx-auto animate-bounce text-green-500"
            size={80}
            strokeWidth={1.5}
          />
          <Sparkles
            className="absolute right-0 top-0 animate-pulse text-yellow-400"
            size={40}
          />
          <Gift
            className="absolute left-0 top-0 animate-spin text-purple-500"
            size={40}
          />
        </div>

        <h1 className="mb-4 mt-6 text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>

        <p className="mb-6 text-gray-600">
          Your transaction has been completed securely. Thank you for your
          purchase!
        </p>
      </div>
    </div>
  );
};

export const PaymentFailurePage = () => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetryPayment = () => {
    setIsRetrying(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 to-orange-200 p-4">
      <div className="hover:scale-102 w-full max-w-md transform rounded-2xl bg-white p-8 text-center shadow-2xl transition-all duration-300">
        <div className="relative">
          <AlertTriangle
            className="animate-shake mx-auto text-red-500"
            size={80}
            strokeWidth={1.5}
          />
          <CreditCard
            className="absolute -bottom-4 right-0 text-gray-400 opacity-50"
            size={40}
          />
        </div>

        <h1 className="mb-4 mt-6 text-3xl font-bold text-gray-800">
          Payment Failed
        </h1>

        <p className="mb-6 text-gray-600">
          Oops! There was an issue processing your payment. Don't worry, you can
          try again.
        </p>

        <div className="space-y-4">
          <div className="flex items-center rounded-lg bg-red-50 p-4">
            <div className="mr-4 rounded-full bg-red-100 p-2">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-red-800">Error Details</h3>
              <p className="text-red-600">Payment method declined</p>
            </div>
          </div>

          <button
            onClick={handleRetryPayment}
            disabled={isRetrying}
            className={`flex w-full items-center justify-center rounded-lg py-3 transition-colors ${
              isRetrying
                ? "cursor-not-allowed bg-gray-300"
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
            }`}
          >
            {isRetrying ? (
              <>
                <RefreshCw className="mr-2 animate-spin" size={20} />
                Retrying...
              </>
            ) : (
              "Retry Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export function TestCheckout() {
  const pk = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

  const handlePaymentOnline = async () => {
    const stripe = await loadStripe(pk);

    if (!stripe) {
      console.error("Failed to load stripe");
      return;
    }

    const domainName = window.location.origin;

    const sessionResponse = await axiosInstance.post("/orders/payment/card", {
      success_url: `${domainName}/home/checkout/confirm/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainName}/home/checkout/cancel`,
      address_id: "675027641bfecc90cd4ba8b5",
    });

    const sessionId = sessionResponse.data.data.session.id;

    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
      <h1>Payment</h1>
      <button>Pay with Wallet</button>
      <button onClick={handlePaymentOnline}>Pay Online</button>
    </div>
  );
}
