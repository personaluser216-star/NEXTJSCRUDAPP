import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <div className='flex justify-between bg-slate-300 px-5 py-3 items-center rounded-bl-md rounded-br-md border-b-2 border-black'>
            <Link href={"/"} className='font-bold'>NextJS Practice</Link>
            <Link href={"/create"}>
            <button className='bg-black text-white rounded-md  px-2 py-1'>Add New</button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar