import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Buffer } from 'buffer';
import { Context } from "hono";

interface newPost {
  title: string,
  body: string,
  published: boolean,
  tag: string,
  imageId: number,
}

export async function getPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const response = await prisma.posts.findMany({
      include: {
        author: true,
        tag: true,
      }
    });
    if (!response) {
      return c.body(`404 Not Found`, 404);
    }
    return c.json({
      posts: response.map((draft) => ({
        id: draft.id,
        authorId: draft.authorId,
        title: draft.title,
        body: draft.body,
        author: draft.author.username,
        tag: draft.tag,
        // images: draft.image.map((img) => ({
        //   id: img.id,
        //   name: img.name,
        //   data: `data:image/jpeg;base64,${img.data.toString('base64')}`,
        // })),
        createdAt: draft.createdAt
      }))
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function getUserPosts(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userid = await c.get('userId');
    const response = await prisma.posts.findMany({
      where: {
        authorId: userid
      }
    });
    if (!response) {
      return c.body(`404 Not Found`, 404);
    }
    return c.json({
      posts: response
    })
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function createPost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const userid = await c.get('userId');
    const parsedUserId = Number(userid)
    const body: newPost = await c.req.json();
    const tagNames = body.tag.split(',').map((temp) => temp.trim());
    const response = await prisma.posts.create({
      data: {
        title: body.title,
        body: body.body,
        authorId: parsedUserId,
        tag: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        },
        image: {
          connect: { id: body.imageId }
        }
      },
      include: {
        tag: true,
        author: true,
        image: true,
      }
    })
    if (!response) {
      return c.body(`404 Not Found ${response}`, 404);
    }
    return c.json({
      msg: "Post successfully Created",
      post: {
        id: response.id,
        title: response.title,
        body: response.body,
        tag: response.tag.map((temp) => temp.tag),
        image: response.image,
        createdAt: response.createdAt,
      }
    })
  } catch (error) {
    return c.body(`Internal server Karthik: ${error}`, 500);
  }
}

//here i need to give author name and other details as well, kirat used select method.
export async function getPost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = Number(c.req.param('id'));
    const isPostExist = await prisma.posts.findUnique({
      where: {
        id,
        authorId: await c.get("userId"),
      },
      include: {
        tag: true,
      },
    });
    if(isPostExist == null) {
      return c.body('Post does not exists', 404);
    }
    return c.json({
      msg: "Available Posts",
      data: {
        id: isPostExist.id,
        title: isPostExist.title,
        body: isPostExist.body,
        tag: isPostExist.tag,
        createdAt: isPostExist.createdAt,
      }
    });
  } catch(error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function getPostById(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = Number(c.req.param('id'));
    const post = await prisma.posts.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        title: true,
        body: true,
        published: true,
        author: {
          select: {
            username: true
          }
        }
      }
    })
    return c.json({
      msg: "Available Posts",
      data: post
    })
  } catch(error) {
    return c.body(`Internal server eror: ${error}`, 500);
  }
}

export async function updatePost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = Number(c.req.param('id'));
    const body: newPost = await c.req.json();
    const tagNames = body.tag.split(',').map((temp) => temp.trim());
    const isPostExist = await prisma.posts.findFirst({
      where: {
        id,
        authorId: await c.get("userId"),
      },
      include: {
        tag: true,
      },
    });
    if(isPostExist == null) {
      return c.body('Post does not exists', 404);
    }
    const res = await prisma.posts.update({
      where: {
        id,
        authorId: await c.get("userId"),
      },
      data: {
        title: body.title,
        body: body.body,
        published: body.published,
        tag: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tag },
            create: { tag },
          })),
        }
      },
      include: {
        tag: true
      }
    });
    return c.json({
      msg: "Posts Available",
      data: {
        id: res.id,
        title: res.title,
        body: res.body,
        tag: res.tag,
        createdAt: res.createdAt,
      }
    });
  } catch(error) {
    return c.body(`Internal server eror: ${error}`, 500);
  }
}

export async function deletePost(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = Number(c.req.param('id'));
    const isPostExist = await prisma.posts.findFirst({
      where: {
        id,
        authorId: c.get("userId"),
      },
      include: {
        tag: true,
      },
    });
    if(isPostExist == null) {
      return c.body('Post does not exists', 404);
    }
    const res = await prisma.posts.delete({
      where: {
        id: id,
        authorId: c.get('userId'),
      },
    });
    return c.json({
      message: 'post deleted successfully',
    });
  } catch(error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function uploadImage(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const data = await c.req.parseBody();
    const userid = await c.get('userId');
    const parsedUserId = Number(userid)
    const file = data["file1"];
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const fileName = `img-${Date.now()}.jpg`;
      const res = await prisma.images.create({
        data: {
          name: fileName,
          postId: parsedUserId,
          data: Buffer.from(buffer),
        }
      })
      return c.json({ message: "Image uploaded", id: { imageId: res.id } });
    }
    return c.body("Invalid file", 400); 
  } catch(error) {
    console.error("Error saving image:", error);
    return c.body(`Internal server error: ${error}`, 500);
  }

}

export async function getImage(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id  = Number(c.req.param("id"));
    const image = await prisma.images.findFirst({
      where: { id },
    });

    if (!image) {
      return c.body("Image not found", 404);
    }
    const buffer = image.data;
    return c.body(buffer, 200, { 
      "Content-Type": "image/jpeg",
    });
  } catch (error) {
    console.error("Error retrieving image:", error);
    return c.body("Internal server error", 500);
  }
}
