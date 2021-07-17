import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export default function JoinRoomPublic({ online_user, id, status, joined_rooms }) {
  
  const checkJoin = joined_rooms.some(joined => joined.indicator === true)
  const checkJoinedUser = joined_rooms.find(joinedUser => joinedUser.userId === online_user.id)

  const userId = online_user.id
  const joinedId = checkJoinedUser
  console.log(userId, joinedId)
  
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
  <button
      className={`${status === "Public" ? 'block' : 'hidden'} py-1 w-full max-w-[5rem] rounded-sm font-normal text-[10px] md:text-sm text-modern-black bg-honey transition ease-in-out duration-200 hover:scale-95 focus:outline-none`}
      type="button"
      onClick={handleSubmit(onJoin)}
    >
      {checkJoin === true ? <span>Joined</span> : <span>Join</span> || userId === joinedId ? <span>Joined</span> : <span>Join</span>}
    </button>
  )
}