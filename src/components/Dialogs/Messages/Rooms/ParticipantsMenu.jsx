import { useState } from 'react'
import Link from 'next/link'
import Scrollbar from 'react-smooth-scrollbar'
import CreateRoom from './CreateRoom'
import Discover from './Discover'

export default function ParticipantsMenu({ participants, setDashboardOpen }) {

  const [isDisplay, setIsDisplay] = useState(false)

  return (
    <>
      <button type="button" onClick={() => { setIsDisplay(true) }} className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <span>Participants</span>
      </button>

      {setIsDisplay && (
        <>
          <button onClick={() => { setIsDisplay(false); setDashboardOpen(false) }} type="button" className={`${isDisplay ? 'md:hidden z-20 block fixed inset-0 w-full h-full cursor-default bg-modern-black bg-opacity-60 focus:outline-none' : 'hidden'}`}></button>
          <div className={`md:hidden z-20 w-full ${isDisplay ? 'fixed' : 'hidden'}`}>
            <div className="md:hidden fixed right-0 top-0 flex flex-col w-full max-w-[18rem] h-full py-5 space-y-5 rounded-none md:rounded-l-2xl bg-modern-dim border-r border-modern-white border-opacity-10">
              <Scrollbar>
                <div className="flex w-full font-normal text-sm text-modern-white py-5 px-8">
                  Room Participants
                </div>
                {participants.room.joined_rooms.map(({ user }, i) => (
                  <div className="flex flex-col w-full px-3 pb-3" key={i}>
                    <button type="button" className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 border-b border-[#333] hover:bg-modern-black">
                      <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ user.avatar } alt="participant_avatar" />
                      <div className="flex flex-col items-start">
                        <span className="font-normal text-[12px] text-modern-white">{ user.name }</span>
                        <span className="font-normal text-[10px] text-gray-400">{ user.email }</span>
                      </div>
                    </button>
                  </div>
                ))}
              </Scrollbar>
            </div>
          </div>
        </>
      )}
    </>
  )
}