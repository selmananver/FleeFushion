import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronDownIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectitems } from '../slices/cartslice'
import { signIn,useSession } from 'next-auth/react'
import Dropdown from './DropDown'
import Skeleton from 'react-loading-skeleton'

function Header() {
    const router = useRouter()
    const items = useSelector(selectitems)
    const [isDropdownOpen, setDropdown] = useState(false)
    const {data:session,status:loading} = useSession()
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
                        onClick={() => router.push("/")} />
                </div>

            <div className='flex items-center xl:space-x-12 lg:space-x-10 space-x-7 font-medium lg:text-base text-sm'>
                {!session ? (
                    <span className='link' onClick={signIn}>Login</span>
                ) : (
                    
                        <><span className='relative' onClick={() => setDropdown((value) => !value)}>
                                    <span className='flex items-center cursor-pointer'>
                                        <img src={session.user.image || "/img/profile_pic.svg"} loading='lazy' alt='' width="24" height="24" className='object-contain w-10 h-10 rounded-full mr-1 hover:shadow-md' />
                                        <ChevronDownIcon className='lg:w-6 w-4' />
                                    </span>
                                    {isDropdownOpen && (
                                        <div className='absolute top-14 right-1'>
                                            <Dropdown hideDropDown={() => setDropdown(false)} />
                                        </div>
                                    )}
                    
                    </span>
                    </>

                                
                )}
            
        

            <span className='link'>Orders</span>
            <span className='link' onClick={() => router.push('/about')}>About</span>
            <div className='relative cursor-pointer' onClick={() => router.push('/cart')}>
                <ShoppingCartIcon className='xl:w-10 lg:w-9 w-8 link' />
                <div className='absolute -top-2 -right-1 rounded-full text-white bg-primary-light p-1 flex-items-center jusify-center text-xs font-extrabold'>
                    {items?.length}
                </div>
            </div>
        </div>
        </div>
        </header>
    )
}

export default Header




