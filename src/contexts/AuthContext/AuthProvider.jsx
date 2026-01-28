import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authProviderLoading, setAuthProviderLoading] = useState(false);

  //   Register with email password authentication
  const userRegister = (email, password) => {
    setAuthProviderLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Update user Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //   login with email password authentication
  const userLogin = (email, password) => {
    setAuthProviderLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   login or register with google
  const googleSignin = () => {
    setAuthProviderLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   signOut
  const signOutUser = () => {
    setAuthProviderLoading(true);
    return signOut(auth);
  };

  //   auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthProviderLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    authProviderLoading,
    userRegister,
    updateUserProfile,
    userLogin,
    googleSignin,
    signOutUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
