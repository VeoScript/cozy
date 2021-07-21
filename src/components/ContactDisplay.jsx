import { useState } from 'react'
import { useRouter } from 'next/router'
import CreateNew from './Dialogs/Contacts/CreateNew'
import ViewContact from './Dialogs/Contacts/ViewContact'
import UpdateContact from './Dialogs/Contacts/UpdateContact'
import DeleteContact from './Dialogs/Contacts/DeleteContact'
import Scrollbar from 'react-smooth-scrollbar'

export default function ContactDisplay({ online_user, contacts }) {

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

  // get all contacts from the api
  const get_contacts = contacts.map(({ id, profile, name, phone, email, address, facebook, instagram, twitter, tiktok, youtube, favorite }, couter) => {
    return [
      id,
      profile,
      name,
      phone,
      email,
      address,
      facebook,
      instagram,
      twitter,
      tiktok,
      youtube,
      favorite,
      couter
    ]
  })

  // search input filter for searching the contact name
  const results = !searchTerm ? get_contacts : get_contacts.filter(contact =>
    contact[2].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )

  // check if there is a contact on the list
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
          contacts={contacts}
        />
      </div>
      <div className={`${check[0] ? 'hidden' : 'flex'} flex-row items-center justify-center w-full h-full`}>
        <div className="flex flex-col items-center w-full space-y-1">
          <h1 className="font-black font-raleway text-xl text-honey">COZY</h1>
          <span className="font-light text-xs text-center text-gray-400">Create your first contact. Discover the world of cozy.</span>
        </div>
      </div>
      <Scrollbar>
        {/* it will display if there is no contact detected */}
        <div className={`${check[0] ? 'flex' : 'hidden'} contact-list flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden`}>
          <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-3 space-x-10 border-b border-modern-white border-opacity-10">
            <span className="w-full max-w-[40px] text-xs">Profile</span>
            <span className="w-full max-w-[14rem] text-xs pl-3">Name</span>
            <span className="w-full max-w-[28rem] text-xs pl-5">Phone</span>
            <span className="w-full max-w-[10rem] text-xs">Actions</span>
          </div>
          {/* it will display if you search the name of the contact on the list */}
          {setIsOpen && (
            <>
              {results.map(contact => (
                <div className={`${isOpen ? 'flex' : 'hidden'} flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim`} key={contact[12]}>
                  <img src={contact[1]} className="w-full max-w-[56px] h-14 object-cover rounded-full" />
                  <span className="w-full max-w-sm text-sm">{contact[2]}</span>
                  <span className="w-full max-w-sm text-sm">{contact[3]}</span>
                  <span className="flex items-center justify-end w-full max-w-sm text-xs space-x-1">
                    <AddFavorite
                      online_user={online_user}
                      id={contact[0]}
                      favorite={contact[11]}
                    />
                    <ViewContact
                      profile={contact[1]}
                      name={contact[2]}
                      phone={contact[3]}
                      email={contact[4]}
                      address={contact[5]}
                      facebook={contact[6]}
                      instagram={contact[7]}
                      twitter={contact[8]}
                      tiktok={contact[9]}
                      youtube={contact[10]}
                    />
                    <UpdateContact
                      online_user={online_user}
                      id={contact[0]}
                      profile={contact[1]}
                      name={contact[2]}
                      phone={contact[3]}
                      email={contact[4]}
                      address={contact[5]}
                      facebook={contact[6]}
                      instagram={contact[7]}
                      twitter={contact[8]}
                      tiktok={contact[9]}
                      youtube={contact[10]}
                    />
                    <DeleteContact
                      online_user={online_user}
                      id={contact[0]}
                      name={contact[2]}
                    />
                  </span>
                </div>
              ))}
            </>
          )}
          {/* it will display the list of your contacts getting from the database and it will disappear if you search the name of the contact */}
          {contacts.map(({ id, profile, name, phone, email, address, facebook, instagram, twitter, tiktok, youtube, favorite }, i) => (
            <div className={`${!isOpen ? 'flex' : 'hidden'} flex-row items-center justify-between w-full px-5 py-5 space-x-10 border-b border-modern-white border-opacity-10 bg-modern-dim`} key={i}>
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