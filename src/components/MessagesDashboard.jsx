import Link from 'next/link'
import Scrollbar from 'react-smooth-scrollbar'
import CreateRoom from './Dialogs/Messages/Rooms/Create'

export default function MessagesDashboard({ online_user }) {
  return (
    <div className="hidden md:flex flex-col justify-center md:justify-start w-full max-w-full md:max-w-sm h-full overflow-y-auto pb-20 md:pb-0 px-5 md:px-8 py-10 rounded-none md:rounded-l-2xl space-y-10 bg-modern-dim border-r border-modern-white border-opacity-10">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center w-full space-x-3">
          <div className="flex flex-col w-full">
            <div className="font-bold text-xl text-honey ml-3">Messages</div>
            <div className="font-light text-[11px] text-gray-400 ml-3">Create room server to start a private conversation.</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-3">
        <div className="flex flex-col w-full px-5 py-5 space-y-3 rounded-xl bg-modern-black">
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-normal text-sm">Join Rooms</span>
            <span className="text-gray-400 text-3xl">
              <RoomIcon />
            </span>
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col space-y-2">
              <span className="font-light text-xs text-gray-400">Wanna start a chat? Join here.</span>
              <CreateRoom />
            </div>
            <span className="font-bold text-3xl text-honey">0</span>
          </div>
        </div>
        <div className="flex flex-col w-full h-full max-h-[23rem] pt-5 pb-2 space-y-3 rounded-xl bg-modern-black">
          <div className="flex flex-row items-center justify-between w-full px-5">
            <span className="font-normal text-sm">My Rooms</span>
            <span className="text-gray-400 text-3xl">
              <LightningIcon />
            </span>
          </div>
          <div className="flex flex-col w-full h-full overflow-y-auto px-2">
            <Scrollbar>
              <Link href="/messages">
                <a className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 hover:bg-modern-dim">
                  <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src="https://images.unsplash.com/photo-1565231776967-95aee5973585?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVkcm9vbSUyMGFlc3RoZXRpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="room_avatar" />
                  <div className="flex flex-col">
                    <span className="font-normal text-[12px]">Room Name</span>
                    <span className="font-normal text-[10px]">10 Participants</span>
                  </div>
                </a>
              </Link>
            </Scrollbar>
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

function LightningIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
    </svg>
  )
}