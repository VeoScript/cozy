export default function ContactDisplay() {
  return (
    <div className="font-poppins flex flex-col w-full">
      <div className="flex flex-row items-center justify-between w-full px-10 py-8 border-b border-modern-white border-opacity-10">
        <div className="searchinput flex flex-row items-center w-full max-w-[16rem] border-b border-gray-500 text-gray-500 py-3 space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input className="w-full bg-modern-black font-light text-sm text-gray-300 focus:outline-none" type="text" name="search" placeholder="Search" />
        </div>
        <button className="flex items-center justify-center w-full max-w-[8rem] px-2 py-3 text-xs rounded-lg transition ease-in-out duration-200 transform hover:scale-95 space-x-1 bg-honey text-modern-black">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>New Contact</span>
        </button>
      </div>
      <div className="contact-list flex flex-col items-center w-full h-full overflow-y-auto">
        <div className="flex flex-row items-center justify-between w-full text-gray-400 px-5 py-5 space-x-10">
          <span className="w-full max-w-[40px] text-xs">Profile</span>
          <span className="w-full max-w-sm text-xs">Name</span>
          <span className="w-full max-w-xs text-xs">Phone</span>
          <span className="w-full max-w-xs text-xs">Actions</span>
        </div>
        <div className="flex flex-row items-center justify-between w-full px-5 py-5 space-x-10 bg-modern-dim">
          <img src="https://64.media.tumblr.com/777b82fbdc6768d1b2e5f02957ff9e51/acfd59a2153ef06e-4f/s1280x1920/46e004f9c43a907c532da035b6831f3797373b4d.jpg" className="w-full max-w-[40px] h-10 object-cover rounded-full" />
          <span className="w-full max-w-sm text-xs">Jennie Kim</span>
          <span className="w-full max-w-sm text-xs">09759863533</span>
          <span className="flex items-center w-full max-w-sm text-xs space-x-3">
            <button className="transition ease-in-out duration-200 hover:scale-95">
              <svg className="w-6 h-6 text-modern-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path>
              </svg>
            </button>
            <button className="transition ease-in-out duration-200 hover:scale-95">
              <svg className="w-6 h-6 text-honey" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button className="transition ease-in-out duration-200 hover:scale-95">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}