import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmailList() {
    const [email, setEmail] = useState('');

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
            }
        } catch (err) {
        console.error(err);
        }
    };
  
    
return (
    <form onSubmit={handleSubmit}
        className='max-w-6xl mx-4 md:mx-auto mb-10 p-4 space-x-4 flex items-center justify-center rounded bg-yellow-500'>   
            <FontAwesomeIcon icon={faEnvelope} className="h-10 w-10" style={{color:'white'}} />
            <input 
                type="text" 
                name='email'
                placeholder='Email me the latest crypto tools!'
                className='rounded py-1 px-2 w-full'
                value={email}
                onChange={(e) => (setEmail(e.target.value)) }
            />
            <button type="submit" disabled={email==""} className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md shadow'>Submit</button>    
    </form>
  )
}
