# Import & Export

ReQuizle allows you to import custom content and export full profiles for backup or sharing.

## Importing Content

1. Open the **Right Sidebar** and click the **Import** tab.
2. Upload a file or paste JSON directly.
3. The import type is automatically detected.

### Supported File Types

| Extension | Content | Description |
|-----------|---------|-------------|
| **`.rqzl`** | Full Profile | Includes subjects, progress, settings, AND embedded media. Best for backups and sharing. |
| **`.json`** | Subjects or Profile | Subject lists or profile data without embedded media. |

## Exporting Profiles

1. Open the **Settings** tab in the right sidebar.
2. Click the **Download** icon next to your profile.
3. This creates a `.rqzl` file containing all your data and images.

---

## JSON Format Reference

You can write your own quizzes using a simple JSON format. IDs are auto-generated if not provided.

### Structure Overview

```
Subject (top level)
├── name: "Biology 101"
├── id: (optional, for merging)
└── topics: [
    └── Topic
        ├── name: "Cell Structure"
        ├── id: (optional, for merging)
        └── questions: [
            └── Question
                ├── type: "multiple_choice"
                ├── question: "..."
                ├── id: (optional, for merging)
                └── (type-specific fields)
        ]
]
```

### Complete Example

Here's a complete example showing **all 6 question types**:

```json
[
  {
    "name": "Example Subject",
    "topics": [
      {
        "name": "All Question Types",
        "questions": [
          {
            "type": "multiple_choice",
            "question": "What is the capital of France?",
            "choices": ["London", "Paris", "Berlin", "Madrid"],
            "answerIndex": 1,
            "explanation": "Paris is the capital of France."
          },
          {
            "type": "multiple_answer",
            "question": "Select all prime numbers:",
            "choices": ["2", "4", "5", "9"],
            "answerIndices": [0, 2],
            "explanation": "2 and 5 are prime. 4 and 9 are composite."
          },
          {
            "type": "true_false",
            "question": "The Earth is flat.",
            "answer": false,
            "explanation": "The Earth is roughly spherical."
          },
          {
            "type": "keywords",
            "question": "What gas do plants absorb from the air?",
            "answer": ["carbon dioxide", "co2"],
            "caseSensitive": false,
            "explanation": "Plants absorb CO2 for photosynthesis."
          },
          {
            "type": "matching",
            "question": "Match the countries to their capitals:",
            "pairs": [
              { "left": "Japan", "right": "Tokyo" },
              { "left": "Italy", "right": "Rome" },
              { "left": "Egypt", "right": "Cairo" }
            ]
          },
          {
            "type": "word_bank",
            "question": "Complete the sentence:",
            "sentence": "The _ is the powerhouse of the _.",
            "wordBank": ["mitochondria", "cell", "nucleus", "atom"],
            "answers": ["mitochondria", "cell"]
          }
        ]
      }
    ]
  }
]
```

---

## Field Reference

### Subject

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Display name |
| `topics` | ✅ | Array of topics |
| `id` | ❌ | Auto-generated if not provided. Provide to enable merging. |

### Topic

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Display name |
| `questions` | ✅ | Array of questions |
| `id` | ❌ | Auto-generated if not provided. Provide to enable merging. |

### Question (Common Fields)

| Field | Required | Description |
|-------|----------|-------------|
| `type` | ✅ | One of: `multiple_choice`, `multiple_answer`, `true_false`, `keywords`, `matching`, `word_bank` |
| `question` | ✅ | The question text (or use `prompt`). Supports LaTeX. |
| `id` | ❌ | Auto-generated if not provided. Provide to enable merging. |
| `explanation` | ❌ | Shown after answering. Supports LaTeX. |
| `media` | ❌ | Image/video URL, data URI, or filename. |

### Type-Specific Fields

| Type | Required Fields | Description |
|------|----------------|-------------|
| `multiple_choice` | `choices` (string[]), `answerIndex` (number) | Single correct answer |
| `multiple_answer` | `choices` (string[]), `answerIndices` (number[]) | Multiple correct answers |
| `true_false` | `answer` (boolean) | True or false |
| `keywords` | `answer` (string or string[]), optional `caseSensitive` | Free-form text input |
| `matching` | `pairs` ({left, right}[]) | Match all pairs correctly |
| `word_bank` | `sentence` (with `_` blanks), `wordBank` (string[]), `answers` (string[]) | Fill blanks from word bank |

