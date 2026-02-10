import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  const { user, authProviderLoading } = authInfo;

  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setDbUser(res.data);
          setDbLoading(false);
        })
        .catch(() => setDbLoading(false));
    } else {
      setDbUser(null);
      setDbLoading(false);
    }
  }, [user, axiosSecure]);

  return {
    ...authInfo,
    dbUser,
    dbLoading,
  };
};

export default useAuth;
