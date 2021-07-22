import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SideBar({ online_user }) {

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/auth/signout', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
      }
    })
    router.push('/login')
  }

  return (
    <>
      {/* desktop web app layout */}
      <div className="hidden md:flex flex-col items-center justify-between w-full max-w-[5rem] h-full overflow-hidden py-16 space-y-10">
        <Link href="/">
          <a className="font-black font-raleway text-xl">COZY</a>
        </Link>
        <div className="flex flex-col space-y-5">
          <Link href="/">
            <a className={`${router.pathname === '/' ? 'bg-modern-dim text-honey' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
              <HomeIcon />
            </a>
          </Link>
          <Link href="/diary">
            <a className={`${router.pathname === '/diary' ? 'bg-modern-dim text-honey' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
              <DiaryIcon />
            </a>
          </Link>
          <Link href="/favorites">
            <a className={`${router.pathname === '/favorites' ? 'bg-modern-dim text-honey' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
              <FavoritesIcon />
            </a>
          </Link>
          <Link href="/messages">
            <a className={`${router.pathname === '/messages' || router.pathname === '/messages/[roomName]' ? 'bg-modern-dim text-honey' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
              <MessageIcon />
            </a>
          </Link>
        </div>
        <div className="flex">
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => { setIsOpen(true) }}
          >
            <img
              className="w-10 h-10 object-cover rounded-full ring-2 ring-[#B38E00] transition ease-in-out duration-300 transform hover:scale-95"
              src={ online_user.avatar }
            />
          </button>
        </div>
      </div>
      {/* mobile web app layout */}
      <div className="fixed md:hidden bottom-0 z-50 flex flex-row items-center justify-between w-full px-5 bg-honey">
        <Link href="/">
          <a className={`${router.pathname === '/' ? 'bg-modern-dim text-honey border-4 border-honey -translate-y-3' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
            <HomeIcon />
          </a>
        </Link>
        <Link href="/diary">
          <a className={`${router.pathname === '/diary' ? 'bg-modern-dim text-honey border-4 border-honey -translate-y-3' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
            <DiaryIcon />
          </a>
        </Link>
        <Link href="/favorites">
          <a className={`${router.pathname === '/favorites' ? 'bg-modern-dim text-honey border-4 border-honey -translate-y-3' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
            <FavoritesIcon />
          </a>
        </Link>
        <Link href="/messages">
          <a className={`${router.pathname === '/messages' || router.pathname === '/messages/[roomName]' ? 'bg-modern-dim text-honey border-4 border-honey -translate-y-3' : 'bg-none text-[#333]'} px-3 py-3 rounded-full transition ease-in-out duration-300 hover:bg-modern-black hover:text-honey`}>
            <MessageIcon />
          </a>
        </Link>
      </div>
      {setIsOpen && (
        <>
          <button onClick={() => {setIsOpen(false)}} type="button" className={`${isOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
          <div className={`z-40 w-full ${isOpen ? 'fixed' : 'hidden'}`}>
            <div className="fixed left-16 bottom-5 w-full max-w-[10rem] h-auto overflow-hidden mt-2 rounded-md shadow-xl bg-modern-black text-white z-10 border border-modern-white border-opacity-10">
              <div className="hidden md:flex flex-row w-full h-auto max-h-[15rem] overflow-y-auto bg-opacity-75">
                <div className="flex flex-col w-full">
                  <Link href="/profile">
                    <a className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Profile</span>
                    </a>
                  </Link>
                  <hr className="w-full border-t border-modern-dim" />
                  <Link href="/settings">
                    <a className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>Settings</span>
                    </a>
                  </Link>
                  <hr className="w-full border-t border-modern-dim" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
    </svg>
  )
}

function DiaryIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
    </svg>
  )
}

function FavoritesIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  )
}