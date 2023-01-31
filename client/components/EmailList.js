import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmailList() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch("/api/subscribe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
            const data = await res.json();
            if (data.success) {
                toast.success("You're on the list!");
                setEmail('');
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
        console.error(err);
        }
    };
  
    
return (
    <form onSubmit={handleSubmit}
        className='max-w-6xl mx-4 md:mx-auto mb-10 p-4  rounded-lg shadow-lg bg-yellow-500'>
        <p className='px-1 py-2 font-semi-bold text-md font-semibold'>Yes, I want an edge and to be kept up to date with the latest crypto tools:</p>   
        <div className='space-x-4 mb-2 flex items-center justify-center'>
            <FontAwesomeIcon icon={faEnvelope} className="h-10 w-10 text-black"  />
            <input 
                type="text" 
                name='email'
                placeholder='example@gmail.com'
                className='rounded p-2 w-full outline-none'
                value={email}
                onChange={(e) => (setEmail(e.target.value)) }
            />
            <button type="submit" disabled={email==""} className={email !="" ? "bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md shadow" :"bg-blue-400  text-white py-1 px-2 rounded-md shadow"}>Submit</button>    
        </div>
    </form>
  )
}