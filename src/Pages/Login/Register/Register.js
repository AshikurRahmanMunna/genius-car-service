import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../Shared/Loading/Loading";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import useToken from "../../../hooks/useToken";

const Register = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [passwordShow, setPasswordShow] = useState(false);
  const [token] = useToken(user);
  if (loading || updating ) {
    return <Loading></Loading>;
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    // .then(result => console.log(result))
  };
  if (token) {
    navigate("/");
    console.log(user);
  }
  return (
    <div>
      <PageTitle title="Register"></PageTitle>
      <h2 style={{ textAlign: "center" }}>Please Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input type="text" name="name" id="" placeholder="Enter Your Name" />
        <input type="email" name="email" id="" placeholder="Enter Your Email" />
        <div className="d-flex">
          <input
          style={{width: '80%'}}
            type={passwordShow ? 'text' : 'password'}
            name="password"
            id=""
            placeholder="Enter Your Password"
          />
          <button type="show" style={{height: '38px', width: '30%'}} onClick={() => setPasswordShow(!passwordShow)}>
            Show Password
          </button>
        </div>
        <input
          onClick={() => setAgree(!agree)}
          type="checkbox"
          name="terms"
          id="terms"
        />
        {/* <label className={agree ? 'ps-2' : 'ps-2 text-danger'} htmlFor="terms">Accept Genius car terms and conditions</label> */}
        <label className={`ps-2 ${agree ? "" : "text-danger"}`} htmlFor="terms">
          Accept Genius car terms and conditions
        </label>
        <input
          disabled={!agree}
          className="w-50 d-block mx-auto btn btn-primary mt-2"
          type="submit"
          value="Register"
        />
      </form>
      <p className="text-center">
        Already Have An Account?{" "}
        <Link className="text-primary text-decoration-none" to="/login">
          Login
        </Link>
      </p>
      <div className="w-50 mx-auto">
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
