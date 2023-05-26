import { SignIn } from "@clerk/nextjs/app-beta";
import { Suspense } from "react";

interface PageProps {
    searchParams: {
        [key: string]: unknown;
    };
}
export default function Page({ searchParams }: PageProps) {
    const { redirect_url: redirectUrlFromParams } = searchParams || {};

    let redirectUrl = "/";
    if (redirectUrlFromParams && typeof redirectUrlFromParams === "string") {
        redirectUrl = redirectUrlFromParams;
    }

    return <Suspense fallback={<h2>suspense</h2>}><SignIn signUpUrl="/sign-up" redirectUrl={redirectUrl} /></Suspense>;
}

export const revalidate = 0;