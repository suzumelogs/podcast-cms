import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Person details',
}

export default function Page({ children }: { children: React.ReactNode }) {
  return children
}
