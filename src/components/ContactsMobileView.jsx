import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CreateNew from './Dialogs/MobileContacts/CreateNew'
import UpdateContact from './Dialogs/MobileContacts/UpdateContact'
import DeleteContact from './Dialogs/MobileContacts/DeleteContact'
import Scrollbar from 'react-smooth-scrollbar'
import FacebookSmall from '~/lib/icons/socialmedia/FacebookSmall'
import InstagramSmall from '~/lib/icons/socialmedia/InstagramSmall'
import TwitterSmall from '~/lib/icons/socialmedia/TwitterSmall'
import TikTokSmall from '~/lib/icons/socialmedia/TikTokSmall'
import YouTubeSmall from '~/lib/icons/socialmedia/YouTubeSmall'

export default function ContactsMobileView({ online_user, contacts }) {

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
    <div className="font-poppins flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 py-5 border-b border-modern-white border-opacity-10 space-y-5 md:space-y-0">
        <div className="flex flex-col">
          <h1>My Contacts</h1>
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
          <span className="font-light text-xs text-center text-gray-400">Create your first contact. Discover the world of cozy.</span>
        </div>
      </div>
      <Scrollbar>
        {/* it will display if you search the name of the contact on the list */}
        <div className="grid grid-rows md:grid-cols-3 grid-flow-row gap-x-4 gap-y-16 w-full max-w-full h-full overflow-y-auto pt-16 pb-5 px-5">
          {/* it will display if you search the name of the contact on the list */}
          {setIsOpen && (
            <>
              {results.map(contact => (
                <div className={`${isOpen ? 'flex' : 'hidden'} flex-col w-full max-w-full md:max-w-md h-full rounded-3xl px-5 py-5 space-y-5 bg-modern-dim`} key={contact[12]}>
                  <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-row justify-end">
                      <AddFavorite
                        online_user={online_user}
                        id={contact[0]}
                        favorite={contact[11]}
                      />
                    </div>
                    <div className="flex justify-center -mt-16 ml-5">
                      <img className="w-24 h-24 object-cover rounded-full" src={contact[1]} />
                    </div>
                    <div className="flex flex-row items-end justify-start space-x-1">
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
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <div className="flex flex-row items-center justify-center w-full mb-1 space-x-2">
                      <Link href={contact[6]}>
                        <a className={`${!contact[6] ? 'hidden' : 'block'}`} target="_blank">
                          <FacebookSmall />
                        </a>
                      </Link>
                      <Link href={contact[8]}>
                        <a className={`${!contact[8] ? 'hidden' : 'block'}`} target="_blank">
                          <TwitterSmall />
                        </a>
                      </Link>
                      <Link href={contact[7]}>
                        <a className={`${!contact[7] ? 'hidden' : 'block'}`} target="_blank">
                          <InstagramSmall />
                        </a>
                      </Link>
                      <Link href={contact[9]}>
                        <a className={`${!contact[9] ? 'hidden' : 'block'}`} target="_blank">
                          <TikTokSmall />
                        </a>
                      </Link>
                      <Link href={contact[10]}>
                        <a className={`${!contact[10] ? 'hidden' : 'block'}`} target="_blank">
                          <YouTubeSmall />
                        </a>
                      </Link>
                    </div>
                    <span className="text-lg md:text-lg">{contact[2]}</span>
                    <span className="text-xs md:text-base text-gray-400">{contact[3]}</span>
                    <span className="text-xs md:text-sm text-gray-400 mt-1">{contact[4]}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 mt-1">{contact[5]}</span>
                  </div>
                </div>
              ))}
            </>
          )}
          {/* it will display the list of your contacts getting from the database and it will disappear if you search the name of the contact */}
          {contacts.map(({ id, profile, name, phone, email, address, facebook, twitter, instagram, tiktok, youtube, favorite }, i) => (
            <div className={`${!isOpen ? 'flex' : 'hidden'} flex-col w-full max-w-full md:max-w-md h-full rounded-3xl px-5 py-5 space-y-5 bg-modern-dim`} key={i}>
              <div className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row justify-end">
                  <AddFavorite
                    online_user={online_user}
                    id={id}
                    favorite={favorite}
                  />
                </div>
                <div className="flex justify-center -mt-16 ml-5">
                  <img className="w-24 h-24 object-cover rounded-full" src={profile} />
                </div>
                <div className="flex flex-row items-end justify-start space-x-1">
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
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center justify-center w-full mb-1 space-x-2">
                  <Link href={facebook}>
                    <a className={`${!facebook ? 'hidden' : 'block'}`} target="_blank">
                      <FacebookSmall />
                    </a>
                  </Link>
                  <Link href={twitter}>
                    <a className={`${!twitter ? 'hidden' : 'block'}`} target="_blank">
                      <TwitterSmall />
                    </a>
                  </Link>
                  <Link href={instagram}>
                    <a className={`${!instagram ? 'hidden' : 'block'}`} target="_blank">
                      <InstagramSmall />
                    </a>
                  </Link>
                  <Link href={tiktok}>
                    <a className={`${!tiktok ? 'hidden' : 'block'}`} target="_blank">
                      <TikTokSmall />
                    </a>
                  </Link>
                  <Link href={youtube}>
                    <a className={`${!youtube ? 'hidden' : 'block'}`} target="_blank">
                      <YouTubeSmall />
                    </a>
                  </Link>
                </div>
                <span className="text-lg md:text-lg">{name}</span>
                <span className="text-xs md:text-base text-gray-400">{phone}</span>
                <span className="text-xs md:text-sm text-gray-400 mt-1">{email}</span>
                <span className="text-[10px] md:text-xs text-gray-400 mt-1">{address}</span>
              </div>
            </div>
          ))}
        </div>
      </Scrollbar>
      <CreateNew
        online_user={online_user}
        contacts={contacts}
      />
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
      <button onClick={addFavorite} className={`${isFav === false ? 'block' : 'hidden'} text-red-600 transition ease-in-out duration-300 hover:scale-95 focus:outline-none`}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
      <button onClick={removeFavorite} className={`${isFav === true ? 'block' : 'hidden'} text-red-600 transition ease-in-out duration-300 hover:scale-95 focus:outline-none`}>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
        </svg>
      </button>
    </>
  )
}