import { useMutation } from "@tanstack/react-query";
import { orpcClient } from "@/lib/orpc/client";
import { useAuthStore } from "@/stores/auth-store";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: { username: string; password: string }) =>
      orpcClient["auth.login"](credentials),
    onSuccess: (data) => {
      setAuth(data, data.token);
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async () => {
      // Just clear local state - DummyJSON doesn't have logout endpoint
      logout();
    },
  });
}
