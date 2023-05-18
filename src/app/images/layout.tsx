
export const metadata = {
    title: 'Images',
    description: 'Nextjs app router playground',
}

export default function ImagesLayout({
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
