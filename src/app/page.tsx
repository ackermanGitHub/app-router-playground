import Divider from "@/components/Divider"
import Hero from "@/components/Hero"
import {
  PostgresIcoSVG, VercelPGIcoSVG,
  EsLintIcoSVGs, EsLintHeaderSVG, EsLintIcoSVG,
  RadixIcoSVGs, RadixIcoSVG, RadixHeaderSVG,
  AutoprefixerSVG, PostCssIco, TailwindIcoSVG,
  NextjsIcoSVG, NextjsRoundedIcoSVG,
  TypeScriptIcoSVG, PrettierIco,
  TanStackHeader, ZodIcoSVG,
  ClerkIcoSVG, UploadThingHeader
} from "@/utils/SVGs"

export default function HomePage() {

  return (
    <div className="flex h-auto flex-col items-center justify-center">
      <Divider />
      <div className="flex items-center gap-2">

        <PostgresIcoSVG />
        <VercelPGIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2">

        <EsLintIcoSVGs />
        <EsLintHeaderSVG />
        <EsLintIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2">

        <RadixIcoSVGs />
        <RadixHeaderSVG />
        <RadixIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2">

        <AutoprefixerSVG />
        <PostCssIco />
      </div>
      <TailwindIcoSVG />
      <Divider />
      <div className="flex items-center gap-2">

        <NextjsIcoSVG />
        <NextjsRoundedIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2">

        <TypeScriptIcoSVG />
        <PrettierIco />
      </div>
      <Divider />
      <div className="flex items-center gap-2">

        <TanStackHeader className='h-[58px] flex items-center' />
        <ZodIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2">

        <ClerkIcoSVG />
        <UploadThingHeader className='text-5xl h-[58px] flex items-center' />
      </div>
      <Divider />
    </div>
  )
}
