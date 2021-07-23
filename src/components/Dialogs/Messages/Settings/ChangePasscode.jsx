import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ChangePasscode({ online_user, roominfo }) {

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

  async function changePasscode(formData) {
    const room_id = roominfo.room.id
    const room_author_id = online_user.id
    const passcode = formData.passcode
    const repasscode = formData.repasscode

    if (passcode !== repasscode) {
      document.getElementById("custom_toast").innerText = 'Passcode did not match. Try again.'
      return
    }

    await fetch('/api/messages/room/change_passcode', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id,
        room_author_id,
        passcode
      })
    })
    
    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <button
        className="flex items-center justify-center w-full px-1 py-4 text-sm rounded-lg transition ease-in-out duration-200 transform hover:bg-opacity-80 space-x-1 bg-modern-dim text-modern-white focus:outline-none"
        type="button"
        onClick={openModal}
      >
        Change Passcode?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-hidden"
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
              <div className="inline-block w-full max-w-sm py-6 px-3 md:px-5 my-8 md:my-20 overflow-hidden text-left align-center transition-all transform border border-modern-white border-opacity-10 bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-between w-full text-lg font-medium leading-6 text-modern-white"
                >
                  <span>Change Passcode</span>
                  <button
                    className="fixed top-3 right-3 transition ease-in-out duration-200 hover:scale-90 focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </Dialog.Title>
                <div className="flex flex-col w-full mt-5">
                  <form onSubmit={handleSubmit(changePasscode)} className="flex flex-col items-center w-full space-y-2">
                    <span className="flex flex-row justify-left text-[12px] text-honey ml-2" id="custom_toast"></span>
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                      <input type="password" name="passcode" placeholder="Passcode" {...register("passcode", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                      {errors.passcode && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </div>
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <input type="password" name="repasscode" placeholder="Re-enter Passcode" {...register("repasscode", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                      {errors.repasscode && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </div>
                    <button
                      className="flex items-center justify-center w-full px-1 py-4 text-sm rounded-lg transition ease-in-out duration-200 transform hover:bg-opacity-80 space-x-1 bg-honey text-modern-black focus:outline-none"
                      type="submit"
                    >
                      Update
                    </button>
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