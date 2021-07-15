import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function CreateNew({ online_user, diaries }) {

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
  
  const defaultValues = {
    create_story: ''
  }

  const { register, handleSubmit, reset, setValue, setError, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  useEffect(() => {
    register('create_story', { required: true })
  }, [register])

  async function onCreate(formData) {
    const userId = online_user.id
    const photo = formData.photo
    const title = formData.title
    const create_story = formData.create_story

    if (create_story === '') {
      setError('create_story')
      return
    }

    const titleExist = diaries.some(contact => contact.title === title)

    if (titleExist) {
      toast.error('Cannot perform, the title is already exist.', {
        style: {
          borderRadius: '10px',
          background: '#333333',
          color: '#fff',
          fontSize: '12px'
        }
      })
      return
    }

    await fetch('/api/diary/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        photo,
        title,
        create_story
      })
    })
    reset()
    storycontent.innerText = ''
    closeModal()
    router.replace(router.asPath)
  }

  return (
    <>
      <button
        className="hidden md:flex items-center justify-center w-full max-w-[6rem] md:max-w-[8rem] px-1 py-2 md:px-2 md:py-3 text-[10px] md:text-xs rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-honey text-modern-black focus:outline-none"
        type="button"
        onClick={openModal}
      >
        <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Create New</span>
      </button>

      <div className="md:hidden fixed bottom-20 md:bottom-10 right-8 md:right-10 z-10">
        <button
          className="px-4 py-4 bg-honey text-modern-dim rounded-full transition ease-in-out duration-300 transform hover:rotate-180 hover:scale-95 focus:outline-none"
          type="button"
          onClick={openModal}
        >
          <svg className="w-6 md:w-8 h-6 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>

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
                  <span>Your Diary</span>
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
                        <input type="text" name="photo" placeholder="Photo URL" {...register("photo", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                        {errors.photo && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                      </div>
                      <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                        <svg className="w-8 h-8 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                        <input type="text" name="title" placeholder="Title" {...register("title", { required: true })} className="w-full h-full px-3 py-4 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                        {errors.title && <span className="flex flex-row justify-end w-full text-[10px] text-honey">Required</span>}
                      </div>
                      <div className="flex items-start w-full px-3 rounded-lg bg-[#1F1F1F]">
                        <svg className="w-8 h-8 opacity-40 mt-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <div
                          id="storycontent"
                          className={`w-full h-full px-3 py-4 text-modern-white whitespace-pre-wrap focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${isSubmitting ? 'disabled:bg-gray-500' : 'bg-[#1F1F1F]'}`}
                          contentEditable
                          placeholder="Share your story..."
                          onInput={(e) => setValue('create_story', e.currentTarget.textContent, { shouldValidate: true })}
                        />
                        {errors.create_story && <span className="flex flex-row justify-end w-full text-[10px] text-honey mt-5">Required</span>}
                      </div>
                    </div>
                    <div className="flex flex-row justify-end mt-4">
                      <button
                        className="flex items-center justify-center w-full max-w-[8rem] px-2 py-3 text-sm rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-honey text-modern-black focus:outline-none"
                        type="submit"
                      >
                        <span>Post</span>
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