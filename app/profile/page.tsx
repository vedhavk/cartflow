"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Package,
  CreditCard,
  Settings,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { items, getTotalPrice } = useCartStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    joined: "January 2024",
  });

  const totalOrders = items.length;
  const totalSpent = getTotalPrice();

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "John Doe",
      email: user?.email || "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY 10001",
      joined: "January 2024",
    });
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-slate-800">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-8 border border-slate-200/50">
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">
                      {formData.name}
                    </h2>
                    <p className="text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Member since {formData.joined}
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-600 tracking-wider mb-4">
                    PERSONAL INFORMATION
                  </h3>

                  <InfoField
                    icon={<User className="w-5 h-5" />}
                    label="Full Name"
                    value={formData.name}
                    isEditing={isEditing}
                    onChange={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                  />

                  <InfoField
                    icon={<Mail className="w-5 h-5" />}
                    label="Email Address"
                    value={formData.email}
                    isEditing={isEditing}
                    onChange={(value) =>
                      setFormData({ ...formData, email: value })
                    }
                  />

                  <InfoField
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone Number"
                    value={formData.phone}
                    isEditing={isEditing}
                    onChange={(value) =>
                      setFormData({ ...formData, phone: value })
                    }
                  />

                  <InfoField
                    icon={<MapPin className="w-5 h-5" />}
                    label="Address"
                    value={formData.address}
                    isEditing={isEditing}
                    onChange={(value) =>
                      setFormData({ ...formData, address: value })
                    }
                    isTextArea
                  />
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-8 border border-slate-200/50">
                <h3 className="text-xs font-bold text-slate-600 tracking-wider mb-6">
                  RECENT ORDERS
                </h3>
                {items.length > 0 ? (
                  <div className="space-y-4">
                    {items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl border border-teal-100"
                      >
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">
                            {item.product.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-teal-600">
                          ₹{item.product.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-500 py-8">
                    No orders yet
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              {/* Account Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
                <h3 className="text-xs font-bold text-slate-600 tracking-wider mb-6">
                  ACCOUNT STATS
                </h3>
                <div className="space-y-4">
                  <StatCard
                    icon={<ShoppingBag className="w-6 h-6 text-white" />}
                    label="Total Orders"
                    value={totalOrders}
                    gradient="from-teal-400 to-teal-500"
                  />
                  <StatCard
                    icon={<CreditCard className="w-6 h-6 text-white" />}
                    label="Total Spent"
                    value={`₹${totalSpent.toFixed(2)}`}
                    gradient="from-purple-400 to-purple-500"
                  />
                  <StatCard
                    icon={<Package className="w-6 h-6 text-white" />}
                    label="Cart Items"
                    value={items.reduce((sum, item) => sum + item.quantity, 0)}
                    gradient="from-pink-400 to-pink-500"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
                <h3 className="text-xs font-bold text-slate-600 tracking-wider mb-6">
                  QUICK ACTIONS
                </h3>
                <div className="space-y-3">
                  <ActionButton
                    icon={<ShoppingBag className="w-5 h-5" />}
                    label="View Orders"
                    href="/orders"
                  />
                  <ActionButton
                    icon={<Package className="w-5 h-5" />}
                    label="View Cart"
                    href="/cart"
                  />
                  <ActionButton
                    icon={<Settings className="w-5 h-5" />}
                    label="Settings"
                    href="/settings"
                  />
                </div>
              </div>

              {/* Profile Completion */}
              <div className="bg-gradient-to-br from-teal-400 to-purple-500 rounded-3xl shadow-md p-6 text-white">
                <h3 className="text-sm font-bold mb-4">Profile Completion</h3>
                <div className="mb-3">
                  <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm opacity-90">85% Complete</p>
                <p className="text-xs opacity-75 mt-2">
                  Add a profile picture to complete your profile
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function InfoField({
  icon,
  label,
  value,
  isEditing,
  onChange,
  isTextArea = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  isTextArea?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">
          {label}
        </label>
        {isEditing ? (
          isTextArea ? (
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
              rows={2}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
            />
          )
        ) : (
          <p className="text-slate-800 font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <a href={href}>
      <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl border border-teal-100 hover:shadow-md transition-all group">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-white">
          {icon}
        </div>
        <span className="font-medium text-slate-800 flex-1 text-left">
          {label}
        </span>
        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
          <span className="text-teal-600 text-sm">→</span>
        </div>
      </button>
    </a>
  );
}
