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

export function useSecurityQuestionAuth() {
  const router = useRouter();

  useEffect(() => {
    const isAnswered = localStorage.getItem('isAnswered');
    if (!isAnswered) {
      router.push(`/admin/security-answer`);
    }
  }, [router]);
}
