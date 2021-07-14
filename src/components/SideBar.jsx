import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigations, mobile_navigations } from '~/static/links'

export default function SideBar({ online_user }) {

  const router = useRouter()

  return (
    <>
      <div className="hidden md:flex flex-col items-center justify-between w-full max-w-[5rem] h-full overflow-hidden py-16 space-y-10">
        <Link href="/">
          <a className="font-black font-raleway text-xl">COZY</a>
        </Link>
        <div className="flex flex-col space-y-5">
          {navigations.map(({ icon, href }, i) => (
            <Link href={href} key={i}>
              <a className={`${router.pathname === href ? 'bg-modern-dim text-honey' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>{ icon }</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <Link href="/profile">
            <a>
              <img
                className="w-10 h-10 object-cover rounded-full ring-2 ring-[#B38E00] transition ease-in-out duration-300 transform hover:scale-95"
                src={ online_user.avatar }
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="fixed md:hidden bottom-0 z-50 flex flex-row items-center justify-between w-full px-5 bg-honey">
        {mobile_navigations.map(({ icon, href }, i) => (
          <Link href={href} key={i}>
            <a className={`${router.pathname === href ? 'bg-modern-dim text-honey border-4 border-honey -translate-y-3' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>{ icon }</a>
          </Link>
        ))}
      </div>
    </>
  )
}