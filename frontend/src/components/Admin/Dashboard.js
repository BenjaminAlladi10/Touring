import React from 'react';
import { useState } from 'react';

export default function Dashboard({setChoice}) {

  const [showMonumentOptions, setShowMonumentOptions]= useState(true);
  const [showUserOptions, setShowUserOptions]= useState(true);

  const adminMonumentOptions = ['Add', 'Edit', 'Delete', 'Get'];
  const adminUserOptions= ["All Users"];

  return (
    <div className='overflow-hidden flex flex-col justify-start min-h-[100vh] min-w-[16%] pl-2 bg-gray-50 border-gray-200 dark:bg-gray-900 shadow-md dark:shadow-gray-400'>
        <h1 className='md:text-[1.5rem] text-[1.2rem] font-bold text-gray-800 dark:text-gray-100 mb-2 border-b-[0px] border-b-solid border-b-slate-500 py-2'>Dashboard</h1>

        <div className='md:text-xl text-lg font-semibold text-gray-800 dark:text-gray-50 pb-2 border-b-[1px] border-b-solid border-b-slate-500 dark:border-b-slate-300 flex md:flex-row flex-col justify-between cursor-pointer' onClick={()=>setShowMonumentOptions(!showMonumentOptions)}>
            <h2>Monuments</h2>
            <span className="text-md md:text-xl">
                {showMonumentOptions?"⬆️":"⬇️"}
            </span>
        </div>

        <ul>
        {showMonumentOptions && adminMonumentOptions.map((option) => (
            <li key={option} className="text-lg hover:bg-gray-400 mx-auto text-center pb-2 border-b border-b-slate-300 dark:border-b-slate-500 dark:hover:bg-gray-700 cursor-pointer" onClick={()=>setChoice(option)}>
                {option}
            </li>
        ))}

        </ul>



        <div className='md:text-xl text-lg font-semibold text-gray-800 dark:text-gray-50 pb-2 border-b-[1px] border-b-solid border-b-slate-500 dark:border-b-slate-300 flex md:flex-row flex-col justify-between cursor-pointer mt-8' onClick={()=>setShowUserOptions(!showUserOptions)}>
            <h2>Users</h2>
            <span className="text-md md:text-xl">
                {showUserOptions?"⬆️":"⬇️"}
            </span>
        </div>

        <ul>
        {showUserOptions && adminUserOptions.map((option) => (
            <li key={option} className="text-lg hover:bg-gray-400 mx-auto text-center pb-2 border-b border-b-slate-300 dark:border-b-slate-500 dark:hover:bg-gray-700 cursor-pointer" onClick={()=>setChoice(option)}>
                {option}
            </li>
        ))}

        </ul>
    </div>
  )
};
