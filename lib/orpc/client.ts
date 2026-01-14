import type { ORPCRouter } from "./router";

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
  "auth.login": (input: { username: string; password: string }) =>
    callProcedure("auth.login", input),
  "auth.me": (input: { token: string }) => callProcedure("auth.me", input),
  "products.list": (input?: {
    skip?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) => callProcedure("products.list", input),
  "products.getById": (input: { id: number }) =>
    callProcedure("products.getById", input),
  "products.add": (input: any) => callProcedure("products.add", input),
  "products.update": (input: { id: number; data: any }) =>
    callProcedure("products.update", input),
  "products.delete": (input: { id: number }) =>
    callProcedure("products.delete", input),
  "categories.list": () => callProcedure("categories.list"),
};
