"use client"
import Divider from "@/components/Divider"
import { Button } from "@/components/ui/button"

interface errorProps {
    error: Error,
    reset: () => void
}

const error: React.FC<errorProps> = ({ error, reset }) => {
    return (
        <div className="flex flex-col items-center justify-center max-[600px]:h-[calc(100vh-80px)] min-[600px]:h-screen text-gray-700 dark:text-slate-400">
            <h1 className="text-xl font-bold">{error.name}</h1>
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-lg">{error.message}</p>
            <Divider />
            <Button onClick={reset}>Try Again</Button>
        </div>
    )
}

export default error