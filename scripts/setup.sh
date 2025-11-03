#!/bin/bash

# Life Dashboard Development Setup Script
# This script helps set up the development environment

set -e

echo "🚀 Life Dashboard Development Setup"
echo "===================================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18 or higher."
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Check npm
echo ""
echo "📦 Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed successfully!"

# Create .env.local if it doesn't exist
echo ""
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local from .env.example"
    else
        touch .env.local
        echo "✅ Created empty .env.local file"
    fi
else
    echo "✅ .env.local already exists"
fi

# Run linting
echo ""
echo "🔍 Running linter..."
npm run lint || echo "⚠️  Linting found some issues. You may want to fix them."

# Build check
echo ""
echo "🏗️  Testing build..."
npm run build || {
    echo "❌ Build failed. Please check the errors above."
    exit 1
}

echo ""
echo "================================================"
echo "✨ Setup complete! You're ready to develop!"
echo "================================================"
echo ""
echo "Quick start commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run lint    - Run linter"
echo ""
echo "📚 Documentation:"
echo "  README.md        - Project overview"
echo "  DEVELOPMENT.md   - Development guide"
echo "  CONTRIBUTING.md  - How to contribute"
echo ""
echo "Happy coding! 🎉"
