"use client"
import {
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const { user } = useUser()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <>
            <nav className="flex bg-gradient-to-br from-blue-400 to-blue-700 items-center justify-between text-white shadow-lg border-2 border-solid border-blue-700 h-16 px-4 py-2">
                <Link href="/">
                    <svg height={32} className="🅱️" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 283 64"><path fill="black" d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c6 0 12-3 16-7l-8-5c-2 3-5 4-8 4-5 0-9-3-11-7h28l1-3c0-11-8-18-19-18zm-10 15c2-4 5-7 10-7s8 3 9 7h-19zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10zm83-29v46h-9V5h9zM37 0l37 64H0L37 0zm92 5-27 48L74 5h10l18 30 17-30h10zm59 12v10l-3-1c-6 0-10 4-10 10v15h-9V17h9v9c0-5 6-9 13-9z" /></svg>
                </Link>
                <div className="flex items-center gap-3">
                    <button className="bg-blue-400 🅱️ text-white rounded-lg px-4 py-2" onClick={() => {
                        setIsDrawerOpen(!isDrawerOpen)
                    }}>
                        Drawer
                    </button>
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
            }} className="flex flex-col justify-center items-center bg-blue-500 top-0 w-[50vw] h-screen absolute -left-full transition-all duration-300 z-10">

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
            }} className="top-0 left-0 w-screen h-screen absolute opacity-25 bg-slate-400">
            </div>
        </>
    )
}
export default Navbar;