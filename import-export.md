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
| `multiple_choice` | `choices` (array), `answerIndex` (number) |
| `multiple_answer` | `choices` (array), `answerIndices` (number array) |
| `true_false` | `answer` (boolean) |
| `keywords` | `answer` (string or string array) |
| `matching` | `pairs` (array of `{left, right}`) |
| `word_bank` | `sentence` (with `_` for blanks), `wordBank` (array), `answers` (array) |

### Media Support

You can add images/videos to any question.

1. **Online URLs**: `"media": "https://example.com/image.png"`
2. **Local Files**: `"media": "my-image.png"` (You will be asked to upload `my-image.png` during the import process).

### LaTeX Support

Use `\( ... \)` for inline math and `\[ ... \]` for block equations.

```json
{
  "question": "Solve for \\(x\\): \\[ x^2 = 4 \\]"
}
```
