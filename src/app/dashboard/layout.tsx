
export const metadata = {
    title: 'Dashboard',
    description: 'Nextjs app router playground',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='w-1/2 h-1/2 border-solid border-2 border-red-500'></div>
    )
}
