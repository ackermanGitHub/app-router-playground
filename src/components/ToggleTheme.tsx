'use client'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

function ToggleTheme() {

    return (
        <div className="flex items-center space-x-2">
            <Switch id="theme" onCheckedChange={() => {
                const htmlTag = document.querySelector<HTMLHtmlElement>('html');
                if (!htmlTag) {
                    throw new Error('No html tag');
                }
                htmlTag.style.colorScheme = htmlTag.style.colorScheme === 'dark' ? 'light' : 'dark';
                htmlTag.classList.toggle('dark');
            }} />
            <Label htmlFor="theme">Toggle Theme</Label>
        </div>
    )
}

export default ToggleTheme