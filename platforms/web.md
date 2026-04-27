# Web App

The ReQuizle web app runs in any modern browser and can be installed as a Progressive Web App (PWA).

## Links

- **Live App**: [requizle.github.io/requizle-web](https://requizle.github.io/requizle-web/)
- **Source Code**: [github.com/ReQuizle/requizle-web](https://github.com/ReQuizle/requizle-web)

## Platform-Specific Features

### Installation (PWA)

ReQuizle can be installed as a standalone app:

1. Open the app in Chrome, Edge, or Safari
2. Click the install icon in the address bar (or "Add to Home Screen" on mobile)
3. The app will launch in its own window with offline support

### Data Storage

All data is stored locally in your browser using **IndexedDB**:

- **Storage quota**: Browser-managed and device-dependent (typically much larger than legacy LocalStorage limits)
- **Persistence**: Data persists until you clear browser data
- **Privacy**: No data leaves your device

::: warning Browser Storage
Clearing browser data or using "private/incognito" mode will delete your progress. Use the Export feature to back up your data.
:::

### Optional sound feedback

Quiz feedback uses the browser **Web Audio API** (short tones; no extra downloads). You can turn this off under **Settings → Personalization → Sound effects**. Some browsers only unlock audio after a click or tap on the page.

### Offline Support

Once loaded, the web app works offline thanks to service worker caching. Your study sessions won't be interrupted by network issues.

### Content editor

You can author and maintain decks inside the app (no import required for day-to-day edits):

- From the study UI, use **Edit content** under the ReQuizle title in the **left** sidebar.
- **Live**: [requizle.github.io/requizle-web/edit](https://requizle.github.io/requizle-web/edit) (same base path as the rest of the app).

The editor covers subjects, topics, all question types, and media; changes use the same IndexedDB storage as the rest of your profile.

### Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ Full support |
| Firefox 90+ | ✅ Full support |
| Safari 15+ | ✅ Full support |
| Edge 90+ | ✅ Full support |

### Keyboard Behavior

- Keyword answers submit with `Enter` while the answer field is focused.
- Buttons and dialogs use standard browser keyboard behavior, including `Enter` for focused buttons and `Escape` where a dialog or context menu supports closing.

## Development

See the [Development Guide](/development) for setup instructions and contribution guidelines.

```bash
git clone https://github.com/ReQuizle/requizle-web.git
cd requizle-web
npm install
npm run dev
```

The app uses Vite **`base: '/'`** by default. After starting the dev server, open `http://localhost:5173/`. The study UI loads there; the **content editor** is at `http://localhost:5173/edit`. For a subdirectory deployment, set `VITE_APP_BASE` before building, for example `/requizle-web/`.
