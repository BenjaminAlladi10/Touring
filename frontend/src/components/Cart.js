import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMonument, removeMonument } from '../store/cartSlice';
import { toast } from 'react-toastify';

const Cart = ()=>{

    const cartItems= useSelector((state)=> state.cart.cartItems);
    
    const dispatch= useDispatch();
    const handleIncrement = (item) => {
      if(item.quantity>=10)
      {
        toast.info("Maximum 10 tickets allowed per monument.");
        return;
      }
      dispatch(addMonument({...item, quantity:item.quantity+1}));
      toast.success(`Added ${item.quantity+1} item(s) to Cart`);
    };

    const handleDecrement = (item) => {
      if(item.quantity<=1)
      {
        dispatch(removeMonument(item._id));
        toast.info("Item removed from Cart");
        return;
      }

      dispatch(addMonument({...item, quantity:item.quantity-1}));
      toast.info("1 ticket removed from Cart");
    };

    if(cartItems?.length===0)
    {
      return (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Cart is Empty!
          </p>
        </div>
      );
    }
    
    return (
      cartItems? (
      <div className="container mx-auto p-4">
        <div className="flex flex-col justify-start items-center gap-2 w-[60%] mx-auto">

          <div className="flex justify-between w-[60%] px-6 text-gray-900 dark:text-gray-300">
            <h1 className="font-semibold text-xl">Cart</h1>
            <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-100 dark:hover:bg-gray-50 dark:border-gray-100 dark:text-black">
              Clear
            </button>
          </div>

          {cartItems.map((item, index) => (

            <div key={index} className="flex flex-col md:flex-row md:justify-between items-center p-4 gap-x-20 rounded-lg shadow-md dark:bg-gray-500 hover:scale-105">
              {/* cart-item details */}
              <div>
                  <h2 className="text-lg text-gray-800 dark:text-white font-semibold min-w-[10rem]">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-100">Price: ₹{item.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-100">Tickets: {item.quantity}</p>
              </div>

              <div className="">
                    <div>
                      <img src={item.image} alt="" className="w-32 h-auto drop-shadow-md shadow-sky-200"/>
                    </div>

                    {/* Button-Box */}
                    <div className="flex justify-center items-center mt-2">
                      <button onClick={() => handleDecrement(item)} className="bg-red-500 text-white px-2 rounded-l">
                        -
                      </button>
                      <span className="px-2 text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">{item.quantity}</span>
                      <button onClick={() => handleIncrement(item)} className="bg-green-500 text-white px-2 rounded-r">
                        +
                      </button>
                    </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    ):"Hi");
};

export default Cart;
