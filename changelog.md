# Changelog

All notable, user-facing changes to the **ReQuizle** project are documented here.

## April 2026
### Added
- **Syntax Highlighting**: Syntax highlighting for code blocks using `react-syntax-highlighter` and the VS Code Dark theme.
- **Markdown Features**: Added `||hidden text||` formatting for spoilers, standard markdown tables, blockquotes, and links.
- **Inline Typography**: Added inline text formatting for `**bold**`, `*italic*`, `__underline__`, and `~~strikethrough~~`.
- **Error Boundary**: Broken or corrupted questions now display a graceful error card with a "Skip Question" button instead of crashing the entire application.
- Updated default sample topics to showcase the new Rich Text engine.

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
- **LaTeX Math Engine**: Added native rendering for `$X^2$` inline and block math statements via KaTeX.
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
