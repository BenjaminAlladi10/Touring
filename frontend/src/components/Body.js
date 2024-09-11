import React, {useEffect} from 'react';
import MonumentCard from './MonumentCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonuments } from '../store/monumentsSlice';

import ShimmerContainer from './ShimmerContainer';

export default function Body() {

  const monumentsState= useSelector((state)=> state.monuments);
  const {monuments, status, error}= monumentsState;

  // console.log(monumentsState);

  const dispatch= useDispatch();

  useEffect(()=>{
      if(status==="idle")
      {
        // dispatch(fetchMonuments());
        setTimeout(()=>dispatch(fetchMonuments()), 0.8*1000);
      }
  },[]);

  if(status==="failed")
  {
    return (
      <div className="flex justify-center items-center">
          <span className="ml-1 text-lg text-gray-600 dark:text-white">Error</span>
      </div>
    )
  }
  return status==="loading" || status==="idle"? (
    <div className="flex justify-center items-center">
          {/* <div className="w-4 h-4 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div> */}
          {/* <span className="ml-1 text-lg text-gray-600 dark:text-white">Loading...</span> */}
          <ShimmerContainer/>
    </div>
  ):(
    <div className="w-[75%] mx-auto flex md:flex-row mt-8 mb-8 md:gap-x-4 flex-wrap justify-evenly gap-y-8 sm:flex-col sm:items-center">
        {
          monuments.map((monument)=>
            <MonumentCard monument={monument} key={monument._id}/>
          )
        }
    </div>
  )
};
