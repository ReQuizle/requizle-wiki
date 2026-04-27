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

### Local dev URL / `base`

The web app uses a root Vite **`base: '/'`** by default. After `npm run dev`, open:

`http://localhost:5173/`

The study UI loads at `/`; the **content editor** route is **`/edit`**. For a subdirectory deployment, set `VITE_APP_BASE` before building, for example `/requizle-web/`. When a custom base is used, routes live under that base path.

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
| **JSZip** | `.rqzl` archive (ZIP) read/write |
| **uuid** | Media and entity IDs |
| **clsx** | Conditional `className` strings |
| **react-syntax-highlighter** (Prism) | Fenced code blocks in questions |
| **Tailwind** + **CSS variables** | `indigo` / `slate` map to `--accent-*` / `--surface-*` (see `colorThemes.ts`, `applyDocumentTheme`) |

---

## Architecture

### State Management (`useQuizStore`)

ReQuizle uses a single global Zustand store (`useQuizStore.ts`) composed from focused action/helper modules that handle:

- **Profiles**: Multi-user support with independent data per profile.
- **Session State**: Current subject, selected topics, active queue, study mode.
- **Progress Tracking**: Detailed stats for every question (attempts, streak, mastered).
- **Content (editor)**: Create, rename, and delete **subjects**, **topics**, and **questions**; updates keep media references and session state coherent (including IndexedDB cleanup when content is removed).
- **Settings**: App-wide preferences (personalization: theme, accent, animated background, sound effects; delete confirmations; quiz re-queue behavior; spacing min/max for wrong/skip, etc.).
- **Import / export**: Merge behavior and `.rqzl` bundles as documented in the wiki.
  - `.rqzl` is a ZIP archive (custom extension), not plain JSON.

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

The tree below lists **every** source file and top-level project asset. Trailing `# …` comments summarize each path. Update the tree (and this section) when you add, rename, or remove files. Generated outputs (`coverage/`, `dist/`) and `node_modules/` are omitted from the list but may appear on disk.

```
requizle-web/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions: lint, test:coverage, build
├── LICENSE                        # AGPL-3.0
├── README.md
├── .gitignore
├── index.html                     # Vite app shell, PWA meta
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js            # `indigo` / `slate` → CSS variables for accents
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
├── public/
│   ├── 404.html                   # Static fallback (GitHub Pages)
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon.svg
│   ├── sample-image.svg
│   └── sample-video.mov
├── coverage/                      # (generated) `npm run test:coverage`
├── dist/                          # (generated) `npm run build`
└── src/
    ├── App.tsx                    # `ThemeProvider`, `ColorThemeApplier`, `AppRoutes`
    ├── main.tsx                   # entry: URL normalize, `createRoot`, `StrictMode`
    ├── router.tsx                # `BrowserRouter`, study shell, `/edit`, 404
    ├── index.css                 # global styles, Tailwind layers, `btn`, progress
    ├── types.ts                  # `Question` union, `Profile`, `SessionState`, …
    ├── context/
    │   └── ThemeContext.tsx      # `light` / `dark` on `documentElement`
    ├── pages/
    │   ├── EditorPage.tsx         # full-page `ContentEditor` host
    │   └── NotFoundPage.tsx      # non-route UI
    ├── test/
    │   └── setup.ts              # Vitest + Testing Library
    ├── store/
    │   ├── useQuizStore.ts            # Zustand root, persist, re-exports
    │   ├── useQuizStore.test.ts        # store hydration, actions
    │   ├── profileSettingsActions.ts   # settings + import/profile slice
    │   ├── quizCoreActions.ts          # session, queue, submit, content CRUD
    │   └── quizStoreHelpers.ts         # getCurrent*, merge, media cleanup helpers
    ├── utils/
    │   ├── appBaseUrl.ts               # base URL, trailing slash, SPA fallback query
    │   ├── appBaseUrl.test.ts
    │   ├── archiveMedia.ts            # collect blobs for .rqzl export
    │   ├── array.ts                   # small helpers (e.g. shuffle)
    │   ├── colorThemes.ts             # accent presets, `applyDocumentTheme`, monochrome
    │   ├── colorThemes.test.ts
    │   ├── contentEditor.ts            # editor-only helpers
    │   ├── download.ts                # trigger browser download
    │   ├── fileReaders.ts              # `File` / `ArrayBuffer` readers
    │   ├── importValidation.ts         # JSON / profile payload validation
    │   ├── importValidation.test.ts
    │   ├── indexedDBStorage.ts         # Zustand persist adapter (IDB)
    │   ├── indexedDBStorage.test.ts
    │   ├── mediaFormat.ts              # size / label helpers
    │   ├── mediaStorage.ts            # `idb:` blob get/put/delete
    │   ├── mediaStorage.test.ts
    │   ├── quizLogic.ts                # queue, scoring, requeue gaps (pure)
    │   ├── quizLogic.test.ts
    │   ├── rqzlArchive.ts              # .rqzl zip read/write, limits
    │   ├── rqzlArchive.test.ts
    │   ├── soundEffects.ts             # Web Audio feedback (correct, wrong, skip, continue)
    │   ├── typeGuards.ts               # `isRecord`, narrowers
    │   ├── useLongPress.ts            # touch long-press hook (menus)
    │   ├── useResolvedMediaUrl.ts     # `idb:` → object URL, revoke
    │   └── validationHelpers.ts
    └── components/
        ├── AnimatedBackground.tsx       # optional ambient background (accent)
        ├── AppModals.tsx              # shared confirm, prompt, simple modal
        ├── CenterArea.tsx              # current question, queue controls
        ├── ColorThemeApplier.tsx       # sync CSS vars to store
        ├── ContentEditor.tsx          # in-app subject/topic/question editor
        ├── ContextMenu.tsx            # reusable anchored menu
        ├── ErrorBoundary.tsx          # per-question error + skip
        ├── ExportOptionsModal.tsx     # format / progress / media options
        ├── inputs/                    # study-mode answer UIs
        │   ├── KeywordsInput.tsx
        │   ├── KeywordsInput.test.tsx
        │   ├── MatchingInput.tsx
        │   ├── MatchingInput.test.tsx
        │   ├── MultipleAnswerInput.tsx
        │   ├── MultipleAnswerInput.test.tsx
        │   ├── MultipleChoiceInput.tsx
        │   ├── MultipleChoiceInput.test.tsx
        │   ├── TrueFalseInput.tsx
        │   ├── TrueFalseInput.test.tsx
        │   ├── WordBankInput.tsx
        │   └── WordBankInput.test.tsx
        ├── Layout.tsx                 # shell: left/center/right slots, responsive drawers
        ├── LeftSidebar.tsx            # subjects, topics, editor link, export
        ├── leftSidebar/
        │   └── SidebarContextMenu.tsx  # subject/topic row actions
        ├── Logo.tsx
        ├── modalA11y.ts               # focus trap, restore, Escape
        ├── QuestionCard.tsx            # question shell + input dispatch
        ├── QuestionCard.test.tsx
        ├── RichText.tsx                # markdown-ish parser + code + math
        ├── RichText.test.tsx
        ├── RightSidebar.tsx           # tabs: mastery, import, settings
        ├── rightSidebar/
        │   ├── PendingMediaImportModal.tsx
        │   ├── PendingMediaImportModal.test.tsx
        │   ├── SidebarTabs.tsx
        │   ├── useImportWorkflow.ts   # import file flow state machine
        │   ├── useImportWorkflow.test.tsx
        │   └── settings/              # settings tab panels
        │       ├── PersonalizationSettingsSection.tsx
        │       ├── BehaviorSettingsSection.tsx
        │       ├── DataSettingsSection.tsx
        │       ├── LinksSettingsSection.tsx
        │       ├── ProfilesSettingsSection.tsx
        │       └── SettingsSwitchRow.tsx
        ├── ThemeToggle.tsx
        └── ThemeToggle.test.tsx
```

