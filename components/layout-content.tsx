'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import CartDrawer from '@/components/cart/CartDrawer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GoToTopButton from '@/components/ui/GoToTopButton'

interface LayoutContentProps {
  children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <>
      {!isDashboard && <AnnouncementBar />}
      {!isDashboard && (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      )}
      {!isDashboard && <CartDrawer />}
      {children}
      {!isDashboard && <Footer />}
      {!isDashboard && <GoToTopButton />}
    </>
  )
}
