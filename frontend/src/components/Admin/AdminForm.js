import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonuments } from '../../store/monumentsSlice';

export default function AdminForm({choice}) {

    const monuments= useSelector((state)=> state.monuments.monuments);

    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(fetchMonuments());
    }, []);

    const fields = [
        { type: "text", name: "name", label: "Name", required: true },
        { type: "text", name: "location", label: "Location", required: true },
        { type: "file", name: "image", label: "Image", required: true },
        { type: "number", name: "price", label: "Price", required: true },
        { type: "text", name: "category", label: "category", required: true },
        { type: "textarea", name: "description", label: "Description", required: true }
    ];

    const [formData, setFormData]= useState({
        name: '',
        location: '',
        image: '', // for file uploads
        price: '',
        category: '',
        description: '',
        selectedMonument: ''
    });

    const handleInputChange= (e)=>{
        const {name, value}= e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange= (e)=>{
        setFormData((prev)=> (
            {
                ...prev,
                image: e.target.files[0]
            }
        ))
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();

        const data= new FormData();
        if (choice === 'Add') 
        {
            data.append('name', formData.name);
            data.append('location', formData.location);
            data.append('image', formData.image); // The file
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('description', formData.description);
            
            console.log('Adding new monument', data); 
            
            try {
                const response = await axios.post("api/v1/monuments/addmonument", data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log(response.data.data);
                toast.success(response.data.statusMessage);
            } 
            catch (error) {
                console.error(error.response.data.message);
                toast.error(error.response.data.message);
            }
        } 
        else if (choice === 'Edit') 
        {
            data.append("_id", formData.selectedMonument);
            data.append('name', formData.name);
            data.append('location', formData.location);
            data.append('image', formData.image); // The file
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('description', formData.description);

            console.log('Editing monument', data); 

            try {
                const response = await axios.patch("api/v1/monuments/editmonument", data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log(response.data.data);  
                toast.success(response.data.statusMessage);
            } 
            catch (error) {
                console.error(error.response.data.statusMessage);  
                toast.error(error.response.data.statusMessage);
            }
        } 
        else if (choice === 'Delete') 
        {
            data.append("_id", formData.selectedMonument);
            console.log('Deleting monument with ID:', formData.selectedMonument);

            try {
                const response = await axios.post("api/v1/monuments/deletemonument", {
                    _id: formData.selectedMonument 
                });

                console.log(response.data.data);
                toast.success(response.data.statusMessage);  
            } 
            catch (error) {
                console.error(error.response.data.message);  
                toast.error(error.response.data.message);
            }
        } 
        else if (choice === 'Get') 
        {
            data.append("_id", formData.selectedMonument);
            console.log('Fetching monument details for ID:', data.selectedMonument);

            try {
                const response = await axios.post("/api/v1/monuments/getmonument", {
                    _id: formData.selectedMonument
                });

                console.log(response.data.data);
                toast.success(response.data.statusMessage);  
            } 
            catch (error) {
                console.error(error.response.data.message); 
                toast.error(error.response.data.message); 
            }
        }
        else
        {
            toast.error("Invalid request");
            return;
        }

        setFormData({
            name: '',
            location: '',
            image: '',
            price: '',
            category: '',
            description: '',
            selectedMonument: ''
        });

        dispatch(fetchMonuments());
    }

    useEffect(() => {
        if (monuments.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            selectedMonument: monuments[0]._id
          }));
        }
      }, [monuments]);

    // console.log(formData, monuments);
      
  return (
    <div className='mt-2 mx-auto'>
        <h1 className='md:text-2xl text-lg'>
            {choice} {(choice==="Get All")?"Monuments": choice==="All Users"?"":"Monument"}
        </h1>

        <form className="grid grid-cols-1 mt-2 gap-y-3 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit}>
            {(choice==="Edit" || choice==="Delete" || choice==="Get") &&
                <div className="sm:col-span-2">
                    <label htmlFor="pName" className="block text-sm font-medium text-gray-700 dark:text-slate-400">Select</label>
                    
                    <div className="mt-1">
                        <select required value={formData.selectedMonument} onChange={handleInputChange} name="selectedMonument" id="pName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {monuments &&
                                monuments.map((monument, ind)=>
                                <option value={monument._id} key={ind}>
                                    {monument.name}
                                </option>)
                            }
                        </select>
                    </div>
                </div>    
            }

            {(choice==="Add" || choice==="Edit") &&
                fields.map((field, ind)=>{
                    return (
                        <div className="sm:col-span-2" key={ind}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-slate-400">{field.label}</label>

                            <div className="mt-1">
                                {
                                    field.type==="textarea"?(
                                        <textarea value={formData[field.name]} onChange={handleInputChange} required={!(choice==="Edit")} name={field.name} id={field.name} rows="2" cols="35" className="border border-gray-300 outline-none block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white">
                                        </textarea>
                                    ):(
                                        field.type!=="file"?(
                                        <input name={field.name} value={formData[field.name]} onChange={handleInputChange} type={field.type} id={field.name}  required={!(choice==="Edit")} className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/> 
                                        ):(
                                            <input type={field.type} id={field.name} name={field.name} onChange={handleFileChange} className="border border-gray-300 outline-none block w-full rounded-md py-2 px-3 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"/>
                                        )
                                    )
                                }

                            </div>
                        </div>
                    )
                })
            }

            <div className="flex justify-end flex-wrap sm:col-span-2 mb-2">
                <button type="submit" className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-sky-500 shadow-sm sm:text-sm transition-colors duration-75 text-sky-500 border border-sky-500 hover:bg-sky-50 active:bg-sky-100 disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 disabled:cursor-not-allowed">
                    <span>Submit</span>
                </button>
            </div> 

        </form>
    </div>
  )
}
