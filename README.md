# 🔮 The Tarot Reader

A beautiful, interactive tarot card reading web application built with React and Vite. Draw from a complete 78-card deck with Major and Minor Arcana for personalized, AI-generated readings.

![Tarot Reader](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

**[Try the Tarot Reader Now!](https://magical-starlight-702c3b.netlify.app/)**

Visit the live app deployed on Netlify to get your reading instantly.

## ✨ Features

- **🎴 Complete 78-Card Deck** - All Major Arcana and Minor Arcana suits (Wands, Cups, Swords, Pentacles)
- **📖 Multiple Spread Types**:
  - Single Card - Quick guidance on any question
  - Past · Present · Future - Understand your timeline
  - Five-Card Cross - Deep exploration of complex situations
- **🔄 Card Reversals** - Cards can appear upright or reversed with different meanings
- **💬 Personalized Questions** - Ask your own questions and get tailored readings
- **💾 Reading History** - All readings are automatically saved locally
  - View your most recent reading
  - Browse all previous readings with timestamps
  - Re-read any past divination
- **🎨 Mystical Design** - Dark, elegant interface with gold accents and animated elements
- **📱 Responsive Layout** - Works beautifully on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/michelle07-09/Tarot-Reading.git
cd Tarot-Reading

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

1. **Choose a Spread** - Select from three spread types on the home page
2. **Ask Your Question** - Enter a question (optional but recommended for better readings)
3. **Draw the Cards** - Click "DRAW THE CARDS" to begin
4. **Watch the Flip Animation** - Cards reveal themselves one by one
5. **Read the Interpretation** - Each card shows upright/reversed status and personalized meaning
6. **Browse Your History** - Revisit previous readings anytime

## 🛠️ Tech Stack

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **Vanilla CSS** - Styling with custom animations
- **LocalStorage API** - Reading persistence

## 📁 Project Structure

```
tarot_card/
├── src/
│   ├── tarot_reader.jsx    # Main component with all logic
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 📊 Card Data

### Major Arcana (22 cards)
The Fool, The Magician, The High Priestess, The Empress, The Emperor, The Hierophant, and more...

### Minor Arcana (56 cards)
- **Wands** (Fire) - Passion, Career, Energy
- **Cups** (Water) - Emotions, Relationships, Intuition
- **Swords** (Air) - Intellect, Conflict, Truth
- **Pentacles** (Earth) - Material, Body, Finances

Each suit has 14 cards (Ace through Ten, plus Page, Knight, Queen, King)

## 💾 Data Storage

All readings are saved to your browser's `localStorage`:
- Reading spread type
- All cards drawn and their orientations
- Your original question
- Timestamp of the reading

Data persists across browser sessions and page reloads.

## 🎨 Customization

To customize the appearance, edit the CSS in the `<style>` tag within `tarot_reader.jsx`:
- Color scheme uses `#c8a96e` (gold) and `#1a0e2e` (dark purple)
- Google Fonts: Cinzel and Cormorant Garamond
- Animations use CSS `@keyframes`

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

1. `npm run build`
2. Drag and drop the `dist/` folder to Netlify
3. Or connect your GitHub repo directly

### Option 3: GitHub Pages

```bash
npm install --save-dev gh-pages
```

Update `package.json`:
```json
{
  "homepage": "https://michelle07-09.github.io/Tarot-Reading",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

Then:
```bash
npm run deploy
```

## 📝 License

MIT License - feel free to use this for personal or commercial projects.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve the card interpretations
- Submit pull requests

## 📞 Support

For questions or issues, please open a GitHub issue or reach out to the repository owner.

---

*Seek wisdom in the cards. ✦ · ✦ · ✦*