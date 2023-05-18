import {
    UserProfile,
} from "@clerk/nextjs";
import { dark } from '@clerk/themes';

export default async function ProfilePage() {

    return (
        <UserProfile appearance={{
            elements: {
                rootBox: "w-full h-full",
                card: "m-0 w-full max-w-none h-full rounded-none"
            },
            baseTheme: dark
        }} />
    )
}
