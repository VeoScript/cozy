import SideBar from '~/components/SideBar'

export default function Layout({ children, online_user }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full h-screen overflow-hidden bg-modern-dim">
      <div className="flex flex-row justify-center w-full max-w-[2400px] h-full bg-honey">
        <SideBar online_user={online_user} />
        { children }
      </div>
    </div>
  )
}