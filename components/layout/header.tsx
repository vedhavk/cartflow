"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShoppingCart, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const logoutMutation = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/30 bg-white/70 backdrop-blur-xl shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2 group">
          <div className="p-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            CartFlow
          </h1>
        </Link>

        <nav className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Products
            </Button>
          </Link>
          <Link href="/orders">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Orders
            </Button>
          </Link>
          <Link href="/cart">
            <Button
              variant="ghost"
              className="relative text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-xs text-white font-bold shadow-lg">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">
                {user?.firstName || "Profile"}
              </span>
            </Button>
          </Link>
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 font-semibold shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
