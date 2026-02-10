import { useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSaveUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  useEffect(() => {
    if (user?.email) {
      const saveUser = async () => {
        const userPayload = {
          name: user.displayName || "Anonymous",
          email: user.email,
        };
        try {
          await axiosSecure.post("/users", userPayload);
        } catch (err) {
          console.error("Failed to save user:", err);
        }
      };
      saveUser();
    }
  }, [user]);
};

export default useSaveUser;
