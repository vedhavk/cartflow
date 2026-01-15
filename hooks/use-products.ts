import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { orpcClient } from "@/lib/orpc/client";
import type { Product, ProductsResponse } from "@/types";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";

// Products queries
export function useProducts(params?: {
  search?: string;
  category?: string;
  skip?: number;
  limit?: number;
}) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => orpcClient["products.list"](params || {}),
  });
}

export function useInfiniteProducts(params?: {
  search?: string;
  category?: string;
}) {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", params],
    queryFn: ({ pageParam = 0 }) =>
      orpcClient["products.list"]({
        ...params,
        skip: pageParam,
        limit: PRODUCTS_PER_PAGE,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedProducts = allPages.reduce(
        (sum, page) => sum + page.products.length,
        0
      );
      return loadedProducts < lastPage.total ? loadedProducts : undefined;
    },
    initialPageParam: 0,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => orpcClient["products.getById"]({ id }),
    enabled: !!id,
  });
}

// Product mutations
export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Omit<Product, "id">) =>
      orpcClient["products.add"](product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: Partial<Product> }) =>
      orpcClient["products.update"](params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => orpcClient["products.delete"]({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// Categories query
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => orpcClient["categories.list"](),
  });
}
