import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar';
import { dark } from '@clerk/themes';

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
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html style={{
        colorScheme: "dark",
      }} className='dark' lang="en">
        <body className={`${inter.className} bg-gradient-to-r from-slate-900 to-indigo-950`}>
          <Navbar />
          <main className='max-[600px]:mb-20 min-[600px]:ml-20'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
