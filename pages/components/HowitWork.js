import React from 'react'

function HowitWork() {
    return (
        <div className='px-6'>
            <div className='max-w-screen-xl mx-auto lg:py-20 sm:py-14 py-10'>
                <h2 className='heading'>How It Works</h2>
                <div className='mt-20'>
                    <div className='flex sm:justify-evenly text-center sm:gap-4 gap-8 flex-wrap sm:flex-row flex-col'>
                        <div className='flex flex-col items-center sm:gap-6 gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-14 w-10 text-primary-light mx-auto"><path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"></path></svg>
                            <h3 className='font-medium sm:text-2xl text-xl'>Pick Meal</h3>
                            <h4 className='max-w-xs mx-auto sm:text-base text-sm'>
                               Choose a meal from our diverse weekly menu.
                            </h4>
                        </div>
                        <div className='flex flex-col items-center sm:gap-6 gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-14 w-10 text-primary-light mx-auto"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path></svg>
                            <h3 className='font-medium sm:text-2xl text-xl'>Checkout</h3>
                            <h4 className='max-w-xs mx-auto sm:text-base text-sm'>
                                Fill address, all the necessary details and make payment.
                            </h4>
                        </div>
                        <div className='flex flex-col items-center sm:gap-6 gap-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-14 w-10 text-primary-light mx-auto"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path></svg>
                            <h3 className='font-medium sm:text-2xl text-xl'>Fast Delivery</h3>
                            <h4 className='mx-auto max-w-xs  sm:text-base text-sm'>
                                Freshly prepared meal arrive on your doorstep in a refigerated box.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowitWork