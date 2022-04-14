import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


//Insertar comentarios
app.put('/insertComentario/:postID/:comentario', async(req, res)=>{
  const result = req.params;


    const post = await prisma.comentario.create({
  
      data:{
        comentario:result.comentario,
        comentarioId: Number(result.postID),
      }
      

    })
    res.json(post);
})

//Consultar Comentarios

app.get('/comentarios/:id', async(req, res)=>{
  const post = await prisma.post.findMany({
    where:{
      id:Number(req.params.id)
    },
    select:{
      comentarios:{}
    }
  });
  res.json(post);

})

//Modidificado /post/:id (incluir listado de comentarios)
app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include:{comentarios:true},
  })
  res.json(post)
})


//Modificar /feed buscar por comentario
app.get('/feed', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

    //Buscar y muestra solo el comentario(Descomentar si es el caso)

    // const or2: Prisma.ComentarioWhereInput = searchString ? {
    //   OR:[
    //     {comentario: {contains: searchString as string}}
    //   ]
    // }
    // :
    // {}
    // const posts = await prisma.comentario.findMany({
    //   where: {
    //     ...or2,
              
    //   },      
    //   take: Number(take) || undefined,
    //   skip: Number(skip) || undefined,

    // })

    //Buscar y muestra post y comentarios,  en donde se encuentra el comentario buscado (incluido los demas comentarios)
    const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
          {comentarios:{some: {comentario: searchString as string}}}
          
          
        ],
      }
    : {}
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...or,
       
        
      },
      
      include:{author:true, comentarios:true},
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy as Prisma.SortOrder,
      },
    })


  res.json(posts)
})

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
