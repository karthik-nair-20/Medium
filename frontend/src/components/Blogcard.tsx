import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string,
  authorName: string,
  title: string,
  content: string,
  publishedDate: string
}

export function Blogcard({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border-b border-gray-200">
      <div className="flex items-center mb-4 text-gray-500 text-sm">
        <div className="flex-shrink-0">
          <Avatar />
        </div>
        <div className="ml-3">
          <span className="font-medium">{authorName}</span>
          <span className="mx-1">·</span>
          <span>{publishedDate}</span>
        </div>
      </div>
      <Link to={`/blog/${id}`}>
        <h3 className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer">
          {title}
        </h3>
      </Link>
      <p className="text-gray-700 mt-2 text-sm leading-relaxed">
        {content.slice(0, 100) + "..."}
      </p>
      <div className="text-gray-400 text-xs mt-3">
        {`${Math.ceil(content.length / 100)} min read`}
      </div>
    </div>
  )
}

export function Avatar() {
  return (
    <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
    </div>
  )
}