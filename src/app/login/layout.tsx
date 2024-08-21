import { LayoutUnAuth } from '@/libs/components/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ログイン',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return <LayoutUnAuth>{children}</LayoutUnAuth>
}
