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

### Local dev URL (subpath / `base`)

The web app is built with Vite **`base: '/requizle-web/'`** so assets and routing match [GitHub Pages project sites](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites). After `npm run dev`, open:

`http://localhost:5173/requizle-web/`

Prefer the URL **with a trailing slash** (the dev server may redirect `/requizle-web` → `/requizle-web/`). The **content editor** route is **`/requizle-web/edit`**.

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
| **React Router** | Client-side routing (study shell vs. `/edit`) |
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
- **Content (editor)**: Create, rename, and delete **subjects**, **topics**, and **questions**; updates keep media references and session state coherent (including IndexedDB cleanup when content is removed).
- **Settings**: App-wide preferences (delete confirmations, quiz re-queue behavior, spacing min/max for wrong/skip, etc.).
- **Import / export**: Merge behavior and `.rqzl` bundles as documented in the wiki.

The store uses Zustand's `persist` middleware with a custom IndexedDB storage adapter.

### Data Persistence

Data is saved in IndexedDB:

- **State**: The main state JSON (profiles, subjects, questions, progress).
- **Media**: Large media files are stored separately with UUIDs. Questions reference them via `idb:<uuid>` strings.

This approach prevents LocalStorage quota issues when dealing with large datasets or many images.

### The "Smart Queue" Logic

The application uses a **dynamic queue system**.

1. **New Session**: Loads all questions from selected topics.
2. **Shuffling**: Fisher-Yates shuffle is applied in "Random" mode.
3. **Mistakes / skips**: Incorrect answers (and skips, if enabled) are **re-inserted** a random number of positions ahead (default **4-6**); spacing and on/off flags are user settings (`Settings` in the store).
4. **Mastery**: Correct answers mark the question as "Mastered" and exclude it from the pool unless **include mastered** is on. Toggling **include mastered** with an active subject **regenerates the queue**.

---

## Project Structure

```
requizle-web/
├── src/
│   ├── App.tsx               # Root: theme + router outlet
│   ├── main.tsx              # Entry: URL normalization, React mount
│   ├── router.tsx            # Routes: study layout vs. /edit
│   ├── index.css             # Global styles (Tailwind imports)
│   ├── types.ts              # Global TypeScript interfaces
│   │
│   ├── pages/
│   │   └── EditorPage.tsx    # Full-page content editor route
│   │
│   ├── components/
│   │   ├── Layout.tsx        # Main layout wrapper
│   │   ├── LeftSidebar.tsx   # Subject/topic navigation, link to editor
│   │   ├── CenterArea.tsx    # Question display area
│   │   ├── RightSidebar.tsx  # Mastery, Import, Settings tabs
│   │   ├── ContentEditor.tsx # Subject/topic/question editing UI
│   │   ├── AppModals.tsx     # Shared confirm / prompt / message modals
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
│   │   ├── appBaseUrl.ts        # Canonical app URL / trailing slash (base path)
│   │   ├── contentEditor.ts     # Helpers for the editor UI
│   │   └── quizLogic.ts         # Pure functions for scoring/queueing
│   │
│   └── test/                 # Test setup and utilities
│
├── public/                   # Static assets (icons, manifest, sample media)
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
- **Content CRUD** for the editor (subjects, topics, questions) and orphan media cleanup
- Import/export logic
- Media cleanup on subject deletion
- **Factory reset** navigates to the canonical base URL (see `appBaseUrl.ts`)

### `router.tsx` / `EditorPage.tsx`

- **`router.tsx`**: Declares the **study** layout route and the **`/edit`** editor route (both under the Vite `base`).
- **`EditorPage.tsx`**: Hosts `ContentEditor` for in-app authoring.

### `appBaseUrl.ts`

Utilities for **canonical location** and **trailing-slash** normalization so the deployed **`/requizle-web/`** base, dev redirects, and reset behavior stay consistent.

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
