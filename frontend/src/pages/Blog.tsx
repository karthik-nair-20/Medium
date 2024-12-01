import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks";

export default function Blog() {
  const { loading, blogs } = useBlogs();
  if(loading) {
    return(
    <div className="">
      <Loading />
    </div>
    )
  }
  return (
    <div className="w-full">
      <Appbar />
      {blogs && ( 
      <div className="max-w-xl mx-auto">
        {blogs.posts.map((blog,index) => {
          return (
            <Blogcard
            key={index}
            id={blog.id}
            authorName= {blog.author}
            title={blog.title}
            content={blog.body}
            publishedDate={(blog.createdAt).split("T")[0]}
          />
          )
        })}
      </div>
    )}
    </div>
  )
}