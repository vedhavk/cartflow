"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totalPrice = getTotalPrice();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save order (in a real app, this would be an API call)
    const orderId = `ORD-${crypto.randomUUID()}`;
    const order = {
      id: orderId,
      items,
      total: totalPrice,
      createdAt: new Date().toISOString(),
      status: "completed" as const,
    };

    // Store in localStorage for demo purposes
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    clearCart();
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (items.length === 0 && !orderComplete) {
    router.push("/cart");
    return null;
  }

  if (orderComplete) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <Header />
          <main className="container py-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto max-w-2xl"
            >
              <Card>
                <CardContent className="flex flex-col items-center p-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <CheckCircle className="h-24 w-24 text-green-500" />
                  </motion.div>
                  <h1 className="mt-6 text-3xl font-bold">Order Complete!</h1>
                  <p className="mt-2 text-center text-muted-foreground">
                    Thank you for your purchase. Your order has been confirmed.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <Button onClick={() => router.push("/orders")}>
                      View Orders
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">
                            First Name
                          </label>
                          <Input required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Last Name
                          </label>
                          <Input required />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" required />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Address</label>
                        <Input required />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="text-sm font-medium">City</label>
                          <Input required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">State</label>
                          <Input required />
                        </div>
                        <div>
                          <label className="text-sm font-medium">ZIP</label>
                          <Input required />
                        </div>
                      </div>

                      <div className="pt-4">
                        <h3 className="mb-4 font-semibold">
                          Payment Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">
                              Card Number
                            </label>
                            <Input placeholder="1234 5678 9012 3456" required />
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="text-sm font-medium">
                                Expiry Date
                              </label>
                              <Input placeholder="MM/YY" required />
                            </div>
                            <div>
                              <label className="text-sm font-medium">CVV</label>
                              <Input placeholder="123" required />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Pay $${totalPrice.toFixed(2)}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="h-fit">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.product.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
