# ReQuizle Wiki

[![Deploy](https://github.com/ReQuizle/requizle-wiki/actions/workflows/deploy.yml/badge.svg)](https://github.com/ReQuizle/requizle-wiki/actions/workflows/deploy.yml)

<img src="public/icon.svg" alt="ReQuizle Logo" width="250">

Documentation and user guides for ReQuizle, a modern web application designed for active recall and spaced repetition study.

The documentation is powered by [VitePress](https://vitepress.dev/) and automatically compiled and deployed to GitHub Pages.

## Features

- **Comprehensive Guides**: Explanations for all core active recall mechanics
- **Interactive Formatting Info**: Complete details on LaTeX math notation and Markdown text support
- **Developer Documentation**: Instructions on local setup, testing workflows, and database schema mappings
- **File Format Specs**: Complete JSON schema guides for custom `.rqzl` subject imports and profile migrations

## Prerequisites

- Node.js 18.x or higher
- npm (Node Package Manager)

## Installation

```bash
git clone https://github.com/ReQuizle/requizle-wiki.git
cd requizle-wiki
npm install
```

## Usage

Start the local documentation development server:

```bash
npm run dev
```

Open **http://localhost:5173/** in your browser to view and edit the documentation in real-time.

## Development

### Setup

```bash
npm install
```

### Local Preview

Build and run a local preview of the production-ready documentation site:

```bash
npm run build
npm run preview
```

## Project Structure

```
requizle-wiki/
├── .github/workflows/
│   └── deploy.yml          # Automated VitePress compiler and GitHub Pages deployer
├── .vitepress/             # VitePress configurations, theme setups, and navigation bars
├── public/                 # Static assets (site logo, graphics)
├── index.md                # Documentation homepage entrypoint
├── guide.md                # User guides
├── development.md          # Local setup and development instructions
├── import-export.md        # File specification guides for importing/exporting subjects
├── changelog.md            # Release log
└── package.json            # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Credits

- [VitePress](https://vitepress.dev/) - Modern static site generator

## License

This documentation and its source files are licensed under the [GNU Affero General Public License v3.0](LICENSE).
