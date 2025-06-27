import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setIsloading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsloading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setEmail("")
        setPassword("")
        setErrors([])
        // TODO: save user data in redux-presist-store
        navigate("/") 
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else if (error.response?.data?.message) {
        setErrors([error.response.data.message])
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleLogin} className='rounded-md py-6 px-4 bg-white w-full max-w-sm shadow-md'>
        <h1 className='text-2xl font-bold tracking-tighter text-center mb-4'>Login</h1>

        {/* Error display */}
        {errors.length > 0 && (
          <div className="bg-red-300 text-red-900 font-semibold py-3 px-2 mb-3 rounded text-sm">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        {/* Email */}
        <div className="border rounded-md mb-4 p-2">
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='outline-none border-none w-full'
            required
          />
        </div>

        {/* Password */}
        <div className="border rounded-md mb-4 p-2 flex justify-between items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='outline-none border-none w-full'
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className='cursor-pointer ml-2 text-gray-500'>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className='py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 w-full font-semibold'
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="font-semibold text-gray-700 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-800 hover:underline" to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
