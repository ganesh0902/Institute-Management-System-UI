import React, { useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';

const PaymentComponent = () => {
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded');
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  const createOrder = async (amount) => {
    try {
      const stdId =21;
      // Call the backend API to create an order
      const response = await axios.post(`http://localhost:9005/payment/${amount}/${stdId}`);
      const orderData = response.data;

      // Proceed to initiate Razorpay payment
      openRazorPayPayment(orderData);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const openRazorPayPayment = (orderData) => {

    console.log('Order data:', orderData);

    const options = {
      key: 'rzp_test_u7Jblf9H9semGK', // Your test API key from Razorpay Dashboard
      amount: orderData.amount, // Amount in paise (100 INR = 10000 paise)
      currency: orderData.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com/logo.png', // Optional: Logo image URL
      order_id: orderData.id, // Order ID from the backend
      handler: async (responseRecord) => {
        
        console.log('Payment successful:', responseRecord);

        const response = await fetch("http://localhost:9005/payment/save",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(responseRecord)
        });

        if(response.status === 'OK')
        {
          alert("Payment Successfully");
        }

        // Handle the success response (e.g., send it to the backend for verification)
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
      Modal:{
        ondismiss:()=>{

          console.log('Payment modal closed');
          alert('Payment process was interrupted. Please try again.');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // Open Razorpay's payment UI
  };

  return (
    <div className='mt-4'>
      <h2>RazorPay Payment</h2>
      <button onClick={() => createOrder(50000)}>Pay 500 INR</button>
    </div>
  );
};

export default PaymentComponent;
