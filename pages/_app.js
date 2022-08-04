import { CoffeShopProvider } from '../context/CoffeShopProvider'
import '../styles/globals.css'



function MyApp({ Component, pageProps }) {
  return (
    <CoffeShopProvider>
      <Component {...pageProps} />
    </CoffeShopProvider>
  )
}

export default MyApp
