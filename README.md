# User Management Application

A modern, full-stack user management application built with Next.js 15, featuring server-side rendering, real-time filtering, and mobile-first responsive design.

## ✨ Features

- **Server-Side Rendering (SSR)** - User detail pages are pre-rendered on the server for optimal performance and SEO
- **Advanced Filtering & Search** - Real-time search with status and skill filters
- **Smart Pagination** - Navigate through users with URL-based state persistence
- **State Persistence** - Filter and pagination state preserved across page navigation and browser refresh
- **Mobile-First Design** - Fully responsive interface optimized for all screen sizes
- **Accessible UI** - Built with accessibility in mind using ShadCN UI components
- **Type-Safe** - Full TypeScript implementation with strict type checking
- **Modern Stack** - Built with Next.js, React, and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.12** - React framework with App Router
- **React 19.0.0** - Latest React features with enhanced performance
- **TypeScript 5.6.0** - Type safety and better developer experience
- **Tailwind CSS 3.4.0** - Utility-first CSS framework with custom design system
- **ShadCN UI** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible component primitives

### Backend & Database
- **PostgreSQL** - Robust relational database
- **Prisma 6.19.2** - Modern ORM with type-safe database access
- **Docker** - Containerized PostgreSQL instance for easy setup

### Development Tools
- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing
- **NVM** - Node version management

## 📋 Prerequisites

- **Node.js** - Version 20 or higher (recommend v25 via NVM)
- **Docker** - For running PostgreSQL container
- **npm/yarn/pnpm** - Package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd userapp
```

### 2. Install Node.js (via NVM)

```bash
# Install NVM if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js v25
nvm install 25
nvm use 25
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up PostgreSQL Database

#### Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker run --name userapp-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=userapp \
  -p 5432:5432 \
  -d postgres:latest
```

#### Using Local PostgreSQL

Ensure PostgreSQL is running and create a database named `userapp`.

### 5. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/userapp"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 6. Set Up Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npx prisma db seed
```

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
userapp/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── route.ts              # User list API endpoint
│   │       └── [id]/route.ts         # Single user API endpoint
│   ├── users/
│   │   └── [id]/page.tsx             # SSR user detail page
│   ├── globals.css                   # Global styles with design system
│   ├── layout.tsx                    # Root layout with Inter font
│   └── page.tsx                      # Home page (user list)
├── components/
│   ├── ui/                           # ShadCN UI components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── table.tsx
│   ├── pagination.tsx                # Pagination component
│   ├── user-filters.tsx              # Search and filter controls
│   ├── user-profile-card.tsx         # User detail card component
│   └── user-table.tsx                # User list table component
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   └── utils.ts                      # Utility functions
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── seed.ts                       # Database seeding script
├── types/
│   └── api.ts                        # API type definitions
├── data/
│   └── sample_data.json              # Sample user data for seeding
├── tailwind.config.ts                # Tailwind configuration with design system
├── components.json                   # ShadCN UI configuration
└── package.json                      # Dependencies and scripts
```

## 🎨 Design System

### Color Palette

- **Background**: `#F9FAFB` (Light Gray)
- **Card/Table**: `#FFFFFF` (White)
- **Primary Text**: `#111827` (Near Black)
- **Secondary Text**: `#6B7280` (Medium Gray)
- **Accent/Links**: `#2563EB` (Royal Blue)
- **Success**: `#D1FAE5` bg / `#065F46` text
- **Inactive**: `#fff6f6` bg / `#850e0e` text
- **Main Skill**: `#DBEAFE` bg / `#1E40AF` text
- **Borders**: `#D1D5DB` (Gray)

### Typography

- **Font Family**: Inter
- **H1**: 24px / 700 weight
- **H2**: 18px / 700 weight
- **Body**: 16px / 400 weight
- **Small/Meta**: 12px / 400 weight
- **Tags**: 12px / 600 weight

### Spacing

- **Base Unit**: 4px (all spacing is multiples of 4)
- **Card Padding**: 40px (desktop), 24px (mobile)
- **Table Row**: 72px height
- **Components**: Follow consistent 4px spacing grid

## 🔍 Key Features Explained

### Server-Side Rendering (SSR)

User detail pages (`/users/[id]`) are server-rendered for:
- Faster initial page load
- Better SEO
- Improved performance on slow networks
- Pre-fetched user data in HTML response

### State Persistence

All filter and pagination states are stored in URL query parameters:
- Search terms
- Active/Inactive filter
- Skill filter
- Current page number

This ensures:
- State survives page refresh
- Sharable filtered views
- Browser back/forward navigation works correctly

### Mobile-First Responsive Design

The interface adapts progressively:
- Mobile: Shows user name with email below, status, view button
- Desktop: Shows all columns including phone number

### Database Schema

```prisma
model User {
  id                Int      @id @default(autoincrement())
  first_name        String
  last_name         String
  email             String   @unique
  avatar            String
  school            String?
  title             String
  main_skill        String
  secondary_skills  String[]
  description       String
  active            Boolean
  phone_number      String?
}
```

## 📡 API Endpoints

### GET `/api/users`

Retrieve paginated and filtered user list.

**Query Parameters:**
- `search` - Search by name or email
- `active` - Filter by status (true/false)
- `skill` - Filter by main skill
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "data": [{ user objects }],
  "success": true,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 47,
    "totalPages": 5
  }
}
```

### GET `/api/users/[id]`

Retrieve single user by ID.

**Response:**
```json
{
  "data": { user object },
  "success": true
}
```

## 🧪 Development Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database commands
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Regenerate Prisma client
npx prisma migrate dev  # Create and apply migrations
npx prisma db seed   # Reseed database with sample data
```

## 🐳 Docker Commands

```bash
# Start PostgreSQL container
docker start userapp-postgres

# Stop PostgreSQL container
docker stop userapp-postgres

# View container logs
docker logs userapp-postgres

# Remove container
docker rm userapp-postgres
```

## 🔧 Configuration Files

### `tailwind.config.ts`
Custom design system with colors, spacing, shadows, and xs breakpoint (450px)

### `components.json`
ShadCN UI configuration with custom styling and path aliases

### `prisma/schema.prisma`
Database schema with User model and PostgreSQL provider

### `tsconfig.json`
TypeScript configuration with path aliases:
- `@/components/*` - Components directory
- `@/lib/*` - Library/utilities
- `@/app/*` - App directory
- `@/types/*` - Type definitions

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## 📄 License

This project is open source and available under the MIT License.
