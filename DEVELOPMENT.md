# Development Guide

This guide will help you set up your development environment and understand the project structure.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Setup](#setup)
-   [Development Workflow](#development-workflow)
-   [Project Architecture](#project-architecture)
-   [Key Concepts](#key-concepts)
-   [Adding New Features](#adding-new-features)
-   [Testing](#testing)
-   [Debugging](#debugging)
-   [Common Tasks](#common-tasks)

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18 or higher
-   **npm**: Version 9 or higher (comes with Node.js)
-   **Git**: For version control
-   **VS Code** (recommended): With recommended extensions

### Recommended VS Code Extensions

-   ESLint
-   Prettier
-   Tailwind CSS IntelliSense
-   TypeScript and JavaScript Language Features

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SAGS00/life-dashboard.git
cd life-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (if needed).

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Branch Strategy

-   `main`: Stable production code
-   `develop`: Active development branch
-   `feature/*`: New features
-   `fix/*`: Bug fixes
-   `docs/*`: Documentation updates

### Creating a New Branch

```bash
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes
2. Test thoroughly
3. Commit with meaningful messages
4. Push to your fork
5. Create a pull request

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(component): add new feature
fix(component): resolve bug
docs: update documentation
style: format code
refactor: restructure component
perf: improve performance
test: add tests
chore: update dependencies
```

## Project Architecture

### Directory Structure

```
life-dashboard/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css        # Global styles and themes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page (main dashboard)
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── HabitTracker.tsx  # Feature components
│   │   ├── JournalWidget.tsx
│   │   ├── FinanceTracker.tsx
│   │   └── ...
│   │
│   ├── constants/            # Application constants
│   │   ├── app.ts           # App-wide constants
│   │   ├── habits.ts        # Habit-related constants
│   │   ├── finance.ts       # Finance constants
│   │   └── tasks.ts         # Task constants
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── useLocalStorage.ts
│   │
│   ├── lib/                 # Utility libraries
│   │   └── validations.ts   # Zod schemas
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   │
│   └── utils/               # Helper functions
│       ├── dates.ts
│       └── quotes.ts
│
├── public/                  # Static assets
├── .github/                 # GitHub templates and workflows
└── ...config files
```

### Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **UI Components**: Radix UI + shadcn/ui
-   **State Management**: React hooks + localStorage
-   **Validation**: Zod
-   **Date Handling**: date-fns
-   **Charts**: Recharts
-   **Icons**: Lucide React

## Key Concepts

### Data Persistence

Data is stored in browser localStorage using the `useLocalStorage` hook:

```typescript
const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
```

### Theme Management

Dark mode is implemented using CSS variables in `globals.css`:

```css
:root {
    /* Light theme colors */
}
.dark {
    /* Dark theme colors */
}
```

### Component Pattern

Most components follow this pattern:

```typescript
export function ComponentName({ props }: ComponentProps) {
    // State management
    const [state, setState] = useState();

    // Event handlers (memoized)
    const handleAction = useCallback(() => {
        // Handler logic
    }, [dependencies]);

    // JSX
    return <Card>{/* Component content */}</Card>;
}
```

### Validation

All data inputs are validated using Zod schemas:

```typescript
import { habitSchema } from "@/lib/validations";

const newHabit = habitSchema.parse(data);
```

## Adding New Features

### 1. Create Constants (if needed)

```typescript
// src/constants/yourfeature.ts
export const YOUR_CONSTANT = {
    // constants
};
```

### 2. Define Types

```typescript
// src/types/index.ts
export type YourType = {
    id: string;
    name: string;
    // other fields
};
```

### 3. Create Validation Schema

```typescript
// src/lib/validations.ts
export const yourSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
});
```

### 4. Build Component

```typescript
// src/components/YourComponent.tsx
export function YourComponent() {
    const [data, setData] = useLocalStorage<YourType[]>("your-data", []);

    // Component logic

    return <Card>{/* Component UI */}</Card>;
}
```

### 5. Add to Dashboard

```typescript
// src/app/page.tsx
import { YourComponent } from "@/components/YourComponent";

// In the component:
{
    isModuleEnabled("yourModule") && <YourComponent />;
}
```

## Testing

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

### Build Test

```bash
npm run build
```

### Manual Testing

Test these scenarios:

-   Light/dark mode switching
-   Data persistence (refresh page)
-   Responsive design (mobile, tablet, desktop)
-   All CRUD operations
-   Data import/export
-   Error handling

## Debugging

### Browser DevTools

Use React Developer Tools:

1. Install React DevTools extension
2. Inspect component hierarchy
3. Check state and props
4. Profile performance

### Console Logging

```typescript
console.log("Debug:", variable);
```

### Common Issues

**Issue**: Changes not showing

-   Clear browser cache
-   Check localStorage
-   Restart dev server

**Issue**: TypeScript errors

-   Check type definitions in `src/types/index.ts`
-   Ensure imports are correct
-   Run `npx tsc --noEmit` for full error list

**Issue**: Styling not applying

-   Check Tailwind class names
-   Verify globals.css imports
-   Clear browser cache

## Common Tasks

### Adding a New UI Component

```bash
# Example: Adding a new button variant
# Edit src/components/ui/button.tsx
```

### Updating Dependencies

```bash
npm update
npm outdated  # Check for updates
```

### Creating a Custom Hook

```typescript
// src/hooks/useYourHook.ts
export function useYourHook(initialValue: any) {
    const [value, setValue] = useState(initialValue);

    // Hook logic

    return { value, setValue };
}
```

### Adding a New Route

```typescript
// src/app/your-route/page.tsx
export default function YourPage() {
    return <div>Your Page</div>;
}
```

## Performance Optimization

-   Use `useCallback` for event handlers
-   Use `useMemo` for expensive computations
-   Avoid inline function definitions
-   Use React.memo for expensive components
-   Optimize images with Next.js Image component

## Accessibility

-   Add ARIA labels to interactive elements
-   Ensure keyboard navigation works
-   Test with screen readers
-   Maintain proper heading hierarchy
-   Use semantic HTML elements

## Resources

-   [Next.js Documentation](https://nextjs.org/docs)
-   [React Documentation](https://react.dev)
-   [Tailwind CSS Documentation](https://tailwindcss.com)
-   [Radix UI Documentation](https://www.radix-ui.com)
-   [TypeScript Documentation](https://www.typescriptlang.org)

## Getting Help

-   Open an issue on GitHub
-   Check existing issues and discussions
-   Read the documentation
-   Ask in project discussions

---

Happy coding! 🚀
