import Navbar from "../Components/layout/Header/Navbar"
export default function MainLayout({children}) {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}
