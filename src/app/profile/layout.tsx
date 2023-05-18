
export const metadata = {
    title: 'Profile',
    description: 'Nextjs app router playground',
}

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
