import Scrollbar from 'react-smooth-scrollbar'
import { diary } from '~/static/faker'

export default function DiaryDisplay() {
  return (
    <div className="font-poppins flex flex-col w-full h-full">
      {/* for desktop view */}
      <div className="hidden md:flex flex-row items-center justify-between w-full px-5 py-5 border-b border-modern-white border-opacity-10">
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none" type="text" name="search" placeholder="Search" />
        </div>
        <button className="flex items-center justify-center w-full max-w-[6rem] md:max-w-[8rem] px-1 py-2 md:px-2 md:py-3 text-[10px] md:text-xs rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-honey text-modern-black">
          <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Create New</span>
        </button>
      </div>
      {/* for mobile view */}
      <div className="md:hidden flex flex-col md:flex-row items-center justify-between w-full px-10 py-5 border-b border-modern-white border-opacity-10 space-y-5 md:space-y-0">
        <div className="flex flex-col">
          <h1>My Diary</h1>
        </div>
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none" type="text" name="search" placeholder="Search" />
        </div>
      </div>
      <Scrollbar>
        {/* for desktop view */}
        <div className="contact-list hidden md:flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden">
          <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-3 space-x-10 border-b border-modern-white border-opacity-10">
            <span className="w-full max-w-[40px] text-xs">Photo</span>
            <span className="w-full max-w-[14rem] text-xs pl-3">Title</span>
            <span className="w-full max-w-[28rem] text-xs pl-5">Date</span>
            <span className="w-full max-w-[8rem] text-xs">Actions</span>
          </div>
          {diary.map(({ photo, title, date }, i) => (
            <div className="flex flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim" key={i}>
              <img src={photo} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
              <span className="w-full max-w-sm text-sm">{title}</span>
              <span className="w-full max-w-sm text-xs">{date}</span>
              <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
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
        {/* for mobile view */}
        <div className="md:hidden grid grid-rows md:grid-cols-3 grid-flow-row gap-x-4 gap-y-16 w-full max-w-full h-full overflow-y-auto pt-16 pb-5 px-5">
          {diary.map(({ photo, title, date, content }, i) => (
            <div className="flex flex-col items-center w-full max-w-full md:max-w-md h-full rounded-3xl px-5 py-5 space-y-3 bg-modern-dim" key={i}>
              <div className="flex flex-row justify-center items-center w-full">
                <div className="flex justify-center w-full -mt-16">
                  <img className="w-[23rem] h-32 object-cover rounded-xl" src={photo} />
                </div>
              </div>
              <div className="flex flex-col items-center w-full max-w-xs space-y-3">
                <span className="text-sm md:text-lg">{title}</span>
                <span className="text-[10px] md:text-base text-gray-400 line-clamp-2">{content}</span>
                <span className="text-[10px] md:text-base text-gray-200">{date}</span>
              </div>
              <div className="flex flex-row items-center justify-center w-full space-x-2">
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
              </div>
            </div>
          ))}
        </div>
      </Scrollbar>
      <div className="md:hidden relative">
        <div className="fixed bottom-20 md:bottom-10 right-8 md:right-10 z-10">
          <button className="px-4 py-4 bg-honey text-modern-dim rounded-full transition ease-in-out duration-300 transform hover:rotate-180 hover:scale-95 focus:outline-none">
            <svg className="w-6 md:w-8 h-6 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}