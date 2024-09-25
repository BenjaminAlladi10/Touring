import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userContext from '../contexts/userContext.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import backend from '../constants.js';
import { useNavigate } from 'react-router-dom';
import {clearCart} from "../store/cartSlice.js";
import Modal from 'react-modal';

import "../App.css";

export default function PaymentForm() {

  const [paymentSuccess, setPaymentSuccess]= useState(false);
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  const {cartTotalQuantity, cartTotalAmount}= useSelector((state)=> state.cart);

  const {user}= useContext(userContext);

  const navigate= useNavigate();

  const dispatch= useDispatch();

  const cartItems= JSON.parse(localStorage.getItem("cartItems"));

  const handlePayment= async()=>{

    if(!user?.username)
    {
      toast.error("Please Login");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const data= {
      email: user?.email,
      cartItems: cartItems
    };

    try {
      setLoading(true);

      const response= await axios.post(`${backend}/api/v1/users/getqrcode`, data, {
        withCredentials: true
      });

      // console.log("Payment success!", response);
      console.log(response.data.statusMessage);

      setQrCode(response.data.data.qrCode);
      setPaymentSuccess(true);

      toast.success("check your email for ticket(s)");
      setPaymentSuccess(true);

      dispatch(clearCart());
    } 
    catch (error) {
      console.log("Error in payment and qr code", error);
      toast.error(error.response.data.error.errorMessage);
    }
    finally {
      setLoading(false); // Set loading false after request
    }
  }


  const closeModal = () => {
    setPaymentSuccess(false);
  };

  // console.log(loading, paymentSuccess);
  return (
    <section className="bg-white antialiased dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form action="#" className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                    <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                    <input type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                  </div>

                  <div>
                    <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input id="card-expiration-input" type="date" min={new Date().toISOString().split('T')[0]} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                      CVV*
                      <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                        The last 3 digits on back of card
                        <div className="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </label>
                    <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                  </div>
                </div>

                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 active:scale-95 hover:shadow-md" disabled={loading} onClick={handlePayment}>
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </form>

              <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex gap-1 justify-end items-baseline">
                  
                  <h1 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Total Quantity:</h1> 
                  <span className="dark:text-gray-100 ml-2">{cartTotalQuantity} item(s)</span>
                </div>
                  
                  <div className="flex gap-1 justify-end items-baseline">
                    <h1 className="text-gray-800 dark:text-gray-100 text-lg font-semibold">Total Amount:</h1>   
                    <span className="dark:text-gray-100 ml-2">₹{cartTotalAmount}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                  <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                  <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
      </div>

      <Modal
              isOpen={paymentSuccess}
              onRequestClose={closeModal}
              contentLabel="QR Code Modal"
              className="modal"
              overlayClassName="overlay"
              ariaHideApp={false} // Necessary for avoiding errors in testing environments
      >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Payment Successful!</h2>
                <p className="text-center">Here is your QR Code:</p>
                {qrCode && (
                  <div className="flex justify-center mt-4">
                    <img src={qrCode} alt="QR Code" className="h-40 w-40" />
                  </div>
                )}
                <button onClick={closeModal} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md">
                  Close
                </button>
              </div>
      </Modal>
    </section>
  )
}
