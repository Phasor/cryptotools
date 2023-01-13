import React from 'react'
import { useRouter } from 'next/router'


export default function LogOutButton() {
    const router = useRouter();

    const LogOut = () => {
        // remove token and user from local storage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // redirect to login page
        router.push('/')
    }

  return (
    <button
    onClick={LogOut}
    className="text-lg text-white border border-white cursor-pointer py-2 px-3 rounded-sm hover:bg-gray-800 hover:bg-opacity-5"
    >Log Out</button>
  )
}
