import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post(
          'http://localhost:5000/api/auth/register',
          { name, email, password }
        );

        // go to OTP page
        navigate('/verify-otp', {
          state: { name, email, password }
        });

      } catch (error) {
        console.log(error.response.data);
      }
    };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-80'>

        <input
          type="text"
          placeholder='Your Name'
          className='border p-3 rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder='Email'
          className='border p-3 rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder='Password'
          className='border p-3 rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='bg-primary text-white py-3 rounded'>
          Register
        </button>

      </form>
    </div>
  )
}

export default Register