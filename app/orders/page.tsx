"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Order } from "@/types";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [orders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    return [...storedOrders].reverse(); // Most recent first
  });

  if (orders.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <Header />
          <main className="container py-8">
            <h1 className="mb-8 text-3xl font-bold">Order History</h1>
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
              <Package className="h-24 w-24 text-muted-foreground" />
              <h2 className="mt-4 text-2xl font-semibold">No orders yet</h2>
              <p className="mt-2 text-muted-foreground">
                Your order history will appear here
              </p>
              <Link href="/dashboard">
                <Button className="mt-6">Start Shopping</Button>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="mt-2 text-muted-foreground">
              View and track your orders
            </p>
          </div>

          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ${order.total.toFixed(2)}
                        </p>
                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Items:</h4>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800"
                        >
                          <div>
                            <p className="font-medium">{item.product.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity} × ${item.product.price}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
