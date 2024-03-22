import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
const App = ({ Component: Page, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Page {...pageProps} />
  </QueryClientProvider>
)

export default App
