import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='max-[600px]:mb-20 bg-gray-300 dark:bg-gray-800 text-center'>
            <div className='flex flex-wrap justify-between items-center p-4'>
                <Link href="/stack" className='text-gray-500'>Stack Used</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>Privacy Policy</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>Terms of Use</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>Contact Us</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>Help</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>About Us</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>Careers</Link>
                <Link href="#" className='text-gray-500 mx-2'>|</Link>
                <Link href="#" className='text-gray-500'>Press</Link>
            </div>
            <Link href="#" className='text-gray-500'>© 2023 All rights reserved</Link>
        </footer>
    )
}

export default Footer