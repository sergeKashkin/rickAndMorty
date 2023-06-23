import TopBar from './components/header/header'
import './globals.css'
import { Inter } from 'next/font/google'
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rick and Morty',
  description: 'Created by Sergei',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
        <header>
          <div className="z-10 w-full bg-white items-center justify-between font-mono text-sm">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <TopBar title="Rick & Morty"></TopBar>
            </div>
          </div>
        </header>
        <main>
          { children }
        </main>
      </body>
    </html>
  )
}
