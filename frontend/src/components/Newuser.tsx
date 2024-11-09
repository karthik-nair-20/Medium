import { useParams } from "react-router-dom"
import { signup } from "../types"
import { ChangeEvent, useState } from "react"
import axios from "axios"

export default function Email() {
  const { authType } = useParams()
  const [user, setUser] = useState<signup>({
    username: '',
    email: '',
    password: ''
  })

  function handleInputs(e: ChangeEvent) {
    const { name, value } = e.target;
    setUser((c) => ({
      ...c,
      [name]: value
    })
    )
  }

  async function handleAuth() {
    try {
      const endPoint = authType === "inemail" ? "user/signin" : "user/signup";
      const payload = authType === "inemail" 
      ? { email: user.email, password: user.password }
      : { email: user.email, username: user.username, password: user.password }

      const response = await axios.post(endPoint, payload);
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log("Error occurred during", authType === 'inemail' ? "signin" : "signup", e);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Welcome.</h2>
          <div className="space-y-4">

            <input value={user.email} name="email" className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100 pl-3" placeholder="smart.dan@gmail.com" onChange={handleInputs} />

            {authType === 'upemail' && (<input value={user.username} name="username" className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100 pl-3" placeholder="dan_smart" onChange={handleInputs} />)}

            <input value={user.password} name="password" type="password" className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100 pl-3" placeholder="********" onChange={handleInputs} />

            <button className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100" onClick={handleAuth}>
              {authType === 'inemail' ? 'Signin' : 'Signup'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}