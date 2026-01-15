"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useCartStore } from "@/stores/cart-store";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShoppingCart,
  Package,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCartStore();
  const router = useRouter();

  const totalPrice = getTotalPrice();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // Redirect to checkout page
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container py-8 px-4 md:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-800">
                Shopping Cart
              </h1>
            </div>
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-12 border border-slate-200/50">
              <ShoppingBag className="h-24 w-24 text-slate-400" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-800">
                Your cart is empty
              </h2>
              <p className="mt-2 text-slate-500">
                Add some products to get started
              </p>
              <Link href="/dashboard">
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
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-slate-800">Shopping Cart</h1>
            <button
              onClick={() => clearCart()}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="ITEMS IN CART"
              value={totalItems}
              icon={<ShoppingCart className="w-6 h-6" />}
              gradient="from-teal-400 to-teal-500"
            />
            <StatCard
              title="UNIQUE PRODUCTS"
              value={items.length}
              icon={<Package className="w-6 h-6" />}
              gradient="from-purple-400 to-purple-500"
            />
            <StatCard
              title="TOTAL AMOUNT"
              value={`₹${totalPrice.toFixed(2)}`}
              icon={<CreditCard className="w-6 h-6" />}
              gradient="from-pink-400 to-pink-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
              <h2 className="text-xs font-bold text-slate-600 tracking-wider mb-6">
                CART ITEMS
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50 h-fit sticky top-24">
              <h2 className="text-xs font-bold text-slate-600 tracking-wider mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-6">
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
                <div className="border-t border-slate-200 pt-4">
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

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-medium shadow-lg transition-all"
              >
                Proceed to Checkout
              </button>

              <Link href="/dashboard">
                <button className="w-full mt-3 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-4 rounded-xl font-medium transition-all">
                  Continue Shopping
                </button>
              </Link>
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

function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: any;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">{item.product.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            ₹{item.product.price} each
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                onUpdateQuantity(
                  item.product.id,
                  Math.max(1, item.quantity - 1)
                )
              }
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:border-teal-400 transition-colors flex items-center justify-center"
            >
              <Minus className="h-4 w-4 text-slate-600" />
            </button>
            <span className="w-12 text-center font-bold text-slate-800">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity + 1)
              }
              className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:border-teal-400 transition-colors flex items-center justify-center"
            >
              <Plus className="h-4 w-4 text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-lg font-bold text-slate-800">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => onRemove(item.product.id)}
              className="w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 transition-colors flex items-center justify-center"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
