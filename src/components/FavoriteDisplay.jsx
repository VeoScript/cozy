import { useRouter } from 'next/router'
import Link from 'next/link'
import Scrollbar from 'react-smooth-scrollbar'
import FacebookSmall from '~/lib/icons/socialmedia/FacebookSmall'
import InstagramSmall from '~/lib/icons/socialmedia/InstagramSmall'
import TwitterSmall from '~/lib/icons/socialmedia/TwitterSmall'
import TikTokSmall from '~/lib/icons/socialmedia/TikTokSmall'
import YouTubeSmall from '~/lib/icons/socialmedia/YouTubeSmall'

export default function FavoriteDisplay({ online_user, favorite_contacts }) {

  const check = favorite_contacts.map((id) => {
    return {
      id
    }
  })

  return (
    <div className="font-poppins flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 py-5 border-b border-modern-white border-opacity-10 space-y-5 md:space-y-0">
        <div className="flex flex-col">
          <h1>Favorites</h1>
        </div>
        <div className="searchinput flex flex-row items-center w-full max-w-xs border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input className="w-full bg-modern-black font-light text-xs text-gray-300 focus:outline-none" type="text" name="search" placeholder="Search" />
        </div>
      </div>
      <div className={`${check[0] ? 'hidden' : 'flex'} flex-row items-center justify-center w-full h-full`}>
        <h1 className="font-bold text-xl md:text-3xl text-[#333]">No favorite contacts at all.</h1>
      </div>
      <Scrollbar>
        <div className="grid grid-rows md:grid-cols-3 grid-flow-row gap-x-4 gap-y-16 w-full max-w-fll h-full overflow-y-auto pt-16 pb-5 px-5">
          {favorite_contacts.map(({ id, profile, name, phone, email, address, facebook, twitter, instagram, tiktok, youtube }, i) => (
            <div className="flex flex-col w-full max-w-full md:max-w-md h-full rounded-3xl px-5 py-5 space-y-5 bg-modern-dim" key={i}>
              <div className="flex flex-row justify-center items-center w-full">
                <div className="flex justify-center w-full -mt-16 ml-10">
                  <img className="w-24 h-24 object-cover rounded-full" src={profile} />
                </div>
                <div className="flex flex-row justify-end">
                  <AddFavorite
                    online_user={online_user}
                    id={id}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center justify-center w-full mb-3 space-x-2">
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
    </div>
  )
}

function AddFavorite({ online_user, id }) {

  const router = useRouter()

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
    router.replace(router.asPath)
  }
  
  return (
    <>
      <button type="button" onClick={removeFavorite} className="text-red-600 transition ease-in-out duration-300 hover:scale-95 focus:outline-none">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
        </svg>
      </button>
    </>
  )
}