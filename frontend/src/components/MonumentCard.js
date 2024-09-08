import React from 'react';
import { useDispatch } from 'react-redux';
import { addMonument} from '../store/cartSlice';

export default function MonumentCard({ monument }) {
  const { id, imgURL, name, prices, varients } = monument;

  const dispatch= useDispatch();

  const handleClick= (e)=>{
    dispatch(addMonument(monument));
  };

  return (
    <div className="w-[16rem] bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-500 hover:scale-[1.05]">
      <a href="#">
        <img className="rounded-[1.2rem] p-2" src={imgURL} alt="" />
      </a>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">{name}</h5>
        </a>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise.</p>

        <a href="#" className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClick}>
          Add to Cart
        </a>
      </div>
    </div>
  );
}
