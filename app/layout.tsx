
import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'

import './globals.css'

export const metadata: Metadata = {
  title:
    'HEROIC OS - Business Operating System',

  description:
    'A comprehensive ERP system for managing your entire business',

  applicationName: 'HEROIC OS',

  generator: 'Next.js 16',

  keywords: [
    'ERP',
    'CRM',
    'Business OS',
    'Project Management',
    'Finance',
    'AI Automation',
  ],

  authors: [
    {
      name: 'PT. Heroic Inovasi Nusantara',
    },
  ],

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',

        media:
          '(prefers-color-scheme: light)',
      },

      {
        url: '/icon-dark-32x32.png',

        media:
          '(prefers-color-scheme: dark)',
      },

      {
        url: '/icon.svg',

        type: 'image/svg+xml',
      },
    ],

    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
    >
      <body className="min-h-screen bg-black font-sans antialiased text-white">
        {children}

        {process.env.NODE_ENV ===
          'production' && <Analytics />}
      </body>
    </html>
  )
}

