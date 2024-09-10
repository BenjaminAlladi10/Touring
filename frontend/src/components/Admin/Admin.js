import React, { useState } from 'react';
import Dashboard from './Dashboard';

export default function Admin() {
  const [choice, setChoice]= useState("Add");

  return (
    <div className="flex dark:text-white">
        <Dashboard setChoice={setChoice}/>

        <div className='mt-2 mx-auto'>
            <h1 className='md:text-2xl text-lg'>{choice} {choice==="Get All"?"Monuments":"Monument"}</h1>

            <form className="grid grid-cols-1 mt-2 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                {choice==="Edit" &&
                    <div className="sm:col-span-2">
                    <label htmlFor="pTitle" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Select by Title</label>
                    <div className="mt-1">
                        <input name="ptitle" type="text" id="ptitle"  required className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                    </div>
                }
                <div className="sm:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Title</label>
                    <div className="mt-1">
                        <input name="title" type="text" id="title"  required={!(choice==="Edit")} className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>
                {(choice==="Add"|| choice==="Edit") && <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Location</label>
                    <div className="mt-1">
                        <input name="location" id="location" required={!(choice==="Edit")} type="text" className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>}
                {(choice==="Add"|| choice==="Edit") && <div className="sm:col-span-2">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Image</label>
                    <div className="mt-1">
                        <input name="image" id="image" required={!(choice==="Edit")} type="file" className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                    </div>
                </div>}
                {(choice==="Add"|| choice==="Edit") && <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Description</label>
                    <div className="mt-1">
                        <textarea required={!(choice==="Edit")} name="description" id="description" rows="2" cols="35" className="border border-gray-300 outline-none block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"></textarea>
                    </div>
                </div>}
                <div className="flex justify-between flex-wrap sm:col-span-2">
                    {(choice==="Add"|| choice==="Edit") && <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-sky-500 shadow-sm sm:text-sm transition-colors duration-75 text-sky-500 border border-sky-500 hover:bg-sky-50 active:bg-sky-100 disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 disabled:cursor-not-allowed">
                        <span>Preview</span>
                    </button>}

                    <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-sky-500 shadow-sm sm:text-sm transition-colors duration-75 text-sky-500 border border-sky-500 hover:bg-sky-50 active:bg-sky-100 disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 disabled:cursor-not-allowed">
                        <span>Submit</span>
                    </button>
                </div> 
            </form>
        </div>
    </div>
  );
}
