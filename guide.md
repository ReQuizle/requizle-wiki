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
- **Mistake Re-queuing**: If you answer incorrectly, the question is **re-inserted 4-6 positions later** in the queue to force immediate recall.
- **Mastery**: Correct answers mark the question as "Mastered" and remove it from the active session.

::: tip
Toggle **"Include Mastered"** in the right sidebar to review questions you've already mastered!
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

---

## User Interface

### Left Sidebar

The left sidebar contains:

- **Subject List**: All your imported subjects.
- **Topic Selection**: Click topics to include/exclude them from your study session.
- **Subject Actions**: Delete subjects or reset progress.

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
2. **Import**: Import new content via file upload or JSON paste.
3. **Settings**: Manage profiles, export data, and configure preferences.

---

## Profiles

ReQuizle supports **multiple profiles** for different users or study contexts.

### Managing Profiles

- **Create**: Click the "+" button in Settings to create a new profile.
- **Switch**: Click any profile to switch to it.
- **Rename**: Click the pencil icon to rename a profile.
- **Delete**: Click the trash icon to delete a profile (requires typing the profile name to confirm).
- **Export**: Click the download icon to export a profile as a `.rqzl` file.

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

## Media Support

Enhance your questions with **images and videos**.

### Supported Formats

- **Images**: PNG, JPG, GIF, WebP, SVG
- **Videos**: MP4, WebM, OGG, MOV

### How to Add Media

Media can be added via the JSON import format (see [Import/Export](/import-export)):

1. **URL**: Link to an online image/video.
2. **Local File**: Reference a file path, then upload when prompted.
3. **Base64**: Embed the media directly in the JSON.

---

## Dark Mode

ReQuizle includes a **built-in dark mode** for comfortable studying in any lighting condition.

- Toggle the theme using the sun/moon icon in the sidebar.
- Your preference is saved automatically.

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
- Try clicking "Restart Queue" in the right sidebar.

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
