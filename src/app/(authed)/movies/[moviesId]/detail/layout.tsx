import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Movie details',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
