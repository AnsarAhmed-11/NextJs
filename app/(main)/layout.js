import Navbar from "../Components/layout/navigation/Navbar"
export default function MainLayout({children}) {
  return (
    <>
        <Navbar/>
        {children}
    </>
  )
}
