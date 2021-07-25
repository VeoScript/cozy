import EditProfile from "./Dialogs/Profile/EditProfile"

export default function ProfileDisplay({ online_user, count_contacts, count_favorites, count_diaries, count_rooms }) {
  return (
    <div className="font-raleway flex flex-row justify-center items-center w-full h-full overflow-y-auto px-3 md:px-10 py-3 md:py-20">
      <div className="relative flex flex-col md:flex-row justify-start md:justify-center items-center md:items-start w-full max-w-[55rem] px-0 md:px-5 py-5 space-x-0 md:space-x-10 rounded-xl">
        <div className="flex flex-col items-center w-full max-w-full md:max-w-[15rem]">
          <img className="w-32 h-32 md:w-[15rem] md:h-[15rem] object-cover rounded-full border-2 border-modern-white border-opacity-10" src={ online_user.avatar } />
        </div>
        <div className="flex flex-col items-start w-full mt-5 md:mt-10 pb-16">
          <div className="flex flex-col items-center md:items-start w-full max-w-full md:max-w-xl">
            <div className="flex flex-row items-center justify-center md:justify-start w-full space-x-5">
              <span className="font-bold text-xl md:text-4xl text-modern-white text-opacity-80">{ online_user.name }</span>
              <div className="hidden md:flex">
                <EditProfile online_user={online_user} />
              </div>
            </div>
            <span className="font-light text-lg md:text-2xl text-modern-white text-opacity-40">{ online_user.username }</span>
            <span className="font-light text-xs md:text-base text-modern-white text-opacity-80 mt-2">{ online_user.email }</span>
            <div className="md:hidden flex justify-center w-full">
              <EditProfile online_user={online_user} />
            </div>
            <div className="font-poppins flex flex-col items-center w-full mt-5 space-y-2">
              <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-2 space-y-2 md:space-y-0">
                <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-dim">
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
                <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-dim">
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
              </div>
              <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-2 space-y-2 md:space-y-0">
                <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-dim">
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
                    <span className="font-bold text-3xl text-honey">{ count_diaries._all }</span>
                  </div>
                </div>
                <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-dim">
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="font-normal text-sm">Rooms</span>
                    <span className="text-gray-400 text-3xl">
                      <svg className="w-4 h-4 md:w-5 md:h-5 fill-current" width='24' height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                        <path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/>
                      </svg>
                    </span>
                  </div>
                  <div className="flex flex-row items-start justify-between w-full">
                    <span className="font-light text-xs text-gray-400">Created rooms</span>
                    <span className="font-bold text-3xl text-honey">{ count_rooms._all }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}