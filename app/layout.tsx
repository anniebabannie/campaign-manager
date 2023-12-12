import './globals.css'
import Nav from './Nav'
// import Breadcrumbs from './Breadcrumbs'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Nav/>
      <main className="container mx-auto mt-12">
        {children}
      </main>
      </body>
    </html>
  )
}
