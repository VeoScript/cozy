import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Scrollbar from 'react-smooth-scrollbar'

export default function MyRooms({ user_joined_rooms, setJoinedRoom }) {

  const router = useRouter()
  
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button 
        className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <LightningIcon />
        <span>My Rooms</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 pb-10 md:pb-0 text-center bg-modern-black bg-opacity-60">
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
              <div className="inline-block w-full max-w-xl py-6 px-3 md:px-5 my-8 overflow-hidden text-left align-top transition-all transform border-2 border-honey bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-between w-full px-5 md:px-3 text-lg font-medium leading-6 text-modern-white"
                >
                  <span>Rooms</span>
                  <button
                    className="transition ease-in-out duration-200 hover:scale-90 focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </Dialog.Title>
                <div className="flex flex-col w-full h-full overflow-y-auto px-2">
                  <Scrollbar>
                    {user_joined_rooms.map(({ id, roomName, room }, i) => (
                      <>
                        <button onClick={() => {setJoinedRoom([id, roomName, room.image, room.author.name, room.joined_rooms]); router.replace(router.asPath); closeModal()}} type="button" className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 hover:bg-modern-dim" key={i}>
                          <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={room.image} alt="room_avatar" />
                          <div className="flex flex-col items-start">
                            <span className="font-normal text-[12px]">{ roomName }</span>
                            <span className="font-normal text-[10px] text-gray-400">{ Object.keys(room.joined_rooms).length } Participants</span>
                          </div>
                        </button>
                      </>
                    ))}
                  </Scrollbar>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function LightningIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
    </svg>
  )
}