---

## Merging Behavior

By default, each import creates new content with unique auto-generated IDs. This prevents accidental data loss.

**To update existing content**, provide explicit matching `id` values:

```json
// First import - creates new subject with ID "bio-101"
{"id": "bio-101", "name": "Biology", "topics": [...]}

// Later import - updates the same subject because ID matches
{"id": "bio-101", "name": "Biology", "topics": [...]}
```

**Without explicit IDs**, importing the same file twice creates separate copies:

```json
{"name": "Biology", ...}  // Creates "Biology" with ID "subject-abc-0"
{"name": "Biology", ...}  // Creates another "Biology" with ID "subject-abc-1"
```

### Merge Rules

1. **Subjects**: If a Subject ID matches, topics are merged.
2. **Topics**: If a Topic ID matches, questions are merged.
3. **Questions**: If a Question ID matches, it **overwrites** the existing question.

::: tip
To force a new copy of a question, give it a new or no ID.
:::

---

## Media Support

Questions can include images or videos that display above the prompt.

### Supported Formats

- **Images**: PNG, JPG, GIF, WebP, SVG
- **Videos**: MP4, WebM, OGG, MOV, AVI, MKV

### 1. Online URLs (Recommended)

```json
{
  "question": "What organ is highlighted in this diagram?",
  "media": "https://example.com/anatomy-diagram.png"
}
```

For videos:
```json
{
  "question": "Watch and identify the process shown",
  "media": "https://example.com/mitosis.mp4"
}
```

**Pros**: Small file size. **Cons**: Requires internet; links may break.

### 2. Base64 Data URIs (Portable)

```json
{
  "question": "Identify this structure",
  "media": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
}
```

**Pros**: Single standalone file. **Cons**: Large file size (~1.3x the image).

### 3. Local File References (with Upload)

Reference files by name, you'll be prompted to upload them during import:

```json
{
  "question": "What is the capital marked on this map?",
  "media": "europe-map.png"
}
```

When importing, a modal will list the required files. Select them from your computer, and they'll be stored locally in your browser.

::: warning Media Conflicts
If you upload a file named `diagram.png` but already have a *different* `diagram.png` stored, ReQuizle will warn you and let you choose how to resolve the conflict.
:::

---

## LaTeX Support

You can include mathematical notation in questions, choices, explanations, and answers.

### Syntax

| Type | Syntax | Example |
|------|--------|---------|
| **Inline** | `\(...\)` | `"The formula \(E = mc^2\) describes..."` |
| **Block** | `\[...\]` | `"Solve: \[x^2 - 4 = 0\]"` |

::: tip Why not `$...$`?
ReQuizle uses `\(...\)` instead of `$...$` to avoid conflicts with literal dollar signs (e.g., "$50").
:::

### Example with LaTeX

```json
{
  "type": "multiple_choice",
  "question": "Solve for \\(x\\) in the equation \\(2x + 5 = 15\\)",
  "choices": ["\\(x = 5\\)", "\\(x = 10\\)", "\\(x = 7.5\\)", "\\(x = 2\\)"],
  "answerIndex": 0,
  "explanation": "Subtract 5: \\(2x = 10\\), then divide by 2: \\(x = 5\\)"
}
```

::: warning JSON Escaping
In JSON, backslashes must be escaped. Write `\\(` instead of `\(`.
:::

---

## Profile Export Format (`.rqzl`)

When you export a profile, it creates a `.rqzl` file (which is just JSON) containing:

```json
{
  "id": "profile-id",
  "name": "My Profile",
  "subjects": [...],
  "progress": {...},
  "session": {...},
  "createdAt": 1234567890,
  "_media": [
    {
      "id": "media-uuid",
      "data": "data:image/png;base64,...",
      "filename": "diagram.png"
    }
  ]
}
```

The `_media` array contains all embedded images/videos, making the file completely portable.
