import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menuOptions = [
    {
        id: 1,
        name: 'Home',
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'History',
        path: '/dashboard/history'
    },
    {
        id: 3,
        name: 'Plans',
        path: '/dashboard/billing'
    },
    {
        id: 4,
        name: 'Profile',
        path: '/profile'
    },
]

function AppHeader() {
  return (
    <div className='flex items-center justify-between shadow p-4 px-10 md:px-20 lg:px-40'>
      <Image src={'/logo.png'} alt="CareVox" width={150} height={150} />
      <div className='hidden md:flex gap-15 items-center'>
        {menuOptions.map((option, index) => (
            <Link key={index} href={option.path}>
              <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
            </Link>
        ))}
      </div>
      <UserButton/>
    </div>
  )
}

export default AppHeader
