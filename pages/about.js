import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Head from 'next/head'
import Fade from 'react-reveal'

function About() {
    return (
        <>
            <Head>
                <title>FleeFushion | About</title>
            </Head>
            <div className='heightFix px-6'>
                <div className='max-w-screen-xl mx-auto md:py-20 py-12 pb-20'>
                    <div className='xl:text-lg text-base font-medium'>
                        <h3 className='sm:text-2xl text-xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700'>
                            About
                        </h3>
                        <div className='flex md:gap-8 md:flex-row flex-col w-full items-center'>
                            <div className='mx-auto md:w-3/4 md:max-w-lg max-w-xs py-20'>
                                <Image src="/img/programming.svg" width={400} height={400} alt='' objectFit='contain' />
                            </div>
                            <div className='flex-grow ml-auto'>
                                <Fade Bottom>
                                    <p>This website for FleeFushion restaurant, designed by Selman Anver, serves as a showcase of his development expertise.Constructed with
                                        <span className='link text-primary-light underline mx-1'>
                                            <Link href="https://nextjs.org/"> Next.js,</Link>
                                        </span>
                                        <span className="link text-primary-light underline mx-1">
                                            <Link href="https://tailwindcss.com"> Tailwindcss,</Link>
                                        </span>
                                        <span className="link text-primary-light underline mx-1">
                                            <Link href="https://cloud.mongodb.com/"> MongoDB </Link>
                                        </span>
                                        by
                                        <span className='font-semibold text-primary-light underline mx-1'>
                                            Selman Anver
                                        </span>
                                        it exemplifies his skills in web development
                                    </p>
                                    <p className='mt-2'>
                                        For inquiries or collaboration opportunities, reach out via email at
                                        <span className='link text-primary-light mx-1'>
                                            selmananver7@gmail.com
                                        </span>
                                    </p>
                                </Fade>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About