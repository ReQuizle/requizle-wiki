# Changelog

All notable, user-facing changes to the **ReQuizle** web app are listed **newest first**. Section **dates** match **author commit dates** in [requizle-web](https://github.com/ReQuizle/requizle-web). To check or add a date, run `git log --date=short` in that repository. Same-day batches are grouped in one heading.

## 26 April 2026
- **Settings → Appearance**: **accent** color (presets, **Monochrome**, or **Custom** hex), with panels and text chroma that follow the chosen accent. Optional **animated background**; **light/dark** is unchanged. Primary buttons use a contrast color so **Monochrome** in dark mode stays legible.
- **Export as** for **subjects** and **profiles** uses a shared **Export options** flow (replaces the old subject-only modal pattern), with the same kinds of choices for both. Small **CSS** cleanup the same day.

## 25 April 2026
- Merge **pull request #3** to `main`; refactors and fixes across components, store, and utilities.
- **Context menu**: show **reset** / **mark mastered** only when they apply; **README** updates for import formats and store description.

## 24 April 2026
- **JSZip** dependency; **lazy-loaded** study/editor routes; improved **media** handling and **routing** behavior.

## 23 April 2026
- Stronger **import validation** and **profile** handling; refactors in the **content editor** and **input** components.

## 22 April 2026
- **Audit**: nested rich text, **mobile overflow**, cleanup and normalization. Fix **wiki** link in a sample **question**; remove stale `ci.yml` on `gh-pages`.

## 20 April 2026
- **Content editor** at `/edit` with **React Router**; `requizle-web` app **base** and deployment/CI/`.gitignore` updates.
- **Subject/topic** **context menu**; **long-press** on touch; optional export **without progress**; in-app **reset/delete** confirmations; default **topic order**; inline export **error** line.
- **Settings** and import UX; configurable **re-queue** after wrong and skipped answers.
- **Rich text**: markdown **engine**, **code** syntax highlighting, and **ErrorBoundary** for bad question content. Remove debug sample from `App` (later same day).

## 11 April 2026
- **Fenced code blocks** in the rich text pipeline; `Latex` naming aligned to **RichText** (typo in commit message: `renamee`).

## 1 to 2 February 2026
- **GitHub** icon in the right sidebar; **fix** a bad loop in **media** import; **build** and **code-splitting** tuning; **README** install/features.

## 31 January 2026
- **Documentation** links in the right sidebar; **import/export** behavior updates.

## 8 December 2025
- **Responsive** shell: **sidebars**, **logo**, **favicon**, **metadata**; first **CI** (lint, test, build) and **ReQuizle** home/base URL. README, example data, and import **docs** updates.

## 9 December 2025
- **PWA** (install, **manifest**); **custom scrollbars**; **delete confirmation** for profiles and subjects; **logo**/icon asset refresh.

## 10 to 11 December 2025
- **10 Dec:** **README** update. **11 Dec:** **Core UI**; **light/dark** **ThemeContext**; **KaTeX** for **math** (merges the same week).

## 12 December 2025
- **Images and video** in questions; **IndexedDB** for the store and local **uploads**; README and types updated.

## 15 December 2025
- **Import** fixes; **clear cache**; smaller refactors and a redundant **button** removal.

## 22 to 28 December 2025
- **22 Dec:** README **LaTeX** wording. **27 Dec:** **License** link in README. **28 Dec:** small **CI** updates.

## 21 November 2025
- **First** commits: core **types**, **Multiple Answer**, `CenterArea`, `QuestionCard`, **GitHub Pages** base, **dark mode**, **profiles**, **tools** in the settings **tab**, and early **tests**.

## 22 November 2025
- **Layout** and sidebar **toggles**; **Matching** **shuffle**; more **validation**, **tests**, and **CI**; project **scaffold** and **AGPL** license on the new repo.

## November 2025
Early **prototype** and **shuffle** for matching; if you need exact days, use `git log` on a clone of [requizle-web](https://github.com/ReQuizle/requizle-web) (all dates above come from the same history as of the last time this file was updated).
