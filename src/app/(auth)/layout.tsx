export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-screen max-[600px]:h-[calc(100vh-80px)] bg-gradient-to-r flex flex-row items-center justify-center">
            {children}
        </div>
    );
}