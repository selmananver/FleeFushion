import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Currency from 'react-currency-formatter'
import OrderItem from './OrderItem'
function OrderDetails({ id, admin }) {
    const fetcher = url => fetch(url).then(res => res.json())
    const { data: session, status } = useSession()
    const [disabled, setDisabled] = useState(false)
    const loading = status === 'loading'
    const { data: order, error } = useSWR(
        !loading && session ? `/api/order-details/${id}` : null,
        fetcher
    )
    if (error) {
        console.log(error)
    }
    return (
        <div className='heightFix sm:px-6'>
            <div className='border rounded-md max-w-screen-xl mx-auto md:my-20 my-12 shadow-sm'>
                <div className='flex items-center p-5 bg-gray-100 text-sm text-gray-700'>
                    <div>
                        <p className='sm:text-2xl text-xl font-semibold mb-2'>
                            Order Details
                        </p>
                        <p className="xs:text-sm text-xs">
                            {order ? moment(order?.timestamp).format("llll") : <Skeleton />}
                        </p>
                    </div>
                    {order && (
                        <p className='lg:text-xl md:text-lg text-base font-medium whitespace-nowrap self-end flex-1 text-right text-blue-500'>
                            {order?.items?.length} items
                        </p>
                    )}
                </div>
                <div className='p-5 md:p-10 sm:p-8'>
                    {order ? (
                        <>
                            {admin &&
                                session?.admin &&
                                order?.order_status?.current?.status !== 'cancelled' &&
                                order?.order_status?.current?.status !== 'delivered' ? (
                                <select className='shadow leading-tight ofcus:outline-none focus:shadow-outline border xs:text-sm text-xs p-2 rounded bg-blue-500 text-white capitalize' disabled={disabled}>
                                    <option value='shipping soon'>Shipping Soon</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="out for delivery">Out for delivery</option>
                                    <option value="delivered">Delivered</option>

                                </select>
                            ) : (
                                <></>
                            )}
                            <div className='space-y-6 lg:text-lg sm:text-base text-sm'>
                                <div className={`my-2 p-4 border-2 ${order?.order_status?.current?.status === 'cancelled' ? 'text-red-500 border-red-500 bg-red-100' :
                                    order?.order_status?.current?.status == 'delivered' ? 'text-green-500 border-green-500 bg-green-100' : 'text-blue-500 border-blue-500 bg-blue-100'

                                    } rounded-md`} >
                                    <h1 className='font-semibold mb-4'>Order Status</h1>
                                    <ul className='space-y-2'>
                                        {order?.order_status?.info?.map(
                                            ({ status, timestamp }, i) => (
                                                <li className='flex sm:items-center sm:justify-between sm:flex-row flex-col' key={`orderstatus-${i}`}>
                                                    <span className='sm:text-sm text-xs font-medium capitalize'>
                                                        {status}
                                                    </span>
                                                    <span className='sm:text-sm text-xs'>
                                                        {moment(timestamp).format("llll")}
                                                    </span>

                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                <p className='whitespace-nowrap font-semibold overflow-x-auto hideScrollBar'>
                                    ORDER ID -
                                    <span className='text-green-500 font-medium ml-2'>
                                        {order?.id}
                                    </span>
                                </p>
                                <p className='whitespace-nowrap font-semibold overflow-x-auto hideScrollBar flex items-center'>
                                    EMAIL-
                                    <span className='text-sm font-normal  ml-2'>
                                        {order?.customer_details?.email}
                                    </span>
                                </p>
                                <div>
                                    <h3 className='font-semibold mb-2 uppercase'>Address</h3>
                                    <div className='text-sm text-gray-700'>
                                        <p>
                                            <span className='font-semibold'>Name - </span>
                                            {order?.shipping_details?.name}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>City - </span>
                                            {order?.shipping_details?.address?.city}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Country - </span>
                                            {order?.shipping_details?.address?.country}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Line 1 - </span>
                                            {order?.shipping_details?.address?.line1}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Line 2 - </span>
                                            {order?.shipping_details?.address?.line2}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Postal Code - </span>
                                            {order?.shipping_details?.address?.postal_code}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>State - </span>
                                            {order?.shipping_details?.address?.state}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='font-semibold mb-2 uppercase'>Amount</h3>
                                    <div className='text-sm text-gray-700'>
                                        <p>
                                            <span className='font-semibold'>SubTotal - </span>
                                            <Currency quantity={order?.amount_subtotal / 100} currency='INR' />
                                        </p>
                                        <p className='font-bold text-red-500'>
                                            <span className='font-semibold'>Total - </span>
                                            <Currency quantity={order?.amount_total / 100} currency='INR' />
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className='font-semibold mb-2 uppercase'>Items</h4>
                                    {order?.items?.map((item) => (
                                        <OrderItem item={item} key={`order-item-${item._id}`} />
                                    ))}
                                </div>
                                {order?.order_status?.current?.status && order?.order_status?.current?.status !== 'cancelled' && order?.order_status?.current?.status !== 'delivered' ?
                                    (
                                        <div className='py-4'>
                                            <button className={`button-red py-2 px-12 capitalize w-full sm:text-base text-sm ${disabled ? 'opacity-50' : ''}`}  disabled={disabled}>Cancel Order</button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                            </div>

                        </>
                    ) : (
                        <Skeleton count={30} />
                    )}
                </div>
            </div>
        </div>


    )
}

export default OrderDetails