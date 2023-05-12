"use client"
import Image from "next/image";
import { useRef, useState } from "react";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { genUploader } from "uploadthing/client";

import Divider from "./Divider";

export function MultiUploader() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const handleFileSelect = () => {
        if (inputRef.current) {
            const files = inputRef.current.files;
            if (files) {
                const filesArray = Array.from(files);
                setSelectedFiles(filesArray);
            }
        }
    };

    const uploader = genUploader<typeof ourFileRouter>();

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="my-4"></div>
            <div className="flex w-full items-center justify-center gap-2">
                <label htmlFor="file-upload" className="bg-blue-500 🅱️ text-white rounded-lg px-4 py-2">Select Files</label>
                <input className="hidden" id="file-upload" ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} multiple />
                <button
                    className="bg-blue-500 🅱️ text-white rounded-lg px-4 py-2"
                    onClick={() => {
                        uploader(selectedFiles, "imageUploader")
                    }}
                >
                    Upload
                </button>
            </div>
            <Divider />
            <div className="flex w-full justify-center flex-wrap gap-2">
                {selectedFiles.map((item, index) => {
                    const imageUrl = URL.createObjectURL(item);
                    return (
                        <Image
                            key={`${item.name}-${index}`}
                            width={200}
                            height={200}
                            src={imageUrl}
                            alt="Preview Image"
                        />
                    );
                })}
            </div>
            <div className="my-4"></div>
        </div>
    );
}