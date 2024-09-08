import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

import { ThemeProvider } from './contexts/themeContext';
import { UserProvider } from './contexts/userContext';

function App() {
  const [theme, setTheme]= useState(localStorage.getItem("preferredTheme") || "dark");

  const changeTheme= ()=>{
    const newTheme= theme==="dark"?"light":"dark";
    setTheme(newTheme);
    // console.log(newTheme);
  };

  useEffect(()=>{
    if (theme === "dark") {
      document.querySelector("html").classList.add('dark');
    } else {
      document.querySelector("html").classList.remove('dark');
    }
    localStorage.setItem("preferredTheme", theme);
  }, [theme]);

  const [user, setUser]= useState();

  return (
    <UserProvider value={{user, setUser}}>
      <ThemeProvider value={{theme, changeTheme}}>
        <div className="flex flex-col justify-between min-h-screen dark:bg-gray-800 dark:border-gray-70">
          <NavBar/>
          <Outlet/>
          <Footer/>
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
