import { z } from "zod";
import * as procedures from "./procedures";

// Define typed procedures for oRPC
export const router = {
  "auth.login": {
    input: z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }),
    handler: procedures.login,
  },
  "auth.me": {
    input: z.object({
      token: z.string(),
    }),
    handler: (input: { token: string }) =>
      procedures.getCurrentUser(input.token),
  },
  "products.list": {
    input: z.object({
      skip: z.number().optional(),
      limit: z.number().optional(),
      search: z.string().optional(),
      category: z.string().optional(),
    }),
    handler: procedures.getProducts,
  },
  "products.getById": {
    input: z.object({
      id: z.number(),
    }),
    handler: (input: { id: number }) => procedures.getProductById(input.id),
  },
  "products.add": {
    input: z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      discountPercentage: z.number().default(0),
      rating: z.number().default(0),
      stock: z.number(),
      brand: z.string(),
      category: z.string(),
      thumbnail: z.string(),
      images: z.array(z.string()),
    }),
    handler: procedures.addProduct,
  },
  "products.update": {
    input: z.object({
      id: z.number(),
      data: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        brand: z.string().optional(),
        category: z.string().optional(),
      }),
    }),
    handler: procedures.updateProduct,
  },
  "products.delete": {
    input: z.object({
      id: z.number(),
    }),
    handler: (input: { id: number }) => procedures.deleteProduct(input.id),
  },
  "categories.list": {
    handler: procedures.getCategories,
  },
} as const;

export type ORPCRouter = typeof router;
