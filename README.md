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

---

## 📋 Project Functionality Details

### 🔐 Authentication System

**Features:**
- Secure user authentication with JWT tokens
- Login with username and password
- Token stored in localStorage for persistent sessions
- Automatic session validation on app load
- Secure logout with token cleanup

**Test Credentials:**
- Username: `emilys`
- Password: `emilyspass`

**Implementation:**
- Custom `useAuth` hook with TanStack Query for login/logout mutations
- Zustand store (`auth-store.ts`) for user state management
- Protected route wrapper component for route guards

---

### 🛡️ Protected Routes

**Features:**
- Automatic authentication check on protected pages
- Redirect to login if user is not authenticated
- Seamless navigation after successful login
- Persistent authentication state across page refreshes

**Protected Pages:**
- Dashboard (`/dashboard`)
- Products (`/products`)
- Cart (`/cart`)
- Checkout (`/checkout`)
- Orders (`/orders`)
- Profile (`/profile`)

**Implementation:**
- `ProtectedRoute` component wraps protected pages
- Checks authentication state from Zustand store
- Uses Next.js router for client-side navigation

---

### 📊 Dashboard

**Features:**
- **Real-time Statistics:**
  - Total Products available
  - Current Cart Items count
  - Total Cart Value in ₹
  - Number of Product Categories

- **Visual Metrics:**
  - Animated stats cards with gradient backgrounds
  - Real-time updates when cart changes
  - Responsive grid layout

- **Recent Activity:**
  - Display of recently added cart items
  - Quick view of product details
  - Link to cart page for full view

- **Quick Actions:**
  - Navigate to Products, Orders, or Cart
  - View detailed product catalog
  - Access order history

- **Report Generation:**
  - Export dashboard metrics as CSV
  - Includes cart details with quantities and prices
  - Downloadable file with timestamp

- **Animated Background:**
  - Beautiful gradient orbs with pulse animation
  - Theme-aware colors (light/dark mode support)

---

### 🛍️ Products Page

**Features:**
- **Product Catalog:**
  - Grid view of all available products
  - Product cards with images, titles, prices, ratings
  - Responsive layout (1-4 columns based on screen size)

- **Search Functionality:**
  - Real-time search by product name
  - Instant results as you type
  - Debounced API calls for performance

- **Category Filtering:**
  - Filter products by category
  - Dynamic category list from API
  - "All Categories" option to view all

- **Price Range Filtering:**
  - Slider to set minimum and maximum price
  - Real-time filtering based on price
  - Display of current price range

- **Add to Cart:**
  - Quick add button on each product card
  - Toast notification on successful add
  - Cart counter updates immediately

- **Infinite Scroll:**
  - Automatic loading of more products on scroll
  - Loading indicator while fetching
  - Smooth pagination without page refresh

- **Product Details:**
  - Product image, title, description
  - Price and discount information
  - Star ratings and review count
  - Stock availability status

---

### 🛒 Shopping Cart

**Features:**
- **Cart Management:**
  - View all items in cart
  - Display product details (image, title, price)
  - Quantity controls (increment/decrement)
  - Remove individual items
  - Clear entire cart option

- **Cart Statistics:**
  - Total items in cart (sum of quantities)
  - Unique products count
  - Total amount calculation
  - Real-time updates on changes

- **Quantity Management:**
  - Increase/decrease quantity with +/- buttons
  - Minimum quantity of 1
  - Automatic price calculation per item
  - Subtotal display for each product

- **Price Summary:**
  - Subtotal of all items
  - Tax calculation (18% GST)
  - Shipping charges (₹50 flat rate, free over ₹1000)
  - Grand total with all charges

- **Empty Cart State:**
  - Friendly empty cart illustration
  - Call-to-action to browse products
  - Direct link to dashboard

- **Checkout Flow:**
  - Proceed to checkout button
  - Navigation to checkout page with cart data

---

### 💳 Checkout Page

**Features:**
- **Order Summary:**
  - List of all cart items with quantities
  - Individual item prices and subtotals
  - Total amount breakdown

