import { cn } from '@/lib/utils'
import React from 'react'

export const Hero = ({ className, ref, children, width = 350, height = 220, jobTitle = "", plataform = "", text = "", tag = "", currency = "", ...props }: { className?: string, ref?: React.ForwardedRef<HTMLHeadingElement>, children?: React.ReactNode, width?: string | number, height?: string | number, jobTitle?: string, plataform?: string, text?: string, tag?: string, currency?: string }) => {
    return (
        <div ref={ref}
            className={cn(
                `bg-white dark:bg-gray-900 text-slate-600 dark:text-zinc-300 p-6 rounded-lg drop-shadow-2xl`,
                className
            )}
            {...props}
            style={{
                width: typeof width === "number" ? width + "px" : width,
                height: typeof height === "number" ? height + "px" : height,
            }}
        >
            <div className='flex gap-6 mb-6'>
                {children}
                <div className='flex flex-col m'>
                    <h1 className='font-bold text-xl'>{jobTitle}</h1>
                    <p className='font-light'>{plataform}</p>
                </div>
            </div>
            <p className='font-light text-md tracking-wider mb-6'>{text}</p>
            <div className='w-full border-[0.1px] border-slate-100 dark:border-zinc-700 mb-6' />
            <div className='flex justify-between items-center font-semibold'>
                <p className='bg-opacity-10 p-1'>{tag}</p>
                <p>{currency}</p>
            </div>
        </div>
    )
}

export default Hero