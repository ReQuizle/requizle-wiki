# User Guide

Welcome to the complete ReQuizle User Guide. This document covers everything you need to know to get the most out of ReQuizle.

## Getting Started

ReQuizle works with no account required. All your data stays on your device.

::: tip Platform-Specific Details
For installation instructions and platform-specific features, see the [Platforms](/platforms/web) section.
:::

### Quick Start

1. **Select a Subject**: Choose a subject from the left sidebar to begin studying.
2. **Select Topics** (Optional): Click on specific topics to focus your study session, or leave all selected to study the entire subject.
3. **Answer Questions**: Questions appear one at a time in the center. Submit your answer or skip to come back later.
4. **Track Progress**: View your mastery percentage for each subject and topic in the right sidebar.

---

## Features Overview

### Question Types

ReQuizle supports **6 different question types** to test your knowledge in various ways:

| Type | Description |
|------|-------------|
| **Multiple Choice** | Select one correct answer from a list of options. |
| **Multiple Answer** | Select all correct answers from a list (multiple can be correct). |
| **True/False** | Determine if a statement is true or false. |
| **Keywords** | Type the correct answer(s). Can accept multiple valid responses. |
| **Matching** | Match items from the left column to their corresponding items on the right. |
| **Word Bank** | Fill in the blanks by selecting words from a provided word bank. |

### Spaced Repetition & Smart Queue

ReQuizle uses a **dynamic queue system** for efficient learning:

- **New Session**: When you start studying, all questions from selected topics are loaded.
- **Shuffling**: In "Random" mode, questions are shuffled using the Fisher-Yates algorithm.
- **Mistake Re-queuing**: If you answer incorrectly, the question is **put back in the queue** a few places ahead so you see it again soon. By default that spacing is a random **4-6** positions; you can turn this off or change the range under **Settings → Behavior** (see below).
- **Skips**: Skipped questions use the same re-queue rules as wrong answers (also configurable).
- **Mastery**: Correct answers mark the question as "Mastered" and remove it from the active session (unless **Include mastered** is on).

::: tip
Toggle **"Include Mastered"** in the **left** sidebar (under the topic list) to review questions you've already mastered. Turning it on or off **rebuilds the queue** for the current subject so the session matches the new filter.
:::

### Mastery Tracking

Track your progress with detailed mastery statistics:

- **Per-Topic Mastery**: See your mastery percentage for each individual topic.
- **Per-Subject Mastery**: View overall mastery for the entire subject.
- **Active Session Stats**: See how many questions remain in your current queue.
- **Reset Progress**: Reset progress for any subject to start fresh.

### Study Modes

Choose how you want to study:

| Mode | Behavior |
|------|----------|
| **Random** | Questions are shuffled for variety. |
| **Topic Order** | Questions appear in the order they are defined within each topic. |

**Default** for new sessions is **Topic order**. You can switch modes from the **quiz header** (shuffle / list icon) or from **Settings → Behavior**; both update the same setting. While answer feedback is open for the current card, the header mode toggle is temporarily disabled to avoid mid-turn queue changes.

### Quiz behavior (Settings)

Under **Settings → Behavior** you can:

- Choose **Random** vs **Topic order** (same as the header control).
- Turn **Requeue after wrong answer** and **Requeue after skip** on or off.
- Set **Min / Max** spacing (positions ahead) when re-queueing; values are clamped to a sensible range.

**Confirmations** in the same section:

- **Confirm reset subject progress** and **Confirm reset topic progress**: when on, destructive resets use an in-app dialog; when off, they run immediately.
- **Confirm subject deletion** and **Confirm profile deletion**: when on, you must type the name to delete; when subject confirmation is off, delete runs immediately from the sidebar.

---

## User Interface

### Left Sidebar

The left sidebar contains:

