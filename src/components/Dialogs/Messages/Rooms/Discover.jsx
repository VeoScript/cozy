import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Scrollbar from 'react-smooth-scrollbar'
import JoinRoomPrivate from './JoinRoomPrivate'
import JoinRoomPublic from './JoinRoomPublic'

export default function Discover({ online_user, rooms }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [isDisplay, setIsDisplay] = useState(false)
  let [isOpen, setIsOpen] = useState(false)

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

  // get all rooms from the api
  const get_rooms = rooms.map(({ id, image, name, status, author, passcode, joined_rooms }, couter) => {
    return [
      id,
      image,
      name,
      status,
      author,
      passcode,
      joined_rooms,
      couter
    ]
  })

  // search input filter for searching the room name
  const results = !searchTerm ? get_rooms : get_rooms.filter(room =>
    room[2].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="transition ease-in-out duration-200 hover:scale-95 focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 5.999l-5.621 2.986c-.899-.104-1.806.191-2.474.859-.662.663-.95 1.561-.862 2.428l-3.043 5.728 5.724-3.042c.884.089 1.772-.205 2.432-.865.634-.634.969-1.524.859-2.473l2.985-5.621zm-5.97 7.22c-.689 0-1.25-.559-1.25-1.249-.001-.691.559-1.251 1.25-1.25.69 0 1.25.56 1.25 1.25-.001.689-.56 1.249-1.25 1.249z"/>
        </svg>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-modern-black bg-opacity-60">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-top transition-all transform border-2 border-honey bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="flex flex-col md:flex-row items-center justify-center md:justify-between mx-6 mt-5 pb-5 text-lg font-medium leading-6 space-y-3 md:space-y-0"
                >
                  <div className="flex flex-col items-center md:items-start w-full">
                    <span className="font-bold text-xl">Discover Rooms</span>
                    <span className="font-normal text-sm text-gray-400">Join to start conversation</span>
                  </div>
                  <div className="searchinput flex flex-row items-center w-full max-w-xs md:max-w-[15rem] border-b border-gray-500 text-gray-500 py-3 space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                      className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none"
                      type="text"
                      name="search"
                      id="search"
                      value={searchTerm}
                      onChange={handleChange}
                      placeholder="Search Room"
                    />
                  </div>
                  <button
                    className="fixed top-3 right-3 transition ease-in-out duration-200 hover:scale-90 focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </Dialog.Title>
                <Scrollbar className="flex flex-row w-full h-full max-h-[30rem] overflow-y-auto overflow-x-hidden px-3">
                  <div className="w-full pb-5">
                    {setIsDisplay && (
                      <>
                        {results.map(room => (
                          <div className={`${isDisplay ? 'flex' : 'hidden'} flex-col md:flex-row items-center justify-start md:justify-between w-full overflow-x-hidden px-3 py-2 mb-0 md:mb-3 rounded-xl transition-all duration-300 hover:bg-modern-dim cursor-default`} key={room[7]}>
                            <div className="flex flex-row items-center w-full space-x-3">
                              <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ room[1] } alt="room_avatar" />
                              <div className="flex flex-col items-start">
                                <div className="flex flex-row items-center space-x-1">
                                  <span className="font-normal text-sm md:text-base">{ room[2] }</span>
                                  <svg className={`${room[3] === 'Private' ? 'block' : 'hidden'} w-3 h-3 text-[#58F547]`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                                  </svg>
                                  <svg className={`${room[3] === 'Public' ? 'block' : 'hidden'} w-3 h-3 text-gray-400`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                                  </svg>
                                </div>
                                <span className="font-normal text-[10px] md:text-xs text-gray-400">Created by { room[4].name }</span>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-end w-full ml-[7.5rem] md:ml-0 space-y-1 md:space-0 space-x-0 md:space-x-3">
                              <span className="text-[10px] md:text-xs text-gray-400">{ room[6].length } {`${ room[6].length > 1 ? 'Participants' : 'Participant' }`}</span>
                              <JoinRoomPublic
                                online_user={online_user}
                                id={room[0]}
                                image={room[1]}
                                name={room[2]}
                                status={room[3]}
                                author={room[4]}
                                joined_rooms={room[6]}
                              />
                              <JoinRoomPrivate
                                online_user={online_user}
                                id={room[0]}
                                image={room[1]}
                                name={room[2]}
                                status={room[3]}
                                author={room[4]}
                                passcode={room[5]}
                                joined_rooms={room[6]}
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {rooms.map(({ id, image, name, status, author, passcode, joined_rooms }, i) => (
                      <div className={`${!isDisplay ? 'flex' : 'hidden'} flex-col md:flex-row items-center justify-start md:justify-between w-full overflow-x-hidden px-3 py-2 mb-0 md:mb-3 rounded-xl transition-all duration-300 hover:bg-modern-dim cursor-default`} key={i}>
                        <div className="flex flex-row items-center w-full space-x-3">
                          <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ image } alt="room_avatar" />
                          <div className="flex flex-col items-start">
                            <div className="flex flex-row items-center space-x-1">
                              <span className="font-normal text-sm md:text-base">{ name }</span>
                              <svg className={`${status === 'Private' ? 'block' : 'hidden'} w-3 h-3 text-honey`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                              </svg>
                              <svg className={`${status === 'Public' ? 'block' : 'hidden'} w-3 h-3 text-gray-400`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                              </svg>
                            </div>
                            <span className="font-normal text-[10px] md:text-xs text-gray-400">Created by { author.name }</span>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-end w-full ml-[7.5rem] md:ml-0 space-y-1 md:space-0 space-x-0 md:space-x-3">
                          <span className="text-[10px] md:text-xs text-gray-400">{ joined_rooms.length } {`${ joined_rooms.length > 1 ? 'Participants' : 'Participant' }`}</span>
                          <JoinRoomPublic
                            online_user={online_user}
                            id={id}
                            image={image}
                            name={name}
                            status={status}
                            author={author}
                            joined_rooms={joined_rooms}
                          />
                          <JoinRoomPrivate
                            online_user={online_user}
                            id={id}
                            image={image}
                            name={name}
                            status={status}
                            author={author}
                            passcode={passcode}
                            joined_rooms={joined_rooms}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Scrollbar>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function RoomIcon() {
  return (
    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
      <path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/>
    </svg>
  )
}