import Head from 'next/head'
import Link from 'next/link'
import Guard from '~/layouts/guard'
import toast, { Toaster } from 'react-hot-toast'
import withSession from '~/lib/Session'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export default function ForgotPassword() {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function forgotPassword(formData) {
    console.log(formData)
  }

  return (
    <>
      <Head>
        <title>Cozy | Forgot Password</title>
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
                <span className="font-bold text-lg text-modern-dim">Recover your account</span>
              </div>
              <form onSubmit={handleSubmit(forgotPassword)} className="flex flex-col w-full max-w-sm space-y-1">
                <div className="flex items-center w-full px-3 rounded-lg text-modern-white bg-[#1F1F1F]">
                  <svg className="w-10 h-10 opacity-40" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd"></path>
                  </svg>
                  <input type="email" name="email" placeholder="Enter your email" className="w-full h-full px-3 py-5 bg-[#1F1F1F] text-honey focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" {...register("email", { required: true })} disabled={isSubmitting} />
                  {errors.email && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
                </div>
                <div className="flex flex-col items-center justify-end w-full space-y-1">
                  {!isSubmitting && (
                    <button type="submit" className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg transition ease-in-out duration-200 transform hover:scale-95 bg-[#1F1F1F] text-modern-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
                      Submit
                    </button>
                  )}
                  {isSubmitting && (
                    <div className="flex justify-center w-full max-w-full md:max-w-full px-3 py-4 rounded-lg bg-[#1F1F1F] text-modern-white opacity-50 cursor-default">
                      Submitting...
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

  return {
    props: {}
  }
})
