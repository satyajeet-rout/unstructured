
import { Outlet } from "react-router-dom"
import DashboardLayout from "./components/DashboardLayout"



function Layout() {
  return (
      <>
          <div className="flex">
              <DashboardLayout/>
              <Outlet/>
          </div>
          
      </>
  )
}

export default Layout



