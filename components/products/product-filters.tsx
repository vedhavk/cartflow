"use client";

import { useFilterStore } from "@/stores/filter-store";
import { useCategories } from "@/hooks/use-products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";

export function ProductFilters() {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    setSearch,
    setCategory,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const { data: categories } = useCategories();
  const [localSearch, setLocalSearch] = useState(search);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice.toString());
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice.toString());

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(localSearch);
  };

  const handlePriceFilter = () => {
    setPriceRange(
      parseFloat(localMinPrice) || 0,
      parseFloat(localMaxPrice) || 10000
    );
  };

  const handleReset = () => {
    resetFilters();
    setLocalSearch("");
    setLocalMinPrice("0");
    setLocalMaxPrice("10000");
  };

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <h3 className="mb-3 font-semibold">Search Products</h3>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Category</h3>
        <div className="space-y-2">
          <Button
            variant={category === "" ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setCategory("")}
          >
            All Categories
          </Button>
          {categories?.map((cat: { slug: string; name: string }) => (
            <Button
              key={cat.slug}
              variant={category === cat.slug ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Min Price</label>
            <Input
              type="number"
              placeholder="0"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Max Price</label>
            <Input
              type="number"
              placeholder="10000"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
            />
          </div>
          <Button onClick={handlePriceFilter} className="w-full">
            Apply Price Filter
          </Button>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        <X className="mr-2 h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  );
}
