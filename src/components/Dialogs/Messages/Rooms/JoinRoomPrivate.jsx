import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

export default function JoinRoomPrivate({ online_user, id, image, name, status, author }) {

  const router = useRouter()
  
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    reset()
    setIsOpen(false)
  }

  function openModal() {
    reset()
    setIsOpen(true)
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()

  async function onJoin(formData) {
    const userId = online_user.id
    const roomId = id

    await fetch('/api/messages/room/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        roomId
      })
    })

    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <button
        className={`${status === "Private" ? 'block' : 'hidden'} py-1 w-full max-w-[5rem] rounded-sm font-normal text-[10px] md:text-sm text-modern-black bg-honey transition ease-in-out duration-200 hover:scale-95 focus:outline-none`}
        type="button"
        onClick={openModal}
      >
        Join
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-hidden"
          onClose={closeModal}
        >
          <div className="min-h-screen px-10 pb-10 md:pb-0 text-center bg-modern-black bg-opacity-60">
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
              <div className="inline-block w-full max-w-sm py-6 px-3 md:px-5 my-8 overflow-hidden text-left align-middle transition-all transform border border-modern-white border-opacity-10 bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <button
                  className="fixed top-3 right-3 transition ease-in-out duration-200 hover:scale-90 focus:outline-none"
                  type="button"
                  onClick={closeModal}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <div className="flex flex-col w-full px-2">
                  <div className={`${status === 'Private' ? 'block' : 'hidden'} flex flex-col w-full space-y-3`}>
                    <div className="flex flex-row items-center w-full space-x-2">
                      <img className="w-12 md:w-20 h-12 md:h-20 rounded-full object-cover bg-modern-dim" src={ image } alt="room_avatar" />
                      <div className="flex flex-col">
                        <span className="font-normal text-sm md:text-base">{ name }</span>
                        <span className="font-normal text-[10px] md:text-xs text-gray-400">Created by { author.name }</span>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-gray-400">This room is private, enter the room passcode to continue.</span>
                    <form onSubmit={handleSubmit(onJoin)} className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-6 h-6 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                      <input type="password" name="passcode" placeholder="Passcode" {...register("passcode", { required: true })} className="w-full h-full px-3 py-3 text-xs md:text-sm bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                      {errors.passcode && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </form>
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

function RoomIcon() {
  return (
    <svg className="w-8 h-8 fill-current opacity-40" width='24' height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
      <path d="M9 20h-3v3h-4v-8.766l5.698-4.921 1.711 1.384 6.591-5.697 6 5.236v12.764h-5v-4h-3v4h-5v-3zm-2-5h-2v2h2v-2zm3 0h-2v2h2v-2zm5-1h-2v2h2v-2zm3 0h-2v2h2v-2zm-8.642-7.253l6.642-5.747 8 7-1.329 1.495-6.671-5.819-6.624 5.738-1.678-1.414-6.369 5.495-1.329-1.495 7.698-6.676 1.66 1.423zm5.642 4.253h-2v2h2v-2zm3 0h-2v2h2v-2z"/>
    </svg>
  )
}