'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/contexts/AuthContext'

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/login')
    }
  }, [isAuthenticated, isAdmin, isLoading, router])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return isAuthenticated && isAdmin ? <>{children}</> : null
}