import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectitems } from '../slices/cartslice'

function Header() {
    const router = useRouter()
    const items =useSelector(selectitems)
    return (
        <header className="sticky top-0 inset-x-0 z-30 bg-white text-gray-900 glassmorphism px-6 md:block hidden">
            <div className="flex items-center w-full max-w-screen-xl py-2 xl:space-x-16 lg:space-x-12  space-x-7  mx-auto">
                <div className="flex items-center flex-1">
                    <Image
                        src="/img/fleefushion.png"
                        alt="Zinger"
                        className="cursor-pointer"
                        width={150}
                        objectFit="contain"
                        height={50}
                        onClick={() => router.push("/")}
                    />
                </div>
                <div className='flex items-center xl:space-x-12 lg:space-x-10 space-x-7 font-medium lg:text-base text-sm'>
                    <span className='link'>Login</span>
                    <span className='link'>Orders</span>
                    <span className='link' onClick={()=> router.push('/about')}>About</span>
                </div>
                <div className='relative cursor-pointer' onClick={()=>router.push('/cart')}>
                    <ShoppingCartIcon className='xl:w-10 lg:w-9 w-8 link' />
                    <div className='absolute -top-2 -right-1 rounded-full text-white bg-primary-light p-1 flex-items-center jusify-center text-xs font-extrabold'>
                        {items?.length}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header