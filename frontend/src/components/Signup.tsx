import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Join Medium.</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100">
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2" />
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100">
              <img src="https://img.icons8.com/color/16/000000/facebook-new.png" alt="Facebook" className="mr-2" />
              Sign up with Facebook
            </button>
            <button className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100">
              <img src="https://img.icons8.com/ios-filled/16/000000/mac-os.png" alt="Apple" className="mr-2" />
              Sign up with Apple
            </button>
            <button className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100">
              <img src="https://img.icons8.com/ios-glyphs/16/000000/twitter--v1.png" alt="X" className="mr-2" />
              Sign up with X
            </button>
            <Link to='upemail' className="w-full flex items-center justify-center border rounded-lg py-2 text-gray-700 hover:bg-gray-100">
              <img src="https://img.icons8.com/ios-filled/16/000000/email-open.png" alt="Email" className="mr-2" />
              Sign up with email
            </Link>
          </div>
          <p className="mt-6 text-center">
            Already have account? <Link to="/signin" className="text-green-600 hover:underline">Sign in</Link>
          </p>
          <p className="mt-4 text-xs text-center text-gray-400">
            Click “Sign up” to agree to Medium’s <a href="#" className="hover:underline">Terms of Service</a> and acknowledge that Medium’s <a href="#" className="hover:underline">Privacy Policy</a> applies to you.
          </p>
        </div>
      </div>
    </>
  )
}