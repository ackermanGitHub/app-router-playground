import { sql } from "@vercel/postgres";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiUploader } from "@/components/Uploader"
import { Gallery } from "@/components/Gallery";
import { imageSchema } from "@/server/common";

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
        <div className="container mx-auto p-4">
            <p>You need to be logged in to view this page.</p>
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
                <MultiUploader></MultiUploader>
            </TabsContent>
        </Tabs>
    )
}
