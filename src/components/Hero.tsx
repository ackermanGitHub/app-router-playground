import { cn } from '@/lib/utils'
import React from 'react'

export const Hero = ({ className, ref, children, jobTitle = "", plataform = "", text = "", tag = "", currency = "", ...props }: { className?: string, ref?: React.ForwardedRef<HTMLHeadingElement>, children?: React.ReactNode, jobTitle?: string, plataform?: string, text?: string, tag?: string, currency?: string }) => {
    return (
        <div ref={ref}
            className={cn(
                "bg-white text-slate-600 hover:bg-blue hover:text-white p-6 rounded-lg w-[350px] drop-shadow-2xl",
                className
            )}
            {...props} >
            <div className='flex gap-6 mb-6'>
                {children}
                <div className='flex flex-col m'>
                    <h1 className='font-bold text-xl'>jobTitle</h1>
                    <p className='font-light'>platform</p>
                </div>
            </div>
            <p className='font-light text-md tracking-wider mb-6'>text</p>
            <div className='w-full border-[0.1px] border-slate-100 mb-6' />
            <div className='flex justify-between items-center font-semibold'>
                <p className='bg-white bg-opacity-10 p-1'>tag</p>
                <p>currency</p>
            </div>
        </div>
    )
}

export default Hero