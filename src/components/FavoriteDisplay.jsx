import Link from 'next/link'
import FacebookSmall from '~/lib/icons/socialmedia/FacebookSmall'
import InstagramSmall from '~/lib/icons/socialmedia/InstagramSmall'
import TwitterSmall from '~/lib/icons/socialmedia/TwitterSmall'
import TikTokSmall from '~/lib/icons/socialmedia/TikTokSmall'
import YouTubeSmall from '~/lib/icons/socialmedia/YouTubeSmall'

export default function FavoriteDisplay() {
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
      <div className="grid grid-rows md:grid-cols-3 grid-flow-row gap-x-4 gap-y-16 w-full max-w-full h-full overflow-y-auto py-16 px-5 mb-3">
        <div className="flex flex-col w-full max-w-full md:max-w-md h-full max-h-[13rem] rounded-3xl px-5 py-5 space-y-5 bg-modern-dim">
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex justify-center w-full -mt-16 ml-10">
              <img className="w-24 h-24 object-cover rounded-full" src="https://64.media.tumblr.com/777b82fbdc6768d1b2e5f02957ff9e51/acfd59a2153ef06e-4f/s1280x1920/46e004f9c43a907c532da035b6831f3797373b4d.jpg" />
            </div>
            <div className="flex flex-row justify-end">
              <button className="text-red-600 transition ease-in-out duration-300 hover:scale-95 focus:outline-none">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <span className="text-lg">Jennie Kim</span>
            <span className="text-xs text-gray-400">09759863533</span>
            <span className="text-xs text-gray-400 mt-1">jenniekim@gmail.com</span>
            <div className="flex flex-row items-center justify-center w-full mt-3 space-x-2">
              <Link href="/">
                <a target="_blank">
                  <FacebookSmall />
                </a>
              </Link>
              <Link href="/">
                <a target="_blank">
                  <TwitterSmall />
                </a>
              </Link>
              <Link href="/">
                <a target="_blank">
                  <InstagramSmall />
                </a>
              </Link>
              <Link href="/">
                <a target="_blank">
                  <TikTokSmall />
                </a>
              </Link>
              <Link href="/">
                <a target="_blank">
                  <YouTubeSmall />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}