import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Dashboard({ online_user, count_contacts, count_favorites }) {

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
    <div className="flex flex-col justify-center md:justify-start w-full max-w-full md:max-w-sm h-full overflow-y-auto pb-20 md:pb-0 px-5 md:px-8 py-10 space-y-10 rounded-none md:rounded-l-2xl bg-modern-dim border-r border-modern-white border-opacity-10">
      <div className="flex flex-row items-center justify-between w-full">
        <Link href="/">
          <a className="block md:hidden font-black font-raleway text-xl text-honey">COZY</a>
        </Link>
        <div className="flex md:hidden">
          <button
            className="flex items-center space-x-3 focus:outline-none"
            type="button"
            onClick={() => { setIsOpen(true) }}
          >
            <img
              className="w-8 h-8 object-cover bg-modern-dim rounded-full ring-2 ring-[#B38E00] transition ease-in-out duration-300 transform hover:scale-95"
              src={ online_user.avatar }
            />
            <span className="text-xs">{ online_user.name }</span>
          </button>
        </div>
        <div className="hidden md:flex flex-row items-center w-full space-x-3">
          <span className="text-[#58F547] text-3xl">&bull;</span>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Welcome to <span className="text-honey">COZY</span></span>
            <span className="text-sm">{ online_user.name }</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-3">
        <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-black">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-normal text-sm">Contacts</span>
            <span className="text-gray-400 text-3xl">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </span>
          </div>
          <div className="flex flex-row items-start justify-between w-full">
            <span className="font-light text-xs text-gray-400">Your beloved contacts</span>
            <span className="font-bold text-3xl text-honey">{ count_contacts._all }</span>
          </div>
        </div>
        <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-black">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-normal text-sm">Favorites</span>
            <span className="text-gray-400 text-3xl">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
              </svg>
            </span>
          </div>
          <div className="flex flex-row items-start justify-between w-full">
            <span className="font-light text-xs text-gray-400">Your favorite contacts</span>
            <span className="font-bold text-3xl text-honey">{ count_favorites._all }</span>
          </div>
        </div>
        <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-black">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-normal text-sm">Diary</span>
            <span className="text-gray-400 text-3xl">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
            </span>
          </div>
          <div className="flex flex-row items-start justify-between w-full">
            <span className="font-light text-xs text-gray-400">Your daily diaries</span>
            <span className="font-bold text-3xl text-honey">0</span>
          </div>
        </div>
      </div>
      {setIsOpen && (
        <>
          <button onClick={() => {setIsOpen(false)}} type="button" className={`${isOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
          <div className={`md:hidden z-40 w-full ${isOpen ? 'fixed' : 'hidden'}`}>
            <div className="fixed inset-x-0 bottom-0 w-full h-full max-h-[23rem] overflow-hidden mt-2 border-t-2 border-opacity-50 border-honey rounded-t-3xl shadow-2xl bg-modern-black text-white">
              <div className="flex flex-col w-full h-full pt-5 overflow-y-auto bg-opacity-75">
                <button
                  className="absolute top-5 right-5 z-50 transition ease-in-out duration-200 hover:scale-90 focus:outline-none"
                  type="button"
                  onClick={() => {setIsOpen(false)}}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <div className="relative flex flex-col items-center space-y-3">
                  <img
                    className="w-16 h-16 object-cover bg-modern-dim rounded-full ring-2 ring-[#B38E00] transition ease-in-out duration-300 transform hover:scale-95"
                    src={ online_user.avatar }
                  />
                  <div className="flex flex-col items-center">
                    <h1 className="font-bold text-sm">{ online_user.name }</h1>
                    <h3 className="font-light text-xs text-gray-300">{ online_user.username }</h3>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-5">
                  <Link href="/profile">
                    <a className="flex items-center justify-center w-full border-t border-modern-dim text-sm text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-3 focus:outline-none">
                      <span>Profile</span>
                    </a>
                  </Link>
                  <Link href="/settings">
                    <a className="flex items-center justify-center w-full border-t border-b border-modern-dim text-sm text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-3 focus:outline-none">
                      <span>Settings</span>
                    </a>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full border-b border-modern-dim text-sm text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-3 focus:outline-none"
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}