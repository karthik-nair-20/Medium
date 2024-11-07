import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from "hono";

interface newPost {
  title: string,
  body: string,
  published: boolean,
  tag: string
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
      },
      include: {
        tag: true,
        author: true
      }
    })
    if (!response) {
      return c.body(`404 Not Found`, 404);
    }
    return c.json({
      msg: "Post successfully Created",
      post: {
        id: response.id,
        title: response.title,
        body: response.body,
        tag: response.tag.map((temp) => temp.tag),
        createdAt: response.createdAt,
      }
    })
  } catch (error) {
    return c.body(`Internal server Karthik: ${error}`, 500);
  }
}

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
