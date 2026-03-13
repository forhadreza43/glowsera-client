import { Geist_Mono, Inter, Cormorant_Garamond } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { LayoutContent } from '@/components/layout-content'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const fontgaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'antialiased',
        fontgaramond.variable,
        fontMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LayoutContent>{children}</LayoutContent>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
