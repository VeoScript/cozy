import CreateNew from './Dialogs/Contacts/CreateNew'
import Scrollbar from 'react-smooth-scrollbar'
import { people } from '~/static/faker'

export default function ContactDisplay() {
  return (
    <div className="font-poppins hidden md:flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full px-5 py-5 border-b border-modern-white border-opacity-10">
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none" type="text" name="search" placeholder="Search" />
        </div>
        <CreateNew />
      </div>
      <Scrollbar>
        <div className="contact-list flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden">
          <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-3 space-x-10">
            <span className="w-full max-w-[40px] text-xs">Profile</span>
            <span className="w-full max-w-[14rem] text-xs pl-3">Name</span>
            <span className="w-full max-w-[28rem] text-xs pl-5">Phone</span>
            <span className="w-full max-w-[10rem] text-xs">Actions</span>
          </div>
          {people.map(({ avatar, name, phone }, i) => (
            <div className="flex flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-t border-b border-modern-white border-opacity-10 bg-modern-dim" key={i}>
              <img src={avatar} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
              <span className="w-full max-w-sm text-sm">{name}</span>
              <span className="w-full max-w-sm text-sm">{phone}</span>
              <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                <button className="transition ease-in-out duration-200 bg-modern-black text-red-600 px-3 py-3 rounded-full hover:scale-95 focus:outline-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
                <button className="transition ease-in-out duration-200 bg-modern-black text-gray-400 px-3 py-3 rounded-full hover:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button className="transition ease-in-out duration-200 bg-modern-black text-honey px-3 py-3 rounded-full hover:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button className="transition ease-in-out duration-200 bg-modern-black text-red-800 px-3 py-3 rounded-full hover:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </span>
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  )
}