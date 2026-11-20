import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // ✅ use AuthContext (NOT AppContext)
    const { user, login } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password }
            );

            const { token, user: userData } = res.data;

            // save token
            localStorage.setItem('token', token);

            // update global auth state (IMPORTANT FIX)
            login(userData, token);

            // redirect
            navigate('/');

        } catch (error) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-80'>

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
                    Login
                </button>

            </form>
        </div>
    );
};

export default Login;