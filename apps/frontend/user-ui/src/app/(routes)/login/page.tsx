'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Google from '../../../assets/google.png';
import './login.css';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';
import { auth, provider } from '../../../services/firebase'; // adjust path accordingly
import { signInWithPopup } from "firebase/auth";
type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // ✅ Check if already logged in
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (!isExpired) {
        router.replace('/myaccount');
      } else {
        localStorage.removeItem('token'); // remove expired token
      }
    } catch (err) {
      localStorage.removeItem('token'); // if invalid token
    }
  }
}, [router]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`https://user-service-e1em.onrender.com/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

     if (!response.ok) {
  if (response.status === 401) {
    throw new Error('Incorrect email or password.');
  } else {
    throw new Error(result.message || 'Login failed');
  }
}

      const token = result?.data?.token;
      if (!token) throw new Error('Token missing in response');

      // ✅ Save token to localStorage
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      router.push('/myaccount');
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  // Load Google Identity Services SDK
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
      console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    // Initialize Google client
    window.google.accounts.id.initialize({
      
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleGoogleCallback,
    });

    // Render Google Sign-in button
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv')!,
      { theme: 'outline', size: 'large' } // customization
    );
  };

  return () => {
    document.body.removeChild(script);
  };
}, []);
const handleGoogleCallback = async (response: any) => {
  try {
    setLoading(true);

    // Log the Google token for debugging
    console.log('Google ID Token:', response.credential);
const res = await axios.post(`https://user-service-e1em.onrender.com/api/auth/google-login}`, {
  provider: 'google',
  idToken: response.credential,
});

const token = res.data?.data?.token;  // Adjust based on your backend response shape
if (!token) throw new Error('Token missing in response');
localStorage.setItem('token', token);
toast.success('Logged in successfully!');
router.push('/myaccount');
  } catch (error: any) {
    console.error('Google login failed:', error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || 'Google login failed.');
  } finally {
    setLoading(false);
  }
};
const handleFirebaseGoogleSignIn = async () => {
  try {
    setLoading(true);
    const result = await signInWithPopup(auth, provider);
    const firebaseIdToken = await result.user.getIdToken();

   const res = await axios.post(`https://user-service-e1em.onrender.com/api/auth/google-login`, {
  provider: 'google',
  idToken: firebaseIdToken,
});

const token = res.data?.data?.token;
if (!token) throw new Error('Token missing in response');
localStorage.setItem('token', token);
toast.success('Logged in successfully!');
router.push('/myaccount');
  } catch (error) {
    console.error(error);
    toast.error('Google login failed.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className="logincontainer">
        <div className="login-heading">
          <button className="bordered-button">
            <ChevronLeft />
          </button>
          <h1 className="heading">Login</h1>
        </div>

        <div className="login-box">
    
          <button className="google-button" onClick={handleFirebaseGoogleSignIn} disabled={loading}>
  <Image src={Google} alt="Google Logo" width={20} height={20} />
  Continue With Google
</button>

          <div className="divider" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Your Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="options">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember My Password
            </div>

            <button type="submit" className="background-buttonver" disabled={loading}>
              {loading ? 'Logging in...' : 'Continue'}
            </button>
          </form>
        </div>

        <div className="bottom-links">
          <p>
            Are You A New User? <Link href="/signup">Sign Up Here</Link>
          </p>
          <p style={{ marginTop: '8px' }}>
            <Link href="/forgot-password">Forgot Password ?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
