import React, {useState, useEffect} from 'react'
import axios from "axios";
import MonumentCard from './MonumentCard';

export default function Body() {
  const [monuments, setMonuments]= useState([]);

  useEffect(()=>{
    async function fetchData()
    {
        try 
        {
          // console.log("making get request...");
          const response = await axios.get("api/v1/monuments/getallmonuments");
          console.log("response:", response);
          setMonuments(response.data.data);
        } 
        catch (err) 
        {
          console.log("Error in get request");
          console.error("Error is:", err.message);  // Handle errors
        }
    };
    fetchData();
  },[]);

  return monuments.length===0? (
    <div className="flex justify-center items-center">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="ml-1 text-lg text-gray-600 dark:text-white">Loading...</span>
    </div>
  ):(
    <div className="w-[75%] mx-auto flex md:flex-row mt-8 mb-8 md:gap-x-4 flex-wrap justify-evenly gap-y-8 sm:flex-col sm:items-center">
        {
          monuments.map((monument, index)=>
            <MonumentCard monument={monument} key={index}/>
          )
        }
    </div>
  )
};
