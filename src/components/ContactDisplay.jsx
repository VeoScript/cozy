import { useState } from 'react'
import { useRouter } from 'next/router'
import CreateNew from './Dialogs/Contacts/CreateNew'
import ViewContact from './Dialogs/Contacts/ViewContact'
import UpdateContact from './Dialogs/Contacts/UpdateContact'
import DeleteContact from './Dialogs/Contacts/DeleteContact'
import Scrollbar from 'react-smooth-scrollbar'

export default function ContactDisplay({ online_user, contacts }) {

  const check = contacts.map((id) => {
    return {
      id
    }
  })

  return (
    <div className="font-poppins hidden md:flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full px-5 py-5 border-b border-modern-white border-opacity-10">
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none" type="text" name="search" placeholder="Search" />
        </div>
        <CreateNew
          online_user={online_user}
          contacts={contacts}
        />
      </div>
      <div className={`${check[0] ? 'hidden' : 'flex'} flex-row items-center justify-center w-full h-full`}>
        <h1 className="font-bold text-xl md:text-3xl text-[#333]">Create your first contact.</h1>
      </div>
      <Scrollbar>
        <div className="contact-list flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden">
          <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-3 space-x-10 border-b border-modern-white border-opacity-10">
            <span className="w-full max-w-[40px] text-xs">Profile</span>
            <span className="w-full max-w-[14rem] text-xs pl-3">Name</span>
            <span className="w-full max-w-[28rem] text-xs pl-5">Phone</span>
            <span className="w-full max-w-[10rem] text-xs">Actions</span>
          </div>
          {contacts.map(({ id, profile, name, phone, email, address, facebook, instagram, twitter, tiktok, youtube, favorite }, i) => (
            <div className="flex flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim" key={i}>
              <img src={profile} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
              <span className="w-full max-w-sm text-sm">{name}</span>
              <span className="w-full max-w-sm text-sm">{phone}</span>
              <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                <AddFavorite
                  online_user={online_user}
                  id={id}
                  favorite={favorite}
                />
                <ViewContact
                  profile={profile}
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
                  online_user={online_user}
                  id={id}
                  profile={profile}
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
                  online_user={online_user}
                  id={id}
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

function AddFavorite({ online_user, id, favorite }) {

  const router = useRouter()

  const [isFav, setIsFav] = useState(favorite)

  async function addFavorite() {
    const userId = online_user.id
    const contactId = id
    const favorite = true

    await fetch('/api/favorite/add_favorite', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        contactId,
        favorite
      })
    })
    setIsFav(true)
    router.replace(router.asPath)
  }

  async function removeFavorite() {
    const userId = online_user.id
    const contactId = id
    const favorite = false

    await fetch('/api/favorite/remove_favorite', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        contactId,
        favorite
      })
    })
    setIsFav(false)
    router.replace(router.asPath)
  }
  
  return (
    <>
      <button type="button" onClick={addFavorite} className={`${isFav === false ? 'block' : 'hidden'} transition ease-in-out duration-200 bg-modern-black text-red-600 px-3 py-3 rounded-full hover:scale-95 focus:outline-none`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
      <button type="button" onClick={removeFavorite} className={`${isFav === true ? 'block' : 'hidden'} transition ease-in-out duration-200 bg-modern-black text-red-600 px-3 py-3 rounded-full hover:scale-95 focus:outline-none`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
        </svg>
      </button>
    </>
  )
}