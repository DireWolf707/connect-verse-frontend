import LeftSidebar from "@/components/shared/LeftSidebar"
import Navbar from "@/components/shared/navbar/Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="flex grow overflow-auto">
        <LeftSidebar />
        <div className="grow p-4">{children}</div>
      </div>
    </>
  )
}

export default Layout
