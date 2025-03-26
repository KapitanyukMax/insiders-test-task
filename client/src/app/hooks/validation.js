'use client';
import { useState } from 'react';

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

export function useValidation() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const revalidateEmail = (email) => {
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    }
  };

  const revalidatePassword = (password) => {
    if (password.length >= 8) {
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

    if (password.length < 8) {
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
