import React from 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import {updateqty,removefromcart} from '../slices/cartslice'


function CartDish({ _id, title, price, description, category, image, qty, border, disabled }) {
    const dispatch = useDispatch()
    const total = price * qty

    const incqty = () => {
        dispatch(
            updateqty({
                _id,
                title,
                price,
                description,
                category,
                image,
                qty: qty + 1,
            })
        )
    }
    const decqty = () => {
        dispatch(
            updateqty({
                _id,
                title,
                price,
                description,
                category,
                image,
                qty: qty - 1
            })
        )
    }

    const removeitemfromcart = ()=>{
        dispatch(
            removefromcart({ _id })
        )
    }


    return (
        <div className={`block bg-white py-6 sm:grid sm:grid-cols-5 ${border ? "border-b border-gray-300" : ""}`}>
            <div className='text-center sm:text-left my-auto mx-auto'>
                <Image src={image} width={100} height={100} objectFit='cover' alt='' objectPosition='center' />
            </div>
            <div className='col-span-3 sm:p-4 mt-2 mb-6 sm:my-0'>
                <h4 className='mb-3 lg:text-xl md:text-lg text-base capitalize font-medium'>
                    {title}
                </h4>
                <p className='lg:text-sm text-xs my-2 mb-4 line-clamp-3 gray-text-500'>
                    {description}
                </p>
                <span className='font-medium md:text-base text-sm'>
                    {qty} * <Currency quantity={price} currency='INR' />=
                    <span className='font-bold text-gray-700 mx-1'>
                        <Currency quantity={total} currency='INR' />
                    </span>
                </span>
            </div>
            <div className='flex flex-col space-y-4 my-auto justify-self-end'>
                <div className='flex justify-between'>
                    <button className={`button sm:p-1 ${disabled ? "opacity-50" : ""}`} onClick={decqty} disabled={disabled}>
                        <MinusIcon className="h-5">

                        </MinusIcon>
                    </button>
                    <div className='p-2 whitespace-normal sm:p-1 sm:whitespace-nowwrap'>
                        <span className='font-bold md:text-base text-sm text-gray-700'>
                            {qty}
                        </span>
                    </div>
                    <button className={`button sm:p-1 ${disabled ? "opacity-50" : ""}`} onClick={incqty} disabled={disabled}>
                        <PlusIcon className='h-5'>

                        </PlusIcon>
                    </button>
                </div>
                <button className={`button py-2 lg:px-10 md:px-8 px-6 ${disabled ? "opacity-50" : ""}`} disabled={disabled} onClick={removeitemfromcart}>Remove</button>

            </div>
        </div>
    )
}

export default CartDish