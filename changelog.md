# Changelog

All notable, user-facing changes to the **ReQuizle** project are documented here.

## April 2026
### Added
- **In-app content editor**: Full-page editor at **`/edit`** (under the Vite base, e.g. **`https://requizle.github.io/requizle-web/edit`** for the GitHub Pages deployment) to create, rename, and delete **subjects**, **topics**, and **questions** without JSON; all six question types, **media upload and preview** (IndexedDB, same as imports), and trimming multiple-choice / multiple-answer options (minimum two choices). Open via **Edit content** under the logo in the left sidebar. **React Router** splits study UI and editor routes; **factory reset** and bookmarks respect the configured app base with trailing-slash normalization.
- **Subject export options**: Context menu can export **with progress** or **questions only** (optional `progress` in the JSON bundle).
- **Subject & topic context menus**: Right-click a subject or topic for export, resets, delete, and topic actions; on touch devices, **press and hold** the row to open the same menu. Keyboard users can also use the row action button.
- **Reset confirmations**: Settings toggles for confirming subject/topic progress resets; reset and quick-delete flows use in-app dialogs when confirmations are on.
- **Import drag & drop**: Drop `.rqzl` / `.json` files onto the Import area in addition to file pick and paste.
- **Settings layout**: Settings grouped into sections (Profiles, Appearance, Behavior, Data, Links) for easier navigation on mobile and desktop.
- **Appearance controls**: Toggle the animated background from Settings → Appearance.
- **Quiz behavior controls**: Configure re-queue after wrong answers and after skips, and set min/max reinsert spacing (defaults remain 4-6 positions).
- **Include mastered**: Toggling **Include mastered** now rebuilds the queue when a subject is active so the session matches the filter immediately.
- **Syntax Highlighting**: Syntax highlighting for code blocks using `react-syntax-highlighter` and the VS Code Dark theme.
- **Markdown Features**: Added `||hidden text||` formatting for spoilers, standard markdown tables, blockquotes, and links.
- **Inline Typography**: Added inline text formatting for `**bold**`, `*italic*`, `__underline__`, and `~~strikethrough~~`.
- **Error Boundary**: Broken or corrupted questions now display a graceful error card with a "Skip Question" button instead of crashing the entire application.
- **Sample topics**: Updated built-in examples to showcase the new Rich Text engine.

### Changed
- **Default study order**: New sessions use **Topic order** first; random shuffle is still one click away in the quiz header or Settings.
- **Media persistence/export format**: Runtime media storage is Blob-based in IndexedDB, and `.rqzl` exports are ZIP archives with `manifest.json` plus binary media files.
- **Export integrity safeguards**: Subject/profile archive export now fails with an explicit error if referenced local `idb:` media files are missing, instead of silently creating partial backups.
- **Archive import hardening**: `.rqzl` parsing now validates manifest/media paths more strictly and reports malformed manifests with clearer errors.

## February 2026
### Added
- GitHub navigation icon directly integrated into the Right Sidebar.
### Fixed
- Fixed an infinite loop structure preventing certain media imports.
### Changed
- Optimized build configuration to improve code chunking and performance.

## January 2026
### Added
- Inserted links tracking back to the new documentation Wiki inside the app sidebar.
### Changed
- Updated the underlying system responsible for exporting and importing `.rqzl` quiz files to be more resilient.

## December 2025
### Added
- **Media Support**: ReQuizle now supports attaching and viewing images and videos natively in questions.
- **IndexedDB**: Completely refactored internal storage to use IndexedDB, bypassing standard browser data storage limits for massive media files.
- **LaTeX Math Engine**: Added native rendering for `\(...\)` inline and `\[...\]` block math statements via KaTeX.
- **Progressive Web App (PWA)**: You can now install ReQuizle to your phone, tablet, or desktop home screens to use offline natively.
- **Confirmation Modals**: Delete warnings to prevent accidentally removing your profiles and subjects.
- **Branding**: ReQuizle officially implemented responsive sidebars, custom-themed scrollbars, SVG logos, and a custom icon suite.
- Clear Cache utility option in settings.
- Expanded example subjects to showcase all question types in action.

## November 2025
### Initial Launch
- ReQuizle officially begins development!
- Supported core 6 Question Types (Multiple Choice, Multiple Answer, True/False, Word Bank, Matching, Keywords).
- Implemented Spaced-repetition "Smart Queue" to automatically penalize and re-queue incorrect answers.
- Fully functional Dark Mode toggles.
- Multi-user distinct Profiles that individually track progress across subjects.
- "Shuffle" feature introduced.
