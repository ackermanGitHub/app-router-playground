import { MultiUploader } from "@/components/Uploader"
import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ProfilePage() {

    return (
        <Tabs defaultValue="gallery" className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <TabsList>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="uploader">Uploader</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="gallery">
                <h2>Gallery</h2>
            </TabsContent>
            <TabsContent value="uploader">
                <MultiUploader></MultiUploader>
            </TabsContent>
        </Tabs>
    )
}
