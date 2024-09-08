import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Body from './components/Body.js';
import About from './components/About.js';
import Contact from './components/Contact.js';
import Cart from './components/Cart.js';
import LogIn from './components/LogIn.js';
import ErrorPage from './components/ErrorPage.js';

import {Provider} from "react-redux";
import appStore from './store/store.js';

import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router= createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <ErrorPage/>,

    children: [
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/login",
        element: <LogIn/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={appStore}>
      <RouterProvider router={router}/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
