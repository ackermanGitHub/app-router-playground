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
      <PostgresIcoSVG />
      <VercelPGIcoSVG />
      <Divider />
      <EsLintIcoSVGs />
      <EsLintHeaderSVG />
      <EsLintIcoSVG />
      <Divider />
      <RadixIcoSVGs />
      <RadixHeaderSVG />
      <RadixIcoSVG />
      <Divider />
      <AutoprefixerSVG />
      <PostCssIco />
      <TailwindIcoSVG />
      <Divider />
      <NextjsIcoSVG />
      <NextjsRoundedIcoSVG />
      <Divider />
      <TypeScriptIcoSVG />
      <PrettierIco />
      <Divider />
      <TanStackHeader className='h-[58px]' />
      <ZodIcoSVG />
      <Divider />
      <ClerkIcoSVG />
      <UploadThingHeader className='text-5xl h-[58px]' />
      <Divider />
    </div>
  )
}
