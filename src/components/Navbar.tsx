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
            <nav className="flex items-center justify-between border-2 h-16 px-4 py-2">
                <Button variant="outline" className="🅱️" onClick={() => {
                    setIsDrawerOpen(!isDrawerOpen)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>

                </Button>
                <div className="flex items-center gap-3">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <Link href="/sign-in" className="bg-blue-400 🅱️ text-white rounded-lg px-4 py-2">Sign In</Link>
                    </SignedOut>
                </div>
            </nav>
            <div style={{
                translate: isDrawerOpen ? "200%" : "0%",
            }} className="flex flex-col justify-center items-center bg-blue-500 top-0 w-[50vw] h-screen absolute -left-full transition-all duration-300 z-20">

                <button className="bg-blue-500 text-white 🅱️ absolute top-2 right-2 p-4" onClick={() => setIsDrawerOpen(false)}>❌</button>
                <ul>
                    <li>
                        <Link onClick={() => {
                            setIsDrawerOpen(false);
                        }} className="text-white text-base" href="/">Home</Link>
                    </li>
                    <li>
                        <Link onClick={() => {
                            setIsDrawerOpen(false);
                        }} className="text-white text-base" href="/todos">ToDos</Link>
                    </li>
                </ul>
            </div>
            <div style={{
                display: isDrawerOpen ? "block" : "none",
            }} onClick={() => {
                setIsDrawerOpen(false);
            }} className="top-0 left-0 w-screen h-screen absolute z-10 opacity-25 bg-slate-400">
            </div>
        </>
    )
}
export default Navbar;