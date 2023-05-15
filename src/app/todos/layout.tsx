import { InputProvider } from "@/hooks/useInput"

export const metadata = {
    title: 'ToDos',
    description: 'Nextjs app router playground',
}

export default function ToDosLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <InputProvider>
            {children}
        </InputProvider>
    )
}
