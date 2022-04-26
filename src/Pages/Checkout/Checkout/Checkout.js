import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const [user] = useAuthState(auth);
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    console.log(user)
    // const [user, setUser] = useState({
    //     name: 'Akbar',
    //     email: 'akbar@momo.taj',
    //     address: 'Tjamohol road md.pur',
    //     phone: '01711111111'
    // });

    // const handleAddressChange = event => {
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     setUser(newUser);
    // }

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order ={
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value,
        }

        axios.post('https://powerful-hollows-72000.herokuapp.com/order', order)
        .then(response => {
            const {data} = response;
            if(data.insertedId) {
                toast('Your order is booked!!!');
                event.target.reset();
            }
        });
    }
    return (
        <div>
            <h2 className='text-center'>Please Checkout you booking {service?.name}</h2>
            <form onSubmit={handlePlaceOrder} className='w-50 mx-auto'>
                <input className='w-100 mb-2' value={user?.displayName} type="text" name='name' placeholder='name' readOnly disabled />
                <br />
                <input className='w-100 mb-2' value={user?.email} type="email" name='email' placeholder='email' readOnly disabled />
                <br />
                <input className='w-100 mb-2' value={service?.name} type="text" name='service' placeholder='service' readOnly />
                <br />
                <input className='w-100 mb-2' value={user?.address} autoComplete="off"  type="text" name='address' placeholder='address' required />
                <br />
                <input className='w-100 mb-2' type="text" value={user?.phone} name='phone' placeholder='phone' required />
                <br />
                <input type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;