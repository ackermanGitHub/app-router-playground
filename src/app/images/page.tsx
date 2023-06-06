import { sql } from "@vercel/postgres";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiUploader } from "@/components/Uploader"
import { Gallery } from "@/components/Gallery";
import { imageSchema } from "@/server/common";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Divider from "@/components/Divider"

const getImages = async (userId: string) => {
    console.log(`
        SELECT * FROM images
        WHERE user_id = ${userId}
    `)
    const res = await sql<z.TypeOf<typeof imageSchema>>`
        SELECT * FROM images
        WHERE user_id = ${userId}
    `
    return res.rows;
}

export default async function ProfilePage() {
    const { userId } = auth();

    if (!userId) return (
        <div className="container text-center mx-auto p-4 max-[600px]:h-[calc(100vh-80px)] min-[600px]:h-screen w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl text-gray-700 dark:text-slate-400">
                <span className="font-bold">You are not logged in.</span>
                <br />
                <span className="text-xl">Please log in to view this page.</span>
            </h2>
            <Divider />
            <Link href={'/sign-in'}>
                <Button>
                    Sign In
                </Button>
            </Link>
        </div>
    )

    const dataImages = await getImages(userId);

    return (
        <Tabs defaultValue="gallery" className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="uploader">Uploader</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="gallery">
                <Gallery images={dataImages} />
            </TabsContent>
            <TabsContent value="uploader">
                <MultiUploader />
            </TabsContent>
        </Tabs>
    )
}
