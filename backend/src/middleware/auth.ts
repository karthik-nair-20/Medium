import { Context, Next } from "hono";
import { verify } from 'hono/jwt'


export async function authmiddleware(c: Context, next: Next) {
  try {
    const authToken = c.req.header("Authorization") || "";
    const token: string = authToken?.split(" ")[1];
    if(token !== null || token !== undefined) {
      const decode = await verify(token, c.env.JWT_TOKEN);
      if(decode) {
        c.set("userId",decode.id);
        await next();
      }
      else {
        return c.text("your are not authorized user", 401)
      }
    } else {
      return c.text("token Invalid or doesnot exist", 401)
    }
  } catch(error) {
    return c.body(`Internal server error: ${error}`, 500);
  }
}