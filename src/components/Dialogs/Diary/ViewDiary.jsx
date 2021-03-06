import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Moment from 'react-moment'
import Scrollbar from 'react-smooth-scrollbar'

export default function ViewDiary({ online_user, photo, title, content, date }) {

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
        className="hidden md:block transition ease-in-out duration-200 bg-modern-black text-gray-400 px-3 py-3 rounded-full hover:scale-95 focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </button>

      <button
        className="md:hidden block transition ease-in-out duration-200 bg-modern-black text-gray-400 px-3 py-3 rounded-full hover:scale-95 focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center bg-modern-black bg-opacity-60">
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
              <div className="inline-block h-screen md:h-full md:max-h-[40rem] w-full max-w-full md:max-w-3xl overflow-hidden text-left align-middle transition-all transform border-0 md:border-2 border-honey bg-modern-black text-modern-white shadow-xl rounded-none md:rounded-2xl">
                <div className="relative">
                  <div className="fixed z-10 top-5 right-5">
                    <button
                      className="transition ease-in-out duration-200 hover:scale-90 focus:outline-none"
                      type="button"
                      onClick={closeModal}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex w-full h-full max-h-[40rem] overflow-y-auto">
                  <Scrollbar className="w-full">
                    <div className="flex flex-col items-center w-full space-y-5 my-0 md:my-8">
                      <div className="flex justify-center w-full">
                        <img className="w-full md:w-[30rem] h-60 md:h-52 object-cover rounded-none md:rounded-xl bg-modern-dim" src={photo} alt="profile" />
                      </div>
                      <div className="flex flex-col items-center w-full pb-24 space-y-5">
                        <div className="flex flex-col items-center w-full">
                          <span className="text-lg md:text-xl">{title}</span>
                          <span className="text-xs md:text-sm text-gray-300 mt-2">{online_user.name}</span>
                          <span className="text-[10px] md:text-xs text-gray-400"><Moment date={ date } format='LL' /></span>
                        </div>
                        <span className="w-full max-w-[25rem] md:max-w-[30rem] text-xs md:text-base whitespace-pre-wrap text-gray-400 px-5 md:px-0">{content}</span>
                      </div>
                    </div>
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
