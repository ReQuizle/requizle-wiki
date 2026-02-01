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

| Type | Required Fields |
|------|----------------|
| `multiple_choice` | `choices` (array of strings), `answerIndex` (number, 0-based) |
| `multiple_answer` | `choices` (array of strings), `answerIndices` (array of numbers) |
| `true_false` | `answer` (boolean) |
| `keywords` | `answer` (string or array of accepted strings) |
| `matching` | `pairs` (array of objects: `{left: string, right: string}`) |
| `word_bank` | `sentence` (string with `_` for blanks), `wordBank` (array of strings), `answers` (array of strings matching blanks in order) |

### Media Handling

You can attach media to any question using the `media` field. ReQuizle supports three ways to reference media:

#### 1. Absolute URLs (Online)
Use this for images hosted on the web.
```json
"media": "https://upload.wikimedia.org/wikipedia/commons/my-image.jpg"
```
*   **Pros**: Small JSON file size.
*   **Cons**: Requires internet to view; links may break.

#### 2. Relative Paths (Local Upload)
Use this when you want to provide image files alongside your JSON.
```json
"media": "images/cell-structure.png"
```
OR simply:
```json
"media": "cell-structure.png"
```
*   **Behavior**: When you import this JSON, ReQuizle will detect these paths and **prompt you to upload the corresponding files**.
*   **Folder Structure**: The path acts as a unique ID. If two questions use `images/A.png` and `misc/A.png`, ReQuizle treats them as different files and will ask for both.

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
3.  **Media Conflicts**: If you upload a file named `diagram.png` but your library already has a *different* image named `diagram.png`, ReQuizle will warn you and allow you to resolve the conflict (e.g., replace or keep both).

### Comprehensive "Kitchen Sink" Example

Here is a file containing every feature ReQuizle supports.

```json
[
  {
    "name": "Advanced Demo",
    "topics": [
      {
        "name": "Media & Math",
        "questions": [
          {
            "id": "q1_math",
            "type": "multiple_choice",
            "question": "Solve for \\(x\\): \\[ x^2 - 4 = 0 \\]",
            "choices": ["\\(x = 2\\)", "\\(x = \\pm 2\\)", "\\(x = 4\\)"],
            "answerIndex": 1
          },
          {
            "id": "q2_image_web",
            "type": "true_false",
            "question": "Is this a cat?",
            "media": "https://placekitten.com/200/300",
            "answer": true
          },
          {
            "id": "q3_image_local",
            "type": "keywords",
            "question": "What organelle is shown in 'mitochondria.png'?",
            "media": "mitochondria.png",
            "answer": ["mitochondria", "mitochondrion"]
          }
        ]
      },
      {
        "name": "Complex Types",
        "questions": [
          {
            "id": "q4_matching",
            "type": "matching",
            "question": "Match the capital to the country",
            "pairs": [
              {"left": "France", "right": "Paris"},
              {"left": "Japan", "right": "Tokyo"},
              {"left": "Brazil", "right": "Brasilia"}
            ]
          },
          {
            "id": "q5_wordbank",
            "type": "word_bank",
            "question": "Fill in the blanks",
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
