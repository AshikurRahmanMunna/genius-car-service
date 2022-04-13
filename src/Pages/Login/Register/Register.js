import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const handleRegister = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
    }
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Please Register</h2>
            <form className='register-form' onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='Enter Your Name' />
                <input type="email" name="email" id="" placeholder='Enter Your Email' />
                <input type="password" name="password" id="" placeholder='Enter Your Password' />
                <input type="submit" value="Register" />
            </form>
            <p className='text-center'>
                Already Have An Account? <Link className='text-danger text-decoration-none' to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;