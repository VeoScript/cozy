import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Scrollbar from 'react-smooth-scrollbar'
import CreateRoom from './Dialogs/Messages/Rooms/CreateRoom'
import Discover from './Dialogs/Messages/Rooms/Discover'

export default function Rooms({ online_user, rooms, user_joined_rooms }) {

  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")
  const [isDisplay, setIsDisplay] = useState(false)

  // code for the search function
  const handleChange = event => {
    setSearchTerm(event.target.value)
    if(!event.target.value){
      setIsDisplay(false)
    }
    else{
      setIsDisplay(true)
    }
  }
  
  // get all joined rooms from the api
  const get_joined_rooms = user_joined_rooms.map(({ roomName, room }, counter) => {
    return [
      roomName,
      room,
      counter
    ]
  })

  // search input filter for searching the room name
  const results = !searchTerm ? get_joined_rooms : get_joined_rooms.filter(room =>
    room[0].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  return (
    <div className={`${router.pathname !== '/messages' ? 'hidden md:flex' : 'flex'} flex-col w-full max-w-full md:max-w-sm h-full py-5 space-y-5 rounded-none md:rounded-l-2xl bg-modern-dim border-r border-modern-white border-opacity-10`}>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col px-6">
          <div className="font-bold text-xl text-honey">Messages</div>
          <div className="font-normal text-[12px] text-gray-400">Start conversations to everyone</div>
        </div>
        <div className="flex flex-row items-center space-x-2 px-3">
        <CreateRoom
            online_user={online_user}
        />
        <Discover
            online_user={online_user}
            rooms={rooms}
        />
        </div>
      </div>
      <div className="flex flex-col items-center w-full px-5">
        <div className="searchinput flex flex-row items-center w-full border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            className="w-full bg-modern-dim font-light text-xs text-gray-300 focus:outline-none"
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-auto">
        <Scrollbar className="px-5">
          {setIsDisplay && (
            <>
              {results.map(room => (
                <Link href={`/messages/${room[0]}`} key={room[3]}>
                  <a className={`${ isDisplay ? 'flex' : 'hidden' } flex-row items-center w-full px-3 py-3 mb-2 space-x-3 transition-all duration-300 rounded-xl border-b border-[#333] hover:bg-modern-black`}>
                    <img className="w-12 h-12 rounded-full object-cover" src={ room[1].image } alt="room_image" />
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center space-x-2">
                        <div className="font-normal text-base">{ room[1].name }</div>
                        <svg className={`${room[1].status === 'Private' ? 'block' : 'hidden'} w-3 h-3 text-honey`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                        </svg>
                        <svg className={`${room[1].status === 'Public' ? 'block' : 'hidden'} w-3 h-3 text-gray-400`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div className="font-light text-[10px] text-gray-400">Created by { room[1].author.name }</div>
                    </div>
                  </a>
                </Link>
              ))}
            </>
          )}
          {user_joined_rooms.map(({ roomName, room }, i) => (
            <Link href={`/messages/${roomName}`} key={i}>
              <a className={`${ !isDisplay ? 'flex' : 'hidden' } flex-row items-center w-full px-3 py-3 mb-2 space-x-3 transition-all duration-300 rounded-xl border-b border-[#333] hover:bg-modern-black`}>
                <img className="w-12 h-12 rounded-full object-cover" src={ room.image } alt="room_image" />
                <div className="flex flex-col">
                  <div className="flex flex-row items-center space-x-2">
                    <div className="font-normal text-base">{ room.name }</div>
                    <svg className={`${room.status === 'Private' ? 'block' : 'hidden'} w-3 h-3 text-honey`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                    </svg>
                    <svg className={`${room.status === 'Public' ? 'block' : 'hidden'} w-3 h-3 text-gray-400`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="font-light text-[10px] text-gray-400">Created by { room.author.name }</div>
                </div>
              </a>
            </Link>
          ))}
        </Scrollbar>
      </div>
    </div>
  )
}