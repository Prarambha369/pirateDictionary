# 🏴‍☠️ Pirate Translator Hacklet

[![License](https://img.shields.io/badge/license-Apache-blue.svg)](LICENSE)

Ahoy, mateys! This README details the Pirate Translator Hacklet, a fun tool to turn any webpage into pirate speak.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Comparison of Pirate Modes](#comparison-of-pirate-modes)
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
- 🎶 Optional sea shanty music with mute/unmute controls and browser-compatible handling
- ✨ Flashing gold effect on translated words for visual feedback
- 🔄 Easy reset and toggle functionality for seamless switching without reloads
- 🏴‍☠️ Custom favicon and pirate-themed styling to immerse users
- Persistence: Saves user settings like sound and translation preferences using localStorage for a better experience
- Accessibility: Improved with ARIA labels and roles for better screen reader support

## Comparison of Pirate Modes

| Aspect | Classic Pirate Mode | Enhanced Pirate UI                                                                                                                                                               |
|--------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description** | ✓ Basic bookmarklet for simple text translation to pirate speak. | ✓ Advanced bookmarklet with a floating control panel for interactive features.                                                                                                   |
| **Key Features** | ✓ - Real-time translation<br>- Banner with reset<br>- Music toggle | ✓ - All Classic features plus search, tooltips, settings persistence, and speech synthesis                                                                                       |
| **How It Works** | ✓ Fetches and runs a lightweight JS script that translates text nodes, adds a banner, and handles music playback directly in the browser. | ✓ Fetches and runs a more complex JS script that includes a floating UI, allowing users to search translations, adjust settings, and use voice synthesis for spoken pirate text. |
| **Intended Use** | ✓ Ideal for quick, fun translations on any webpage with minimal overhead, suitable for users wanting simplicity. | ✓ Designed for users seeking a richer experience with additional tools, like customizing translations or using voice features, making it more engaging for prolonged use.        |
| **Performance** | ✓ Lightweight and fast, with low resource usage. | ✓ Slightly heavier due to UI elements, but still efficient and client-side.                                                                                                      |
| **Accessibility** | ✓ Basic support with ARIA labels for core elements. | ✓ Enhanced accessibility, including full ARIA roles, settings for customization, and better support for screen readers.                                                          |
| **Speech Synthesis** | ✗ Not available; text is only visually translated. | ✓ Included, with options to hear translated text spoken in pirate voice using Web Speech API. **(Soon)**                                                                         |
| **Gold Flash Effect** | ✓ Words flash gold briefly after translation. | ✓ Inherited from Classic, with potential for more customization in the UI.                                                                                                       |

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
   git clone https://github.com/Prarambha369/pirateDictionary.git
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
