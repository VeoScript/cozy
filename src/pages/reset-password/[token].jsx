import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Guard from '~/layouts/guard'
import toast, { Toaster } from 'react-hot-toast'
import withSession from '~/lib/Session'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import jwt from 'jwt-simple'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ResetPassword({ token }) {

  const router = useRouter()

  const { data: all_users } = useSWR('/api/auth/users', fetcher, {
    refreshInterval: 1000
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const secret = process.env.JWT_SECRET
  const decode = jwt.decode(token, secret)
  
  async function resetPassword(formData) {
    const checkUser = all_users.find(user => user.id === decode.userId)
    const password = formData.password
    const newpassword = formData.repassword
    const id = decode.userId
    const username = checkUser.username

    if (password !== newpassword) {
      toast.error('The password did not match, try again.', {
        style: {
          borderRadius: '10px',
          background: '#222222',
          color: '#fff',
        }
      })
      return
    }

    await fetch('/api/auth/reset_password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        username,
        newpassword
      })
    })

    toast.success('Your password is successfully changed.', {
      style: {
        borderRadius: '10px',
        background: '#222222',
        color: '#fff',
      }
    })

    reset()
    router.push('/login')
  }
  
  return (
    <React.Fragment>
      <Head>
        <title>Cozy | Reset Password</title>
      </Head>
      <Guard>
        <Toaster
          position="top-left"
          reverseOrder={true}
        />
        <div className="flex flex-col items-center w-full max-w-[2400px] h-screen bg-[#222]">
          <div className="flex flex-col items-center justify-center px-3 w-full h-full bg-honey">
            <div className="flex flex-col items-center w-full">
              <h1 className="font-bold text-5xl">COZY</h1>
              <h3 className="font-normal text-base text-modern-black text-opacity-80">Your online address book for the future.</h3>
            </div>
            <div className="flex flex-col items-center w-full mt-5 space-y-3">
              <div className="flex">
                <span className="font-bold text-lg text-modern-dim">Reset your password</span>
              </div>
              <form onSubmit={handleSubmit(resetPassword)} className="flex flex-col w-full max-w-sm space-y-1">
                <div className="flex items-center w-full px-3 rounded-lg text-modern-white bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                  <input type="password" name="password" placeholder="Password" {...register("password", { required: true })} className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                  {errors.password && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                </div>
                <div className="flex items-center w-full px-3 rounded-lg text-modern-white bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <input type="password" name="repassword" placeholder="Re-enter Password" {...register("repassword", { required: true })} className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting} />
                  {errors.repassword && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                </div>
                <div className="flex flex-col items-center justify-end w-full space-y-1">
                  {!isSubmitting && (
                    <button type="submit" className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                      Reset
                    </button>
                  )}
                  {isSubmitting && (
                    <div className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg bg-[#1F1F1F] text-modern-white opacity-50 cursor-default">
                      Wait...
                    </div>
                  )}
                  <Link href="/login">
                    <a className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 border border-[#1F1F1F] bg-honey text-modern-black">Back to Login</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Guard>
    </React.Fragment>
  )
}

export const getServerSideProps = withSession(async function ({ req, query }) {

  const { token } = query

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

  return {
    props: {
      token
    }
  }
})