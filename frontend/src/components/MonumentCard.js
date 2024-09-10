import React from 'react';
import { useDispatch } from 'react-redux';
import { addMonument} from '../store/cartSlice';

export default function MonumentCard({ monument }) {
  const { name, description, image, location, price } = monument;

  const dispatch= useDispatch();

  const handleClick= (e)=>{
    dispatch(addMonument(monument));
  };

  console.log(Object.keys([...Array(10)]));
  return (
    <div className="w-[16rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-500 hover:scale-[1.05]">
      <img className="rounded-[1.2rem] p-2" src={image} alt="" />
    
      <div className="p-3 pt-0 text-nowrap overflow-clip">
     
        <h6 className="mb-1 text-xl font-bold tracking-tight text-black dark:text-white">{name}</h6>
      
        {false && <p className="mb-1 font-normal text-sm text-gray-600 dark:text-gray-400">{description}</p>}
        <p className="mb-1 font-normal text-[0.95rem] text-gray-700 dark:text-gray-300">
          <span className='text-gray-800 dark:text-gray-300'>Location:</span> {location}
        </p>

        <p className="mb-1 font-normal text-[0.95rem] text-gray-700 dark:text-gray-300">
          <span className='text-gray-800 dark:text-gray-300'>Price:</span> ₹{price}
        </p>

        <p className="mb-2 text-[0.95rem] text-gray-700 dark:text-gray-300">
          Tickets:
          <select name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {
            Object.keys([...Array(10)]).map((val)=>
              <option value={parseInt(val)}>{parseInt(val)+1}</option>
            )
          }
          </select>
        </p>

        <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
