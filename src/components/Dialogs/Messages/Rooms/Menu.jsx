import { useState } from 'react'
import Link from 'next/link'
import Scrollbar from 'react-smooth-scrollbar'
import CreateRoom from './CreateRoom'
import Discover from './Discover'

export default function Menu({ online_user, rooms, user_joined_rooms, setDashboardOpen }) {

  const [isDisplay, setIsDisplay] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [isDisplaySearch, setIsDisplaySearch] = useState(false)

  // code for the search function
  const handleChange = event => {
    setSearchTerm(event.target.value)
    if(!event.target.value){
      setIsDisplaySearch(false)
    }
    else{
      setIsDisplaySearch(true)
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
    <>
      <button type="button" onClick={() => { setIsDisplay(true) }} className="md:hidden flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
        </svg>
        <span>Menu</span>
      </button>

      {setIsDisplay && (
        <>
          <button onClick={() => { setIsDisplay(false); setDashboardOpen(false) }} type="button" className={`${isDisplay ? 'md:hidden z-20 block fixed inset-0 w-full h-full cursor-default bg-modern-black bg-opacity-60 focus:outline-none' : 'hidden'}`}></button>
          <div className={`md:hidden z-20 w-full ${isDisplay ? 'fixed' : 'hidden'}`}>
            <div className="md:hidden fixed left-0 top-0 flex flex-col w-full max-w-[18rem] h-full py-5 space-y-5 rounded-none md:rounded-l-2xl bg-modern-dim border-r border-modern-white border-opacity-10">
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
                <Scrollbar className="px-2 md:px-5">
                  {setIsDisplaySearch && (
                    <>
                      {results.map(room => (
                        <Link href={`/messages/${room[0]}`} key={room[3]}>
                          <a onClick={() => { setIsDisplay(false); setIsDisplaySearch(false); setDashboardOpen(false) }} className={`${ isDisplaySearch ? 'flex' : 'hidden' } flex-row items-center w-full px-3 py-3 mb-2 space-x-3 transition-all duration-300 rounded-xl border-b border-[#333] hover:bg-modern-black`}>
                            <img className="w-12 h-12 rounded-full object-cover" src={ room[1].image } alt="room_image" />
                            <div className="flex flex-col">
                              <div className="font-normal text-base">{ room[1].name }</div>
                              <div className="font-light text-[10px] text-gray-400">Created by { room[1].author.name }</div>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </>
                  )}
                  {user_joined_rooms.map(({ roomName, room }, i) => (
                    <Link href={`/messages/${roomName}`} key={i}>
                      <a onClick={() => { setIsDisplay(false); setIsDisplaySearch(false); setDashboardOpen(false) }} className={`${ !isDisplaySearch ? 'flex' : 'hidden' } flex-row items-center w-full px-3 py-3 mb-2 space-x-3 transition-all duration-300 rounded-xl border-b border-[#333] hover:bg-modern-black`}>
                        <img className="w-12 h-12 rounded-full object-cover" src={ room.image } alt="room_image" />
                        <div className="flex flex-col">
                          <div className="font-normal text-base">{ room.name }</div>
                          <div className="font-light text-[10px] text-gray-400">Created by { room.author.name }</div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </Scrollbar>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}