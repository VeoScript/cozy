import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function UpdateContact({ online_user, id, profile, name, phone, email, address, facebook, instagram, twitter, tiktok, youtube }) {

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
    profile: profile,
    name: name,
    phone: phone,
    email: email,
    address: address,
    facebook: facebook,
    instagram: instagram,
    twitter: twitter,
    tiktok: tiktok,
    youtube: youtube,
  }

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm({ defaultValues })

  async function onUpdate(formData) {
    const userId = online_user.id
    const contactId = id
    const profile = formData.profile
    const name = formData.name
    const phone = formData.phone
    const email = formData.email
    const address = formData.address
    const facebook = formData.facebook
    const instagram = formData.instagram
    const twitter = formData.twitter
    const tiktok = formData.tiktok
    const youtube = formData.youtube

    await fetch('/api/contacts/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        contactId,
        profile,
        name,
        phone,
        email,
        address,
        facebook,
        instagram,
        twitter,
        tiktok,
        youtube
      })
    })
    reset()
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <button
        className="transition ease-in-out duration-200 bg-modern-black text-honey px-3 py-3 rounded-full hover:scale-95 focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
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
                  <span>Update Contact</span>
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
                  <form onSubmit={handleSubmit(onUpdate)}>
                    <div className="flex flex-col md:flex-row w-full space-y-3 space-x-0 md:space-y-0 md:space-x-3">
                      <div className="flex flex-col w-full space-y-3">
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                          </svg>
                          <input type="text" name="profile" placeholder="Profile URL" {...register("profile", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.profile && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                          </svg>
                          <input type="text" name="name" placeholder="Name" {...register("name", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.name && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                          </svg>
                          <input type="text" name="phone" placeholder="Phone" {...register("phone", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.phone && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd"></path>
                          </svg>
                          <input type="email" name="email" placeholder="Email" {...register("email")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.email && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          <input type="text" name="address" placeholder="Address" {...register("address", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                          {errors.address && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                        </div>
                      </div>
                      <div className="flex flex-col w-full space-y-3">
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <FacebookIcon />
                          <input type="text" name="facebook" placeholder="Facebook URL" {...register("facebook")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />                          {errors.facebook && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <InstagramIcon />
                          <input type="text" name="instagram" placeholder="Instagram URL" {...register("instagram")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />                          {errors.instagram && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <TwitterIcon />
                          <input type="text" name="twitter" placeholder="Twitter URL" {...register("twitter")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />                          {errors.twitter && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <TiktokIcon />
                          <input type="text" name="tiktok" placeholder="TikTok URL" {...register("tiktok")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />                          {errors.tiktok && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                        </div>
                        <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                          <YoutubeIcon />
                          <input type="text" name="youtube" placeholder="YouTube URL" {...register("youtube")} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />                          {errors.youtube && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end mt-4">
                      <button
                        className="flex items-center justify-center w-full max-w-[8rem] px-2 py-3 text-sm rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-honey text-modern-black focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        <span>Update</span>
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

function FacebookIcon() {
  return (
    <svg className="w-7 h-7 fill-current text-modern-white opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-7 h-7 fill-current text-modern-white opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg className="w-7 h-7 fill-current text-modern-white opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  )
}

function TiktokIcon() {
  return (
    <svg className="w-7 h-7 fill-current text-modern-white opacity-40" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg className="w-7 h-7 fill-current text-modern-white opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
  )
}
