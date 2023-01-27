import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchBox() {
  return (
    <div className='flex md:ml-2 md:items-center md:rounded-full bg-gray-200 p-3 max-w-[250px]'>
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'gray'}} size="1x" />
        <input
            type="text"
            placeholder="Search Crypto Tools"
            className="flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500"
        />
    </div>
  )
}

