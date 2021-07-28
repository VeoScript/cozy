import Head from 'next/head'
import Link from 'next/link'
import Guard from '~/layouts/guard'
import toast, { Toaster } from 'react-hot-toast'
import bcrypt from 'bcryptjs'
import withSession from '~/lib/Session'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Login({ all_users }) {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleLogin(formData) {
    const username = formData.username
    const password = formData.password

    const checkUser = all_users.find(user => user.username === username)

    if (!checkUser) {
      toast.error('This account is not registered!', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    const hashPassword = checkUser.password
    const matchPassword = await bcrypt.compare(password, hashPassword)

    if (!matchPassword) {
      toast.error('Incorrect password!', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username })
    })

    reset()
    router.replace('/')
  }

  return (
    <>
      <Head>
        <title>Cozy | Login</title>
      </Head>
      <Guard>
        <Toaster
          position="top-left"
          reverseOrder={true}
        />
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-center w-full max-w-[2400px] h-screen overflow-y-auto md:overflow-hidden bg-[#222]">
          <div className="relative flex flex-col items-center justify-center w-full h-[30rem] md:h-full px-5 pt-5 pb-12 md:pt-0 md:pb-0 space-y-10 bg-honey">
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-xl">
              <h1 className="font-bold text-5xl md:text-7xl">COZY</h1>
              <h3 className="font-normal text-base md:text-4xl text-modern-black text-opacity-80">Your online address book for the future.</h3>
            </div>
            <div className="hidden md:flex w-full max-w-xl">
              <Link href="/signup">
                <a className="flex justify-center w-full max-w-[15rem] px-3 py-5 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-modern-black text-modern-white">Create Account</a>
              </Link>
            </div>
            <div className="absolute hidden md:block w-full max-w-xl px-3 bottom-3 space-x-3">
              <div className="flex flex-row items-center justify-between w-full">
                <Link href="/privacy_policy">
                  <a className="font-normal text-xs hover:underline">Privacy Policy</a>
                </Link>
                <span className="font-poppins text-xs opacity-80">&copy; Cozy { new Date().getFullYear() }, Veoscript</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start md:justify-center w-full max-w-[22rem] md:max-w-xl h-[35rem] md:h-full rounded-xl md:rounded-none z-50 -mt-8 md:mt-0 mb-5 md:mb-0 px-5 py-5 md:py-0 space-y-5 bg-modern-black text-modern-white">
            <div className="flex flex-col w-full max-w-md space-y-3">
              <h1 className="font-poppins text-sm md:text-xl text-modern-white">It was used by over 25 Million people around the globe.</h1>
              <h1 className="font-poppins text-xs md:text-sm text-modern-white text-opacity-60">If ever you decided to delete your contacts on your phone, don't forget to backup all of your contacts here. You might remember to use them for the future.</h1>
            </div>
            <div className="flex flex-col w-full max-w-md">
              <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col w-full space-y-3">
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                  </svg>
                  <input type="text" name="username" placeholder="Username" {...register("username", { required: true })} className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                  {errors.username && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                </div>
                <div className="flex items-center w-full px-3 rounded-lg bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                  <input type="password" name="password" placeholder="Password" {...register("password", { required: true })} className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                  {errors.password && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-end w-full space-y-3">
                  <button type="submit" className="flex justify-center w-full max-w-full md:max-w-[10rem] px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                    Login
                  </button>
                  <Link href="/signup">
                    <a className="md:hidden flex justify-center w-full max-w-full md:max-w-[10rem] px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-honey text-modern-black">Create Account</a>
                  </Link>
                </div>
              </form>
            </div>
            <div className="md:hidden flex flex-row items-center justify-between w-full">
              <Link href="/privacy_policy">
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

export const getServerSideProps = withSession(async function ({ req }) {
  //check the user session
  const user = req.session.get('user')

  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  //find all users from the database
  const all_users = await prisma.user.findMany()

  return {
    props: {
      all_users
    }
  }
})