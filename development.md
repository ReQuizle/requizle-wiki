# Development

## Repositories

ReQuizle is split into two repositories:
- **Web App**: [requizle-web](https://github.com/ReQuizle/requizle-web) - The main application code.
- **Documentation**: [requizle-wiki](https://github.com/ReQuizle/requizle-wiki) - This documentation site.

## Web App Development

### Setup

```bash
git clone https://github.com/ReQuizle/requizle-web.git
cd requizle-web
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm test` | Run unit tests |

### Project Structure

```
requizle-web/
├── src/
│   ├── components/       # React components
│   ├── store/            # Zustand state management
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main application component
├── public/               # Static assets
└── dist/                 # Production build output
```

## Documentation Development

To contribute to this documentation:

```bash
git clone https://github.com/ReQuizle/requizle-wiki.git
cd requizle-wiki
npm install
npm run dev
```
