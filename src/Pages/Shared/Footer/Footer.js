import React from 'react';

const Footer = ({company}) => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <footer className='text-center mt-5'>
            <p><small>Copyright &copy; {year} | {company}</small></p>
        </footer>
    );
};

export default Footer;