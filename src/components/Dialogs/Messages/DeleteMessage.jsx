import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { mutate } from 'swr'

export default function DeleteMessage({ id, roominfo }) {

  const router = useRouter()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // function for delete specific message
  async function onDeleteMessage() {
    const message_id = id
    const roomName = roominfo.roomName

    await fetch('/api/messages/message/delete_message', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message_id })
    })
    
    closeModal()
    mutate(`/api/messages/message/get_messages/${ roomName }`)
    router.replace(router.asPath)
  }

  return (
    <>      
      <button
        type="button"
        onClick={openModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-modern-white text-opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto"
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
              <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform border-2 border-red-600 bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-between w-full text-lg font-medium leading-6 text-modern-white"
                >
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
                <div className="flex flex-col items-center space-y-5 mt-5">
                  <div>Are you sure you want to delete this message?</div>
                  <div className="flex flex-row justify-center w-full">
                    <button
                      className="flex items-center justify-center w-full max-w-[6rem] px-1 py-2 text-sm rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-red-600 text-modern-white focus:outline-none"
                      type="button"
                      onClick={onDeleteMessage}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}