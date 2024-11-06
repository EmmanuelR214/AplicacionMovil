import RootLayout from "./_layout"
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function index () {
  return(
    <SafeAreaProvider>
      <RootLayout/>
    </SafeAreaProvider>
  )
}