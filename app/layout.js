import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'E-commerce Website',
  description: 'Built with Next.js and Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Toaster />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
