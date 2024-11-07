import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from 'hono';
import { signupschema, signinSchema } from '../zod/user';
import { decode, sign, verify } from 'hono/jwt'
import { string } from 'zod';

interface signup {
  username: string,
  email: string
  password: string,
}

// type signin =
//   | { email: string; password: string }
//   | { username: string; password: string };
interface signin {
  email: string
  password: string,
}


enum statusCode {
  BADREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSIOON = 403,
}

export async function signup(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body: signup = await c.req.json();

    const parsedUser = signupschema.safeParse(body);

    if (!parsedUser.success) {
      return c.body('Invalid user input', statusCode.BADREQ);
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (isUserExist) {
      return c.body('email already exist', statusCode.BADREQ);
    }

    const res = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });

    const userId: any = res.id;

    const token = await sign({id: userId}, c.env.JWT_TOKEN);

    return c.json({
      msg: 'User created successfully',
      token: token,
      user: {
        userId: res.id,
        username: res.username,
        email: res.email,
      },
    });
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}

export async function signin(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body: signin = await c.req.json();
    const parsedUser = signinSchema.safeParse(body);
    if (!parsedUser.success) {
      return c.body("Invalid user inputs", statusCode.BADREQ)
    }
    const isUserExist = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    })
    if (isUserExist) {
      const userId: any = isUserExist.id;
      const token = await sign({ id: userId }, c.env.JWT_TOKEN);
      return c.json({
        msg: "User Signed in successfully",
        token,
        user: {
          userId: isUserExist.id,
          username: isUserExist.username,
          email: isUserExist.email
        }
      });
    }
  } catch (error) {
    return c.body(`Internal server error: ${error}`, 500);
  }

}

export async function hello(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('Hello angel!')
}