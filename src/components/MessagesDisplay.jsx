import { useState } from 'react'
import Scrollbar from 'react-smooth-scrollbar'
import CreateRoom from './Dialogs/Messages/Rooms/CreateRoom'
import Discover from './Dialogs/Messages/Rooms/Discover'
import MyRooms from './Dialogs/Messages/Rooms/MyRooms'

export default function MessagesDisplay({ online_user, rooms, joinedRoom, user_joined_rooms, first_user_joined_rooms, setJoinedRoom }) {

  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* chat display... */}
      <div className="flex flex-col justify-between w-full max-w-full h-full border-r border-modern-white border-opacity-10">
        <div className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-modern-white border-opacity-10">
          <div className="flex flex-row items-center space-x-3">
            <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ !joinedRoom[2] ? first_user_joined_rooms.room.image : joinedRoom[2] } alt="room_avatar" />
            <div className="flex flex-col">
              <span className="font-normal text-sm">{ !joinedRoom[1] ? first_user_joined_rooms.roomName : joinedRoom[1] }</span>
              <span className="font-normal text-[10px] text-gray-400">Created by { !joinedRoom[3] ? first_user_joined_rooms.room.author.name : joinedRoom[3] }</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className="md:hidden block text-gray-400 transition ease-in-out duration-200 hover:scale-90"
              type="button"
              onClick={() => { setDashboardOpen(true) }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
            <button
              className="text-gray-400 transition ease-in-out duration-200 hover:scale-90"
              type="button"
              onClick={() => { setMenuOpen(true) }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            {/* find rooms and participants menu open dropdown */}
            {setDashboardOpen && (
              <>
                <button onClick={() => {setDashboardOpen(false)}} type="button" className={`${dashboardOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
                <div className={`z-20 w-full ${dashboardOpen ? 'fixed' : 'hidden'}`}>
                  <div className="md:hidden fixed right-[2rem] md:right-[22rem] top-10 mr-3 w-full max-w-[10rem] h-auto overflow-hidden mt-2 rounded-md shadow-xl border border-modern-white border-opacity-10 bg-modern-black text-white z-10">
                    <div className="flex flex-row w-full h-auto max-h-[15rem] overflow-y-auto bg-opacity-75">
                      <div className="flex flex-col w-full">
                        <CreateRoom
                          online_user={online_user}
                          rooms={rooms}
                        />
                        <hr className="w-full border-t border-modern-dim" />
                        <MyRooms
                          online_user={online_user}
                          rooms={rooms}
                          user_joined_rooms={user_joined_rooms}
                          first_user_joined_rooms={first_user_joined_rooms}
                          setJoinedRoom={setJoinedRoom}
                        />
                        <hr className="w-full border-t border-modern-dim" />
                        <Discover
                          online_user={online_user}
                          rooms={rooms}
                        />
                        <hr className="w-full border-t border-modern-dim" />
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                          <ParticipantsIcon />
                          <span>Participants</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* chat menu open dropdown */}
            {setMenuOpen && (
              <>
                <button onClick={() => {setMenuOpen(false)}} type="button" className={`${menuOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
                <div className={`z-20 w-full ${menuOpen ? 'fixed' : 'hidden'}`}>
                  <div className="fixed right-0 md:right-[20rem] top-10 mr-3 w-full max-w-[10rem] h-auto overflow-hidden mt-2 rounded-md shadow-xl border border-modern-white border-opacity-10 bg-modern-black text-white z-10">
                    <div className="flex flex-row w-full h-auto max-h-[15rem] overflow-y-auto bg-opacity-75">
                      <div className="flex flex-col w-full">
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span>Settings</span>
                        </button>
                        <hr className="w-full border-t border-modern-dim" />
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                          </svg>
                          <span>Report</span>
                        </button>
                        <hr className="w-full border-t border-modern-dim" />
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-red-600 space-x-2 focus:outline-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                          </svg>
                          <span>Leave Room</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* chat logs display */}
        <div className="flex flex-col justify-end w-full h-full overflow-y-auto">
          <Scrollbar>
            {/* bubble chat from them */}
            <div className="flex flex-row justify-start w-full px-3 py-3">
              <div className="flex items-center space-x-2 w-full max-w-[15rem]">
                <img className="w-8 h-8 rounded-full object-cover bg-modern-dim" src="https://lh3.googleusercontent.com/VTX8O3fEDZcfpFsEwQKM_E1sEjTVw9HExPEybwvUr81XzcM2nYz5PDPqAVQuG-DDcaiqJZUK8SgePosw2_8ecB5zLniyyz-uBT-ndrWLsrubvQO5=s0" />
                <div className="flex px-3 py-3 rounded-xl font-normal text-xs text-modern-white bg-modern-dim">
                  Them
                </div>
              </div>
            </div>
            {/* bubble chat from you */}
            <div className="flex flex-row justify-end w-full px-3 py-3">
              <div className="flex justify-end w-full max-w-[15rem]">
                <div className="flex rounded-xl px-3 py-3 font-normal text-xs text-modern-dim bg-honey">
                  You
                </div>
              </div>
            </div>
          </Scrollbar>
        </div>
        {/* message chat forms */}
        <div className="flex flex-row items-end w-full px-3 py-3 pb-20 md:pb-3 border-t border-modern-white border-opacity-10">
          <form className="flex flex-row items-center w-full max-w-xl space-x-3">
            <div
              contentEditable
              id="chatbox"
              className="w-full whitespace-pre-wrap text-xs cursor-text focus:outline-none font-light py-2"
              placeholder="Type here..."
            />
            <button className="text-modern-white opacity-30 transition ease-in-out duration-300 hover:scale-95">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      {/* participants display... */}
      <div className="hidden md:flex flex-col w-full max-w-xs h-full overflow-y-auto bg-modern-dim border-r border-modern-white border-opacity-10">
        <Scrollbar>
          <div className="flex w-full font-normal text-sm text-modern-white py-5 px-8">
            Room Participants
          </div>
          {/* useState setJoined room will reset to 0 array length if the page is reload  */}
          {!joinedRoom[4] ? '' : joinedRoom[4].map(({ user }, i) => (
            <div className="flex flex-col w-full px-3 pb-3" key={i}>
              <button type="button" className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 hover:bg-modern-black">
                <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ user.avatar} alt="participant_avatar" />
                <div className="flex flex-col items-start">
                  <span className="font-normal text-[12px]">{ user.name }</span>
                  <span className="font-normal text-[10px] text-gray-400">@{ user.username }</span>
                </div>
              </button>
            </div>
          ))}
          {/* useState setJoined room will reset to 0 array length if the page is reload (THIS IS THE SOLUTION OF THAT PROBLEM) */}
          {joinedRoom[4] ? '' : first_user_joined_rooms.room.joined_rooms.map(({ user }, i) => (
            <div className="flex flex-col w-full px-3 pb-3" key={i}>
              <button type="button" className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 hover:bg-modern-black">
                <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ user.avatar} alt="participant_avatar" />
                <div className="flex flex-col items-start">
                  <span className="font-normal text-[12px]">{ user.name }</span>
                  <span className="font-normal text-[10px] text-gray-400">@{ user.username }</span>
                </div>
              </button>
            </div>
          ))}
        </Scrollbar>
      </div>
    </div>
  )
}

function ParticipantsIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
    </svg>
  )
}