- **Shipping Information Form:**
  - Full name, email, phone number
  - Complete address fields
  - City, state, postal code
  - Form validation with React Hook Form + Zod

- **Payment Options:**
  - Cash on Delivery (COD)
  - Credit/Debit Card
  - UPI Payment
  - Net Banking

- **Order Placement:**
  - Submit order with all details
  - Save order to order history
  - Clear cart after successful order
  - Redirect to orders page

- **Price Breakdown:**
  - Subtotal display
  - Tax amount (18%)
  - Shipping charges
  - Final total amount

---

### 📦 Orders Page

**Features:**
- **Order History:**
  - List of all placed orders
  - Order date and time
  - Order ID for reference
  - Total amount per order

- **Order Details:**
  - Products in each order
  - Quantities ordered
  - Price per product
  - Order status (Pending, Processing, Delivered)

- **Order Status:**
  - Visual status indicators with color coding
  - Pending (yellow), Processing (blue), Delivered (green)

- **Empty Orders State:**
  - Message when no orders exist
  - Link to start shopping

- **Order Filtering:**
  - View all orders chronologically
  - Most recent orders first

---

### 👤 User Profile

**Features:**
- **Profile Information Display:**
  - User's full name
  - Email address
  - Username
  - Profile image/avatar

- **Account Details:**
  - Account creation information
  - User ID
  - Authentication status

- **Profile Management:**
  - View personal information
  - Secure profile data from store

---

### 🎨 Theme System

**Features:**
- **Light/Dark Mode Toggle:**
  - System preference detection
  - Manual toggle switch in header
  - Smooth transitions between themes
  - Persistent theme selection

- **Theme Coverage:**
  - All pages support dark mode
  - Dynamic background colors
  - Adapted text colors for readability
  - Theme-aware components

- **Implementation:**
  - Next-themes provider
  - Tailwind CSS dark mode classes
  - CSS variables for theme colors
  - `suppressHydrationWarning` to prevent flash

---

### 🎯 State Management Architecture

**Server State (TanStack Query):**
- Product data fetching and caching
- Category list management
- Automatic refetching on window focus
- Stale-while-revalidate strategy
- Infinite scroll pagination
- Optimistic updates

**Client State (Zustand):**
- **Authentication Store (`auth-store.ts`):**
  - User information
  - Login/logout actions
  - Token management
  - Persist to localStorage

- **Cart Store (`cart-store.ts`):**
  - Cart items array
  - Add/remove/update items
  - Calculate total price and items
  - Clear cart functionality
  - Persist to localStorage

- **Filter Store (`filter-store.ts`):**
  - Search query
  - Selected category
  - Price range (min/max)
  - Update filter actions

---

### 🔗 API Integration (oRPC)

**Features:**
- **Type-Safe API Calls:**
  - Full TypeScript type inference
  - Auto-generated types from server procedures
  - No manual type definitions needed

- **Available Endpoints:**
  - `auth.login` - User authentication
  - `products.getAll` - Fetch products with pagination
  - `products.search` - Search products by query
  - `categories.getAll` - Fetch all categories

- **Error Handling:**
  - Automatic error catching
  - User-friendly error messages
  - Retry logic for failed requests

- **Caching Strategy:**
  - 5-minute stale time for products
  - Automatic background refetching
  - Cache invalidation on mutations

---

### 🎭 Animations & Interactions

**Features:**
- **Page Transitions:**
  - Smooth fade-in on page load
  - Staggered animations for lists
  - Slide-in effects for modals

- **Hover Effects:**
  - Button scale animations
  - Card elevation on hover
  - Color transitions

- **Loading States:**
  - Skeleton loaders for products
  - Spinner for infinite scroll
  - Loading indicators for mutations

- **Toast Notifications:**
  - Success messages (add to cart, order placed)
  - Error messages (API failures)
  - Auto-dismiss after timeout

---

### 📱 Responsive Design

**Features:**
- **Mobile-First Approach:**
  - Optimized for mobile devices
  - Progressive enhancement for larger screens
  - Touch-friendly interface

