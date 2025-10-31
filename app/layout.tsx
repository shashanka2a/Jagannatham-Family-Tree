import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jagannatham Family Tree | Explore Your Ancestral Lineage',
  description: 'Interactive family tree for the Jagannatham family. Explore your ancestral lineage, discover family stories, and connect with your heritage.',
  keywords: ['family tree', 'genealogy', 'Jagannatham', 'ancestry', 'family history'],
  authors: [{ name: 'Jagannatham Family' }],
  openGraph: {
    title: 'Jagannatham Family Tree',
    description: 'Explore your ancestral lineage and discover family stories',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagannatham Family Tree',
    description: 'Explore your ancestral lineage and discover family stories',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

