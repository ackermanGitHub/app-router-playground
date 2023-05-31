'use client'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

function ToggleTheme() {
    return (
        <div className="flex items-center space-x-2">
            <Switch id="theme" />
            <Label htmlFor="theme">Toggle Theme</Label>
        </div>
    )
}

export default ToggleTheme