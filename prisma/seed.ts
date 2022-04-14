import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: false,
          comentarios:{
            create:[
              {
                comentario: 'Very Good Prisma'
              },
              {
                comentario: 'Excellent Post'
              }
            ]
          }
        },
        {
          title: 'Prueba 2',
          content: 'http://www.github.com',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          comentarios:{
            create:[
              {
                comentario: 'I couldnt find your twitter'
              },
              {
                comentario: 'I follow Prisma Twitter'
              }
            ]
          }
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: false
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
          published: true,
          comentarios:{
            create:[
              {
                comentario: 'I suscribe on your Youtube Channel!'
              }
            ]
          }
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
