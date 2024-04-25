import React from 'react'
import Image from 'next/image'

function Testimonials() {
    return (
        <div className='px-6 py-20'>
            <div className='mx-auto max-w-screen-xl'>
                <h2 className='heading'>Our Customers can't live Without us</h2>
                <div className='flex justify-between mt-20 italic lg:text-base text-sm gap-6 sm:flex-row flex-col'>
                    <div className='sm:max-w-xs'>
                        <div className='font-extrabold text-6xl -mb-8'>"</div>
                        <p>
                        Choosing Fleefushion was the best decision we made for our business. Their talented team seamlessly integrated our vision into every aspect of our website, resulting in a stunning final product.                        </p>
                        <div className='flex items-center sm:mt-8 mt-4 gap-2'>
                            <div>
                                <Image src="/img/testimonials/customer-1.jpg" alt='' width={45} height={45} objectFit='contain' className='rounded-full'></Image>
                            </div>
                            <span>Michael George</span>
                        </div>
                    </div>
                    <div className='sm:max-w-xs'>
                        <div className='font-extrabold text-6xl -mb-8'>"</div>
                        <p>
                        Fleefushion transformed our outdated website into a modern masterpiece! Their expertise in UX design and development helped us increase user engagement and conversion rates significantly.
                        </p>
                        <div className='flex items-center sm:mt-8 mt-4 gap-2'>
                            <div>
                                <Image src="/img/testimonials/customer-2.jpg" alt='' width={45} height={45} objectFit='contain' className='rounded-full'></Image>
                            </div>
                            <span>Sarah Elizabeth</span>
                        </div>
                    </div>
                    <div className='sm:max-w-xs'>
                        <div className='font-extrabold text-6xl -mb-8'>"</div>
                        <p>
                        We partnered with Fleefushion for our rebranding campaign, and it was a game-changer! Their designs perfectly captured our brand identity and resonated with our target audience.
                        </p>
                        <div className='flex items-center sm:mt-8 mt-4 gap-2'>
                            <div>
                                <Image src="/img/testimonials/customer-3.jpg" alt='' width={45} height={45} objectFit='contain' className='rounded-full'></Image>
                            </div>
                            <span>Jason Smith</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials