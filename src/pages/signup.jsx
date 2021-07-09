import Head from 'next/head'
import Link from 'next/link'
import Guard from '~/layouts/guard'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Cozy | Sign Up</title>
      </Head>
      <Guard>
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-center w-full max-w-screen-2xl h-screen overflow-y-auto md:overflow-hidden bg-[#222]">
          <div className="relative flex flex-col items-center justify-center w-full h-[30rem] md:h-full px-5 pt-5 pb-12 md:pt-0 md:pb-0 space-y-10 bg-honey">
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-xl">
              <h1 className="font-bold text-5xl md:text-7xl">COZY</h1>
              <h3 className="font-normal text-base md:text-4xl text-modern-black text-opacity-80">Your online address book for the future.</h3>
            </div>
            <div className="absolute hidden md:block w-full max-w-xl px-3 bottom-3 space-x-3">
              <div className="flex flex-row items-center justify-between w-full">
                <Link href="/login">
                  <a className="font-normal text-xs hover:underline">Privacy Policy</a>
                </Link>
                <span className="font-poppins text-xs opacity-80">&copy; Cozy { new Date().getFullYear() }, Veoscript</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start md:justify-center w-full max-w-[22rem] md:max-w-xl h-[40rem] md:h-full rounded-xl md:rounded-none z-50 -mt-8 md:mt-0 mb-5 md:mb-0 px-5 py-5 md:py-0 space-y-5 bg-modern-black text-modern-white">
            <div className="flex flex-col w-full max-w-md space-y-3">
              <h1 className="font-poppins text-sm md:text-xl text-modern-white ml-3">Create Account</h1>
            </div>
            <div className="flex flex-col w-full max-w-md">
              <form className="flex flex-col w-full space-y-3">
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                  </svg>
                  <input type="text" name="username" placeholder="Profile URL" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <input type="text" name="username" placeholder="Name" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                  </svg>
                  <input type="text" name="username" placeholder="Username" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                  <input type="password" name="password" placeholder="Password" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <input type="password" name="password" placeholder="Re-enter Password" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex flex-col items-center justify-end w-full space-y-3">
                  <button type="submit" className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-[#1F1F1F] text-modern-white">Sign Up</button>
                  <Link href="/login">
                    <a className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-honey text-modern-black">Back to Login</a>
                  </Link>
                </div>
              </form>
            </div>
            <div className="md:hidden flex flex-row items-center justify-between w-full">
              <Link href="/login">
                <a className="font-normal text-xs hover:underline">Privacy Policy</a>
              </Link>
              <span className="font-poppins text-xs opacity-80">&copy; Cozy { new Date().getFullYear() }, Veoscript</span>
            </div>
          </div>
        </div>
      </Guard>
    </>
  )
}