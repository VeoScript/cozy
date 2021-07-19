import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateRoom2({ online_user, rooms }) {

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

  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting }} = useForm()

  function onPrivate(e) {
    if (e.currentTarget.value === 'Private') {
      document.getElementById("passcode").style.display = 'flex'
      document.getElementById("repasscode").style.display = 'flex'
    } else {
      document.getElementById("passcode").style.display = 'none'
      document.getElementById("repasscode").style.display = 'none'
    }
  }

  async function onCreate(formData) {
    const authorId = online_user.id
    const image = formData.image
    const name = formData.name
    const status = formData.status
    const passcode = formData.passcode
    const repasscode = formData.repasscode

    if (status === 'Private') {
      if (passcode === '') {
        setError('passcode')
        return
      }
      if (repasscode === '') {
        setError('repasscode')
        return
      }
    }

    if (passcode !== repasscode) {
      document.getElementById("custom_toast").innerText = 'Passcode did not match. Try again.'
      return
    } else {
      document.getElementById("custom_toast").innerText = ''
    }

    // create room function
    await fetch('/api/messages/room/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        authorId,
        image,
        name,
        status,
        passcode
      })
    })

    // auto join the creator of the room function
    await fetch('/api/messages/room/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: authorId,
        roomName: name
      })
    })

    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <button
        className="md:hidden flex items-center justify-center w-full max-w-[7rem] px-1 py-2 text-xs rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-honey text-modern-black focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <span className="text-xs">Create Room</span>
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
                  <span>Create Room</span>
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
                <div className="mt-5">
                  <form onSubmit={handleSubmit(onCreate)}>
                    <div className="flex flex-col w-full space-y-2">
                      <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                        <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                        </svg>
                        <input type="text" name="image" placeholder="Room Image URL" {...register("image", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                        {errors.image && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                      </div>
                      <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                        <RoomIcon />
                        <input type="text" name="name" placeholder="Name" {...register("name", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                        {errors.name && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                      </div>
                      <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                        <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"></path>
                        </svg>
                        <select
                          id="select_status"
                          className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          {...register("status", { required: true })}
                          disabled={isSubmitting}
                          onChange={onPrivate}
                        >
                          <option value="" disabled selected>Status</option>
                          <option value="Private">Private</option>
                          <option value="Public">Public</option>
                        </select>
                        {errors.status && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                      </div>
                      <div className="flex flex-col md:flex-row items-center w-full space-x-0 md:space-x-2 space-y-2 md:space-y-0">
                        <div id="passcode" className="hidden items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                          </svg>
                          <input type="password" name="passcode" placeholder="Passcode" {...register("passcode")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.passcode && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                        <div id="repasscode" className="hidden items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          <input type="password" name="repasscode" placeholder="Re-enter Passcode" {...register("repasscode")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.repasscode && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                      </div>
                      <span className="flex flex-row justify-left text-[12px] text-honey ml-2" id="custom_toast"></span>
                    </div>
                    <div className="flex flex-row justify-end mt-1">
                      <button
                        className="flex items-center justify-center w-full max-w-[8rem] px-2 py-3 text-sm rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-honey text-modern-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Create
                      </button>
                    </div>
                  </form>
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