import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home Page',
  description: 'Nextjs app router playground',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav className="p-4 bg-gray-800 text-white"><h1>Nextjs App Router Playground</h1></nav>
          <main className='border-blue-500'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
