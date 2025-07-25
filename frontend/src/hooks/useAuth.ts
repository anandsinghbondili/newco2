import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  type Body_login_login_access_token as AccessToken,
  type ApiError,
  LoginService,
  type UserPublic,
  type UserRegister,
  UsersService,
} from "@/client";
import { handleError } from "@/utils";

const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("access_token") !== null
  }
  return false
}

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: UsersService.readUserMe,
    enabled: isLoggedIn(),
  });

  const signUpMutation = useMutation({
    mutationFn: (data: UserRegister) =>
      UsersService.registerUser({ requestBody: data }),

    onSuccess: () => {
      router.push("/login")
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginAccessToken({
      formData: data,
    })
    if (typeof window !== 'undefined') {
      localStorage.setItem("access_token", response.access_token)
    }
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate the current user query to refetch with the new token
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/dashboard");
    },
    onError: (err: ApiError) => {
      handleError(err)
      setError((err.body as { detail: string })?.detail || "Login failed")
    },
  })

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access_token")
    }
    router.push("/login")
  }

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
    error,
    resetError: () => setError(null),
  }
}

export { isLoggedIn }
export default useAuth