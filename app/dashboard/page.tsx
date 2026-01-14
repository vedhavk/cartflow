"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Product Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Browse and manage products
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit">
              <ProductFilters />
            </aside>
            <div>
              <ProductGrid />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
