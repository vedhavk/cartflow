"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useProducts } from "@/hooks/use-products";
import { useCartStore } from "@/stores/cart-store";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Box,
  Eye,
  ArrowRight,
  FileText,
  Sparkles,
  Heart,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { data: productsData } = useProducts();
  const { items, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalProducts = productsData?.total || 0;
  const totalCartItems = items.length;
  const cartValue = getTotalPrice();
  const categories =
    new Set(productsData?.products?.map((p) => p.category)).size || 0;

  // Recent activity from cart items
  const recentActivity = items.slice(0, 3);

  const handleGenerateReport = () => {
    // Generate dashboard metrics report
    let csvContent = "Dashboard Metrics Report\n\n";
    csvContent += "Metric,Value\n";
    csvContent += `Total Products,${totalProducts}\n`;
    csvContent += `Cart Items,${totalCartItems}\n`;
    csvContent += `Cart Value,₹${cartValue.toFixed(2)}\n`;
    csvContent += `Categories,${categories}\n\n`;

    csvContent += "Cart Details\n";
    csvContent += "Product,Quantity,Price,Subtotal\n";
    items.forEach((item) => {
      csvContent += `"${item.product.title}",${
        item.quantity
      },₹${item.product.price.toFixed(2)},₹${(
        item.product.price * item.quantity
      ).toFixed(2)}\n`;
    });

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `dashboard_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <Header />

        <main className="container py-8 px-4 md:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div
              className={`transition-all duration-700 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
              <p className="text-gray-600 ml-14">
                Welcome back! Here's your store overview ✨
              </p>
            </div>
            <button
              onClick={handleGenerateReport}
              className="group relative bg-white hover:bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 text-gray-800 hover:text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-purple-200 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FileText className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Generate Report</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Products"
              value={totalProducts}
              icon={<Package className="w-6 h-6" />}
              gradient="from-cyan-400 to-sky-500"
              delay="delay-100"
            />
            <StatsCard
              title="Cart Items"
              value={totalCartItems}
              icon={<ShoppingCart className="w-6 h-6" />}
              gradient="from-purple-400 to-indigo-500"
              delay="delay-200"
            />
            <StatsCard
              title="Cart Value"
              value={`₹${cartValue.toFixed(0)}`}
              icon={<DollarSign className="w-6 h-6" />}
              gradient="from-blue-400 to-cyan-500"
              delay="delay-300"
            />
            <StatsCard
              title="Categories"
              value={categories}
              icon={<Star className="w-6 h-6" />}
              gradient="from-amber-400 to-orange-500"
              delay="delay-[400ms]"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div
              className={`lg:col-span-2 transition-all duration-700 delay-500 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <GlassCard
                title="Quick Actions"
                icon={<Zap className="w-5 h-5" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/products">
                    <ActionCard
                      title="Manage Products"
                      description="Browse and manage your inventory"
                      icon={<Box className="w-8 h-8" />}
                      gradient="from-cyan-400 to-sky-500"
                    />
                  </Link>
                  <Link href="/cart">
                    <ActionCard
                      title="View Cart"
                      description="Review items in your cart"
                      icon={<ShoppingCart className="w-8 h-8" />}
                      gradient="from-purple-400 to-indigo-500"
                    />
                  </Link>
                  <Link href="/orders">
                    <ActionCard
                      title="Orders"
                      description="Track and manage orders"
                      icon={<FileText className="w-8 h-8" />}
                      gradient="from-blue-400 to-cyan-500"
                    />
                  </Link>
                  <Link href="/profile">
                    <ActionCard
                      title="Profile"
                      description="Update your settings"
                      icon={<Heart className="w-8 h-8" />}
                      gradient="from-amber-400 to-orange-500"
                    />
                  </Link>
                </div>
              </GlassCard>
            </div>

            {/* Store Stats */}
            <div
              className={`transition-all duration-700 delay-600 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <GlassCard
                title="Store Stats"
                icon={<TrendingUp className="w-5 h-5" />}
              >
                <div className="space-y-6">
                  <StatItem
                    icon={<Package className="w-5 h-5" />}
                    label="Total Products"
                    value={totalProducts}
                    color="text-cyan-600"
                    bgColor="bg-cyan-100"
                  />
                  <StatItem
                    icon={<Star className="w-5 h-5" />}
                    label="Categories"
                    value={categories}
                    color="text-purple-600"
                    bgColor="bg-purple-100"
                  />
                  <StatItem
                    icon={<ShoppingCart className="w-5 h-5" />}
                    label="Cart Items"
                    value={totalCartItems}
                    color="text-blue-600"
                    bgColor="bg-blue-100"
                  />
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories */}
            <div
              className={`transition-all duration-700 delay-700 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <GlassCard title="Categories" icon={<Star className="w-5 h-5" />}>
                <div className="space-y-4">
                  {productsData?.products &&
                    (() => {
                      const categoryCount = productsData.products.reduce(
                        (acc, p) => {
                          acc[p.category] = (acc[p.category] || 0) + 1;
                          return acc;
                        },
                        {} as Record<string, number>
                      );

                      const colors = [
                        { from: "from-cyan-400", to: "to-sky-500" },
                        { from: "from-purple-400", to: "to-indigo-500" },
                        { from: "from-blue-400", to: "to-cyan-500" },
                        { from: "from-amber-400", to: "to-orange-500" },
                      ];

                      return Object.entries(categoryCount)
                        .slice(0, 4)
                        .map(([name, count], idx) => (
                          <CategoryBarNew
                            key={name}
                            label={name}
                            count={count}
                            total={totalProducts}
                            gradient={`${colors[idx].from} ${colors[idx].to}`}
                          />
                        ));
                    })()}
                  {(!productsData?.products || totalProducts === 0) && (
                    <p className="text-center text-gray-500 py-8">
                      No categories available
                    </p>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Recent Activity */}
            <div
              className={`transition-all duration-700 delay-[800ms] ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <GlassCard
                title="Recent Activity"
                icon={<Eye className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((item) => (
                      <ActivityItemNew
                        key={item.id}
                        name={item.product.title}
                        price={item.product.price}
                        quantity={item.quantity}
                        image={item.product.thumbnail}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-purple-400" />
                      </div>
                      <p className="text-gray-500">No recent activity</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Modern Glass Card Component
function GlassCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl text-white shadow-lg">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// Stats Card Component
function StatsCard({
  title,
  value,
  icon,
  gradient,
  delay,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
  delay: string;
}) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${delay}`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          {title}
        </p>
        <div
          className={`p-3 bg-gradient-to-br ${gradient} rounded-xl text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p
          className={`text-4xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          {value}
        </p>
        <TrendingUp className={`w-5 h-5 text-green-500`} />
      </div>
    </div>
  );
}

// Action Card Component
function ActionCard({
  title,
  description,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex items-start gap-4">
        <div
          className={`p-3 bg-gradient-to-br ${gradient} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

// Stat Item Component
function StatItem({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl hover:bg-white/80 transition-all duration-300">
      <div className={`p-3 ${bgColor} rounded-xl ${color}`}>{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

// Category Bar Component
function CategoryBarNew({
  label,
  count,
  total,
  gradient,
}: {
  label: string;
  count: number;
  total: number;
  gradient: string;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-800 capitalize">
          {label}
        </span>
        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {count}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700 ease-out group-hover:scale-x-105`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItemNew({
  name,
  price,
  quantity,
  image,
}: {
  name: string;
  price: number;
  quantity: number;
  image: string;
}) {
  return (
    <div className="group flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 hover:bg-white/80 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-cyan-400 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
          {quantity}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
          {name}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-transparent bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text">
            ₹{price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">• Qty {quantity}</span>
        </div>
      </div>
    </div>
  );
}