A `.test.ts` / `.test.tsx` file unit-tests the same-named source (e.g. `quizLogic.test.ts` → `quizLogic.ts`).

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

### `router.tsx` / `EditorPage.tsx` / `NotFoundPage.tsx`

- **`router.tsx`**: Declares the **study** layout route, the **`/edit`** editor route, and a **catch-all** 404 (both under the Vite `base`).
- **`EditorPage.tsx`**: Hosts `ContentEditor` for in-app authoring.
- **`NotFoundPage.tsx`**: Renders the app’s not-found state when a route is unknown.

### `appBaseUrl.ts`

Utilities for **canonical location** and **trailing-slash** normalization so root deployments, optional custom base paths, dev redirects, and reset behavior stay consistent.

### `importValidation.ts`

Handles JSON import validation:

- Validates structure and required fields
- Auto-generates IDs if not provided
- Extracts and groups media references
- Detects media conflicts (same filename, different content)

### `mediaStorage.ts`

IndexedDB wrapper for media:

- `storeMedia()` - Save a Blob/File
- `getMedia()` - Retrieve by ID
- `deleteMedia()` - Remove media
- `getAllMediaIds()` - List all stored media

Export/import helpers package media as binary files inside `.rqzl` ZIP archives (`manifest.json` + `media/*`) while runtime storage remains Blob-based.

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

Test files are co-located with their source files using the `.test.ts` or `.test.tsx` suffix. See the **`src/`** tree in [Project structure](#project-structure) for the full list.

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
| GitHub Actions | Deploys docs to GitHub Pages on push to `main`/`master` |

### Adding Pages

1. Create a new `.md` file in the root directory.
2. Add it to the sidebar in `.vitepress/config.ts`.
3. Use standard Markdown with VitePress extensions (containers, code highlighting, etc.).

---

## Contributing

### Workflow (`requizle-web`)

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear commits.
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Push and open a Pull Request.

### Workflow (`requizle-wiki`)

1. Fork the repository.
2. Create a feature branch: `git checkout -b docs/amazing-update`
3. Make your documentation changes.
4. Build docs locally: `npm run build`
5. Push and open a Pull Request.

**Changelog** (`changelog.md`): add **web app** user-facing updates as **dated** sections, **newest first** (sourced from [requizle-web](https://github.com/ReQuizle/requizle-web) `git log --date=short` author dates). Do not list wiki-only edits there. Same-day work can sit under one date.

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
