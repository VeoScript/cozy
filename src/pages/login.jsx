import Head from 'next/head'
import Link from 'next/link'
import Guard from '~/layouts/guard'

export default function Login() {
  return (
    <>
      <Head>
        <title>Cozy | Login</title>
      </Head>
      <Guard>
        <div className="flex flex-row items-center justify-center w-full max-w-screen-2xl h-full overflow-y-auto">
          <div className="relative flex flex-col items-center justify-center w-full h-full space-y-10 bg-honey">
            <div className="flex flex-col w-full max-w-xl">
              <h1 className="font-bold text-7xl">COZY</h1>
              <h3 className="font-normal text-4xl text-modern-black text-opacity-80">Your online address book for the future.</h3>
            </div>
            <div className="flex w-full max-w-xl">
              <Link href="/signup">
                <a className="flex justify-center w-full max-w-[10rem] px-3 py-5 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-modern-black text-modern-white">Create Account</a>
              </Link>
            </div>
            <div className="absolute w-full max-w-xl bottom-3 space-x-3">
              <div className="flex flex-row items-center justify-between w-full">
                <Link href="/login">
                  <a className="font-normal text-xs hover:underline">Privacy Policy</a>
                </Link>
                <span className="font-poppins text-xs opacity-80">&copy; Cozy { new Date().getFullYear() }, Veoscript</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full max-w-xl space-y-5 bg-modern-black text-modern-white">
            <div className="flex flex-col w-full max-w-md space-y-3">
              <h1 className="font-poppins text-xl text-modern-white">It was used by over 25 Million people around the globe.</h1>
              <h1 className="font-poppins text-sm text-modern-white text-opacity-60">If ever you decided to delete your contacts on your phone, don't forget to backup all of your contacts here. You might remember to use them for the future.</h1>
            </div>
            <div className="flex flex-col w-full max-w-md">
              <form className="flex flex-col w-full space-y-3">
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                  </svg>
                  <input type="text" name="username" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                  <input type="password" name="password" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none" />
                </div>
                <div className="flex flex-row items-center justify-end w-full">
                  <button type="submit" className="flex justify-center w-full max-w-[10rem] px-3 py-3 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-[#1F1F1F] text-modern-white">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Guard>
    </>
  )
}