import React from 'react';
import { useState } from 'react';

export default function Dashboard({setChoice}) {

  const [showOptions, setShowOptions]= useState(true);
  const adminMonumentOptions = ['Add', 'Edit', 'Delete', 'Get'];
  const adminUserOptions= ["All Users"];

  return (
    <div className='overflow-hidden flex flex-col justify-start h-[100vh] w-[22%] bg-gray-50 border-gray-200 dark:bg-gray-900 shadow-md dark:shadow-gray-400'>
        <h1 className='md:text-[1.8rem] text-[1.2rem] font-bold text-gray-800 dark:text-gray-100 mb-2 border-b-[0px] border-b-solid border-b-slate-500 py-2'>Dashboard</h1>

        <div className='md:text-2xl text-lg font-semibold text-gray-800 dark:text-gray-50 pb-2 border-b-[1px] border-b-solid border-b-slate-500 dark:border-b-slate-300 flex md:flex-row flex-col justify-between cursor-pointer' onClick={()=>setShowOptions(!showOptions)}>
            <h2>Monuments</h2>
            <span className="text-xl md:text-2xl">
                {showOptions?"⬆️":"⬇️"}
            </span>
        </div>

        <ul>
        {showOptions && adminMonumentOptions.map((option) => (
            <li key={option} className="text-lg hover:bg-gray-400 mx-auto text-center pb-2 border-b border-b-slate-300 dark:border-b-slate-500 dark:hover:bg-gray-700 cursor-pointer" onClick={()=>setChoice(option)}>
                {option}
            </li>
        ))}

        </ul>

        <ul>
        {showOptions && adminUserOptions.map((option) => (
            <li key={option} className="text-lg hover:bg-gray-400 mx-auto text-center pb-2 border-b border-b-slate-300 dark:border-b-slate-500 dark:hover:bg-gray-700 cursor-pointer" onClick={()=>setChoice(option)}>
                {option}
            </li>
        ))}

        </ul>
    </div>
  )
};
