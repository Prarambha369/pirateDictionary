# 🏴‍☠️ Pirate Translator Hacklet

[![License](https://img.shields.io/badge/license-Apache-blue.svg)](LICENSE)

Ahoy, mateys! This README details the Pirate Translator Hacklet, a fun tool to turn any webpage into pirate speak.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Step-by-Step Usage Guide](#step-by-step-usage-guide)
- [Demo](#demo)
- [Running Locally](#running-locally)
- [Browser Compatibility](#browser-compatibility)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Overview
This project is a fun, open-source bookmarklet that translates any webpage into pirate speak, adding a humorous twist to online content. It's designed for quick deployment via bookmarks, with no server or dependencies required, making it accessible and entertaining for all users.

## Features
- 🔁 Real-time English to Pirate translation with over 250 slang replacements
- 💬 Random pirate exclamations like 'Arrr!' and 'Shiver me timbers!'
- 🎶 Optional sea shanty music with mute/unmute controls
- ✨ Flashing gold effect on translated words for visual feedback
- 🔄 Easy reset option to revert changes without reloading
- 🏴‍☠️ Custom favicon to enhance the pirate theme
- Persistence: Settings like sound and translation options are saved across sessions

## Step-by-Step Usage Guide
1. **Add to Bookmarks**: Drag the '🏴‍☠️ Pirate Mode' button from the website to your bookmarks bar.
2. **Navigate**: Go to any webpage you want to translate.
3. **Activate**: Click the bookmark to transform the page into pirate speak.
4. **Reset**: To return to normal, click the 'Reset to normal' link in the banner that appears.

The bookmarklet is self-contained and client-side:
- It scans the webpage's text nodes and replaces words using an embedded dictionary.
- Excluded elements (e.g., inputs, buttons) are skipped to avoid breaking functionality.
- Translation can be toggled on/off with reversibility for a seamless experience.
- No external servers are used; everything runs in the browser for privacy and speed.

## Demo
When activated, the Pirate Translator Hacklet:
1. Adds a pirate banner with a reset option.
2. Transforms text to pirate speak.
3. Applies a slight tilt for a 'sea-legs' effect.
4. Adds a toggle for optional sea shanty music.
5. Flashes translated words in gold.

## Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Prarambha369/pirate-translator.git
   cd pirate-translator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start a local server:
   ```bash
   npm start
   ```
4. Open `http://localhost:8080` in your browser.

## Browser Compatibility
The Pirate Translator Hacklet works in most modern browsers:
- Chrome/Chromium-based browsers (Chrome, Edge, Brave, etc.)
- Firefox
- Safari

Note: Some features like audio playback might be restricted due to browser policies.

## Contribution Guidelines
Contributions are welcome! Here's how you can help:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add more pirate translations to the dictionary
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License
Apache License © [MisterBashyal](https://github.com/Prarambha369)
