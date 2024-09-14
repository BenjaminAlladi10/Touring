import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import themeContext from '../contexts/themeContext.js';
import { useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import userContext from '../contexts/userContext.js';
import axios from 'axios';

import userImg from '../userImg.jpg';
import { toast } from 'react-toastify';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {user, setUser}= useContext(userContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const {changeTheme}= useContext(themeContext);

  const cartItems= useSelector((state)=> state.cart.cartItems);
  // console.log("cartItems:", cartItems);

  useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // console.log("NavBar rendered");

  const handleLogout= async(e)=>{
    const ans= prompt("Are you sure you want to log out");
    if (ans) {
      console.log("User confirmed logout.");
      
      try {
        const response= await axios.post("api/v1/users/logout");
        console.log(response);

        setUser();
        // alert(response.data.statusMessage);
        toast.success("Logged out");
      } 
      catch (error) {
        console.log("User logout failed", error);
      }
    } 
    else {
      console.log("User cancelled logout.");
    }
  };

  // console.log(user,user.isAdmin);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md dark:shadow-none">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center md:text-2xl text-md font-semibold whitespace-nowrap dark:text-white">Ticketless Touring</span>
        </Link>

        <button 
          data-collapse-toggle="navbar-default" 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
          onClick={toggleMenu}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col items-center p-4 px-2 pr-0 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {user && user.isAdmin && <li>
              <Link to="/admin" className="hidden md:block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin</Link>
            </li>}

            <li>
              <Link to="/" className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Home
              </Link>
            </li>
            {false && <li>
              <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
            </li>}
            <li>
              <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</Link>
            </li>
            <li>
              <Link to="/cart" className="block relative py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                  </svg>

                  <span className="absolute -top-2 left-5 scale-95 font-semibold">{cartItems.length}</span>
              </Link>
            </li>
            <li className="px-[0.4rem] py-[0.2rem] border-[1px] border-blue-600 border-solid bg-blue-600 active:scale-95">
              {!user? (<Link to="/login" className="block p-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>):
              (<button className="block p-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handleLogout}>Logout</button>)}
            </li>

            <li className="dark:text-white cursor-pointer" onClick={changeTheme}>
              <FontAwesomeIcon icon={faMoon} />
            </li>

            {user && <li to="/" className="py-2 pl-3 text-black flex flex-col items-center cursor-pointer bg-blue-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white">
                <img src={userImg} alt="user" className="w-8 rounded-[50%] mt-2"/>
                <span className="text-xs font-sans">{user.username}</span>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
