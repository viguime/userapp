# User App

A modern Next.js application built with React 19, TypeScript, Tailwind CSS, and ShadCN UI.

## Tech Stack

- **Next.js 15** - App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **ShadCN UI** - Beautiful, accessible components
- **Inter Font** - Default typography

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Install ShadCN UI components (optional):

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# Add more components as needed
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with CSS variables
│   ├── layout.tsx           # Root layout with Inter font
│   └── page.tsx             # Home page
├── components/
│   └── ui/                  # ShadCN UI components (install as needed)
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── types/
│   └── index.ts             # TypeScript type definitions
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration with path aliases
├── components.json          # ShadCN UI configuration
└── package.json             # Dependencies
```

## Path Aliases

The following path aliases are configured:

- `@/components/*` - Components directory
- `@/lib/*` - Library/utilities directory
- `@/app/*` - App directory
- `@/types/*` - Type definitions directory

## Theme Configuration

### Colors

- **Background**: `#F9FAFB`
- **Card/Table**: `#FFFFFF`
- **Primary Text**: `#111827`
- **Secondary Text**: `#6B7280`
- **Accent**: `#2563EB`
- **Borders**: `#D1D5DB`

Colors are available as Tailwind classes and CSS variables:

```tsx
// Using Tailwind classes
<div className="bg-background text-foreground border-border" />

// Using custom colors
<div className="bg-card text-secondary" />
```

## Adding ShadCN Components

To add ShadCN UI components to your project:

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add table
npx shadcn@latest add toast

# List all available components
npx shadcn@latest add
```

Components will be added to the `components/ui` directory and automatically use the configured theme.

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
