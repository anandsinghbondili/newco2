"use client";

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { UsersService } from '@/client';
// import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

// const isLoggedIn = () => {
//     if (typeof window !== 'undefined') {
//         return localStorage.getItem("access_token") !== null;
//     }
//     return false;
// };

export default function AuthGuard({ children }: AuthGuardProps) {
  return <>{children}</>;
}
