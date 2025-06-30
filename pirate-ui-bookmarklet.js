// Enhanced Pirate Translator Bookmarklet with Floating UI
// Self-contained implementation with advanced features

(() => {
  // Prevent multiple instances
  if (window.pirateTranslatorActive) {
    return; // Log removed for production
  }
  window.pirateTranslatorActive = true;

  // Embedded pirate dictionary from pirateDictionary.json for unification
  const pirateDictionary = {
    "hello": "ahoy",
    "end": "avast",
    "friend": "matey",
    "sir": "matey",
    "madam": "proud beauty",
    "stranger": "scurvy dog",
    "boy": "lad",
    "girl": "lass",
    "man": "buccaneer",
    "woman": "wench",
    "the": "thar",
    "my": "me",
    "we": "wme",
    "is": "be",
    "are": "be",
    "you": "ye",
    "your": "yer",
    "me": "I",
    "to": "ta",
    "for": "fer",
    "with": "wit",
    "and": "n'",
    "but": "an'",
    "this": "dis",
    "that": "dat",
    "there": "dere",
    "where": "whar",
    "when": "whene'er",
    "why": "fer what",
    "what": "whut",
    "who": "who be",
    "how": "how be",
    "can": "kin",
    "could": "couldn'",
    "will": "willin'",
    "would": "wouldn'",
    "should": "shouldn'",
    "must": "mustn'",
    "have": "hafta",
    "has": "hath",
    "had": "hadn'",
    "do": "doin'",
    "does": "doin'",
    "did": "didn'",
    "say": "speak",
    "said": "spoke",
    "go": "sail",
    "went": "sail'd",
    "come": "sail",
    "came": "sail'd",
    "see": "spy",
    "saw": "spied",
    "look": "spy",
    "looked": "spied",
    "hear": "hearken",
    "heard": "hearkened",
    "eat": "gobble",
    "ate": "gobbled",
    "drink": "swig",
    "drank": "swigged",
    "sleep": "slumber",
    "slept": "slumbered",
    "talk": "gab",
    "talked": "gabb'd",
    "laugh": "chortle",
    "laughed": "chortled",
    "cry": "blubber",
    "cried": "blubbered",
    "hurt": "blow",
    "hurted": "blowed",
    "help": "aid",
    "helped": "aided",
    "love": "adore",
    "loved": "adored",
    "hate": "loathe",
    "hated": "loathed",
    "like": "fancy",
    "liked": "fancied",
    "want": "desire",
    "wanted": "desired",
    "need": "require",
    "needed": "required",
    "give": "bequeath",
    "gave": "bequeathed",
    "take": "seize",
    "took": "seized",
    "buy": "purchase",
    "bought": "purchased",
    "sell": "trade",
    "sold": "traded",
    "find": "discover",
    "found": "discovered",
    "lose": "misplace",
    "lost": "misplaced",
    "make": "forge",
    "made": "forged",
    "create": "forge",
    "created": "forged",
    "build": "construct",
    "built": "constructed",
    "break": "shatter",
    "broke": "shattered",
    "fix": "repair",
    "fixed": "repaired",
    "work": "labor",
    "working": "laborin'",
    "play": "frolic",
    "played": "frolicked",
    "sing": "chant",
    "sang": "chanted",
    "dance": "jig",
    "danced": "jigged",
    "swim": "float",
    "swam": "floated",
    "run": "dash",
    "ran": "dasht",
    "walk": "stroll",
    "walked": "strolled",
    "drive": "sail",
    "drove": "sail'd",
    "ride": "sail",
    "rode": "sail'd",
    "fly": "flap",
    "flew": "flapped",
    "fire": "blast",
    "fired": "blasted",
    "throw": "blow",
    "threw": "blown",
    "catch": "take",
    "caught": "taken",
    "carry": "bear",
    "carried": "bore",
    "open": "unseal",
    "opened": "unsealed",
    "close": "seal",
    "closed": "sealed",
    "start": "set sail",
    "started": "set sail'd",
    "stop": "avast",
    "stopped": "avasted",
    "yes": "aye",
    "no": "nay",
    "good": "shipshape",
    "bad": "foul",
    "great": "grand",
    "small": "puny",
    "big": "huge",
    "fast": "swift",
    "slow": "sluggish",
    "happy": "jolly",
    "sad": "melancholy",
    "angry": "wrathful",
    "afraid": "fearful",
    "brave": "valiant",
    "coward": "lily-livered",
    "rich": "wealthy",
    "poor": "destitute",
    "strong": "mighty",
    "weak": "feeble",
    "alive": "livin'",
    "dead": "deceased",
    "life": "existence",
    "death": "demise",
    "treasure": "booty",
    "gold": "doubloons",
    "silver": "pieces of eight",
    "money": "coin",
    "ship": "vessel",
    "boat": "skiff",
    "sea": "briny deep",
    "ocean": "vast ocean",
    "land": "shore",
    "island": "isle",
    "beach": "sandy shore",
    "water": "sea water",
    "wind": "breeze",
    "storm": "tempest",
    "rain": "showers",
    "sun": "solar orb",
    "moon": "lunar orb",
    "star": "twinkling light",
    "sky": "heavens",
    "cloud": "mist",
    "day": "daylight",
    "night": "darkness",
    "morning": "dawn",
    "evening": "dusk",
    "time": "hour",
    "week": "seven-day period",
    "hour": "sixty minutes",
    "minute": "sixty seconds",
    "second": "instant",
    "now": "this moment",
    "later": "after a spell",
    "soon": "in a jiffy",
    "always": "forevermore",
    "never": "not ever",
    "sometimes": "at times",
    "often": "frequently",
    "rarely": "seldom",
    "again": "once more",
    "once": "one time",
    "twice": "two times",
    "thrice": "three times",
    "many": "a lot",
    "few": "a handful",
    "all": "every last one",
    "none": "not a one",
    "some": "a few",
    "more": "extra",
    "less": "fewer",
    "enough": "sufficient",
    "too much": "excessive",
    "too little": "insufficient",
    "zero": "naught",
    "one": "single",
    "two": "double",
    "three": "triple",
    "four": "quadruple",
    "five": "quintuple",
    "six": "sextuple",
    "seven": "septuple",
    "eight": "octuple",
    "nine": "nonuple",
    "ten": "decuple",
    "hundred": "century",
    "thousand": "millennium",
    "million": "mega",
    "billion": "giga",
    "trillion": "tera",
    "number": "digit",
    "count": "tally",
    "add": "sum",
    "subtract": "deduct",
    "multiply": "times",
    "divide": "split",
    "equal": "same",
    "not equal": "different",
    "greater than": "more than",
    "less than": "fewer than",
    "percent": "percentage",
    "amount": "quantity",
    "total": "sum total",
    "part": "portion",
    "whole": "entirety",
    "half": "moiety",
    "quarter": "fourth",
    "third": "triad",
    "first": "foremost",
    "last": "final",
    "next": "following",
    "previous": "prior",
    "before": "afore",
    "after": "behind",
    "above": "over",
    "below": "under",
    "inside": "within",
    "outside": "without",
    "year": "yoar",
    "month": "moor"
  };

  const pirateExclamations = [
    "Arrr!", "Shiver me timbers!", "Blimey!", "Yo-ho-ho!", "Avast ye!",
    "Batten down the hatches!", "Splice the mainbrace!", "Dead men tell no tales!",
    "Fifteen men on a dead man's chest!", "Pieces of eight!"
  ];

  // State management
  let state = {
    translationEnabled: false,
    fullPageTranslation: false,
    soundEnabled: false,
    excludeElements: ['button', 'input', 'textarea', 'select', 'a'],
    originalTexts: new Map(),
    translatedElements: new Set(),
    hoveredElement: null
  };

  // Save state to localStorage
  const saveState = () => {
    localStorage.setItem('pirateTranslatorState', JSON.stringify(state));
  };

  // Load saved state from localStorage
  const loadState = () => {
    const savedState = localStorage.getItem('pirateTranslatorState');
    if (savedState) {
      Object.assign(state, JSON.parse(savedState));
    }
  };

  loadState();

  // Translation functions
  const translateToPirate = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const regex = new RegExp(`\\b(${Object.keys(pirateDictionary).join("|")})\\b`, "gi");
    return text.replace(regex, (match) => {
      const lowerMatch = match.toLowerCase();
      return pirateDictionary[lowerMatch] || match;
    });
  };

  const addPirateExclamations = (text) => {
    const sentences = text.split(/([.!?])/);
    return sentences
      .map((sentence, index) => {
        if (index % 2 === 0 && Math.random() < 0.1) {
          return `${pirateExclamations[Math.floor(Math.random() * pirateExclamations.length)]} ${sentence}`;
        }
        return sentence;
      })
      .join("");
  };

  // Web Speech API integration
  const speakPirateText = (text) => {
    console.log('Speaking pirate text:', text);
    if (!state.soundEnabled || !window.speechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 0.7;
    utterance.volume = 0.8;
    
    // Try to find a voice that sounds more pirate-like
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('English') && voice.name.includes('Male')
    ) || voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    speechSynthesis.speak(utterance);
  };

  // CSS Styles for the floating UI
  const injectStyles = () => {
    const style = document.createElement('style');
    style.id = 'pirate-translator-styles';
    style.textContent = `
      /* Pirate Translator Floating UI Styles */
      .pirate-ui-container {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
        border-left: 3px solid #d4af37;
        box-shadow: -5px 0 20px rgba(0,0,0,0.5);
        z-index: 999999;
        font-family: 'Arial', sans-serif;
        color: #fff;
        transition: right 0.3s ease-in-out;
        overflow-y: auto;
      }
      
      .pirate-ui-container.open {
        right: 0;
      }
      
      .pirate-toolbar {
        position: fixed;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        
        width: 60px;
        height: 60px;
        background: linear-gradient(145deg, #d4af37, #f1c40f);
        border-radius: 50%;
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 1000000;
        user-select: none;
        transition: transform 0.2s;
      }
      
      .pirate-toolbar:hover {
        transform: translateY(-50%) scale(1.1);
      }
      
      .pirate-toolbar.dragging {
        transform: translateY(-50%) scale(0.9);
        opacity: 0.8;
      }
      
      .pirate-header {
        background: linear-gradient(145deg, #000, #333);
        padding: 20px;
        text-align: center;
        border-bottom: 2px solid #d4af37;
      }
      
      .pirate-header h2 {
        margin: 0;
        color: #d4af37;
        font-size: 18px;
        font-weight: bold;
      }
      
      .pirate-content {
        padding: 20px;
      }
      
      .pirate-section {
        margin-bottom: 25px;
        padding: 15px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        border-left: 3px solid #d4af37;
      }
      
      .pirate-section h3 {
        margin: 0 0 15px 0;
        color: #d4af37;
        font-size: 16px;
      }
      
      .pirate-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .pirate-switch {
        position: relative;
        width: 50px;
        height: 25px;
        background: #333;
        border-radius: 25px;
        cursor: pointer;
        transition: background 0.3s;
      }
      
      .pirate-switch.active {
        background: #d4af37;
      }
      
      .pirate-switch::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 21px;
        height: 21px;
        background: white;
        border-radius: 50%;
        transition: left 0.3s;
      }
      
      .pirate-switch.active::after {
        left: 27px;
      }
      
      .pirate-search {
        width: 100%;
        padding: 10px;
        background: rgba(255,255,255,0.1);
        border: 1px solid #d4af37;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
      }
      
      .pirate-search::placeholder {
        color: #ccc;
      }
      
      .pirate-search:focus {
        outline: none;
        border-color: #f1c40f;
        box-shadow: 0 0 5px rgba(212,175,55,0.5);
      }
      
      .pirate-translation-display {
        background: rgba(0,0,0,0.3);
        border-radius: 5px;
        padding: 15px;
        margin-top: 10px;
        min-height: 100px;
        max-height: 200px;
        overflow-y: auto;
      }
      
      .translation-pair {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 5px;
        background: rgba(255,255,255,0.05);
        border-radius: 3px;
      }
      
      .original-text {
        color: #ccc;
        flex: 1;
      }
      
      .pirate-text {
        color: #d4af37;
        flex: 1;
        font-weight: bold;
        text-align: right;
      }
      
      .pirate-button {
        background: linear-gradient(145deg, #d4af37, #f1c40f);
        color: #000;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
        margin-top: 10px;
        transition: transform 0.2s;
      }
      
      .pirate-button:hover {
        transform: translateY(-2px);
      }
      
      .pirate-button:active {
        transform: translateY(0);
      }
      
      .pirate-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: #d4af37;
        font-size: 20px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .pirate-tooltip {
        position: absolute;
        background: rgba(0,0,0,0.9);
        color: #d4af37;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        pointer-events: none;
        z-index: 1000001;
        border: 1px solid #d4af37;
        box-shadow: 0 2px 10px rgba(0,0,0,0.5);
      }
      
      .pirate-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: #d4af37;
      }
      
      .pirate-highlight {
        background-color: rgba(212,175,55,0.3) !important;
        transition: background-color 0.3s !important;
        cursor: pointer !important;
      }
      
      .pirate-flash {
        animation: pirateFlash 0.5s ease-in-out;
      }
      
      @keyframes pirateFlash {
        0%, 100% { background-color: transparent; }
        50% { background-color: #d4af37; }
      }
      
      .settings-grid {
        display: grid;
        gap: 10px;
      }
      
      .checkbox-group {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .pirate-checkbox {
        width: 18px;
        height: 18px;
        accent-color: #d4af37;
      }
      
      .search-results {
        max-height: 150px;
        overflow-y: auto;
        margin-top: 10px;
      }
      
      .search-result {
        padding: 8px;
        background: rgba(255,255,255,0.05);
        margin-bottom: 5px;
        border-radius: 3px;
        cursor: pointer;
        transition: background 0.2s;
      }
      
      .search-result:hover {
        background: rgba(212,175,55,0.2);
      }
    `;
    document.head.appendChild(style);
  };

  // Create draggable toolbar
  const createToolbar = () => {
    console.log('Creating toolbar...');
    const toolbar = document.createElement('div');
    toolbar.className = 'pirate-toolbar';
    toolbar.innerHTML = '🏴‍☠️';
    toolbar.title = 'Pirate Translator - Click to open panel, drag to move';
    
    let isDragging = false;
    let startX, startY, startTop, startRight;
    
    toolbar.addEventListener('mousedown', (e) => {
      isDragging = true;
      toolbar.classList.add('dragging');
      startX = e.clientX;
      startY = e.clientY;
      const rect = toolbar.getBoundingClientRect();
      startTop = rect.top;
      startRight = window.innerWidth - rect.right;
      
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      e.preventDefault();
    });
    
    const handleDrag = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newTop = Math.max(0, Math.min(window.innerHeight - 60, startTop + deltaY));
      const newRight = Math.max(10, Math.min(window.innerWidth - 60, startRight - deltaX));
      
      toolbar.style.top = newTop + 'px';
      toolbar.style.right = newRight + 'px';
      toolbar.style.transform = 'none';
    };
    
    const handleDragEnd = (e) => {
      if (!isDragging) return;
      
      isDragging = false;
      toolbar.classList.remove('dragging');
      
      // If it was just a click (minimal movement), toggle panel
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);
      
      if (deltaX < 5 && deltaY < 5) {
        togglePanel();
      }
      
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
    
    document.body.appendChild(toolbar);
    return toolbar;
  };

  // Create floating UI panel
  const createFloatingPanel = () => {
    console.log('Creating floating panel...');
    const container = document.createElement('div');
    container.className = 'pirate-ui-container';
    container.innerHTML = `
      <div class="pirate-header">
        <h2>🏴‍☠️ Pirate Translator</h2>
        <button class="pirate-close" onclick="this.closest('.pirate-ui-container').classList.remove('open')">×</button>
      </div>
      
      <div class="pirate-content">
        <!-- Translation Controls -->
        <div class="pirate-section">
          <h3>⚙️ Translation Controls</h3>
          <div class="pirate-toggle">
            <span>Enable Translation</span>
            <div class="pirate-switch" id="translation-toggle"></div>
          </div>
          <div class="pirate-toggle">
            <span>Full Page Mode</span>
            <div class="pirate-switch" id="fullpage-toggle"></div>
          </div>
          <div class="pirate-toggle">
            <span>Sound Effects</span>
            <div class="pirate-switch" id="sound-toggle"></div>
          </div>
          <button class="pirate-button" id="translate-page-btn">🏴‍☠️ Translate Entire Page</button>
        </div>
        
        <!-- Word Search -->
        <div class="pirate-section">
          <h3>🔍 Pirate Dictionary Search</h3>
          <input type="text" class="pirate-search" id="word-search" placeholder="Search for English words...">
          <div class="search-results" id="search-results"></div>
        </div>
        
        <!-- Translation Display -->
        <div class="pirate-section">
          <h3>📝 Translation Preview</h3>
          <div class="pirate-translation-display" id="translation-display">
            <div style="text-align: center; color: #666; padding: 20px;">
              Hover over text or use search to see translations
            </div>
          </div>
        </div>
        
        <!-- Settings -->
        <div class="pirate-section">
          <h3>⚙️ Settings</h3>
          <div class="settings-grid">
            <div class="checkbox-group">
              <input type="checkbox" class="pirate-checkbox" id="exclude-buttons" checked>
              <label for="exclude-buttons">Exclude Buttons</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" class="pirate-checkbox" id="exclude-links" checked>
              <label for="exclude-links">Exclude Links</label>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" class="pirate-checkbox" id="exclude-inputs" checked>
              <label for="exclude-inputs">Exclude Form Inputs</label>
            </div>
          </div>
          <button class="pirate-button" id="reset-page-btn">🔄 Reset Page</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    return container;
  };

  // Toggle panel visibility
  const togglePanel = () => {
    const panel = document.querySelector('.pirate-ui-container');
    panel.classList.toggle('open');
  };

  // Modify translateElement to avoid wrapping certain elements and store original text for easy reversal
  const translateElement = (element) => {
    console.log('Starting translation on element:', element);
    if (!element || typeof element !== 'object') return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      if (!state.excludeElements.some(tag => node.parentElement.tagName.toLowerCase() === tag)) {
        const originalText = node.nodeValue;
        const translatedText = addPirateExclamations(translateToPirate(originalText));
        const span = document.createElement('span');
        span.className = 'pirate-translated';
        span.textContent = translatedText;
        span.dataset.originalText = originalText; // Store original for reversal
        node.parentNode.replaceChild(span, node);
        state.translatedElements.add(span); // Track for reversal
      }
    }
    console.log('Translation completed for element. Translated elements count:', state.translatedElements.size);
  };

  // Improve restoreElement to reverse translations without reloading
  const restoreElement = (element) => {
    state.translatedElements.forEach(translatedSpan => {
      if (translatedSpan.parentNode) {
        const originalTextNode = document.createTextNode(translatedSpan.dataset.originalText);
        translatedSpan.parentNode.replaceChild(originalTextNode, translatedSpan);
      }
    });
    state.translatedElements.clear(); // Clear after restoration
  };

  // Hover tooltip functionality
  const createTooltip = (text, x, y) => {
    console.log('Hover event triggered on element:', text);
    const existing = document.querySelector('.pirate-tooltip');
    if (existing) existing.remove();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'pirate-tooltip';
    tooltip.textContent = translateToPirate(text);
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 40) + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
      if (tooltip.parentNode) tooltip.remove();
    }, 3000);
  };

  // Search functionality
  const setupSearch = () => {
    const searchInput = document.getElementById('word-search');
    const searchResults = document.getElementById('search-results');
    
    searchInput.addEventListener('input', (e) => {
      console.log('Search input event handled with query:', e.target.value);
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      
      if (query.length < 2) return;
      
      const matches = Object.entries(pirateDictionary)
        .filter(([english, pirate]) => 
          english.includes(query) || pirate.includes(query)
        )
        .slice(0, 10);
      
      matches.forEach(([english, pirate]) => {
        const result = document.createElement('div');
        result.className = 'search-result';
        result.innerHTML = `
          <div class="translation-pair">
            <span class="original-text">${english}</span>
            <span class="pirate-text">${pirate}</span>
          </div>
        `;
        
        result.addEventListener('click', () => {
          if (state.soundEnabled) {
            speakPirateText(pirate);
          }
          updateTranslationDisplay(english, pirate);
        });
        
        searchResults.appendChild(result);
      });
    });
  };

  // Update translation display
  const updateTranslationDisplay = (original, pirate) => {
    console.log('Updating translation display for text:', original);
    const display = document.getElementById('translation-display');
    const pair = document.createElement('div');
    pair.className = 'translation-pair';
    pair.innerHTML = `
      <span class="original-text">${original}</span>
      <span class="pirate-text">${pirate}</span>
    `;
    
    display.insertBefore(pair, display.firstChild);
    
    // Keep only last 10 translations
    while (display.children.length > 10) {
      display.removeChild(display.lastChild);
    }
  };

  // Event handlers
  const setupEventHandlers = () => {
    // Toggle switches
    document.getElementById('translation-toggle').addEventListener('click', function() {
      console.log('Enable Translation toggled. New state: ' + (state.translationEnabled ? 'enabled' : 'disabled'));
      state.translationEnabled = !state.translationEnabled;
      this.classList.toggle('active', state.translationEnabled);
      if (state.translationEnabled) {
        console.log('Calling translateElement on document body');
        translateElement(document.body);
        setupHoverListeners();
      } else {
        restoreElement(document.body);
        removeHoverListeners();
      }
      saveState();
    });
    
    document.getElementById('fullpage-toggle').addEventListener('click', function() {
      state.fullPageTranslation = !state.fullPageTranslation;
      this.classList.toggle('active', state.fullPageTranslation);
      saveState();
    });
    
    document.getElementById('sound-toggle').addEventListener('click', function() {
      state.soundEnabled = !state.soundEnabled;
      this.classList.toggle('active', state.soundEnabled);
      saveState();
    });
    
    // Buttons
    document.getElementById('translate-page-btn').addEventListener('click', () => {
      console.log('Translate Entire Page button clicked. Enabling translation and translating page.');
      state.translationEnabled = true;  // Ensure translation is enabled
      translateElement(document.body);
    });
    
    document.getElementById('reset-page-btn').addEventListener('click', () => {
      location.reload();
    });
    
    // Settings checkboxes
    ['exclude-buttons', 'exclude-links', 'exclude-inputs'].forEach(id => {
      document.getElementById(id).addEventListener('change', updateExcludeSettings);
    });
  };

  // Update exclude settings
  const updateExcludeSettings = () => {
    console.log('Exclude settings updated. New exclude elements:', state.excludeElements);
    state.excludeElements = [
      ...document.getElementById('exclude-buttons').checked ? ['button'] : [],
      ...document.getElementById('exclude-links').checked ? ['a'] : [],
      ...document.getElementById('exclude-inputs').checked ? ['input', 'textarea', 'select'] : []
    ].flat();
    saveState();
  };

  // Hover listeners for tooltips
  const setupHoverListeners = () => {
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
  };

  const removeHoverListeners = () => {
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
  };

  const handleMouseOver = (e) => {
    console.log('Hover event triggered on element:', e.target);
    if (!state.translationEnabled) return;
    
    const element = e.target;
    if (state.excludeElements.includes(element.tagName.toLowerCase())) return;
    
    const text = element.textContent?.trim();
    if (text && text.length > 0 && text.length < 100) {
      const pirateText = translateToPirate(text);
      if (pirateText !== text) {
        element.classList.add('pirate-highlight');
        createTooltip(text, e.pageX, e.pageY);
        
        // Click to speak
        const clickHandler = () => {
          if (state.soundEnabled) {
            speakPirateText(pirateText);
          }
          updateTranslationDisplay(text, pirateText);
          element.removeEventListener('click', clickHandler);
        };
        element.addEventListener('click', clickHandler);
      }
    }
  };

  const handleMouseOut = (e) => {
    e.target.classList.remove('pirate-highlight');
    const tooltip = document.querySelector('.pirate-tooltip');
    if (tooltip) tooltip.remove();
  };

  // Initialize the pirate translator
  const init = () => {
    console.log('🏴‍☠️ Enhanced Pirate Translator initializing...');
    try {
      // Load saved state from localStorage
      const savedState = localStorage.getItem('pirateTranslatorState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        Object.assign(state, parsedState);
        console.log('State loaded successfully:', parsedState);
      } else {
        console.log('No saved state found');
      }
      
      // Update UI elements to reflect loaded state
      const translationToggle = document.getElementById('translation-toggle');
      if (translationToggle) {
        translationToggle.classList.toggle('active', state.translationEnabled);
      } else {
        console.error('Element not found: translation-toggle');
      }
      const fullpageToggle = document.getElementById('fullpage-toggle');
      if (fullpageToggle) {
        fullpageToggle.classList.toggle('active', state.fullPageTranslation);
      } else {
        console.error('Element not found: fullpage-toggle');
      }
      const soundToggle = document.getElementById('sound-toggle');
      if (soundToggle) {
        soundToggle.classList.toggle('active', state.soundEnabled);
      } else {
        console.error('Element not found: sound-toggle');
      }
      const excludeButtons = document.getElementById('exclude-buttons');
      if (excludeButtons) {
        excludeButtons.checked = state.excludeElements.includes('button');
      } else {
        console.error('Element not found: exclude-buttons');
      }
      const excludeLinks = document.getElementById('exclude-links');
      if (excludeLinks) {
        excludeLinks.checked = state.excludeElements.includes('a');
      } else {
        console.error('Element not found: exclude-links');
      }
      const excludeInputs = document.getElementById('exclude-inputs');
      if (excludeInputs) {
        excludeInputs.checked = state.excludeElements.some(el => ['input', 'textarea', 'select'].includes(el));
      } else {
        console.error('Element not found: exclude-inputs');
      }
      
      // Inject styles
      injectStyles();
      console.log('Styles injected');
      
      // Create UI elements
      const toolbar = createToolbar();
      console.log('Toolbar created');
      const panel = createFloatingPanel();
      panel.classList.add('open');  // Ensure UI is open by default
      console.log('Panel created');
      
      // Setup functionality
      setupSearch();
      console.log('Search setup complete');
      setupEventHandlers();
      console.log('Event handlers setup complete');
      
      // Set initial state
      updateExcludeSettings();
      console.log('Exclude settings updated');
      
      console.log('Pirate Translator initialized successfully');
    } catch (error) {
      console.error('Error in init function:', error);
    }
  };

  // Start the application
  init();

  // Cleanup function
  window.removePirateTranslator = () => {
    // Remove all pirate elements
    document.querySelectorAll('.pirate-ui-container, .pirate-toolbar, #pirate-translator-styles').forEach(el => el.remove());
    
    // Remove event listeners
    removeHoverListeners();
    
    // Restore original texts
    state.originalTexts.forEach((originalText, element) => {
      if (element.parentNode) {
        element.textContent = originalText;
      }
    });
    
    // Reset state
    window.pirateTranslatorActive = false;
  };

})();