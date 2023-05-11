"use client"
import Image from "next/image";
import { useRef, useState } from "react";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { genUploader } from "uploadthing/client";


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
        <>
            <div>
                <h1>regular input</h1>
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
                <input ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} multiple />
                <button onClick={() => {
                    uploader(selectedFiles, "imageUploader")
                }}>Upload</button>
            </div>
        </>
    );
}