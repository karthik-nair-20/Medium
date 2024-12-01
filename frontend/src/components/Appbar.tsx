import { Link } from "react-router-dom";
import { Avatar } from "./Blogcard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export function Appbar() {
  const navigate = useNavigate()

  function handleClick() {
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("Please log in to access this page.");
      navigate("/signin")
    }
    else {
      navigate("/publish")
      toast.success('Authorised User')
    }
  }
  return (
    <div className="border-b flex items-center justify-between px-7 h-16">
      <div className="text-lg font-semibold">
        <Link to="/blogs">Medium</Link>
      </div>
      <div className="flex justify-center px-4 gap-6">
        <button onClick={handleClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        </button>
        <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        </p>
        <Avatar />
      </div>
    </div>
  )
}