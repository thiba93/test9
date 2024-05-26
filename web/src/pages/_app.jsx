import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CartProvider from "./api/cart/cartContext"

const queryClient = new QueryClient()
const App = ({ Component: Page, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <Page {...pageProps} />
    </CartProvider>
  </QueryClientProvider>
)

export default App