- **Breakpoints:**
  - Mobile: < 640px (single column)
  - Tablet: 640px - 1024px (2 columns)
  - Desktop: > 1024px (3-4 columns)

- **Adaptive Components:**
  - Collapsible navigation menu
  - Responsive grid layouts
  - Flexible typography scaling
  - Touch-optimized buttons and inputs

- **Cross-Browser Support:**
  - Modern browser compatibility
  - Fallbacks for older browsers
  - Progressive enhancement

---

### 🚀 Performance Optimizations

**Features:**
- **Code Splitting:**
  - Automatic route-based splitting
  - Dynamic imports for heavy components
  - Reduced initial bundle size

- **Image Optimization:**
  - Next.js Image component
  - Lazy loading of images
  - Responsive image sizing
  - WebP format support

- **Caching Strategy:**
  - TanStack Query cache management
  - LocalStorage for persistent data
  - HTTP cache headers

- **Bundle Optimization:**
  - Tree-shaking unused code
  - Minification and compression
  - Font optimization with next/font

---

## 🏗️ Project Structure

```

cartflow/
├── app/ # Next.js App Router pages
│ ├── api/orpc/ # oRPC API route handler
│ ├── cart/ # Shopping cart page
│ ├── checkout/ # Checkout flow page
│ ├── dashboard/ # Main dashboard page
│ ├── login/ # Authentication page
│ ├── orders/ # Order history page
│ ├── products/ # Product catalog page
│ ├── profile/ # User profile page
│ ├── layout.tsx # Root layout with providers
│ └── page.tsx # Landing/home page
├── components/
│ ├── auth/ # Authentication components
│ │ └── protected-route.tsx
│ ├── layout/ # Layout components
│ │ └── header.tsx
│ ├── products/ # Product-related components
│ │ ├── product-card.tsx
│ │ ├── product-filters.tsx
│ │ └── product-grid.tsx
│ ├── providers/ # Context providers
│ │ ├── query-provider.tsx
│ │ └── theme-provider.tsx
│ └── ui/ # Reusable UI components
│ ├── button.tsx
│ ├── card.tsx
│ ├── input.tsx
│ └── theme-toggle.tsx
├── hooks/ # Custom React hooks
│ ├── use-auth.ts # Authentication hooks
│ └── use-products.ts # Product data hooks
├── lib/ # Utility functions and configs
│ ├── orpc/ # oRPC configuration
│ │ ├── client.ts # Client-side oRPC setup
│ │ ├── procedures.ts # Server procedures
│ │ └── router.ts # API router
│ ├── constants.ts # App constants
│ └── utils.ts # Helper functions
├── stores/ # Zustand state stores
│ ├── auth-store.ts # Auth state management
│ ├── cart-store.ts # Cart state management
│ └── filter-store.ts # Filter state management
└── types/ # TypeScript type definitions
└── index.ts

```

---

## 🛠️ Development Guidelines

### Adding New Features
1. Create types in `types/index.ts`
2. Add server procedures in `lib/orpc/procedures.ts`
3. Create custom hooks in `hooks/`
4. Build UI components in `components/`
5. Create page in `app/` directory

### State Management Rules
- Use TanStack Query for server data (products, categories)
- Use Zustand for client data (auth, cart, filters)
- Persist important data to localStorage
- Avoid prop drilling - use stores or context

### Code Style
- Follow TypeScript strict mode
- Use functional components with hooks
- Implement proper error boundaries
- Write reusable components
- Add proper TypeScript types

---

## 🐛 Known Issues & Future Enhancements

### Planned Features
- [ ] Product wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced search with multiple filters
- [ ] User profile editing
- [ ] Order tracking with status updates
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] PWA support for offline access

### Performance Improvements
- [ ] Image optimization for product catalog
- [ ] Implement service workers
- [ ] Add request deduplication
- [ ] Optimize bundle size further

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

Built with ❤️ using modern web technologies.

For questions or support, please open an issue in the repository.
```
