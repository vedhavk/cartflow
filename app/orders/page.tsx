"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import {
  Package,
  ShoppingBag,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Order } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    // Filter out any cancelled orders from previous system
    const activeOrders = storedOrders.filter(
      (order: Order) => order.status !== "cancelled"
    );
    // Update localStorage if any cancelled orders were found
    if (activeOrders.length !== storedOrders.length) {
      localStorage.setItem("orders", JSON.stringify(activeOrders));
    }
    return [...activeOrders].reverse(); // Most recent first
  });

  const handleCancelOrder = (orderId: string) => {
    // Remove order permanently
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);

    // Update localStorage (need to reverse back for storage)
    const storedOrders = [...updatedOrders].reverse();
    localStorage.setItem("orders", JSON.stringify(storedOrders));
  };

  const handleExportOrders = () => {
    // Generate CSV content
    let csvContent = "Order ID,Date,Status,Total Amount,Items,Quantities\n";

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-US");
      const items = order.items.map((item) => item.product.title).join("; ");
      const quantities = order.items.map((item) => item.quantity).join("; ");

      csvContent += `${order.id},${date},${order.status},₹${order.total.toFixed(
        2
      )},"${items}","${quantities}"\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  if (orders.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container py-8 px-4 md:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-4xl font-bold text-slate-800">
                Order History
              </h1>
            </div>
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-12 border border-slate-200/50">
              <Package className="h-24 w-24 text-slate-400" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                No orders yet
              </h2>
              <p className="mt-2 text-slate-500">
                Your order history will appear here
              </p>
              <Link href="/products">
                <button className="mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all">
                  Start Shopping
                </button>
              </Link>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#EDE8E3]">
        <Header />
        <main className="container py-8 px-4 md:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-slate-800">Order History</h1>
            <button
              onClick={handleExportOrders}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Export Orders
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="TOTAL ORDERS"
              value={totalOrders}
              icon={<ShoppingBag className="w-6 h-6" />}
              gradient="from-teal-400 to-teal-500"
            />
            <StatCard
              title="COMPLETED"
              value={completedOrders}
              icon={<CheckCircle className="w-6 h-6" />}
              gradient="from-purple-400 to-purple-500"
            />
            <StatCard
              title="TOTAL SPENT"
              value={`₹${totalSpent.toFixed(2)}`}
              icon={<TrendingUp className="w-6 h-6" />}
              gradient="from-pink-400 to-pink-500"
            />
          </div>

          {/* Orders List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
            <h2 className="text-xs font-bold text-slate-600 tracking-wider mb-6">
              YOUR ORDERS
            </h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleCancelOrder}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function StatCard({
  title,
  value,
  icon,
  gradient,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
      <h2 className="text-xs font-bold text-slate-600 tracking-wider mb-4">
        {title}
      </h2>
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold text-slate-800">{value}</div>
        <div
          className={`p-4 rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
        >
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (orderId: string) => void;
}) {
  const statusConfig = {
    pending: {
      color: "from-orange-400 to-orange-500",
      icon: <Clock className="w-5 h-5 text-white" />,
      text: "text-orange-600",
      bg: "bg-orange-100",
      label: "Pending",
    },
    processing: {
      color: "from-blue-400 to-blue-500",
      icon: <Package className="w-5 h-5 text-white" />,
      text: "text-blue-600",
      bg: "bg-blue-100",
      label: "Processing",
    },
    shipped: {
      color: "from-teal-400 to-teal-500",
      icon: <Truck className="w-5 h-5 text-white" />,
      text: "text-teal-600",
      bg: "bg-teal-100",
      label: "Shipped",
    },
    delivered: {
      color: "from-green-400 to-green-500",
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      text: "text-green-600",
      bg: "bg-green-100",
      label: "Delivered",
    },
    cancelled: {
      color: "from-red-400 to-red-500",
      icon: <XCircle className="w-5 h-5 text-white" />,
      text: "text-red-600",
      bg: "bg-red-100",
      label: "Cancelled",
    },
  };

  const status =
    statusConfig[order.status as keyof typeof statusConfig] ||
    statusConfig.pending;

  // Only allow cancellation for pending orders
  const canCancel = order.status === "pending";

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${status.color} shadow-md`}
          >
            {status.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Order #{order.id}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-slate-500" />
              <p className="text-sm text-slate-500">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">
            ₹{order.total.toFixed(2)}
          </p>
          <span
            className={`inline-flex items-center gap-1 rounded-full ${status.bg} px-3 py-1 text-xs font-semibold ${status.text} mt-2`}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-white rounded-lg"
          >
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-slate-800 text-sm line-clamp-1">
                {item.product.title}
              </p>
              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-slate-700">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Cancel Button */}
      {canCancel && (
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => onCancel(order.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
