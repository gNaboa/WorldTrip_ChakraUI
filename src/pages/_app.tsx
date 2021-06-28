import '../styles/global.css'
import { theme } from '../styles/theme'
import {ChakraProvider} from '@chakra-ui/react'
function MyApp({ Component, pageProps }) {
  return (
 
  <Component {...pageProps} />


  )
}

export default MyApp
