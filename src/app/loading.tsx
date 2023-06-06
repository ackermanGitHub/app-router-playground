

const Loading = () => {
    return (
        <div className="max-[600px]:h-[calc(100vh-80px)] min-[600px]:h-screen flex flex-col items-center justify-center text-gray-700 dark:text-slate-400">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-zinc-700 dark:border-zinc-400" />
            <h2 className="text-2xl mt-3">
                <span className="font-bold">Loading Page</span>
                <span className="text-5xl animate-pulse delay-300">.</span>
                <span className="text-5xl animate-pulse delay-700">.</span>
                <span className="text-5xl animate-pulse delay-1000">.</span>
            </h2>
        </div>
    )
}

export default Loading