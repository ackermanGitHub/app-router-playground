"use client"
import Image from "next/image";
import { useRef, useState } from "react";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { genUploader } from "uploadthing/client";

import Divider from "./Divider";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
                <div className="grid py-2 h-10 px-4 border-input cursor-pointer border rounded-md max-w-sm items-center gap-1.5">
                    <Label htmlFor="file-upload" className="🅱️">Select Files</Label>
                    <Input className="hidden" id="file-upload" ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} multiple />
                </div>
                <Button
                    className="🅱️"
                    variant="outline"
                    onClick={() => {
                        uploader(selectedFiles, "imageUploader")
                    }}
                >
                    Upload
                </Button>
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