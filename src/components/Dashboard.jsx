import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center md:justify-start w-full max-w-full md:max-w-sm h-full overflow-y-auto pb-20 md:pb-0 px-10 py-10 space-y-10 rounded-none md:rounded-l-2xl bg-modern-dim border-r border-modern-white border-opacity-10">
      <div className="flex flex-row items-center justify-between w-full">
        <Link href="/">
          <a className="block md:hidden font-black font-raleway text-xl text-honey">COZY</a>
        </Link>
        <div className="flex md:hidden">
          <Link href="/profile">
            <a className="flex items-center space-x-3">
              <img className="w-8 h-8 object-cover rounded-full ring-2 ring-[#B38E00] transition ease-in-out duration-300 transform hover:scale-95" src="https://64.media.tumblr.com/777b82fbdc6768d1b2e5f02957ff9e51/acfd59a2153ef06e-4f/s1280x1920/46e004f9c43a907c532da035b6831f3797373b4d.jpg" />
              <span className="text-xs">Jennie Kim</span>
            </a>
          </Link>
        </div>
        <div className="hidden md:flex flex-row items-center w-full space-x-3">
          <span className="text-[#58F547] text-3xl">&bull;</span>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Welcome to <span className="text-honey">COZY</span></span>
            <span className="text-sm">Jennie Kim</span>
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
            <span className="font-bold text-3xl text-honey">100</span>
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
            <span className="font-bold text-3xl text-honey">33</span>
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
            <span className="font-bold text-3xl text-honey">89</span>
          </div>
        </div>
      </div>
    </div>
  )
}