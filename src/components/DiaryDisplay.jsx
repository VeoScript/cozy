import { useState } from 'react'
import CreateNew from './Dialogs/Diary/CreateNew'
import ViewDiary from './Dialogs/Diary/ViewDiary'
import UpdateDiary from './Dialogs/Diary/UpdateDiary'
import DeleteDiary from './Dialogs/Diary/DeleteDiary'
import Scrollbar from 'react-smooth-scrollbar'
import Moment from 'react-moment'

export default function DiaryDisplay({ online_user, diaries }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // code for the search function
  const handleChange = event => {
    setSearchTerm(event.target.value)
    if(!event.target.value){
      setIsOpen(false)
    }
    else{
      setIsOpen(true)
    }
  }

  // get all diaries from the api
  const get_diaries = diaries.map(({ id, photo, title, date, content }, couter) => {
    return [
      id,
      photo,
      title,
      date,
      content,
      couter
    ]
  })

  // search input filter for searching the diary name
  const results = !searchTerm ? get_diaries : get_diaries.filter(diary =>
    diary[2].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  // check if there is a diaries on the list
  const check = diaries.map((id) => {
    return {
      id
    }
  })

  return (
    <div className="font-poppins flex flex-col w-full h-full">
      {/* for desktop view header */}
      <div className="hidden md:flex flex-row items-center justify-between w-full px-5 py-5 border-b border-modern-white border-opacity-10">
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none"
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
        <CreateNew
          online_user={online_user}
          diaries={diaries}
        />
      </div>
      {/* for mobile view header */}
      <div className="md:hidden flex flex-col md:flex-row items-center justify-between w-full px-10 py-5 border-b border-modern-white border-opacity-10 space-y-5 md:space-y-0">
        <div className="flex flex-col">
          <h1>My Diary</h1>
        </div>
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input 
            className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none"
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
      </div>
      {/* it will display if there is no contact detected */}
      <div className={`${check[0] ? 'hidden' : 'flex'} flex-row items-center justify-center w-full h-full`}>
        <div className="flex flex-col items-center w-full space-y-1">
          <h1 className="font-black font-raleway text-xl text-honey">COZY</h1>
          <span className="font-light text-xs text-center text-gray-400">Create your first diary. Discover the world of cozy.</span>
        </div>
      </div>
      <Scrollbar>
        {/* DESKTOP SEARCH it will display if you search the name of the contact on the list */}
        {setIsOpen && (
          <div className={`${check[0] ? 'hidden md:flex' : 'hidden'} diary-list flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden`}>
            <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-3 space-x-10 border-b border-modern-white border-opacity-10">
              <span className="w-full max-w-[40px] text-xs">Photo</span>
              <span className="w-full max-w-[14rem] text-xs pl-3">Title</span>
              <span className="w-full max-w-[28rem] text-xs pl-8">Date</span>
              <span className="w-full max-w-[8rem] text-xs">Actions</span>
            </div>
            {results.map(diary => (
              <div className={`${isOpen ? 'flex' : 'hidden'} flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim`} key={diary[5]}>
                <img src={diary[1]} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
                <span className="w-full max-w-sm text-sm">{diary[2]}</span>
                <span className="w-full max-w-sm text-xs"><Moment date={ diary[3] } format='LL' /></span>
                <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                  <ViewDiary
                    online_user={online_user}
                    photo={diary[1]}
                    title={diary[2]}
                    content={diary[4]}
                    date={diary[3]}
                  />
                  <UpdateDiary
                    online_user={online_user}
                    id={diary[0]}
                    photo={diary[1]}
                    title={diary[2]}
                    content={diary[4]}
                  />
                  <DeleteDiary
                    online_user={online_user}
                    id={diary[0]}
                    title={diary[2]}
                  />
                </span>
              </div>
            ))}
          </div>
        )}
        {/* MOBILE SEARCH it will display if you search the name of the contact on the list */}
        {setIsOpen && (
          <div className={`${isOpen ? 'md:hidden grid' : 'hidden'} grid-rows md:grid-cols-3 grid-flow-row gap-x-4 gap-y-16 w-full max-w-full h-full overflow-y-auto pt-16 pb-5 px-5`}>
            {results.map(diary => (
              <div className="flex flex-col items-center w-full max-w-full md:max-w-md h-full rounded-3xl px-5 py-5 space-y-3 bg-modern-dim" key={diary[5]}>
                <div className="flex flex-row justify-center items-center w-full">
                  <div className="flex justify-center w-full -mt-16">
                    <img className="w-[23rem] h-32 object-cover rounded-xl" src={diary[1]} />
                  </div>
                </div>
                <div className="flex flex-col items-center w-full max-w-xs space-y-3">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-lg md:text-xl">{diary[2]}</span>
                    <span className="text-xs md:text-sm text-gray-300 mt-2">{online_user.name}</span>
                    <span className="text-[10px] md:text-xs text-gray-400"><Moment date={ diary[3] } format='LL' /></span>
                  </div>
                  <span className="text-[10px] md:text-base text-gray-400 line-clamp-2">{diary[4]}</span>
                </div>
                <div className="flex flex-row items-center justify-center w-full space-x-2">
                  <ViewDiary
                    online_user={online_user}
                    photo={diary[1]}
                    title={diary[2]}
                    content={diary[4]}
                    date={diary[3]}
                  />
                  <UpdateDiary
                    online_user={online_user}
                    id={diary[0]}
                    photo={diary[1]}
                    title={diary[2]}
                    content={diary[4]}
                  />
                  <DeleteDiary
                    online_user={online_user}
                    id={diary[0]}
                    title={diary[2]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* for desktop view cards */}
        <div className={`${check[0] ? 'hidden md:flex' : 'hidden'} diary-list flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden`}>
          {diaries.map(({ id, photo, title, date, content }, i) => (
            <div className={`${!isOpen ? 'flex' : 'hidden'} flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim`} key={i}>
              <img src={photo} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
              <span className="w-full max-w-sm text-sm">{title}</span>
              <span className="w-full max-w-sm text-xs"><Moment date={ date } format='LL' /></span>
              <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                <ViewDiary
                  online_user={online_user}
                  photo={photo}
                  title={title}
                  content={content}
                  date={date}
                />
                <UpdateDiary
                  online_user={online_user}
                  id={id}
                  photo={photo}
                  title={title}
                  content={content}
                />
                <DeleteDiary
                  online_user={online_user}
                  id={id}
                  title={title}
                />
              </span>
            </div>
          ))}
        </div>
        {/* for mobile view cards */}
        <div className={`${!isOpen ? 'md:hidden grid' : 'hidden'} grid-rows md:grid-cols-3 grid-flow-row gap-x-4 gap-y-16 w-full max-w-full h-full overflow-y-auto pt-16 pb-5 px-5`}>
          {diaries.map(({ id, photo, title, date, content }, i) => (
            <div className="flex flex-col items-center w-full max-w-full md:max-w-md h-full rounded-3xl px-5 py-5 space-y-3 bg-modern-dim" key={i}>
              <div className="flex flex-row justify-center items-center w-full">
                <div className="flex justify-center w-full -mt-16">
                  <img className="w-[23rem] h-32 object-cover rounded-xl" src={photo} />
                </div>
              </div>
              <div className="flex flex-col items-center w-full max-w-xs space-y-3">
                <div className="flex flex-col items-center w-full">
                  <span className="text-lg md:text-xl">{title}</span>
                  <span className="text-xs md:text-sm text-gray-300 mt-2">{online_user.name}</span>
                  <span className="text-[10px] md:text-xs text-gray-400"><Moment date={ date } format='LL' /></span>
                </div>
                <span className="text-[10px] md:text-base text-gray-400 line-clamp-2">{content}</span>
              </div>
              <div className="flex flex-row items-center justify-center w-full space-x-2">
                <ViewDiary
                  online_user={online_user}
                  photo={photo}
                  title={title}
                  content={content}
                  date={date}
                />
                <UpdateDiary
                  online_user={online_user}
                  id={id}
                  photo={photo}
                  title={title}
                  content={content}
                />
                <DeleteDiary
                  online_user={online_user}
                  id={id}
                  title={title}
                />
              </div>
            </div>
          ))}
        </div>
      </Scrollbar>
      <div className="md:hidden relative">
        <CreateNew 
          online_user={online_user}
          diaries={diaries}
        />
      </div>
    </div>
  )
}