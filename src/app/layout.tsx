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
          <div className="z-10 w-full flex flex-col bg-white items-center justify-between font-mono text-sm">
            <div className="fixed max-sm:bottom-0 z-50 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-white lg:bg-white via-white dark:from-black dark:via-black lg:fixed lg:top-0 lg:h-auto lg:w-full">
              <TopBar title="The Infoverse!" links={[{path: "/", title: "Home"}, {path: "charts", title: "Charts"}]}></TopBar>
            </div>
          </div>
        </header>
        <main className="h-full lg:mt-20 flex flex-col">
          { children }
        </main>
      </body>
    </html>
  )
}
