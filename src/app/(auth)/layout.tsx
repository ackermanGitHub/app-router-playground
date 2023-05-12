export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full bg-gradient-to-r from-slate-900 to-indigo-950 flex flex-row items-center justify-center">
            {children}
        </div>
    );
}