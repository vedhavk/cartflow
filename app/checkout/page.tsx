"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import {
  MapPin,
  Phone,
  Mail,
  User,
  ShoppingBag,
  CheckCircle,
  CreditCard,
  Calendar,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const totalPrice = getTotalPrice();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.firstName + " " + user?.lastName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate.trim())
      newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (!formData.cardName.trim())
      newErrors.cardName = "Cardholder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create order with shipping info
    const newOrderId = `ORD-${Date.now()}`;
    const order = {
      id: newOrderId,
      items: items,
      total: totalPrice * 1.18, // Including tax
      status: "pending",
      createdAt: new Date().toISOString(),
      shippingInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    // Clear cart
    clearCart();

    // Show order confirmation
    setOrderId(newOrderId);
    setOrderPlaced(true);
  };

  // Order Confirmation Screen
  if (orderPlaced) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container py-8 px-4 md:px-6 lg:px-8">
            <div className="flex min-h-[70vh] flex-col items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-12 border border-slate-200/50 max-w-2xl text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                  Order Confirmed!
                </h1>
                <p className="text-lg text-slate-600 mb-2">
                  Thank you for your purchase!
                </p>
                <p className="text-slate-500 mb-8">
                  Your order has been successfully placed.
                </p>
                <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <p className="text-sm text-slate-600 mb-2">Order ID</p>
                  <p className="text-2xl font-bold text-slate-800">{orderId}</p>
                </div>
                <div className="space-y-3">
                  <Link href="/orders" className="block">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-medium shadow-lg transition-all">
                      View My Orders
                    </button>
                  </Link>
                  <Link href="/products" className="block">
                    <button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-4 rounded-xl font-medium transition-all">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container py-8 px-4 md:px-6 lg:px-8">
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-card backdrop-blur-sm rounded-3xl shadow-md p-12 border border-border">
              <ShoppingBag className="h-24 w-24 text-slate-400" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                Your cart is empty
              </h2>
              <p className="mt-2 text-slate-500">
                Add some products to checkout
              </p>
              <Link href="/products">
                <button className="mt-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all">
                  Browse Products
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">Checkout</h1>
            <p className="mt-2 text-slate-600">
              Complete your order information
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shipping Information Form */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-8 border border-slate-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-teal-400 to-purple-500 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Shipping Information
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <FormField
                    label="Full Name"
                    icon={<User className="w-5 h-5" />}
                    error={errors.fullName}
                  >
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                      placeholder="John Doe"
                    />
                  </FormField>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Email"
                      icon={<Mail className="w-5 h-5" />}
                      error={errors.email}
                    >
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                        placeholder="john@example.com"
                      />
                    </FormField>

                    <FormField
                      label="Phone Number"
                      icon={<Phone className="w-5 h-5" />}
                      error={errors.phone}
                    >
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                        placeholder="+91 98765 43210"
                      />
                    </FormField>
                  </div>

                  {/* Address */}
                  <FormField
                    label="Street Address"
                    icon={<MapPin className="w-5 h-5" />}
                    error={errors.address}
                  >
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                      placeholder="123 Main Street, Apartment 4B"
                      rows={3}
                    />
                  </FormField>

                  {/* City & State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="City" error={errors.city}>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                        placeholder="Mumbai"
                      />
                    </FormField>

                    <FormField label="State" error={errors.state}>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                        placeholder="Maharashtra"
                      />
                    </FormField>
                  </div>

                  {/* ZIP Code & Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="ZIP Code" error={errors.zipCode}>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800"
                        placeholder="400001"
                      />
                    </FormField>

                    <FormField label="Country">
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-slate-800 bg-slate-100"
                        placeholder="India"
                      />
                    </FormField>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-8 border border-slate-200/50 mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Payment Information
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Card Number */}
                    <FormField
                      label="Card Number"
                      icon={<CreditCard className="w-5 h-5" />}
                      error={errors.cardNumber}
                    >
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cardNumber: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </FormField>

                    {/* Cardholder Name */}
                    <FormField
                      label="Cardholder Name"
                      icon={<User className="w-5 h-5" />}
                      error={errors.cardName}
                    >
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) =>
                          setFormData({ ...formData, cardName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800"
                        placeholder="JOHN DOE"
                      />
                    </FormField>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Expiry Date"
                        icon={<Calendar className="w-5 h-5" />}
                        error={errors.expiryDate}
                      >
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expiryDate: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </FormField>

                      <FormField
                        label="CVV"
                        icon={<Lock className="w-5 h-5" />}
                        error={errors.cvv}
                      >
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) =>
                            setFormData({ ...formData, cvv: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800"
                          placeholder="123"
                          maxLength={3}
                        />
                      </FormField>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      Order Summary
                    </h2>
                  </div>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl"
                      >
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 text-sm truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-slate-700 text-sm">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Tax (18%)</span>
                      <span className="font-semibold">
                        ₹{(totalPrice * 0.18).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-slate-800">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-slate-800">
                          ₹{(totalPrice * 1.18).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Place Order
                </button>

                <Link href="/cart">
                  <button
                    type="button"
                    className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-4 rounded-xl font-medium transition-all"
                  >
                    Back to Cart
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function FormField({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <label className="text-sm font-semibold text-slate-700">{label}</label>
      </div>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