- **Edit content**: Link under the ReQuizle title opens the **[content editor](#content-editor)** (full page) to manage subjects, topics, questions, and media.
- **Subject List**: All your subjects (whether added via import or the editor).
- **Topic Selection**: Click topics to include/exclude them from your study session.
- **Subject & topic context menus**: Open actions via **right-click**, **press and hold** (touch), or the **actions button** on each row for keyboard-friendly access. You can export, reset progress, delete a subject, or mark/reset topic mastery. Subject export can include progress or questions only.
- **Subject Actions**: Hover a subject row for the trash control (delete); other actions are in the context menu above.

### Center Area

The center area displays:

- **Question Card**: Shows the current question with its type badge.
- **Media**: Images or videos attached to questions (if any).
- **Answer Input**: Interactive input appropriate for the question type.
- **Feedback**: After answering, see if you were correct and view any explanation.
- **Confetti**: Celebrate correct answers with confetti animations!

### Right Sidebar

The right sidebar has three tabs:

1. **Mastery**: View progress statistics for the current subject.
2. **Import**: Import new content via **file upload**, **drag and drop** on the import area, or **paste JSON** and apply.
3. **Settings**: Organized into sections (**Profiles**, **Appearance**, **Behavior**, **Data**, **Links & help**) for profiles, theme, quiz behavior, data tools, and documentation links.

---

## Content editor

ReQuizle includes a **full-page content editor** so you can build decks without writing JSON.

### How to open it

- Click **Edit content** in the **left** sidebar (under the logo), or
- Go directly to **`/edit`** after the app base URL (for example [requizle.github.io/requizle-web/edit](https://requizle.github.io/requizle-web/edit) when hosted, or `http://localhost:5173/edit` when running the dev server locally). If you build the app with a custom `VITE_APP_BASE`, place `/edit` under that base path.

The study UI and editor are separate routes; your data is shared (same profile and IndexedDB).

### What you can do

- **Subjects**: Add, rename, or delete subjects (destructive actions use the same in-app confirmation patterns as elsewhere).
- **Topics**: Add, rename, or delete topics within a subject.
- **Questions**: Add questions for any of the **six** supported types; edit prompts, answers, explanations, and type-specific fields.
- **Multiple choice / multiple answer**: Add or remove answer choices (at least **two** choices must remain).
- **Media**: Attach images or videos per question; preview and remove attachments. Uploaded media is stored locally as Blob-backed IndexedDB entries (`idb:` references).

Changes save into your active profile the same way as study progress.

---

## Profiles

ReQuizle supports **multiple profiles** for different users or study contexts.

### Managing Profiles

- **Create**: In **Settings → Profiles**, use **New Profile** (or the **+** flow shown there).
- **Switch**: Click any profile to switch to it.
- **Rename**: Click the pencil icon to rename a profile.
- **Delete**: Click the trash icon to delete a profile (requires typing the profile name to confirm).
- **Export**: Click the download icon to export a profile as a `.rqzl` file.
- **Export errors**: If a profile references local media that no longer exists in IndexedDB, export fails with an explicit error instead of silently creating a partial archive.

### What's Stored Per Profile

Each profile contains:

- All subjects and their questions
- Progress data (mastery, attempts, streaks)
- Current session state (selected subject/topics, queue position)

---

## LaTeX Support

ReQuizle fully supports **LaTeX math equations** for scientific and mathematical content.

### Syntax

| Type | Syntax | Example |
|------|--------|---------|
| **Inline Math** | `\(...\)` | The derivative of `\(x^2\)` is `\(2x\)`. |
| **Block Math** | `\[...\]` | `\[ \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} \]` |

### Where LaTeX Works

LaTeX rendering works in:

- Question prompts
- Answer choices (Multiple Choice, Multiple Answer)
- Explanations
- Word Bank sentences

---

## Rich Text & Markdown Support

ReQuizle supports markdown parsing for text formatting.

### Supported Markdown Elements

| Feature | Syntax | Output |
|---------|--------|--------|
| **Bold** | `**text**` | **text** |
| **Italic** | `*text*` | *text* |
| **Underline** | `__text__` | <ins>text</ins> |
| **Strikethrough** | `~~text~~` | ~~text~~ |
| **Spoilers** | `\|\|hidden\|\|` | Reveals text on hover |
| **Code Blocks** | ` ```language ` | Syntax highlighted code block |
| **Inline Code** | `` `code` `` | Formatted inline string |
| **Links** | `[text](url)` | Clickable URL |
| **Blockquotes** | `> quote` | Block quotation |
| **Tables** | `\| A \| B \|` | Standard markdown data tables |

---

## Media Support

Enhance your questions with **images and videos**.

### Supported Formats

- **Images**: PNG, JPG, GIF, WebP, SVG
- **Videos**: MP4, WebM, OGG, MOV, AVI, MKV

### How to Add Media

- **In the app**: Use the **[content editor](#content-editor)** to upload and preview media per question.
- **Via import**: Use the JSON import format (see [Import/Export](/import-export)):
  1. **URL**: Link to an online image/video.
  2. **Local File**: Reference a file path, then upload when prompted.
  3. **Base64**: Embed the media directly in the JSON.

---

## Appearance

ReQuizle includes appearance settings for comfortable studying in any lighting condition.

- Toggle the theme under **Settings → Appearance**.
- Turn the animated background on or off from the same section.
- Your preferences are saved automatically.

---

## Progressive Web App (PWA)

ReQuizle can be **installed as an app** on your device:

### Installation

- **Desktop (Chrome/Edge)**: Click the install icon in the address bar.
- **Mobile (iOS)**: Tap Share → "Add to Home Screen".
- **Mobile (Android)**: Tap the menu → "Install App" or "Add to Home Screen".

### Benefits

- Works offline (after initial load)
- App-like experience with no browser UI
- Quick access from your home screen or app drawer

---

## Data & Privacy

### Local Storage

All ReQuizle data is stored **locally on your device**:

- **State Data**: Stored in IndexedDB (profiles, progress, session state).
- **Media Files**: Stored in IndexedDB (images, videos).

### No Tracking

- No accounts required
- No data sent to servers
- No analytics or tracking
- Your data never leaves your device

### Backup Your Data

To prevent data loss:

1. Go to **Settings** → Click the **Export** icon next to your profile.
2. Save the `.rqzl` file somewhere safe.
3. To restore, use the **Import** tab and upload your backup file.

::: warning
Data can be lost if you clear app data. Always export backups of important study materials!
:::

---

## Troubleshooting

### Questions Not Loading

- Ensure you have selected a subject from the left sidebar.
- Check that you have questions in the selected topics.
- If the queue is empty because everything is mastered, enable **Include mastered** (left sidebar) or use **Start Over** on the completion screen. Changing topic selection or **Random / Topic order** also rebuilds the queue.

### Media Not Displaying

- If you imported with local file paths, ensure you uploaded the corresponding files.
- Check that URLs are accessible (not blocked by CORS or expired).

### Progress Not Saving

- Ensure you're not in incognito/private browsing mode.
- Check that your browser has sufficient storage space.
- Try exporting and re-importing your profile.

### Import Errors

- Verify your JSON is valid (use a JSON validator).
- Check that all required fields are present for each question type.
- See the [Import/Export documentation](/import-export) for the correct format.
