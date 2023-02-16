import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdvancedSearch() {
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  useEffect(() => {
    const fetchCategories = async () => {
        const categories = await fetch(`${BASE_URL}/api/get-all-categories`)
        const data = await categories.json()
        // console.log(data)
        setCategories(data.data)
    }
    fetchCategories()
    }, [])
    

  return (
    <div className='max-w-6xl mx-auto'>
        <div className='mx-2'>
            <div className="bg-blue-500 hover:bg-blue-600 py-1 px-2 inline-block cursor-pointer
                rounded-md 
                text-white border-1 border-blue-500"
                onClick={() => setShowCategories(!showCategories)}>
                    Category Search
            </div>
            { showCategories && (
                <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 mt-2 border rounded-md p-2'>
                    {showCategories && categories && categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.category}`} className="text-blue-500 hover:text-blue-700 underline text-sm">
                        {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                    </Link>
                    ))}
                </div>
            )}
        </div>    
    </div>
  )
}
