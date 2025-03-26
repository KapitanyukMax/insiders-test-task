'use client';
import { useState } from 'react';

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_])[A-Za-z\d_-]{8,}$/;

export function useValidation() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const revalidateEmail = (email) => {
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    }
  };

  const revalidatePassword = (password) => {
    if (passwordRegex.test(password)) {
      setIsPasswordValid(true);
    }
  };

  const validateEmail = (email) => {
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
      return true;
    }

    setIsEmailValid(false);
    return false;
  }

  const validateEmailAndPassword = (email, password) => {
    if (!emailRegex.test(email)) {
      
      return false;
    }

    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return false;
    }

    return true;
  };

  return {
    isEmailValid,
    setIsEmailValid,
    isPasswordValid,
    setIsPasswordValid,
    revalidateEmail,
    revalidatePassword,
    validateEmail,
    validateEmailAndPassword,
  };
}
