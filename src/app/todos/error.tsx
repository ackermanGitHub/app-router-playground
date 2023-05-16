"use client"
import { Button } from "@/components/ui/button"

interface errorProps {
    error: Error,
    reset: () => void
}

const error: React.FC<errorProps> = ({ error, reset }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <h1 className="text-xl font-bold">{error.name}</h1>
            <p className="text-lg">{error.message}</p>
            <Button className="🅱️" onClick={reset}>Try Again</Button>
        </div>
    )
}

export default error