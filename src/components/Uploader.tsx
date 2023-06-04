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
    // const selectingRef = useRef(false);
    const [imagesToUpload, setImagesToUpload] = useState<{ file: File, selected: boolean }[]>([]);

    const handleFileSelect = () => {
        if (inputRef.current) {
            const files = inputRef.current.files;
            if (files) {
                const filesArray = Array.from(files);
                setImagesToUpload(filesArray.map((file) => ({ file, selected: false })))
            };
        }
    }

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
        <div className="w-full m-auto max-w-screen-md flex flex-col items-center justify-center">
            <div className="my-4"></div>
            <div className="flex w-full items-center justify-center gap-2">
                <div className="grid py-2 h-10 px-4 border-input cursor-pointer border rounded-md max-w-sm items-center gap-1.5">
                    <Label htmlFor="file-upload" className="🅱️">Select Files</Label>
                    <Input className="hidden" id="file-upload" ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} multiple />
                </div>
                <Button
                    onClick={() => {
                        startTransition(async () => {
                            const promises = imagesToUpload.map(async (image) => {
                                const res = await uploader([image.file], "imageUploader");
                                return insertImage({
                                    user_id: user.id,
                                    url: res[0].fileUrl,
                                    size_mb: image.file.size / (1024 * 1024),
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
                {imagesToUpload.map((item, index) => (
                    <div
                        className="max-[480px]:w-[calc(50%-0.8rem)] min-[786px]:w-60"
                        key={`${item.file.name}-${index}`}
                        onTouchStart={(e) => {
                            /* e.currentTarget.style.border = "2px solid red"
                            selectingRef.current = true;
                            setTimeout(() => {
                                console.log("setTimeout", selectingRef.current)
                                if (selectingRef.current) {
                                    setImagesToUpload((prev) => {
                                        console.log("setImagesToUpload")
                                        const newImages = [...prev];
                                        newImages[index].selected = !newImages[index].selected;
                                        selectingRef.current = false;
                                        return newImages;
                                    })
                                }
                            }, 2000) */
                            console.log("touch started")
                        }}

                        onTouchEnd={(e) => {
                            /* e.currentTarget.style.border = ""
                            selectingRef.current = false; */
                            console.log("touch ended")
                        }}
                    >

                        <Image
                            style={{
                                border: item.selected ? "2px solid blue" : "",
                            }}
                            width={200}
                            height={200}
                            src={URL.createObjectURL(item.file)}
                            alt="Preview Image"
                        />
                    </div>
                )
                )}
            </div>
            <div className="my-4"></div>
        </div>
    );
}

/* 
How can i capture when the user selects an image event by touching the image and holding the touch untill the image get selected? 
-Generate the code for react with nextjs using typescript and tailwind!!!
Answer :

Share icon
To capture the user selecting an image event by touching and holding the touch, you can use the  onLongPress  event available in some touchable components in libraries like  react-native . However, since you are working with React and Next.js, you can use the  onMouseDown  and  onMouseUp  events in combination with the  useState  hook to achieve a similar effect. Here's an example implementation:
import { useState } from 'react';
function MyComponent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleMouseDown = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const handleMouseUp = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <img
        src="image1.png"
        onMouseDown={() => handleMouseDown('image1.png')}
        onMouseUp={() => handleMouseUp()}
        style={{ border: selectedImage === 'image1.png' ? '2px solid red' : 'none' }}
      />
      <img
        src="image2.png"
        onMouseDown={() => handleMouseDown('image2.png')}
        onMouseUp={() => handleMouseUp()}
        style={{ border: selectedImage === 'image2.png' ? '2px solid red' : 'none' }}
      />
    </div>
  );
}
  
In this example, we use the  useState  hook to keep track of the currently selected image. When the user presses down on an image, the  handleMouseDown  function is called with the image URL as a parameter and updates the  selectedImage  state variable. When the user releases the mouse button, the  handleMouseUp  function is called and sets the  selectedImage  state variable back to  null . This way, only one image can be selected at a time. We also use the  selectedImage  state variable to conditionally apply a border to the selected image with inline styling.

*/