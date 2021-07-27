import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AutoScroll from '@brianmcallister/react-auto-scroll'
import Menu from './Dialogs/Messages/Rooms/Menu'
import ParticipantsMenu from './Dialogs/Messages/Rooms/ParticipantsMenu'
import LeaveRoom from './Dialogs/Messages/Settings/LeaveRoom'
import RoomSettings from './Dialogs/Messages/Settings/RoomSettings'
import { mutate } from 'swr'

export default function ChatRoom({ online_user, data, messages, roominfo, rooms, user_joined_rooms, participants }) {

  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const defaultValues = {
    message_box: ''
  }

  const { register, handleSubmit, reset, setValue, setError, formState: { errors, isSubmitting } } = useForm({ defaultValues })

  useEffect(() => {
    register('message_box', { required: true })
  }, [register])

  async function sendMessage(formData) {
    const userId = online_user.id
    const roomName = roominfo.roomName
    const message_box = formData.message_box

    if (message_box === '') {
      setError('message_box')
      return
    }

    await fetch('/api/messages/message/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        roomName,
        message_box
      })
    })
    mutate(`/api/messages/message/get_messages/${ roomName }`)
    reset()
    chatbox.innerText = ''
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row items-center justify-between w-full px-5 py-3 border-b border-modern-white border-opacity-10">
        <div className="flex flex-row items-center space-x-3">
          <img className="w-12 h-12 rounded-full object-cover bg-modern-dim" src={ roominfo.room.image } alt="room_avatar" />
          <div className="flex flex-col">
            <span className="font-normal text-sm">{ roominfo.roomName }</span>
            <span className="font-normal text-[10px] text-gray-400">Created by { roominfo.room.author.name }</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="md:hidden block text-gray-400 transition ease-in-out duration-200 hover:scale-90"
            type="button"
            onClick={() => { setDashboardOpen(true) }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
            </svg>
          </button>
          <button
            className="text-gray-400 transition ease-in-out duration-200 hover:scale-90"
            type="button"
            onClick={() => { setMenuOpen(true) }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
          </button>
          {setDashboardOpen && (
              <>
                <button onClick={() => { setDashboardOpen(false) }} type="button" className={`${dashboardOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
                <div className={`z-20 w-full ${dashboardOpen ? 'fixed' : 'hidden'}`}>
                  <div className="md:hidden fixed right-[2rem] md:right-[22rem] top-10 mr-3 w-full max-w-[10rem] h-auto overflow-hidden mt-2 rounded-md shadow-xl border border-modern-white border-opacity-10 bg-modern-black text-white z-10">
                    <div className="flex flex-row w-full h-auto max-h-[15rem] overflow-y-auto bg-opacity-75">
                      <div className="flex flex-col w-full">
                        <Menu
                          online_user={online_user}
                          rooms={rooms}
                          user_joined_rooms={user_joined_rooms}
                          setDashboardOpen={setDashboardOpen}
                        />
                        <hr className="w-full border-t border-modern-dim" />
                        <ParticipantsMenu
                          participants={participants}
                          setDashboardOpen={setDashboardOpen}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          {/* chat menu open dropdown */}
          {setMenuOpen && (
            <>
              <button onClick={() => { setMenuOpen(false) }} type="button" className={`${menuOpen ? 'z-20 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}></button>
              <div className={`z-20 w-full ${menuOpen ? 'fixed' : 'hidden'}`}>
                <div className="fixed right-0 md:right-[20rem] top-10 mr-3 w-full max-w-[10rem] h-auto overflow-hidden mt-2 rounded-md shadow-xl border border-modern-white border-opacity-10 bg-modern-black text-white z-10">
                  <div className="flex flex-row w-full h-auto max-h-[15rem] overflow-y-auto bg-opacity-75">
                    <div className="flex flex-col w-full">
                      <RoomSettings
                        online_user={online_user}
                        roominfo={roominfo}
                        setMenuOpen={setMenuOpen}
                      />
                      <hr className="w-full border-t border-modern-dim" />
                      <button type="button" className="flex items-center w-full text-xs text-gray-400 px-3 py-3 transition ease-in-out duration-300 hover:text-honey space-x-2 focus:outline-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span>Report</span>
                      </button>
                      <hr className="w-full border-t border-modern-dim" />
                      <LeaveRoom
                        online_user={online_user}
                        roominfo={roominfo}
                        setMenuOpen={setMenuOpen}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <AutoScroll showOption={false} className="relative flex flex-col justify-end w-full h-full pb-1 overflow-y-auto">
        <div className={`${ !data ? 'flex' : 'hidden'} absolute top-0 justify-center w-full py-1 font-bold text-xs text-modern-dim bg-honey`}>
          Loading...
        </div>
        {data && (
          <>
            {data.map(({ user, userId, message }, i) => (
              <>
                <div className={`${ userId === online_user.id ? 'hidden' : 'flex' } flex-row justify-start w-full px-3 py-1`} key={i}>
                  <div className="flex items-center space-x-2 w-full max-w-[17rem]">
                    <img className="w-full max-w-[2rem] h-8 rounded-full object-cover bg-modern-dim" src={ user.avatar } />
                    <div className="flex px-3 py-3 rounded-xl font-normal text-xs text-modern-white bg-modern-dim">
                      { userId === online_user.id ? '' : message }
                    </div>
                  </div>
                </div>
                <div className={`${ userId !== online_user.id ? 'hidden' : 'flex' } flex-row justify-end w-full px-3 py-1`}>
                  <div className="flex justify-end w-full max-w-[17rem]">
                    <div className="flex rounded-xl px-3 py-3 font-normal text-xs text-modern-dim bg-honey">
                      { userId !== online_user.id ? '' : message }
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </AutoScroll>
      {/* message chat forms */}
      <div className="flex flex-row items-end w-full px-3 py-3 pb-20 md:pb-3 border-t border-modern-white border-opacity-10">
        <form onSubmit={handleSubmit(sendMessage)} className="flex flex-row items-center w-full max-w-xl space-x-3">
          <div
            contentEditable
            id="chatbox"
            className="w-full whitespace-pre-wrap text-xs cursor-text focus:outline-none font-light py-2"
            placeholder="Type here..."
            onInput={(e) => setValue('message_box', e.currentTarget.textContent, { shouldValidate: true })}
          />
          {errors.message_box && <span className="flex flex-row justify-end text-[10px] text-honey">Required</span>}
          {isSubmitting
            ?
            <LoadingButton />
            :
            <button type="submit" className="text-modern-white opacity-30 transition ease-in-out duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting}>
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
              </svg>
            </button>
          }
        </form>
      </div>
    </div>
  )
}

function LoadingButton() {
  return (
    <div className="flex">
      <svg width="32px" height="32px" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" color="#FFCE00">
        <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
          <circle cx="22" cy="22" r="6">
            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="6">
            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="8">
            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </div>
  )
}