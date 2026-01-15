import type { ProductsResponse, Product, User, Category } from "@/types";

// Simple typed client for oRPC procedures
async function callProcedure<T>(
  procedureName: string,
  input?: any
): Promise<T> {
  const response = await fetch("/api/orpc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      procedure: procedureName,
      input,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }

  return response.json();
}

// Typed client matching our router structure
export const orpcClient = {
  "auth.login": (input: {
    username: string;
    password: string;
  }): Promise<User> => callProcedure<User>("auth.login", input),
  "auth.me": (input: { token: string }): Promise<User> =>
    callProcedure<User>("auth.me", input),
  "products.list": (input?: {
    skip?: number;
    limit?: number;
    search?: string;
    category?: string;
  }): Promise<ProductsResponse> =>
    callProcedure<ProductsResponse>("products.list", input),
  "products.getById": (input: { id: number }): Promise<Product> =>
    callProcedure<Product>("products.getById", input),
  "products.add": (input: any): Promise<Product> =>
    callProcedure<Product>("products.add", input),
  "products.update": (input: { id: number; data: any }): Promise<Product> =>
    callProcedure<Product>("products.update", input),
  "products.delete": (input: { id: number }): Promise<Product> =>
    callProcedure<Product>("products.delete", input),
  "categories.list": (): Promise<Category[]> =>
    callProcedure<Category[]>("categories.list"),
};
