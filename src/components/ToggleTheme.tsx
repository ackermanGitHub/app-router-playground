'use client'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const ToggleTheme = ({
    withLabel = true,
    classNameDiv,
    classNameSwitch,
    classNameLabel,
    labelText,
    ref,
    ...props
}: {
    withLabel?: boolean,
    classNameDiv?: string,
    classNameSwitch?: string,
    classNameLabel?: string,
    labelText?: string,
    ref?: React.Ref<HTMLDivElement>
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'className'>,) => {

    return (
        <div ref={ref} {...props} className={cn(classNameDiv, "flex items-center space-x-2")}>
            <Switch id="theme" onCheckedChange={() => {
                const htmlTag = document.querySelector<HTMLHtmlElement>('html');
                if (!htmlTag) {
                    throw new Error('No html tag');
                }
                if (htmlTag.style.colorScheme === 'dark') {
                    htmlTag.style.colorScheme = 'light';
                    document.cookie = 'theme=light';
                } else {
                    document.cookie = 'theme=dark';
                    htmlTag.style.colorScheme = 'dark';
                }
                htmlTag.classList.toggle('dark');
            }}
                className={cn(classNameSwitch)}
            />
            {
                withLabel &&
                <Label className={cn(classNameLabel, "text-base font-semibold")} htmlFor="theme">{labelText || "Toggle Theme"}</Label>
            }
        </div>
    )
}

export default ToggleTheme