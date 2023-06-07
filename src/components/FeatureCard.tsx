import { cn } from '@/lib/utils'
import React from 'react'

export const FeatureCard = ({ className, ref, children, width = 350, height = 220, title = "", subtitle, text = "", ...props }: { className?: string, ref?: React.ForwardedRef<HTMLHeadingElement>, children?: React.ReactNode, width?: string | number, height?: string | number, title?: string, subtitle?: string, text?: string }) => {
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
                <div className='flex flex-col justify-center'>
                    <h1 className='font-bold text-xl'>{title}</h1>
                    {subtitle && <p className='font-light'>{subtitle}</p>}
                </div>
            </div>
            <p className='font-light text-md tracking-wider mb-6'>{text}</p>
        </div>
    )
}

export default FeatureCard