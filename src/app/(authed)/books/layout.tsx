import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sách',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
