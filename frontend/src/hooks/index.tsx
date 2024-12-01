import { useState, useEffect } from "react"
import axios from "axios";
import Blog from "../pages/Blog";

interface Blog {
  "id": number
  "title": string,
  "body": string,
  "author": {
    "username": string
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog>();

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get('/posts/all-posts');
      setBlogs(response.data)
      setLoading(false);
    }
    fetchData();
  },[])

  return {
    loading,
    blogs
  }
}

export const useBlog = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/all/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching the blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[id])
  return {
    loading,
    blog
  }
}