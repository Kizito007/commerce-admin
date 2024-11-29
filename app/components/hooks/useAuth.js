"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);
}

export function useFaceAuth(history) {
  const router = useRouter();

  useEffect(() => {
    const faceMatch = localStorage.getItem('faceMatch');
    if (!faceMatch) {
      router.push(`/admin/compare-face?history=${history}`);
    }
  }, [router]);
}

export function useProductsSecurityQuestionAuth(history) {
  const router = useRouter();

  useEffect(() => {
    const isAnswered = localStorage.getItem('isProductsAnswered');
    if (!isAnswered) {
      router.push(`/admin/security-answer?history=${history}`);
    }
  }, [router]);
}

export function useOrdersSecurityQuestionAuth(history) {
  const router = useRouter();

  useEffect(() => {
    const isAnswered = localStorage.getItem('isOrdersAnswered');
    if (!isAnswered) {
      router.push(`/admin/security-answer?history=${history}`);
    }
  }, [router]);
}

export function useAdminsSecurityQuestionAuth(history) {
  const router = useRouter();

  useEffect(() => {
    const isAnswered = localStorage.getItem('isAdminsAnswered');
    if (!isAnswered) {
      router.push(`/admin/security-answer?history=${history}`);
    }
  }, [router]);
}

export function useCommsSecurityQuestionAuth(history) {
  const router = useRouter();

  useEffect(() => {
    const isAnswered = localStorage.getItem('isCommsAnswered');
    if (!isAnswered) {
      router.push(`/admin/security-answer?history=${history}`);
    }
  }, [router]);
}
