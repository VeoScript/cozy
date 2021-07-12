import SideBar from '~/components/SideBar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full h-screen overflow-hidden bg-modern-dim">
      <div className="flex flex-row justify-center w-full max-w-screen-2xl h-full bg-honey">
        <SideBar />
        { children }
      </div>
    </div>
  )
}