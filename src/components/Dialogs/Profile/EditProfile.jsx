import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import ChangePassword from './ChangePassword'

export default function EditProfile({ online_user }) {

  const router = useRouter()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    reset(defaultValues)
    setIsOpen(false)
  }

  function openModal() {
    reset(defaultValues)
    setIsOpen(true)
  }

  const defaultValues = {
    avatar: online_user.avatar,
    name: online_user.name,
    email: online_user.email
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm({ defaultValues })

  async function onEditProfile(formData) {
    const id = online_user.id
    const username = online_user.username
    const avatar = formData.avatar
    const name = formData.name
    const email = formData.email
    
    await fetch('/api/profile/edit_profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        username,
        avatar,
        name,
        email
      })
    })
    
    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <button
        className="hidden md:block font-light text-xs text-white text-opacity-40 hover:underline focus:outline-none"
        type="button"
        onClick={openModal}
      >
        Edit profile
      </button>

      <button
        className="md:hidden block font-light px-5 py-2 mt-5 w-full max-w-[12rem] rounded-md text-xs bg-modern-dim hover:bg-opacity-50 focus:outline-none"
        type="button"
        onClick={openModal}
      >
        Edit profile
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform border-2 border-honey bg-modern-black text-modern-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h1"
                  className="flex flex-row items-center justify-between w-full text-lg font-medium leading-6 text-modern-white"
                >
                  <span>Edit Profile</span>
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
                  <form onSubmit={handleSubmit(onEditProfile)} className="flex flex-col w-full space-y-3">
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                      </svg>
                      <input type="text" name="avatar" placeholder="Profile URL" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" {...register("avatar", { required: true })} disabled={isSubmitting} />
                      {errors.avatar && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </div>
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                      </svg>
                      <input type="text" name="name" placeholder="Name" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" {...register("name", { required: true })} disabled={isSubmitting} />
                      {errors.name && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </div>
                    <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                      <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd"></path>
                      </svg>
                      <input type="email" name="email" placeholder="Email" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" {...register("email", { required: true })} disabled={isSubmitting} />
                      {errors.email && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                    </div>
                    <div className="flex flex-col items-center justify-end w-full space-y-3">
                      <button type="submit" className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:bg-opacity-80 bg-modern-dim text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                        Update Profile
                      </button>
                    </div>
                  </form>
                  <ChangePassword
                    online_user={online_user}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}