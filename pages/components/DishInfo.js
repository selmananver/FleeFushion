import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import Image from 'next/image'
import axios from 'axios'
import NormalToast from './utils/NormalToast'

function DishInfo({ _id, title, price, description, category, image, border, removefromsearchresults }) {
    const deletedish =(_id)=>{
        setDisabled(true)
        axios.post('/api/admin/delete-dish',{_id})
        .then((res)=>{
            NormalToast('Dish Deleted successfully')
            removefromsearchresults(_id)
            setDisabled(false)
        })
        .catch((err)=>{
            NormalToast('Error in deleteing dish',err)
            setDisabled(false)
        })
    }
    const router = useRouter()
    const [disabled, setDisabled] = useState(false)
    return (
        <div className={`flex sm:flex-row flex-col-reverse w-full my-4 text-sm text-gray-700 py-6 ${border ? "border-b border-gray-200" : ""} sm:justify-between gap-6`}>
            <div className='space-y-2'>
                <div className='font-semibold text-base capitalize'>{title}</div>
                <div className='text-primary-light capitalize'>{category}</div>
                <p className='text-gray-500 lg:text-sm text-xs'>{description}</p>
                <div>
                    <p className='font-semibold'>
                        <span className='font-normal'>Price -</span>
                        <Currency quantity={price} currency='INR' />
                    </p>
                </div>
                <div className='flex items-center gap-4 pt-4'>
                    <button className={`button py-2 xxs:px-10 px-8 ${disabled ? "opacity-50" : ''}`} onClick={()=>router.push(`/admin/update-dish/${_id}`)} disabled={disabled}>Update</button>
                    <button className={`button py-2 xxs:px-10 px-8 ${disabled ? "opacity-50" : ''}`} onClick={()=>deletedish(_id)} disabled={disabled}>Delete</button>
                </div>
            </div>
            <div className='sm:mx-0 sm:ml-6 min-w-max mx-auto my-auto'>
                <Image src={image} width={120} height={120} alt="" objectFit="contain" />
            </div>
        </div>
    )
}

export default DishInfo