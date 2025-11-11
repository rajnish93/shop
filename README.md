# Online Store

A single-page web application that lets customers explore the latest products and place orders online.

## Features

- **Product List**: Browse products organized by sections (Milling Solutions, Grain Handling, Food Processing)
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout**: Review cart items and place orders
- **Real-time Updates**: Live date/time display and cart count updates

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **PrimeVue** - Rich UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management for Vue
- **Vite** - Next-generation frontend tooling
- **ESLint & Prettier** - Code quality and formatting

## Prerequisites

- **nvm** (Node Version Manager) - Recommended for managing Node.js versions
- **Node.js** v22.20.0 (specified in `.nvmrc`)
- **pnpm** 8.x or higher

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:rajnish93/shop.git
   cd shop
   ```

2. Install and use the correct Node.js version with nvm:
   ```bash
   nvm install
   nvm use
   ```
   
   If you don't have nvm installed, you can install it from [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

3. Install dependencies:
   ```bash
   pnpm install --frozen-lockfile
   ```

### Development

Run the development server:

```bash
 pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

Build the application for production:

```bash
 pnpm build
```

The production build will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
 pnpm preview
```

### Linting

Run ESLint to check code quality:

```bash
 pnpm lint
```

### Formatting

Format code with Prettier:

```bash
 pnpm format
```

## Application Routes

- `/` - Product list page (home)
- `/products/:id` - Product detail page
- `/checkout` - Checkout page with cart items

## Key Components

### Header
- Logo (clickable, navigates to product list)
- Current date and time (updates every second)
- Cart icon with item count (clickable, navigates to checkout)

### Product List
- Displays products organized by sections
- Each product card shows image, name, type, price, and "Add to Cart" button
- Responsive grid layout

### Product Detail
- Shows detailed product information
- Large product image
- Product name, type, section, and price
- "Add to Cart" button
- Back button to return to product list

### Checkout
- Lists all items in the cart
- Shows product image, name, type, price, quantity, and subtotal
- Quantity controls (increase/decrease)
- Remove item functionality
- Total price calculation
- Place order button with success notification

## State Management

The application uses Pinia for state management. The cart store (`src/stores/cart.ts`) manages:
- Cart items
- Item count
- Total price
- Add/remove/update cart operations

## Styling

- **Tailwind CSS** is used for utility-first styling
- **PrimeVue** components provide consistent UI elements
- Responsive design for mobile, tablet, and desktop
