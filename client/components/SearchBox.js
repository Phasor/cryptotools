import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchBox() {
  return (
    <div className='max-w-6xl mx-4 md:mx-auto mb-5 flex items-center p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 border-b-2 border-b-gray-200'>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'gray'}} size="1x" />
        <input
            type="text"
            placeholder="Search Crypto Tools"
            className="w-full ml-2 items-center bg-transparent outline-none placeholder-gray-500"
        />
    </div>
  )
}

