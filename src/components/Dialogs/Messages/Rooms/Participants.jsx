import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Scrollbar from 'react-smooth-scrollbar'

export default function Participants({ joinedRoom, first_user_joined_rooms }) {
  
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
        <ParticipantsIcon />
        <span>Participants</span>
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
                  <span>Participants</span>
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
                <div className="flex flex-col w-full h-full overflow-y-auto mt-5">
                  <Scrollbar>
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

function ParticipantsIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
    </svg>
  )
}