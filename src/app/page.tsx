import { MultiUploader } from "@/components/uploader"
import { UserButton } from "@clerk/nextjs";

export const runtime = "edge"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MultiUploader />
      <UserButton />
    </main>
  )
}
