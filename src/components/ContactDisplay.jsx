import CreateNew from './Dialogs/Contacts/CreateNew'
import ViewContact from './Dialogs/Contacts/ViewContact'
import UpdateContact from './Dialogs/Contacts/UpdateContact'
import DeleteContact from './Dialogs/Contacts/DeleteContact'
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
          <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-3 space-x-10 border-b border-modern-white border-opacity-10">
            <span className="w-full max-w-[40px] text-xs">Profile</span>
            <span className="w-full max-w-[14rem] text-xs pl-3">Name</span>
            <span className="w-full max-w-[28rem] text-xs pl-5">Phone</span>
            <span className="w-full max-w-[10rem] text-xs">Actions</span>
          </div>
          {people.map(({ avatar, name, phone, email, address, facebook, instagram, twitter, tiktok, youtube }, i) => (
            <div className="flex flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim" key={i}>
              <img src={avatar} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
              <span className="w-full max-w-sm text-sm">{name}</span>
              <span className="w-full max-w-sm text-sm">{phone}</span>
              <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                <button className="transition ease-in-out duration-200 bg-modern-black text-red-600 px-3 py-3 rounded-full hover:scale-95 focus:outline-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
                <ViewContact
                  avatar={avatar}
                  name={name}
                  phone={phone}
                  email={email}
                  address={address}
                  facebook={facebook}
                  instagram={instagram}
                  twitter={twitter}
                  tiktok={tiktok}
                  youtube={youtube}
                />
                <UpdateContact
                  avatar={avatar}
                  name={name}
                  phone={phone}
                  email={email}
                  address={address}
                  facebook={facebook}
                  instagram={instagram}
                  twitter={twitter}
                  tiktok={tiktok}
                  youtube={youtube}
                />
                <DeleteContact
                  name={name}
                />
              </span>
            </div>
          ))}
        </div>
      </Scrollbar>
    </div>
  )
}