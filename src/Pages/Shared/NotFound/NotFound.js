import React from 'react';
import exit from '../../../images/exit.jpg';

const NotFound = () => {
    return (
        <div className='w-50 mx-auto mt-4'>
            <h2 className='text-primary text-center'>Exit From Here. You will find nothing here</h2>
            <img className='img-fluid' src={exit} alt="" />
        </div>
    );
};

export default NotFound;