import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar';
import { dark } from '@clerk/themes';
import { cookies } from 'next/headers';

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

  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html style={{
        colorScheme: theme?.value === "dark" ? "dark" : "light",
        height: "100%"
      }} className={theme?.value === "dark" ? "dark" : "light"} lang="en">
        <body className={`${inter.className} h-full bg-gradient-to-r from-[#F6FFDE] to-[#E3F2C1] dark:from-[#293232] dark:to-[#232929]`}>
          <Navbar />
          <main className='max-[600px]:pb-20 min-[600px]:ml-20 overflow-y-auto'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
