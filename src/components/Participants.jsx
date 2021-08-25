import { useRouter } from 'next/router'
import Scrollbar from 'react-smooth-scrollbar'

export default function Participants({ participants }) {

  const router = useRouter()

  return (
    <div className={`${router.pathname !== '/messages' ? 'hidden md:flex' : 'flex'} flex-col w-full max-w-xs h-full overflow-y-auto bg-modern-dim border-l border-modern-white border-opacity-10`}>
      <Scrollbar>
        <div className="flex w-full font-normal text-sm text-modern-white py-5 px-8">
          Room Participants
        </div>
        {participants.room.joined_rooms.map(({ user }, i) => (
          <div className="flex flex-col w-full px-3 pb-3" key={i}>
            <button type="button" className="flex flex-row items-center w-full px-3 py-2 rounded-xl space-x-3 transition-all duration-300 border-b border-[#333] hover:bg-modern-black">
              <img className="w-12 h-12 rounded-full object-cover bg-modern-black" src={ user.avatar } alt="participant_avatar" />
              <div className="flex flex-col items-start">
                <span className="font-normal text-[12px] text-modern-white">{ user.name }</span>
                <span className="font-normal text-[10px] text-gray-400">{ user.email }</span>
              </div>
            </button>
          </div>
        ))}
      </Scrollbar>
    </div>
  )
}