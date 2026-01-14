# CartFlow - Product Management Dashboard

A modern, feature-rich Product Management Dashboard built with Next.js 16, demonstrating best practices in state management, API integration, and user experience.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **API Layer**: oRPC (typed server procedures)
- **Server State**: TanStack Query (caching, refetching, infinite scroll)
- **Client State**: Zustand (auth, cart, UI filters)
- **Forms**: React Hook Form + Zod validation
- **UI**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Language**: TypeScript (strict mode)
- **Backend**: DummyJSON API

## ✨ Features

### Core Functionality

- ✅ **Authentication System**: Login/logout with secure token storage
- ✅ **Route Protection**: Protected routes with automatic redirects
- ✅ **Product Management**: Browse, search, and filter products
- ✅ **Infinite Scroll**: Smooth pagination with TanStack Query
- ✅ **Search & Filtering**: Real-time search by name, category, and price range
- ✅ **Shopping Cart**: Add/remove/update items with persistent state
- ✅ **Checkout Flow**: Complete purchase workflow
- ✅ **Order History**: View past orders

### Technical Highlights

- 🎯 **State Management Separation**:
  - TanStack Query: Products, categories (server state)
  - Zustand: Auth, cart, filters (client state)
- 🔄 **oRPC Integration**: Type-safe API calls, no direct REST from components
- 🎨 **Responsive Design**: Mobile-first, fully responsive UI
- ⚡ **Performance**: Optimized with React Query caching
- 🎭 **Animations**: Smooth transitions with Framer Motion
- 🛡️ **Type Safety**: Full TypeScript coverage with strict mode

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd cartflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

# or

pnpm dev

# or

bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
