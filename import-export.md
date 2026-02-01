# Import & Export

One of ReQuizle's most powerful features is the ability to import custom content and share full profiles.

## Importing Content

1. Open the **Right Sidebar**.
2. Click the **Import** tab.
3. Upload a file or paste JSON content.

### Supported File Types

| Extension | Content Type | Description |
|-----------|--------------|-------------|
| **`.rqzl`** | **Full Profile** | Includes all subjects, progress, settings, AND embedded media files. Best for backups and sharing. |
| **`.json`** | **Subjects/Profile** | Can contain subject lists or profile data. If importing a profile without embedded media, use this. |

## Exporting Profiles

To backup your data or share a deck with a friend:
1. Open the **Settings** tab (Right Sidebar).
2. Click the **Download** (Export) icon next to your profile.
3. This creates a `.rqzl` file containing all your data and images.

---

## JSON Format Reference

If you want to write your own quizzes manually, you can use the JSON format.

### Structure

```json
[
  {
    "name": "Biology 101",
    "topics": [
      {
        "name": "Cell Structure",
        "questions": [
          {
            "type": "multiple_choice",
            "question": "The powerhouse of the cell is...",
            "choices": ["Nucleus", "Mitochondria", "Ribosome"],
            "answerIndex": 1
          }
        ]
      }
    ]
  }
]
```

### Merging Behavior

- **New Content**: By default, imports add *new* subjects.
- **Updating**: If you provide an `id` field in your JSON that matches an existing subject/question, it will *update* that item instead of creating a duplicate.

### Question Types

All question types share these **common fields**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | ✅ | The question type (see below) |
| `question` or `prompt` | string | ✅ | The question text (supports LaTeX) |
| `id` | string | ❌ | Unique ID (auto-generated if omitted) |
| `explanation` | string | ❌ | Explanation shown after answering |
| `media` | string | ❌ | Image/video reference (URL, path, or data URI) |

#### Type-Specific Fields

| Type | Required Fields | Description |
|------|----------------|-------------|
| `multiple_choice` | `choices` (string[]), `answerIndex` (number) | Single correct answer from choices |
| `multiple_answer` | `choices` (string[]), `answerIndices` (number[]) | Multiple correct answers |
| `true_false` | `answer` (boolean) | True or false statement |
| `keywords` | `answer` (string or string[]) | Free-form text input; `caseSensitive` (optional, default: false) |
| `matching` | `pairs` ({left, right}[]) | Match all pairs correctly |
| `word_bank` | `sentence` (string with `_` blanks), `wordBank` (string[]), `answers` (string[]) | Fill blanks with words from bank |

### Media Handling

You can attach media to any question using the `media` field. ReQuizle supports three ways to reference media:

#### 1. Absolute URLs (Online)
Use this for images hosted on the web.
```json
"media": "https://upload.wikimedia.org/wikipedia/commons/my-image.jpg"
```
*   **Pros**: Small JSON file size.
*   **Cons**: Requires internet to view; links may break.

#### 2. Local File References (Virtual Paths)
Use this to reference files you have on your computer.
```json
"media": "images/cell-structure.png"
```
*   **How it works**: This string acts as a **unique identifier**.
*   **Discrimination**: ReQuizle uses the *entire string* to distinct files.
    *   If you have `"folderA/cat.png"` and `"folderB/cat.png"`, ReQuizle treats these as **different files** (Conflict).
    *   It will ask you to upload the file for `folderA`, and then separately for `folderB`.
*   **Absolute Paths**: You *can* use strings like `C:\Users\Name\Image.png`.
    *   **Note**: The browser CANNOT auto-load these from your disk (security restriction).
    *   However, they act as excellent unique labels so you know exactly which file to upload when prompted.

#### 3. Embedded Base64 (Portable)
Use this to create a single, standalone `.json` file with no external dependencies.
```json
"media": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA..."
```
*   **Pros**: One single file to share.
*   **Cons**: File size becomes very large (approx 1.3x image size).

### Conflict Resolution & Merging
 
When importing, ReQuizle merges data deeply using **IDs**:
 
1.  **Subjects**: If a Subject ID matches, it merges the topics.
2.  **Topics**: If a Topic ID matches, it merges the questions.
3.  **Questions**: If a Question ID matches, it **overwrites** the existing question with the new data.

*Tip: If you want to force a new copy of a question, give it a new ID.*

4.  **Media Conflicts**: If you upload a file named `diagram.png` but your library already has a *different* image named `diagram.png`, ReQuizle will warn you and allow you to resolve the conflict (e.g., replace or keep both).

### Comprehensive "Kitchen Sink" Example

Here is a complete example containing **all 6 question types** and every feature ReQuizle supports.

```json
[
  {
    "name": "Complete Demo",
    "topics": [
      {
        "name": "Math with LaTeX",
        "questions": [
          {
            "id": "q1_math",
            "type": "multiple_choice",
            "question": "Solve for \\(x\\): \\[ x^2 - 4 = 0 \\]",
            "choices": ["\\(x = 2\\)", "\\(x = \\pm 2\\)", "\\(x = 4\\)"],
            "answerIndex": 1,
            "explanation": "Using the difference of squares: \\(x^2 - 4 = (x+2)(x-2) = 0\\), so \\(x = \\pm 2\\)"
          },
          {
            "id": "q2_multi_answer",
            "type": "multiple_answer",
            "question": "Select ALL prime numbers:",
            "choices": ["2", "4", "5", "9", "11", "15"],
            "answerIndices": [0, 2, 4],
            "explanation": "2, 5, and 11 are prime. 4=2×2, 9=3×3, and 15=3×5 are composite."
          }
        ]
      },
      {
        "name": "Media Examples",
        "questions": [
          {
            "id": "q3_image_web",
            "type": "true_false",
            "question": "Is this a cat?",
            "media": "https://placekitten.com/200/300",
            "answer": true,
            "explanation": "Yes, the image shows a cat from placekitten.com"
          },
          {
            "id": "q4_image_local",
            "type": "keywords",
            "question": "What organelle is shown in 'mitochondria.png'?",
            "media": "mitochondria.png",
            "answer": ["mitochondria", "mitochondrion"],
            "caseSensitive": false
          }
        ]
      },
      {
        "name": "Complex Types",
        "questions": [
          {
            "id": "q5_matching",
            "type": "matching",
            "question": "Match the capital to the country:",
            "pairs": [
              {"left": "France", "right": "Paris"},
              {"left": "Japan", "right": "Tokyo"},
              {"left": "Brazil", "right": "Brasilia"}
            ]
          },
          {
            "id": "q6_wordbank",
            "type": "word_bank",
            "question": "Fill in the blanks:",
            "sentence": "The _ jumps over the _ dog.",
            "wordBank": ["quick", "lazy", "brown", "fox", "cat"],
            "answers": ["fox", "lazy"]
          }
        ]
      }
    ]
  }
]
```
