import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate= useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center text-white text-lg bg-gray-800">
        Error: Page Not Found
        <button onClick={(e)=>navigate(-1)} className="px-3 py-0 mt-1 bg-sky-600 text-white tex-sm rounded-sm hover:shadow-lg hover:shadow-sky-800 active:scale-95">Back</button>
    </div>
  );
}
