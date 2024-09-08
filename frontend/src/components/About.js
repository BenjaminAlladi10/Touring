import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function About() {
    const [user, setUser] = useState(null);
    const [show, setShow]= useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://api.github.com/users/BenjaminAlladi10");
                console.log(response);
                setUser(response.data);
            } catch (error) {
                console.log("Error in fetching user");
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    const { name, avatar_url, html_url } = user || {};
    const linkedin= "https://www.linkedin.com/in/benjamin-alladi-383511223/";

    return user ? (
        <>
            <button onClick={()=>setShow(!show)} className="w-25 box-content mx-auto px-2 py-1 rounded-sm bg-sky-600 text-white active:scale-95 dark:bg-gray-950 dark:border dark:border-black dark:hover:border-sky-400 hover:bg-gray-800 hover:text-gray-100">
                {show?"Hide":"Show"} Profile
            </button>

            {show && <div className="w-full max-w-sm bg-white border border-gray-400 rounded-lg mx-auto flex flex-col items-center py-10 shadow-sm shadow-gray-200 dark:bg-gray-800 dark:border-gray-400 dark:shadow-none">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar_url} alt="User avatar" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-600 dark:text-gray-400">Web Developer</span>

                <div className="flex flex-col flex-wrap gap-y-2 md:flex-row mt-4 md:mt-6">
                    <a href={html_url} target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700">GitHub</a>
                    <a href={linkedin} target="_blank" className="py-2 px-4 ms-2 text-sm font-medium rounded-lg text-white bg-gray-900 dark:text-white dark:border-gray-600 dark:hover:text-gray-300 dark:hover:bg-gray-900">LinkedIn</a>
                </div>
            </div>}
        </>
    ) : (
        <div className="flex justify-center items-center">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="ml-1 text-lg text-gray-600 dark:text-white">Loading...</span>
        </div>
    );
}
