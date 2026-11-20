import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const { state } = useLocation()

  const { name, email, password } = state || {}

  const handleVerify = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/verify-otp',
        {
          name,
          email,
          password,
          otp
        }
      )

      localStorage.setItem('token', res.data.token)

      navigate('/')

    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleVerify} className='flex flex-col gap-4 w-80'>

        <input
          type="text"
          placeholder="Enter OTP"
          className='border p-3 rounded'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className='bg-primary text-white py-3 rounded'>
          Verify OTP
        </button>

      </form>
    </div>
  )
}

export default VerifyOtp