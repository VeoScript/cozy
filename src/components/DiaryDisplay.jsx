import CreateNew from './Dialogs/Diary/CreateNew'
import ViewDiary from './Dialogs/Diary/ViewDiary'
import UpdateDiary from './Dialogs/Diary/UpdateDiary'
import DeleteDiary from './Dialogs/Diary/DeleteDiary'
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
        <CreateNew />
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
          {diary.map(({ photo, title, date, content }, i) => (
            <div className="flex flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim" key={i}>
              <img src={photo} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
              <span className="w-full max-w-sm text-sm">{title}</span>
              <span className="w-full max-w-sm text-xs">{date}</span>
              <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                <ViewDiary
                  photo={photo}
                  title={title}
                  content={content}
                  date={date}
                />
                <UpdateDiary
                  photo={photo}
                  title={title}
                  content={content}
                />
                <DeleteDiary
                  title={title}
                />
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
                <ViewDiary
                  photo={photo}
                  title={title}
                  content={content}
                  date={date}
                />
                <UpdateDiary
                  photo={photo}
                  title={title}
                  content={content}
                />
                <DeleteDiary
                  title={title}
                />
              </div>
            </div>
          ))}
        </div>
      </Scrollbar>
      <div className="md:hidden relative">
        <CreateNew />
      </div>
    </div>
  )
}