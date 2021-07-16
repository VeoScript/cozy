import { useState } from 'react'
import Scrollbar from 'react-smooth-scrollbar'

export default function MessagesDisplay() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-row w-full">
      {/* chat display... */}
      <div className="flex flex-col justify-between w-full max-w-full border-r border-modern-white border-opacity-10">
        <div className="flex flex-row items-center justify-between w-full px-3 py-2 border-b border-modern-white border-opacity-10">
          <div className="flex flex-row items-center space-x-3">
            <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src="https://images.unsplash.com/photo-1565231776967-95aee5973585?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVkcm9vbSUyMGFlc3RoZXRpY3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="room_avatar" />
            <div className="flex flex-col">
              <span className="font-normal text-sm">Room Name</span>
              <span className="font-normal text-[10px] text-gray-400">Created by: Jerome Villaruel</span>
            </div>
          </div>
          <div className="flex">
            <button
              className="text-gray-400 transition ease-in-out duration-200 hover:scale-90"
              type="button"
              onClick={() => { setIsOpen(true) }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>
            {setIsOpen && (
              <>
                <button onClick={() => {setIsOpen(false)}} type="button" className={`${isOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
                <div className={`z-40 w-full ${isOpen ? 'fixed' : 'hidden'}`}>
                  <div className="fixed right-[20rem] top-10 mr-3 w-full max-w-[10rem] h-auto overflow-hidden mt-2 rounded-md shadow-xl border border-modern-white border-opacity-10 bg-modern-black text-white z-10">
                    <div className="hidden md:flex flex-row w-full h-auto max-h-[15rem] overflow-y-auto bg-opacity-75">
                      <div className="flex flex-col w-full">
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span>Settings</span>
                        </button>
                        <hr className="w-full border-t border-modern-dim" />
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                          </svg>
                          <span>Report</span>
                        </button>
                        <hr className="w-full border-t border-modern-dim" />
                        <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-red-600 space-x-2 focus:outline-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                          </svg>
                          <span>Leave Room</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* chat logs display */}
        <div className="flex flex-col justify-end w-full h-full overflow-y-auto">
          <Scrollbar>
            {/* bubble chat from them */}
            <div className="flex flex-row justify-start w-full px-3 py-3">
              <div className="flex items-center space-x-2 w-full max-w-[15rem]">
                <img className="w-8 h-8 rounded-full object-cover bg-modern-dim" src="https://lh3.googleusercontent.com/VTX8O3fEDZcfpFsEwQKM_E1sEjTVw9HExPEybwvUr81XzcM2nYz5PDPqAVQuG-DDcaiqJZUK8SgePosw2_8ecB5zLniyyz-uBT-ndrWLsrubvQO5=s0" />
                <div className="flex px-3 py-3 rounded-xl font-normal text-xs text-modern-white bg-modern-dim">
                  Them
                </div>
              </div>
            </div>
            {/* bubble chat from you */}
            <div className="flex flex-row justify-end w-full px-3 py-3">
              <div className="flex justify-end w-full max-w-[15rem]">
                <div className="flex rounded-xl px-3 py-3 font-normal text-xs text-modern-dim bg-honey">
                  You
                </div>
              </div>
            </div>
          </Scrollbar>
        </div>
        {/* message chat forms */}
        <div className="flex flex-row w-full h-auto px-3 py-3 border-t border-modern-white border-opacity-10">
          <form className="flex flex-row items-center w-full max-w-xl space-x-3">
            <div
              contentEditable
              id="chatbox"
              className="w-full whitespace-pre-wrap text-xs cursor-text focus:outline-none font-light py-2"
              placeholder="Type here..."
            />
            <button className="text-modern-white opacity-30 transition ease-in-out duration-300 hover:scale-95">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      {/* participants display... */}
      <div className="flex flex-col w-full max-w-xs h-full overflow-y-auto bg-modern-dim border-r border-modern-white border-opacity-10">
        <Scrollbar>
          <div className="flex w-full font-normal text-sm text-modern-white py-5 px-8">
            Room Participants
          </div>
          <div className="flex flex-col w-full px-3 pb-5 space-y-3">
            <button type="button" className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 hover:bg-modern-black">
              <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src="https://cf.shopee.ph/file/46f7ebaa7dbac43476f3c328935d79c0" alt="participant_avatar" />
              <div className="flex flex-col items-start">
                <span className="font-normal text-[12px]">Participant Name</span>
                <span className="font-normal text-[10px]">Designation</span>
              </div>
            </button>
          </div>
        </Scrollbar>
      </div>
    </div>
  )
}