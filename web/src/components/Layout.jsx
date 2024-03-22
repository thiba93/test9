import Footer from "@/components/Footer"
import Header from "@/components/Header"
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen font-montserrat">
    <Header />
    <main className="flex-grow p-4 bg-primary-cream">{children}</main>
    <Footer />
  </div>
)

export default Layout
