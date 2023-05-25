"use client"
import Image from "next/image";
import { useRef, useState, useTransition } from "react";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { insertImage } from "@/server/actions";
import { genUploader } from "uploadthing/client";
import { useUser } from "@clerk/nextjs";

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

    const [_, startTransition] = useTransition();

    const uploader = genUploader<typeof ourFileRouter>();

    const { user, isSignedIn, isLoaded } = useUser()

    if (!isLoaded) {
        return <p>Loading...</p>
    }

    if (!isSignedIn) {
        throw new Error("User is not signed in");
    }

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
                    onClick={() => {
                        startTransition(async () => {
                            const promises = selectedFiles.map(async (image) => {
                                const res = await uploader([image], "imageUploader");
                                return insertImage({
                                    user_id: user.id,
                                    url: res[0].fileUrl,
                                    size_mb: image.size / (1024 * 1024),
                                });
                            });
                            await Promise.all(promises);
                        });
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