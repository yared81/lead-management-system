import './globals.css'

export const metadata = {
  title: 'Lead Manager',
  description: 'Track and manage your sales pipeline',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo" width={26} height={26} className="rounded object-contain" />
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Lead Manager</span>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
