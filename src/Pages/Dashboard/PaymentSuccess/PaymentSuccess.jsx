import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const { refetchUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) return;

    const updatePremium = async () => {
      try {
        await axiosSecure.patch(`/users/subscribe/${email}`);
        setSuccess(true);
        refetchUser(); // Refresh profile
      } catch (err) {
        console.error(err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    updatePremium();
  }, [searchParams]);

  if (loading) return <p>Updating subscription...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      {success ? (
        <h2 className="text-2xl font-bold text-green-600">
          🎉 Subscription Updated! You are now Premium ⭐
        </h2>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">
          ⚠️ Subscription Update Failed
        </h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
