import './globals.css'

export const metadata = {
  title: 'Lead Management System',
  description: 'Simple lead manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
