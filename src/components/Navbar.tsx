"use client"
import {
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
    const { user } = useUser()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <>
            <nav className="flex items-center justify-between border-b-2 h-full px-4 py-2">
                <Button variant="outline" className="🅱️" onClick={() => {
                    setIsDrawerOpen(!isDrawerOpen)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Button>
                <div className="flex items-center gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/sign-in" />
                    </SignedIn>
                    <SignedOut>
                        <Link href="/sign-in" >
                            <Button variant="outline" className="🅱️">
                                Sign In
                            </Button>
                        </Link>
                    </SignedOut>
                </div>
            </nav>
            <div style={{
                translate: isDrawerOpen ? "200%" : "0%",
            }} className="border-r-2 bg-secondary top-0 w-[50vw] h-screen absolute -left-full transition-all duration-300 p-20 z-20">
                <Button variant="outline" className="🅱️ absolute top-2 right-2 p-4" onClick={() => setIsDrawerOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                </Button>
                <ul className="flex flex-col gap-8">
                    <li>
                        <Link onClick={() => {
                            setIsDrawerOpen(false);
                        }} href="/">
                            <Button variant="link" className="🅱️">
                                Home
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            setIsDrawerOpen(false);
                        }} href="/todos">
                            <Button variant="link" className="🅱️">
                                ToDos
                            </Button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div style={{
                display: isDrawerOpen ? "block" : "none",
            }} onClick={() => {
                setIsDrawerOpen(false);
            }} data-state={isDrawerOpen ? "open" : "closed"} className="absolute z-10 top-0 left-0 h-full w-full bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in">
            </div>
        </>
    )
}
export default Navbar;