import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import {AuthProvider} from '../components/AppAuth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider >
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
