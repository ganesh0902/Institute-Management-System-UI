import React, { useEffect } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async (amount) => {
    try {
      // Call the backend API to create an order
      const response = await axios.get(`http://localhost:9005/payment/${amount}`);
      const orderData = response.data;

      // Proceed to initiate Razorpay payment
      openRazorpayPayment(orderData);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const openRazorpayPayment = (orderData) => {
    const options = {
      key: 'rzp_test_u7Jblf9H9semGK', // Your test API key from Razorpay Dashboard
      amount: orderData.amount, // Amount in paise (100 INR = 10000 paise)
      currency: orderData.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com/logo.png', // Optional: Logo image URL
      order_id: orderData.id, // Order ID from the backend
      handler: (response) => {
        console.log('Payment successful:', response);
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
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // Open Razorpay's payment UI
  };

  return (
    <div className='mt-4'>
      <h2>Razorpay Payment</h2>
      <button onClick={() => createOrder(50000)}>Pay 500 INR</button>
    </div>
  );
};

export default PaymentComponent;
