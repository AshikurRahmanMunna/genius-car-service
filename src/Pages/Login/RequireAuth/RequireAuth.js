import React from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import {toast, ToastContainer} from 'react-toastify';

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
    return (
      <div>
        <h3 className="text-danger">Your email is not Verified</h3>
        <h5 className="text-success">Please verify your email address</h5>
        <button
        className="btn btn-primary"
        onClick={async () => {
          await sendEmailVerification();
          toast('Sent email');
        }}
      >
        Send verification email again
      </button>
      <ToastContainer></ToastContainer>
      </div>
    );
  }
  return children;
};

export default RequireAuth;
