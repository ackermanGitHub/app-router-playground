import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar';

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
        <body className={`${inter.className} h-screen relative`}>
          <header className='w-auto'>
            <Navbar />
          </header>
          <main className='w-full h-auto'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
