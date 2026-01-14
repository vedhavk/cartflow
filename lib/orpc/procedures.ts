import { API_BASE_URL, PRODUCTS_PER_PAGE } from "@/lib/constants";
import type { ProductsResponse, Product, User, Category } from "@/types";

// Auth procedures
export async function login(credentials: {
  username: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
}

// Product procedures
export async function getProducts(params: {
  skip?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<ProductsResponse> {
  const { skip = 0, limit = PRODUCTS_PER_PAGE, search, category } = params;

  let url = `${API_BASE_URL}/products`;

  if (search) {
    url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}`;
  } else if (category) {
    url = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}`;
  }

  url += `${search || category ? "&" : "?"}limit=${limit}&skip=${skip}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function addProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
}

export async function updateProduct(params: {
  id: number;
  data: Partial<Product>;
}): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params.data),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return { success: true };
}

// Category procedures
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await response.json();

  // Transform array of strings to Category objects
  return categories.map((cat: string) => ({
    slug: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " "),
    url: `/products/category/${cat}`,
  }));
}
