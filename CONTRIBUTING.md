# Contributing to Life Dashboard

First off, thank you for considering contributing to Life Dashboard! It's people like you that make Life Dashboard such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

-   **Use a clear and descriptive title** for the issue to identify the problem.
-   **Describe the exact steps which reproduce the problem** in as many details as possible.
-   **Provide specific examples to demonstrate the steps**.
-   **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
-   **Explain which behavior you expected to see instead and why.**
-   **Include screenshots and animated GIFs** if possible.
-   **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

-   **Use a clear and descriptive title** for the issue to identify the suggestion.
-   **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
-   **Provide specific examples to demonstrate the steps** or provide mockups.
-   **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
-   **Explain why this enhancement would be useful** to most Life Dashboard users.

### Pull Requests

-   Fill in the required template
-   Do not include issue numbers in the PR title
-   Follow the TypeScript and React styleguides
-   Include thoughtfully-worded, well-structured tests
-   Document new code
-   End all files with a newline

## Development Setup

### Prerequisites

-   Node.js 18+ and npm
-   Git

### Setup Steps

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:

    ```bash
    git clone https://github.com/YOUR-USERNAME/life-dashboard.git
    cd life-dashboard
    ```

3. **Add upstream remote**:

    ```bash
    git remote add upstream https://github.com/SAGS00/life-dashboard.git
    ```

4. **Install dependencies**:

    ```bash
    npm install
    ```

5. **Create a branch** for your changes:

    ```bash
    git checkout -b feature/your-feature-name
    ```

    or

    ```bash
    git checkout -b fix/your-bug-fix
    ```

6. **Run the development server**:

    ```bash
    npm run dev
    ```

7. **Make your changes** and test thoroughly

8. **Run linting**:

    ```bash
    npm run lint
    ```

9. **Build the project** to ensure no errors:
    ```bash
    npm run build
    ```

## Project Structure

```
life-dashboard/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── ...          # Feature components
│   ├── constants/       # Application constants
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries and validations
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions
├── public/              # Static assets
└── ...config files
```

## Coding Guidelines

### TypeScript

-   Use TypeScript for all new files
-   Define proper types/interfaces
-   Avoid `any` type when possible
-   Use meaningful variable and function names

### React

-   Use functional components with hooks
-   Use `useCallback` for event handlers
-   Use `useMemo` for expensive calculations
-   Keep components small and focused
-   Extract reusable logic into custom hooks

### Styling

-   Use Tailwind CSS utility classes
-   Follow the existing color scheme (check `globals.css`)
-   Ensure dark mode compatibility
-   Use responsive design principles

### Code Style

-   Use 2 or 4 spaces for indentation (consistent with existing code)
-   Use meaningful commit messages (see below)
-   Add comments for complex logic
-   Keep functions small and focused

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

-   **feat**: A new feature
-   **fix**: A bug fix
-   **docs**: Documentation only changes
-   **style**: Changes that don't affect code meaning (formatting, etc)
-   **refactor**: Code change that neither fixes a bug nor adds a feature
-   **perf**: Performance improvement
-   **test**: Adding missing tests
-   **chore**: Changes to build process or auxiliary tools

### Examples

```
feat(habits): add weekly habit summary view

fix(finance): correct calculation for monthly balance

docs(readme): update installation instructions

style(components): format code with prettier

refactor(tasks): extract task logic into custom hook

perf(dashboard): optimize rendering with useMemo

test(habits): add unit tests for streak calculation

chore(deps): upgrade react to version 19
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

-   Write tests for new features
-   Update tests when modifying existing features
-   Ensure tests pass before submitting PR
-   Aim for good test coverage

## Submitting Changes

1. **Commit your changes**:

    ```bash
    git add .
    git commit -m "feat(component): add new feature"
    ```

2. **Keep your fork updated**:

    ```bash
    git fetch upstream
    git rebase upstream/main
    ```

3. **Push to your fork**:

    ```bash
    git push origin feature/your-feature-name
    ```

4. **Create a Pull Request** on GitHub:

    - Use a clear title and description
    - Reference any related issues
    - Include screenshots for UI changes
    - Describe what testing you've done

5. **Respond to feedback**:
    - Address review comments promptly
    - Make requested changes
    - Push updates to your branch

## Adding New Features

When adding a new feature:

1. **Check existing issues** to see if it's already planned
2. **Create an issue** to discuss the feature before implementing
3. **Follow the existing patterns** in the codebase
4. **Update documentation** (README, comments, etc.)
5. **Add proper TypeScript types**
6. **Ensure accessibility** (ARIA labels, keyboard navigation)
7. **Test in both light and dark modes**
8. **Test responsive behavior**

## Component Guidelines

### Creating New Components

```typescript
// src/components/MyComponent.tsx
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

type MyComponentProps = {
    title: string;
    onAction: (id: string) => void;
};

export function MyComponent({ title, onAction }: MyComponentProps) {
    // Component logic

    return <Card>{/* Component JSX */}</Card>;
}
```

### Performance Optimization

-   Use `useCallback` for event handlers
-   Use `useMemo` for computed values
-   Avoid inline function definitions in JSX
-   Use proper React keys for lists

### Accessibility

-   Add ARIA labels to buttons and interactive elements
-   Ensure keyboard navigation works
-   Use semantic HTML elements
-   Test with screen readers when possible

## Adding Dependencies

Before adding a new dependency:

1. **Check if it's really needed** - Can you implement it yourself?
2. **Check the package size** - Will it significantly increase bundle size?
3. **Check maintenance status** - Is it actively maintained?
4. **Check license compatibility** - Is it compatible with MIT?

Document why the dependency is needed in your PR description.

## Documentation

-   Update README.md for user-facing changes
-   Add JSDoc comments for complex functions
-   Update TypeScript types/interfaces
-   Add inline comments for non-obvious code

## Getting Help

-   **Discord/Slack**: [If you have a community chat]
-   **GitHub Discussions**: Use for questions and discussions
-   **GitHub Issues**: For bug reports and feature requests
-   **Email**: [Maintainer email if available]

## Recognition

Contributors will be recognized in:

-   README.md contributors section
-   Release notes
-   GitHub contributors page

Thank you for contributing! 🎉
