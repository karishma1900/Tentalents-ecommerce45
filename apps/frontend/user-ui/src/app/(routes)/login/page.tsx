'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Google from '../../../assets/google.png';
import './login.css';
import { ArrowBigRight, ChevronLeft } from 'lucide-react';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    router.push('/dashboard');
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
    // Add actual logic here
  };

  return (
    <div className="login-page">
       
       <div className="logincontainer">
        <div className='login-heading'>
             <button className='bordered-button'><ChevronLeft /></button>
        <h1 className='heading'>Login</h1>
        </div>
    
      <div className="login-box">
       

        <button className="google-button" onClick={handleGoogleSignIn}>
          <Image src={Google} alt="Google" width={20} height={20} />
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

          <button type="submit" className="background-buttonver">
            Continue
          </button>
        </form>

     
      </div>
         <div className="bottom-links">
          <p>
            Are You A New User?
            <Link href="/signup">Sign Up Here</Link>
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
