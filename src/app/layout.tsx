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
      <html style={{
        colorScheme: "dark",
      }} className='dark' lang="en">
        <body className={`${inter.className}`}>
          <Navbar />
          <main className='min-[600px]:ml-20'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
