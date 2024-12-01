import { Link, useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import { Loading } from "../components/Loading";

export default function BlogDetail() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || null });

  if (loading) {
    return <Loading />
  }

  if (!blog) {
    return <div className="flex justify-center">Blog not found.</div>;
  }
  const { title, body, author } = blog.data;
  console.log(blog)
  return (
    <div className="h-screen flex justify-center bg-gray-50 text-gray-900">
      <Link to="/blogs" className="py-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </Link>
      <div className="grid grid-cols-12 px-6 lg:px-10 w-full max-w-screen-xl py-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <div className="lg:text-3xl font-bold leading-tight text-gray-800">
            {title}
          </div>
          <div className="text-gray-500 lg:text-base mt-4">
            Posted on 2nd December 2023
          </div>
          <div className="text-lg lg:text-lg leading-relaxed text-gray-700 mt-8">
            {body}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">
            Author
          </div>
          <div className="flex items-center mt-6 space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0">
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800">
                {author.username || "Anonymous"}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Random catchphrase about the author's expertise or personality.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}