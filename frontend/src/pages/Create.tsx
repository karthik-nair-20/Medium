import { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { toast } from "sonner";


export default function Publish() {
  const [post, setPost] = useState({
    title: "",
    body: "",
    image: null as File | null,
  });
  const [imageId, setImageId] = useState(null);

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPost({ ...post, image: file });
    }
  }

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  }

  async function publishImage() {
    if (!post.image) {
      alert("Please select an image before submitting!");
      return;
    }
    const formData = new FormData();
    formData.append("file1", post.image);
    formData.append("title", post.title);
    formData.append("body", post.body);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/posts/upload", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      toast.success("Image uploaded successfully");
      console.log(response.data.id.imageId);
      setImageId(response.data.id.imageId);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  }

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/posts/create-post", {
        title: post.title,
        body: post.body,
        imageId: imageId,
        tag: "1,2,3,4",
      }, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      toast.success("Post uploaded successfully")
      console.log(response.data);
    } catch (error) {
      console.error("Error while publishing the post", error);
      toast.error("Error while publishing the post");
    }
    setPost({
      title: "",
      body: "",
      image: null as File | null,
    })
  }


  return (
    <>
      <Appbar />
      <div className="flex flex-col items-center bg-gray-50 min-h-screen text-gray-800">
        <div className="w-full max-w-4xl px-4 py-8 lg:px-8">
          {/* Title Input */}
          <div className="border-b border-gray-300 mb-6">
            <input
              placeholder="Title"
              name="title"
              className="w-full lg:text-5xl font-serif placeholder-gray-400 text-gray-900 resize-none focus:outline-none focus:ring-0 pl-3"
              value={post.title}
              onChange={handleInputs}
            />
          </div>
          <div className="border-b border-gray-300 mb-6">
            <textarea
              placeholder="Tell your story..."
              name="body"
              className="w-full lg:text-xl font-light placeholder-gray-400 text-gray-700 resize-none focus:outline-none focus:ring-0 pl-3 py-2 min-h-[150px] max-h-[300px] rounded-lg"
              value={post.body}
              onChange={handleInputs}
            />
          </div>
          <div className="border-b border-gray-300 mb-6">
            <input
              type="text"
              className="w-full font-serif text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg py-2 px-4 rounded-md shadow-sm border-2 border-gray-300 hover:border-gray-400 transition-all"
              id="tags_input"
              placeholder="Comma-separated tags"
              maxLength={100}
            />
          </div>
          <div className="flex items-center justify-center border border-dashed border-gray-300 py-10 bg-gray-100 rounded-md hover:bg-gray-200 transition mb-8 cursor-pointer">
            <input type="file" className="text-gray-500 font-medium" onChange={uploadImage} />
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-500"
            onClick={publishImage}
          >
            Upload Image
          </button>
        </div>
        <div className="w-full fixed bottom-0 bg-white border-t border-gray-300 py-4 px-4 lg:px-8 flex justify-end">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md shadow hover:bg-green-500"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>
      </div>
    </>
  )
}