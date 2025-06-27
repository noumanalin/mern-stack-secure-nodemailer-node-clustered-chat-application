import React, { useState, useRef } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setIsloading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [gender, setGender] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()
  const fileInputRef = useRef()

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsloading(true)

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)
      formData.append("userName", userName)
      formData.append("gender", gender)
      if (profileImage) formData.append("profileImage", profileImage)

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setEmail("")
        setPassword("")
        setUserName("")
        setGender("")
        setProfileImage(null)
        setPreviewImage(null)
        setErrors([])
        navigate("/login")
      }

    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleRegister} className='rounded-md py-6 px-4 bg-white w-full max-w-sm shadow-lg'>
        <h1 className='text-2xl font-bold tracking-tighter text-center mb-4'>Registration</h1>

        {/* Profile Image Upload with Preview */}
        <div className="flex justify-center mb-4">
          <div className="relative cursor-pointer" onClick={handleImageClick}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-24 h-24" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Error display */}
        {errors.length > 0 && (
          <div className="bg-red-300 text-red-900 font-semibold py-3 px-2 mb-3 rounded text-sm">
            {errors.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        {/* Username */}
        <div className="border rounded-md mb-3 p-2">
          <input
            type="text"
            placeholder='Username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='outline-none border-none w-full'
            required
          />
        </div>

        {/* Email */}
        <div className="border rounded-md mb-3 p-2">
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
        <div className="border rounded-md mb-3 p-2 flex justify-between items-center">
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

        {/* Gender */}
        <div className="border rounded-md mb-3 p-2">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='outline-none border-none w-full'
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className='py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 w-full font-semibold'
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="font-semibold text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-800 hover:underline" to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
