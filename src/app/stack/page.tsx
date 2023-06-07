import Divider from "@/components/Divider"
import ToggleTheme from "@/components/ToggleTheme"
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

export default function StackPage() {

  return (
    <div className="flex h-auto flex-col items-center justify-center">
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <PostgresIcoSVG />
        <VercelPGIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <EsLintIcoSVGs />
        <EsLintHeaderSVG />
        <EsLintIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <RadixIcoSVGs />
        <RadixHeaderSVG />
        <RadixIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <AutoprefixerSVG />
        <PostCssIco />
        <TailwindIcoSVG width="200" />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <NextjsIcoSVG />
        <NextjsRoundedIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <TypeScriptIcoSVG />
        <PrettierIco />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <TanStackHeader className='h-[58px] flex items-center' />
        <ZodIcoSVG />
      </div>
      <Divider />
      <div className="flex items-center gap-2 flex-wrap justify-center">

        <ClerkIcoSVG />
        <UploadThingHeader className='text-5xl h-[58px] flex items-center' />
      </div>
      <Divider />
    </div>
  )
}
