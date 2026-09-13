# 🎮 The Instigator Clipboard Manager

> **A chaotic, gamified Chrome Extension that turns clipboard idle time into an interactive arcade mini-game!**

---

## 🌟 Overview

**The Instigator Clipboard Manager** is a Chrome extension that adds a playful twist to your copy-paste workflow. When you copy text, the longer it sits in your clipboard, the more unstable it becomes!

If you paste within the **3-second safe window**, your text remains untouched. However, as idle time increases, letters escape from your clipboard into floating **2D Orbeez water beads**. Catch the Orbeez on your screen to recover your missing characters! If text sits idle for **1 minute or longer**, the entire payload is replaced with hilarious random statements, glitch glyphs, and emojis.

---

## ✨ Features

### 🎯 1. Zero-Gravity Orbeez Arcade Mini-Game
- When text degrades, letters escape into floating zero-gravity **Orbeez water beads**.
- Catch all Orbeez on your screen to restore your text back to 100% accuracy.
- Features dynamic Candy Crush style visual praise (*SWEET!*, *TASTY!*, *DELICIOUS!*) and celebratory confetti fanfares!

### ⏱️ 2. Time-Scaling Text Degradation & 1-Min Randomizer
- **0 - 3 Seconds**: 🛡️ Safe window — paste proceeds untouched.
- **3 - 60 Seconds**: 🧪 Letter stripping engine converts letters into zero-gravity Orbeez.
- **60+ Seconds (1 Minute)**: 🎲 Full text replacement with randomized statements, hot takes, emojis, and glitch glyphs.

### 🛡️ 3. Progression System & Upgrades
- **Victory Points (VP)**: Earn VP currency by completing mini-game text recoveries.
- **Nano-Shields**: Purchase shields with VP to deflect clipboard tampering.
- **Hyper-Magnet**: Unlock a magnetic tractor beam to pull floating Orbeez directly to your cursor.
- **Nemesis AI Level**: Dynamic difficulty scaling that escalates as you win mini-games.

### 🔊 4. Retro Audio & Visual FX
- 8-bit retro Mario-inspired chimes, 1-up sounds, and mission accomplishment victory fanfares.
- Cybernetic matrix decode animations, neon light glows, and screen shake FX.
- Custom options and popup dashboards built with React and Tailwind CSS.

---

## 🛠️ Languages & Tools Used

- **Programming Languages**: TypeScript, JavaScript (ES6+), HTML5, CSS3
- **Extension Standard**: Chrome Extension **Manifest V3**
- **Frameworks & UI**: React 18, Tailwind CSS, Lucide React Icons
- **Build Tools**: Vite 5, `@crxjs/vite-plugin`
- **Web APIs & Engine**:
  - **Clipboard API & Clipboard Events**: Intercepting and logging `copy`, `cut`, and `paste` events.
  - **Chrome Storage API**: `chrome.storage.sync` (user preferences, stats, progression) and `chrome.storage.local` (real-time cross-tab clipboard cache).
  - **Web Audio API**: Synthetic 8-bit retro sound chimes, jump sounds, and victory fanfares.
  - **Canvas 2D & Animation API**: Zero-gravity 2D Orbeez water bead physics simulation and `requestAnimationFrame`.

---

## 🚀 Installation & Run Steps

### Step 1: Install Dependencies & Build
Open your terminal in the project root directory and run:
```bash
# 1. Install project dependencies
npm install

# 2. Build the extension bundle into the dist/ directory
npm run build
```

### Step 2: Load Unpacked Extension into Chrome
1. Open Google Chrome and go to `chrome://extensions/` (or click **Settings > Extensions**).
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click the **Load unpacked** button in the top-left menu.
4. Browse to the project folder and select the `dist/` directory (created during `npm run build`).
5. The extension (**The Instigator Clipboard Manager**) will now be loaded and active on all websites!

---

## 📁 Project Structure

```
.
├── manifest.json         # Extension Manifest V3 configuration
├── package.json          # Project dependencies & build scripts
├── vite.config.ts        # Vite configuration with CRXJS plugin
├── src/
│   ├── assets/           # Extension icons and graphics
│   ├── background/       # Service worker background script
│   ├── content/          # Content scripts (Orbeez physics, degradation engine, DOM injector)
│   ├── options/          # React Options management page dashboard
│   ├── popup/            # Extension popup menu UI
│   ├── types/            # TypeScript interfaces & definitions
│   └── utils/            # Extension storage defaults & helper functions
```

---

## 🎮 How to Play

1. **Copy Any Text**: Copy any text selection on any website.
2. **Observe Clipboard Idle Time**:
   - Paste immediately (<3s) for unmodified text.
   - Wait 15-30s for Orbeez bubbles to break out on paste.
   - Wait 60s+ for complete random payload replacement.
3. **Catch Orbeez**: Click floating Orbeez water beads to recover stripped letters!

---

## 📄 License

MIT License. Designed for fun, experimentation, and interactive web experiences.
