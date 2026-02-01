# Development

This guide covers everything you need to know to contribute to ReQuizle development.

## Repositories

ReQuizle is split into two repositories:

| Repository | Description | Link |
|------------|-------------|------|
| **requizle-web** | The main application code | [GitHub](https://github.com/ReQuizle/requizle-web) |
| **requizle-wiki** | This documentation site | [GitHub](https://github.com/ReQuizle/requizle-wiki) |

---

## Web App Development

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

### Setup

```bash
git clone https://github.com/ReQuizle/requizle-web.git
cd requizle-web
npm install
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |
| `npm test` | Run unit tests with Vitest |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run deploy` | Deploy to GitHub Pages (requires setup) |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Zustand** | State management (with persist middleware) |
| **IndexedDB** | Media storage (via custom wrapper) |
| **Framer Motion** | Animations and transitions |
| **KaTeX** | LaTeX math rendering |
| **Vitest** | Unit testing framework |
| **canvas-confetti** | Celebration animations |
| **Lucide React** | Icon library |

---

## Architecture

### State Management (`useQuizStore`)

ReQuizle uses a single global Zustand store (`useQuizStore.ts`) that handles:

- **Profiles**: Multi-user support with independent data per profile.
- **Session State**: Current subject, selected topics, active queue, study mode.
- **Progress Tracking**: Detailed stats for every question (attempts, streak, mastered).
- **Settings**: User preferences (delete confirmations, etc.).

The store uses Zustand's `persist` middleware with a custom IndexedDB storage adapter.

### Data Persistence

Data is saved in IndexedDB:

- **State**: The main state JSON (profiles, subjects, questions, progress).
- **Media**: Large media files are stored separately with UUIDs. Questions reference them via `idb:<uuid>` strings.

This approach prevents LocalStorage quota issues when dealing with large datasets or many images.

### The "Smart Queue" Logic

The application uses a **dynamic queue system** rather than a rigid SRS algorithm (like Anki's SM-2):

1. **New Session**: Loads all questions from selected topics.
2. **Shuffling**: Fisher-Yates shuffle is applied in "Random" mode.
3. **Mistakes**: Incorrect answers are **re-inserted 4-6 positions later** in the queue for immediate recall reinforcement.
4. **Mastery**: Correct answers mark the question as "Mastered" and remove it from the active session.

---

## Project Structure

```
requizle-web/
├── src/
│   ├── App.tsx               # Root component with sample data
│   ├── main.tsx              # Entry point
│   ├── index.css             # Global styles (Tailwind imports)
│   ├── types.ts              # Global TypeScript interfaces
│   │
│   ├── components/
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── LeftSidebar.tsx   # Subject/topic navigation
│   │   ├── CenterArea.tsx    # Question display area
│   │   ├── RightSidebar.tsx  # Mastery, Import, Settings tabs
│   │   ├── QuestionCard.tsx  # Core question rendering component
│   │   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   │   ├── Latex.tsx         # KaTeX wrapper component
│   │   ├── Logo.tsx          # ReQuizle logo
│   │   └── inputs/           # Question type input components
│   │       ├── MultipleChoiceInput.tsx
│   │       ├── MultipleAnswerInput.tsx
│   │       ├── TrueFalseInput.tsx
│   │       ├── KeywordsInput.tsx
│   │       ├── MatchingInput.tsx
│   │       └── WordBankInput.tsx
│   │
│   ├── store/
│   │   └── useQuizStore.ts   # Zustand store (the "brain" of the app)
│   │
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark mode context provider
│   │
│   ├── utils/
│   │   ├── importValidation.ts  # JSON import parsing & validation
│   │   ├── mediaStorage.ts      # IndexedDB wrapper for media files
│   │   ├── indexedDBStorage.ts  # IndexedDB storage adapter for Zustand
│   │   └── quizLogic.ts         # Pure functions for scoring/queueing
│   │
│   └── test/                 # Test setup and utilities
│
├── public/                   # Static assets (icons, manifest)
├── test-data/                # Sample JSON files for testing imports
├── coverage/                 # Test coverage reports
└── dist/                     # Production build output
```

---

## Key Files Explained

### `types.ts`

Defines all TypeScript interfaces:

- `Question` (union of all question types)
- `MultipleChoiceQuestion`, `TrueFalseQuestion`, etc.
- `Subject`, `Topic`
- `Profile`, `SessionState`, `QuestionProgress`

### `useQuizStore.ts`

The central state store containing:

- All profile/subject/progress data
- Session management (start, queue, submit answer)
- Profile CRUD operations
- Import/export logic
- Media cleanup on subject deletion

### `importValidation.ts`

Handles JSON import validation:

- Validates structure and required fields
- Auto-generates IDs if not provided
- Extracts and groups media references
- Detects media conflicts (same filename, different content)

### `mediaStorage.ts`

IndexedDB wrapper for media:

- `storeMedia()` - Save a data URI
- `getMedia()` - Retrieve by ID
- `deleteMedia()` - Remove media
- `getAllMediaIds()` - List all stored media

---

## Testing

ReQuizle uses **Vitest** with **React Testing Library** for unit tests.

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode (during development)
npx vitest
```

### Test Files

Test files are co-located with their source files using the `.test.ts` or `.test.tsx` suffix:

- `QuestionCard.test.tsx`
- `useQuizStore.test.ts`
- `importValidation.test.ts`
- `quizLogic.test.ts`
- etc.

### Test Data

The `test-data/` folder contains sample JSON files for testing various import scenarios:

- Valid files with different question types
- Invalid files to test error handling
- Edge cases (empty arrays, missing fields, etc.)

---

## Documentation Development

### Setup

```bash
git clone https://github.com/ReQuizle/requizle-wiki.git
cd requizle-wiki
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the VitePress dev server |
| `npm run build` | Build the documentation site |
| `npm run preview` | Preview the built site |
| `npm run deploy` | Deploy to GitHub Pages |

### Adding Pages

1. Create a new `.md` file in the root directory.
2. Add it to the sidebar in `.vitepress/config.ts`.
3. Use standard Markdown with VitePress extensions (containers, code highlighting, etc.).

---

## Contributing

### Workflow

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear commits.
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Push and open a Pull Request.

### Code Style

- Use TypeScript for all new code.
- Follow existing patterns in the codebase.
- Write tests for new features.
- Keep components small and focused.
- Use meaningful variable/function names.

### Commit Messages

Use clear, descriptive commit messages:

- `feat: add multiple answer question type`
- `fix: resolve media loading race condition`
- `docs: update import format documentation`
- `test: add tests for word bank validation`
