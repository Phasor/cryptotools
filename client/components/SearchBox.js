import React, { useState, useEffect, use } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export default function SearchBox({ value, setSearchValue }) {
  return (

    <div className='max-w-6xl mx-4 md:mx-auto mb-5 flex items-center p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 border-b-2 border-b-gray-200'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-4 w-4" style={{color:'gray'}} />
        <input
            type="text"
            placeholder="Search Crypto Tools"
            value={value}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full ml-2 items-center bg-transparent outline-none placeholder-gray-500"
        />
    </div>
  )
}

