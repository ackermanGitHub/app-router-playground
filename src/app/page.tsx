import { VercelPGIco, NextjsIco, NextjsRoundedIco } from "@/utils/SVGs"

export default function HomePage() {

  return (
    <div className="flex h-auto flex-col items-center justify-center">
      <VercelPGIco />
      <NextjsIco />
      <NextjsRoundedIco />
    </div>
  )
}
