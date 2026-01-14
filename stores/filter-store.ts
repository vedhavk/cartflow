import { create } from "zustand";
import { DEFAULT_FILTERS } from "@/lib/constants";
import type { ProductFilters } from "@/types";

interface FilterState extends ProductFilters {
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  ...DEFAULT_FILTERS,

  setSearch: (search) => set({ search }),

  setCategory: (category) => set({ category }),

  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),

  resetFilters: () => set(DEFAULT_FILTERS),
}));
