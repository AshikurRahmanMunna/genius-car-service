import React from 'react';
import google from '../../../images/social/google.png';
import facebook from '../../../images/social/facebook.png';
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] = useSignInWithFacebook(auth);
    const navigate = useNavigate();
    if(loading || loadingFacebook) {
        return <Loading></Loading>
    }
      if(user || userFacebook) {
        navigate('/');
      }
      let errorElement;
      if(error || errorFacebook) {
        errorElement = <p className='text-danger'>{error?.message} {errorFacebook?.message}</p>
      }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{height: '1px'}} className='w-100 bg-primary'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{height: '1px'}} className='w-100 bg-primary'></div>
            </div>
            {
                errorElement
            }
            <div className='d-flex justify-content-between'>
                <button onClick={() => signInWithGoogle()} className='btn btn-info me-2 d-block mx-auto w-100'>
                    <img src={google} alt="" />
                    <span className='px-2'>Google Sign In</span>
                </button>
                <button onClick={() => signInWithFacebook()} className='btn btn-info ms-2 d-block mx-auto w-100'>
                    <img style={{width: '30px'}} src={facebook} alt="" />
                    <span className='px-2'>Facebook Sign In</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;