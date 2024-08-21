import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Movie type',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
