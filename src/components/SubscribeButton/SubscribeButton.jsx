import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SubscribeButton = () => {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!dbUser) return;

    try {
      setLoading(true);

      const { data } = await axiosSecure.post("/create-checkout-session", {
        email: dbUser.email,
      });

      window.location.href = data.url;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Failed to start payment. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (dbUser?.isBlocked) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-md">
        ⚠️ Your account is blocked. Contact authorities for support.
      </div>
    );
  }

  if (dbUser?.isPremium) {
    return (
      <div className="p-2 bg-emerald-100 text-emerald-800 rounded-md inline-flex items-center gap-2">
        🌟 Premium User
      </div>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
    >
      {loading ? "Redirecting..." : "Subscribe for 1000 BDT"}
    </button>
  );
};

export default SubscribeButton;
