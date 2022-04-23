import { async } from "@firebase/util";
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "../../Shared/PageTitle/PageTitle";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  if (loading || sending) {
    return <Loading></Loading>;
  }
  let errorElement;
  if (error) {
    errorElement = <p className="text-danger">{error?.message}</p>;
  }
  const from = location.state?.from?.pathname || "/";
  if (user) {
    navigate(from, { replace: true });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
  };
  const resetPassword = async () => {
    const email = emailRef.current.value;
    if(email) {
      await sendPasswordResetEmail(email);
      toast(`Email sent to ${email}`);
    }
    else {
      toast('Please Enter a email to reset password');
    }
  };
  return (
    <div className="container w-50">
      <PageTitle title="Login"></PageTitle>
      <h2 className="text-primary text-center mt-2">Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary w-50 d-block mx-auto" type="Login">
          Submit
        </Button>
      </Form>
      {errorElement}
      <p>
        New to Genius Car?
        <Link to="/register" className="text-primary text-decoration-none">
          Please Register
        </Link>
      </p>
      <p>
        Forget Password?
        <button
          onClick={resetPassword}
          to="/register"
          className="btn btn-link text-primary text-decoration-none"
        >
          Reset Password
        </button>
      </p>
      <SocialLogin></SocialLogin>
      <ToastContainer />
    </div>
  );
};

export default Login;
