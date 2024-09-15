import React, {useState} from 'react';
import axios from 'axios';

import { useContext } from 'react';
import userContext from '../contexts/userContext';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backend from '../constants';

export default function LogIn() {
  const [showLogin, setShowLogin]= useState(true);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', fullName:'', email: '', password: '', termsAccepted: false });

  const {setUser}= useContext(userContext);
  // console.log("useContext:", user);

  const navigate= useNavigate();

  const showLogInForm= ()=>{
    setShowLogin(true);
  };

  const showRegisterForm= ()=>{
    setShowLogin(false);
  }

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({ ...registerData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();

    // API request
    try {
      const response= await axios.post(`${backend}/api/v1/users/login`, loginData, {
        withCredentials: true
      });
      
      console.log("Login successful:", response);

      const userData= {...response.data.data.user};

      setUser(userData);

      toast.success(`Welcome back, ${response.data.data.user.username}`);
      navigate("/");
    } 
    catch (error) {
      // console.log(error);
      if(error?.response?.status===500)
      {
        console.log(error.response.statusText);
        toast.warning("Login failed");
        return;
      }

      console.error('Login failed:', error.response.data.error.errorMessage);
      toast.error('Login failed '+  error.response.data.error.errorMessage);
    }
  };


  const handleRegisterSubmit = async(e) => {
    e.preventDefault();

    if (!registerData.termsAccepted)
    {
      toast.warning('Please accept the terms and conditions.');
      return;
    }

    if([registerData.username, registerData.email, registerData.password].some((field)=>!field?.trim()))
    {
      toast.warning("All fields are required.");
      return;
    }
      

    // API request
    try {
      const response= await axios.post(`${backend}/api/v1/users/register`, registerData);
      console.log('Registration successful:', response);

      // alert(`Hello ${response.data.data.username}! \nRegistration successful. \n Please Login to continue.`);
      toast.info("Registration successful. Please Login to continue.")
      navigate("/login");
    } 
    catch (error) {
      // console.log(error);

      if(error?.response?.status===500)
      {
        console.log(error.response.statusText);
        toast.warning("Internal Server Error");
        return;
      }
      console.error('Registration failed:', error.response.data.error.errorMessage);
      toast.error('Registration failed '+  error.response.data.error.errorMessage);
    }
  };

  // console.log(loginData);
  // console.log(registerData);

  return (
    <div className="w-6/12 md:w-4/12 mx-auto py-6 flex flex-col justify-center items-center border-[1px] border-gray-400 border-solid rounded-md shadow-md shadow-gray-600 relative my-4">
        <div className="mb-6 flex flex-col md:flex-row gap-2">
          <button className={`${showLogin?"bg-gray-100 text-black scale-105": "bg-black text-white scale-75"} px-5 py-1 rounded-3xl`} onClick={showLogInForm}>Log In</button>
          <button className={`${!showLogin? "bg-gray-100 text-black scale-105": "bg-black text-white scale-75"} px-4 py-1  rounded-3xl`} onClick={showRegisterForm}>Register</button>
        </div>

        {showLogin &&<form action="" onSubmit={handleLoginSubmit} className="flex flex-col gap-y-6 items-center w-10/12" id="logInForm">
          <input type="email" name='email' placeholder="E-mail" value={loginData.email}
          onChange={handleLoginChange} className="border border-gray-300 outline-none bg-white text-black block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
          
          <input type="password" name='password' placeholder="Password" value={loginData.password}
          onChange={handleLoginChange} className="border border-gray-300 outline-none bg-white text-black block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white active:scale-95"/>

          <button className="px-4 py-1 bg-sky-500 text-gray-50 rounded-sm active:scale-95">LogIn</button>
        </form>}

        {!showLogin && <form action="" onSubmit={handleRegisterSubmit} className="flex flex-col gap-y-6 items-center w-10/12" id="registerForm">
          <input type="text" name='username' placeholder="Username" required value={registerData.username} onChange={handleRegisterChange} className="border border-gray-300 outline-none bg-white text-black block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>

          <input type="text" name='fullName' placeholder="Full Name" required value={registerData.fullName} onChange={handleRegisterChange} className="border border-gray-300 outline-none bg-white text-black block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>

          <input type="email" name='email' placeholder="E-mail" required value={registerData.email} onChange={handleRegisterChange} className="border border-gray-300 outline-none bg-white text-black block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
          
          <input type="password" name='password' placeholder="Password" required value={registerData.password} onChange={handleRegisterChange} className="border border-gray-300 outline-none bg-white text-black block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>

          <div>
            <input type="checkbox" name="termsAccepted" checked={registerData.termsAccepted} onChange={handleRegisterChange} id="inp" className="align-middle"></input>
            <label htmlFor="inp" className="dark:text-gray-200 pl-1">I agree to the terms and conditions.</label>
          </div>

          <button className="px-4 py-1 bg-sky-500 text-gray-50 rounded-sm active:scale-95">Register</button>
        </form>}
    </div>
  );
}
