"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { useProducts } from "@/hooks/use-products";
import { useFilterStore } from "@/stores/filter-store";
import { Package, Grid, Filter } from "lucide-react";

export default function ProductsPage() {
  const { search, category } = useFilterStore();
  const { data: productsData } = useProducts({ search, category });

  const totalProducts = productsData?.total || 0;
  const displayedProducts = productsData?.products?.length || 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Products</h1>
              <p className="mt-2 text-slate-600">
                Browse and manage our product catalog
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md px-6 py-4 border border-slate-200/50">
              <p className="text-sm font-medium text-slate-600 mb-1">
                Total Products
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {totalProducts}
              </p>
            </div>
          </div>

          {/* Products Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="h-fit bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-teal-400 to-purple-500 rounded-lg">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Filters</h2>
              </div>
              <ProductFilters />
            </aside>

            {/* Products Grid */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-6 border border-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg">
                    <Grid className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      All Products
                    </h2>
                    <p className="text-sm text-slate-500">
                      Showing {displayedProducts} of {totalProducts} products
                    </p>
                  </div>
                </div>
              </div>
              <ProductGrid />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
