"use client"
import Image from "next/image";
import Divider from "./Divider";
import { imageSchema } from "@/server/common";
import { z } from "zod";

export function Gallery({ images }: { images: z.TypeOf<typeof imageSchema>[] }) {

    return (
        <div className="w-full mx-auto max-w-screen-md flex flex-col">
            <div className="my-4"></div>
            <div className="flex items-center justify-center ml-auto mr-16">
                <svg className="🅱️ mr-4" aria-label="New post" color="currentColor" fill="currentColor" height="36" role="img" viewBox="0 0 24 24">
                    <path className="text-[#b3b3b3]" d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    <line className="text-[#b3b3b3]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                    <line className="text-[#b3b3b3]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                </svg>
                <svg
                    className="🅱️"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="text-[#b3b3b3]"
                        d="M5 6.77273H9.2M19 6.77273H14.8M9.2 6.77273V5.5C9.2 4.94772 9.64772 4.5 10.2 4.5H13.8C14.3523 4.5 14.8 4.94772 14.8 5.5V6.77273M9.2 6.77273H14.8M6.4 8.59091V15.8636C6.4 17.5778 6.4 18.4349 6.94673 18.9675C7.49347 19.5 8.37342 19.5 10.1333 19.5H13.8667C15.6266 19.5 16.5065 19.5 17.0533 18.9675C17.6 18.4349 17.6 17.5778 17.6 15.8636V8.59091M9.2 10.4091V15.8636M12 10.4091V15.8636M14.8 10.4091V15.8636"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <Divider />
            <div className="flex w-full justify-center flex-wrap gap-2">
                {images.map(item => (
                    <Image
                        className="max-[400px]:w-[calc(50%-0.5rem)] min-[786px]:w-60"
                        key={item.id}
                        width={180}
                        height={180}
                        src={item.url}
                        alt="Preview Image"
                    />
                )
                )}
            </div>
            <div className="my-4"></div>
        </div>
    );
}