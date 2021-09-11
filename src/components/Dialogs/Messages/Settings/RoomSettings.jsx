import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ChangePasscode from './ChangePasscode'

export default function RoomSettings({ online_user, roominfo, setMenuOpen }) {

  const router = useRouter()

  const [isDelete, setIsDelete] = useState(false)

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setMenuOpen(false)
    setIsDelete(false)
    setIsOpen(false)
    reset(defaultValues)
  }

  function openModal() {
    setIsOpen(true)
    reset(defaultValues)
  }

  const defaultValues = {
    room_image: roominfo.room.image,
    room_name: roominfo.roomName
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm()

  async function onChangeRoom(formData) {
    const room_id = roominfo.room.id
    const room_author_id = online_user.id
    const room_image = formData.room_image
    const room_name = formData.room_name

    await fetch('/api/messages/room/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id,
        room_author_id,
        room_image,
        room_name
      })
    })

    closeModal()
    router.push(`/messages/${ formData.room_name }`)
  }

  async function onDelete() {
    const joined_room_id = roominfo.id
    const room_id = roominfo.room.id
    const room_author_id = online_user.id

    await fetch('/api/messages/room/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id,
        room_author_id,
        joined_room_id
      })
    })

    closeModal()
    router.push(`/messages`)
  }

  return (
    <>      
      <button 
        className={`${ roominfo.room.author.id === online_user.id ? 'flex' : 'hidden' } items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none`}
        type="button"
        onClick={openModal}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>Settings</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
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
              <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-top transition-all transform border-2 border-modern-white border-opacity-10 bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-between w-full text-lg font-medium leading-6 text-modern-white"
                >
                  <span>Settings</span>
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
                <div className="flex flex-col items-center space-y-2 mt-5">
                  <form onSubmit={handleSubmit(onChangeRoom)} className="flex flex-col w-full space-y-2">
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                      </svg>
                      <input type="text" name="room_image" placeholder="Profile URL" className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" {...register("room_image", { required: true, pattern: { value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, message: "Invalid URL" } })} disabled={isSubmitting} />
                      {errors.room_image && <span className="flex flex-row justify-end text-[10px] text-honey">{errors.room_image.message || 'Required'}</span>}
                    </div>
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <RoomIcon />
                      <input type="text" name="room_name" placeholder="Change the name of the room." {...register("room_name", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                      {errors.room_name && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </div>
                    <button className="hidden" type="submit"></button>
                  </form>
                  <div className="flex flex-row items-center w-full space-x-2">
                    <hr className="w-full border-t border-modern-dim" />
                    <span>or</span>
                    <hr className="w-full border-t border-modern-dim" />
                  </div>
                  <ChangePasscode
                    online_user={online_user}
                    roominfo={roominfo}
                  />
                  <button
                    className="flex items-center justify-center w-full px-1 py-4 text-sm rounded-lg transition ease-in-out duration-200 transform hover:bg-opacity-80 space-x-1 bg-red-600 text-modern-white focus:outline-none"
                    type="button"
                    onClick={() => setIsDelete(true)}
                  >
                    Delete this room?
                  </button>
                  {setIsDelete && (
                    <>
                      <button onClick={() => { setIsDelete(false)}} type="button" className={`${isDelete ? 'z-50 block fixed inset-0 w-full h-full cursor-default bg-modern-black bg-opacity-60 focus:outline-none' : 'hidden'}`}></button>
                      <div className={`flex flex-row justify-center z-50 w-full ${isDelete ? 'fixed' : 'hidden'}`}>
                        <div className="flex flex-col items-center w-full max-w-xs px-3 py-3 space-y-3 bg-modern-black rounded-md border-2 border-red-600">
                          <div className="text-center text-sm">
                            Are you sure you want to delete this room? All joined users and chats are also remove and it cannot be undone after deleted.
                          </div>
                          <div className="flex flex-col w-full space-y-2">
                            <button
                              className="flex items-center justify-center w-full max-w-full px-1 py-2 text-sm rounded-lg transition ease-in-out duration-200 transform hover:bg-opacity-80 space-x-1 bg-red-600 text-modern-white focus:outline-none"
                              type="button"
                              onClick={onDelete}
                            >
                              Continue
                            </button>
                            <button
                              className="flex items-center justify-center w-full max-w-full px-1 py-2 text-sm rounded-lg transition ease-in-out duration-200 transform hover:bg-opacity-80 space-x-1 bg-modern-dim text-modern-white focus:outline-none"
                              type="button"
                              onClick={() => setIsDelete(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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