import Link from 'next/link'

export default function MessagesDashboard({ online_user }) {
  return (
    <div className="flex flex-col justify-center md:justify-start w-full max-w-full md:max-w-sm h-full overflow-y-auto pb-20 md:pb-0 px-5 md:px-8 py-10 rounded-none md:rounded-l-2xl space-y-10 bg-modern-dim border-r border-modern-white border-opacity-10">
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
            <span className="font-normal text-sm">Active Rooms</span>
            <span className="text-gray-400 text-3xl">
              <RoomIcon />
            </span>
          </div>
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-col space-y-2">
              <span className="font-light text-xs text-gray-400">Wanna start a chat? Join here.</span>
              <button className="w-full max-w-[5rem] rounded-sm font-normal text-[10px] text-modern-black bg-honey transition ease-in-out duration-200 hover:scale-95">
                Select Rooms
              </button>
            </div>
            <span className="font-bold text-3xl text-honey">0</span>
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
            <span className="font-bold text-3xl text-honey">0</span>
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
    </div>
  )
}

function RoomIcon() {
  return (
    <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
      <path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/>
    </svg>
  )
}