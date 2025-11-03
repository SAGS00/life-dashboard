# FAQ - Frequently Asked Questions

## General Questions

### What is Life Dashboard?

Life Dashboard is an open-source personal productivity application that helps you track habits, tasks, health metrics, finances, and goals all in one place.

### Is Life Dashboard free?

Yes! Life Dashboard is completely free and open-source under the MIT License.

### Do I need to create an account?

No! The application runs entirely in your browser. All data is stored locally on your device using browser localStorage.

### Is my data private?

Yes, absolutely. All your data stays in your browser's localStorage. Nothing is sent to external servers. We don't collect any data.

### Can I use it offline?

Currently, you need an internet connection to load the app initially. Once loaded, it works offline for the current session. PWA support (for full offline functionality) is planned for a future release.

## Features

### How do I export my data?

1. Click the Settings icon in the header
2. Navigate to the "Data Management" section
3. Click "Export Data" to download a JSON file with all your data

### How do I import data?

1. Click the Settings icon
2. Go to "Data Management"
3. Click "Import Data" and select your previously exported JSON file

### Can I sync data across devices?

Not yet. Currently, data is stored locally in each browser. Cloud sync is on our [roadmap](ROADMAP.md) for future releases.

### How do streaks work in the Habit Tracker?

A streak is the number of consecutive days you've completed a habit. If you miss a day, the streak resets to 0.

### Can I customize the dashboard?

Currently, you can enable/disable modules in Settings. Full dashboard customization (drag-and-drop widgets) is planned for a future release.

### Does it work on mobile?

Yes! The interface is fully responsive and works on phones and tablets.

## Technical Questions

### What technologies does it use?

-   **Frontend**: Next.js 16, React 19, TypeScript
-   **Styling**: Tailwind CSS 4.0
-   **UI Components**: Radix UI + shadcn/ui
-   **Charts**: Recharts
-   **State Management**: React hooks + localStorage

See the full [tech stack in the README](README.md#-tech-stack).

### Can I self-host it?

Yes! You can:

1. Clone the repository
2. Run `npm install`
3. Run `npm run build`
4. Deploy to any static hosting service (Vercel, Netlify, etc.)

### How do I contribute?

See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

### How do I report a bug?

Open a [bug report](https://github.com/SAGS00/life-dashboard/issues/new?template=bug_report.md) on GitHub with details about the issue.

### How do I request a feature?

Open a [feature request](https://github.com/SAGS00/life-dashboard/issues/new?template=feature_request.md) on GitHub.

## Data & Privacy

### Where is my data stored?

All data is stored in your browser's localStorage. It never leaves your device unless you explicitly export it.

### What happens if I clear my browser data?

If you clear your browser's localStorage, you'll lose all your data. Always keep regular backups using the Export Data feature.

### Can I backup my data automatically?

Not currently built-in, but you can manually export data regularly. Automatic backup features are planned.

### Is the data encrypted?

Browser localStorage is not encrypted by default. If you need encryption, consider using a browser with built-in localStorage encryption or contribute to adding this feature!

## Troubleshooting

### My data disappeared!

This usually happens if:

-   Browser data/cookies were cleared
-   Using incognito/private mode
-   Different browser profile

Always export your data regularly as backup.

### The app isn't loading

Try:

1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for errors
4. Try a different browser

### Dark mode isn't working

1. Check if your OS has dark mode enabled (some browsers use OS settings)
2. Try manually toggling dark mode in Settings
3. Clear cache and reload

### I found a bug, what do I do?

1. Check if it's already reported in [Issues](https://github.com/SAGS00/life-dashboard/issues)
2. If not, [create a bug report](https://github.com/SAGS00/life-dashboard/issues/new?template=bug_report.md)
3. Include steps to reproduce, screenshots, and your environment details

### The export/import isn't working

1. Make sure you're exporting to a JSON file
2. Don't edit the exported file manually
3. Check browser console for error messages
4. Try exporting to a different location

## Development

### How do I run it locally?

```bash
git clone https://github.com/SAGS00/life-dashboard.git
cd life-dashboard
npm install
npm run dev
```

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup.

### What's the project structure?

See the [Project Architecture](DEVELOPMENT.md#project-architecture) section in the Development Guide.

### How do I add a new feature?

See [Adding New Features](DEVELOPMENT.md#adding-new-features) in the Development Guide.

### The build is failing

1. Make sure you're using Node.js 18+
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again
4. Run `npm run build`

## Community

### How can I get help?

-   Read the [documentation](README.md)
-   Check this FAQ
-   Search [existing issues](https://github.com/SAGS00/life-dashboard/issues)
-   Open a [question issue](https://github.com/SAGS00/life-dashboard/issues/new?template=question.yml)
-   Start a [discussion](https://github.com/SAGS00/life-dashboard/discussions)

### How can I stay updated?

-   ⭐ Star the repository on GitHub
-   Watch the repository for updates
-   Follow the [changelog](CHANGELOG.md)
-   Check the [roadmap](ROADMAP.md)

### Can I use this for commercial purposes?

Yes! The MIT License allows commercial use. See [LICENSE](LICENSE) for details.

### How do I cite this project?

```
Life Dashboard by Joshua (SAGS00)
https://github.com/SAGS00/life-dashboard
Licensed under MIT License
```

---

**Don't see your question?** Open a [discussion](https://github.com/SAGS00/life-dashboard/discussions) or [create an issue](https://github.com/SAGS00/life-dashboard/issues/new?template=question.yml)!
