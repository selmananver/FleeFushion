import React from 'react'

function Info() {
    return (
        <div className='px-6 py-20'>
            <div className='flex justify-evenly mx-auto  max-w-screen-lg flex-wrap sm:gap-8 gap-10 sm:flex-row flex-col'>
                <div className='flex flex-col items-center gap-2'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="lg:w-12 w-10 text-primary-light mx-auto ">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 className="font-semibold">Today 10am - 7pm</h3>
                    <h4>Working Hours</h4>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="lg:w-12 w-10 text-primary-light mx-auto"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                    </div>
                    <h3 className="font-semibold">Aluva,Ernakulam</h3>
                    <h4>Get Directions</h4>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="lg:w-12 w-10 text-primary-light mx-auto"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                    </div>
                    <h3 className="font-semibold">8113984723</h3>
                    <h4>Call Now</h4>
                </div>
            </div>
        </div>
    )
}

export default Info
