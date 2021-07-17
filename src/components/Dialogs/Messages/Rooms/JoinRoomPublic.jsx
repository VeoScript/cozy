import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export default function JoinRoomPublic({ online_user, id, status, joined_rooms }) {
  
  // check if the user are already joined in this room
  const checkJoin = joined_rooms.some(joined => joined.indicator === true)
  const checkJoinedUser = joined_rooms.some(joined => joined.userId === online_user.id)
  
  const router = useRouter()

  const { handleSubmit } = useForm()

  async function onJoin() {
    const userId = online_user.id
    const roomId = id

    console.log('userID: ' + userId, 'roomID: ' + roomId)

    await fetch('/api/messages/room/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        roomId
      })
    })
    router.replace(router.asPath)
  }

  return (
    <div className={`${status === "Public" ? 'block' : 'hidden'} w-full max-w-[5rem]`}>
      <button
        className={`${checkJoin === true && checkJoinedUser === true ? 'hidden' : 'block'} py-1 w-full rounded-sm font-normal text-[10px] md:text-sm text-modern-black bg-honey transition ease-in-out duration-200 hover:scale-95 focus:outline-none`}
        type="button"
        onClick={handleSubmit(onJoin)}
      >
        Join
      </button>
      <div
        className={`${checkJoin === true && checkJoinedUser === true ? 'block' : 'hidden'} py-1 w-full text-center rounded-sm font-normal text-[10px] md:text-sm text-modern-white bg-[#333]`}
      >
        Joined
      </div>
    </div>
  )
}