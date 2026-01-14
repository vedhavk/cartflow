"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCartStore();

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <Header />
          <main className="container py-8">
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">
                Your cart is empty
              </h2>
              <p className="mt-2 text-muted-foreground">
                Add some products to get started
              </p>
              <Link href="/dashboard">
                <Button className="mt-6">Browse Products</Button>
              </Link>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="container py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="mt-2 text-muted-foreground">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h3 className="font-semibold">
                                {item.product.title}
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">
                                ${item.product.price} each
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-4">
                                <p className="text-lg font-bold">
                                  $
                                  {(item.product.price * item.quantity).toFixed(
                                    2
                                  )}
                                </p>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => removeItem(item.product.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="h-fit">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">Order Summary</h2>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="mt-6 w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/dashboard">
                    <Button variant="outline" className="mt-2 w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
