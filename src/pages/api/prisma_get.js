import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // const rooms = await prisma.rooms.findMany({
    //   select: {
    //     image: true,
    //     name: true,
    //     status: true,
    //     date: true,
    //     passcode: true,
    //     author: {
    //       select: {
    //         name: true
    //       }
    //     },
    //     joined_rooms: {
    //       select: {
    //         indicator: true,
    //         user: {
    //           select: {
    //             name: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })
    // const rooms = await prisma.user.findMany({
    //   select: {
    //     id: true,
    //     username: true,
    //     joined_rooms: {
    //       select: {
    //         id: true,
    //         roomName: true,
    //         userId: true
    //       }
    //     }
    //   }
    // })
    // const rooms = await prisma.joinedRooms.findMany({
    //   where: {
    //     userId: 1
    //   },
    //   select: {
    //     id: true,
    //     userId: true, 
    //     user: true,
    //     roomName:true,
    //     room: {
    //       select: {
    //         image: true,
    //         joined_rooms: {
    //           select: {
    //             id: true,
    //             date: true,
    //             indicator: true,
    //             messages: true,
    //             roomName: true,
    //             userId: true,
    //             user: {
    //               select: {
    //                 id: true,
    //                 name: true,
    //                 avatar: true
    //               }
    //             }
    //           }
    //         },
    //         author: {
    //           select: {
    //             name: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })

    const rooms = await prisma.joinedRooms.findFirst({
      where: {
        userId: 1
      },
      select: {
        id: true,
        userId: true, 
        user: true,
        roomName:true,
        room: {
          select: {
            image: true,
            joined_rooms: {
              select: {
                id: true,
                date: true,
                indicator: true,
                messages: true,
                roomName: true,
                userId: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                    username: true
                  }
                }
              }
            },
            author: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
    res.json(rooms)
  } else {
    res.send("GET METHOD ONLY!")
  }
}