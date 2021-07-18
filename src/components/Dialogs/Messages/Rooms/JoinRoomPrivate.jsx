import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function JoinRoomPrivate({ online_user, image, name, status, author, passcode, joined_rooms }) {

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

  // check if the user are already joined in this room
  const checkJoin = joined_rooms.some(joined => joined.indicator === true)
  const checkJoinedUser = joined_rooms.some(joined => joined.userId === online_user.id)

  async function onJoin(formData) {
    const userId = online_user.id
    const roomName = name
    const textpasscode = formData.passcode

    if (textpasscode !== passcode) {
      document.getElementById("custom_toast").innerText = 'Invalid room passcode.'
      return
    }

    await fetch('/api/messages/room/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        roomName
      })
    })
    
    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <div className={`${status === "Private" ? 'block' : 'hidden'} w-full max-w-[5rem]`}>
        <button
          className={`${checkJoin === true && checkJoinedUser === true ? 'hidden' : 'block'} py-1 w-full rounded-sm font-normal text-[10px] md:text-sm text-modern-black bg-honey transition ease-in-out duration-200 hover:scale-95 focus:outline-none`}
          type="button"
          onClick={openModal}
        >
          Join
        </button>
        <div
          className={`${checkJoin === true && checkJoinedUser === true ? 'block' : 'hidden'} py-1 w-full text-center rounded-sm font-normal text-[10px] md:text-sm text-modern-white bg-[#333]`}
        >
          Joined
        </div>
      </div>

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
              <div className="inline-block w-full max-w-sm py-6 px-3 md:px-5 my-8 md:my-20 overflow-hidden text-left align-center md:align-top transition-all transform border border-modern-white border-opacity-10 bg-modern-black text-modern-white shadow-xl rounded-2xl">
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
                    <span className="flex flex-row justify-left text-[12px] text-honey ml-2" id="custom_toast"></span>
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