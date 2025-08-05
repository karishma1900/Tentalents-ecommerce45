'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Google from '../../../assets/google.png';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { supabase } from '../../../configs/supabaseClient';
import '../login/login.css';

type FormData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [canResend, setCanResend] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user-registration`, data);
      return response.data;
    },
    onSuccess: (_, formData) => {
      console.log('Signup success', formData);
      setUserData(formData);
      setShowOtp(true);
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error) => {
      console.error('Signup failed', error);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if (!userData) return;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/verify-user`, {
        ...userData,
        otp: otp.join(''),
      });
      return response.data;
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = (data: FormData) => {
    signupMutation.mutate(data);
    console.log(data);
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    // Add your resend OTP logic
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Google sign-in error:', error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="logincontainer">
        <div className="login-heading">
          <button className="bordered-button" onClick={() => router.back()}>
            <ChevronLeft />
          </button>
          <h1 className="heading">Sign Up</h1>
          <div className="spacer" />
        </div>

        <div className="login-box">
          {!showOtp ? (
            <>
              {/* Google Login */}
              <button className="google-button" onClick={handleGoogleSignIn}>
                <Image src={Google} alt="Google Logo" width={20} height={20} />
                Continue With Google
              </button>

              <div className="divider" />

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
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

                {/* Password */}
                <div className="form-group" style={{ position: 'relative' }}>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                    }}
                  >
                    {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
<div className="options">
  <label
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '13px',
      color: '#777',
    }}
  >
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={() => setRememberMe(!rememberMe)}
      style={{ transform: 'scale(1.1)', marginRight: '4px' }}
    />
    <span>
      By clicking you agree on{' '}
      <Link href="#" style={{ color: '#f1592a', textDecoration: 'underline' }}>
        terms and conditions
      </Link>{' '}
      of tenttalents
    </span>
  </label>
</div>


                <button type="submit" className="background-buttonver" disabled={signupMutation.isPending}>
                  {signupMutation.isPending ? 'Signing up...' : 'Continue'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-center mb-4 font-medium text-lg">Enter OTP</h3>
              <div className="flex justify-center gap-4 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                   ref={(el) => {
  inputRefs.current[index] = el;
}}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md outline-none focus:border-transparent focus:ring-2 focus:ring-[var(--primary)] transition"
                  />
                ))}
              </div>
              <button
                disabled={verifyOtpMutation.isPending}
                onClick={() => verifyOtpMutation.mutate()}
                className="background-buttonver"
              >
                {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
              </button>
              <p className="text-center text-sm mt-2">
                {canResend ? (
                  <button onClick={resendOtp} className="text-[var(--primary)] hover:underline">
                    Resend OTP
                  </button>
                ) : (
                  `Resend OTP in ${timer}s`
                )}
              </p>
              {verifyOtpMutation?.isError && verifyOtpMutation.error instanceof AxiosError && (
                <p className="error mt-2">
                  {verifyOtpMutation.error.response?.data?.message || verifyOtpMutation.error.message}
                </p>
              )}
            </>
          )}
        </div>

        <div className="bottom-links">
          <p>
            Are You An Existing User? <Link href="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
