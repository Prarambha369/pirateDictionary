// Pirate Translator Bookmarklet (Refactored)

(() => {
  if (window.pirateTranslatorActive) return;
  window.pirateTranslatorActive = true;

  // Pirate dictionary (truncated for brevity)
  const pirateDictionary = {
    "hello": "ahoy",
    "end": "avast",
    "friend": "matey",
    // ... (rest of dictionary)
    "month": "moor"
  };

  const pirateExclamations = [
    "Arrr!", "Shiver me timbers!", "Blimey!", "Yo-ho-ho!", "Avast ye!",
    "Batten down the hatches!", "Splice the mainbrace!", "Dead men tell no tales!",
    "Fifteen men on a dead man's chest!", "Pieces of eight!"
  ];

  let state = {
    translationEnabled: false,
    fullPageTranslation: false,
    soundEnabled: false,
    excludeElements: ['button', 'input', 'textarea', 'select', 'a'],
    translatedElements: new Set(),
    soundAudio: null
  };

  // State persistence
  const saveState = () => localStorage.setItem('pirateTranslatorState', JSON.stringify(state));
  const loadState = () => {
    const saved = localStorage.getItem('pirateTranslatorState');
    if (saved) Object.assign(state, JSON.parse(saved));
  };
  loadState();

  // Translation logic
  const translateToPirate = (text) => {
    if (!text || typeof text !== 'string') return text;
    const regex = new RegExp(`\\b(${Object.keys(pirateDictionary).join("|")})\\b`, "gi");
    return text.replace(regex, (match) => pirateDictionary[match.toLowerCase()] || match);
  };
  const addPirateExclamations = (text) => {
    const sentences = text.split(/([.!?])/);
    return sentences.map((sentence, i) =>
        (i % 2 === 0 && Math.random() < 0.1)
            ? `${pirateExclamations[Math.floor(Math.random() * pirateExclamations.length)]} ${sentence}`
            : sentence
    ).join("");
  };

  // UI Styles
  const injectStyles = () => {
    if (document.getElementById('pirate-translator-styles')) return;
    const style = document.createElement('style');
    style.id = 'pirate-translator-styles';
    style.textContent = `
      .pirate-ui-container { position: fixed; top: 0; right: -400px; width: 400px; height: 100vh; background: #222; border-left: 3px solid #d4af37; z-index: 999999; color: #fff; transition: right 0.3s; overflow-y: auto; }
      .pirate-ui-container.open { right: 0; }
      .pirate-toolbar { position: fixed; top: 50%; right: 10px; width: 60px; height: 60px; background: #d4af37; border-radius: 50%; cursor: move; display: flex; align-items: center; justify-content: center; font-size: 24px; z-index: 1000000; user-select: none; }
      .pirate-header { background: #111; padding: 20px; text-align: center; border-bottom: 2px solid #d4af37; }
      .pirate-header h2 { margin: 0; color: #d4af37; font-size: 18px; }
      .pirate-section { margin-bottom: 25px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #d4af37; }
      .pirate-switch { width: 50px; height: 25px; background: #333; border-radius: 25px; cursor: pointer; position: relative; }
      .pirate-switch.active { background: #d4af37; }
      .pirate-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 21px; height: 21px; background: white; border-radius: 50%; transition: left 0.3s; }
      .pirate-switch.active::after { left: 27px; }
      .pirate-search { width: 100%; padding: 10px; background: rgba(255,255,255,0.1); border: 1px solid #d4af37; border-radius: 5px; color: #fff; }
      .pirate-translation-display { background: rgba(0,0,0,0.3); border-radius: 5px; padding: 15px; margin-top: 10px; min-height: 100px; max-height: 200px; overflow-y: auto; }
      .translation-pair { display: flex; justify-content: space-between; margin-bottom: 8px; padding: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; }
      .original-text { color: #ccc; flex: 1; }
      .pirate-text { color: #d4af37; flex: 1; font-weight: bold; text-align: right; }
      .pirate-button { background: #d4af37; color: #000; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px; }
      .pirate-close { position: absolute; top: 10px; right: 15px; background: none; border: none; color: #d4af37; font-size: 20px; cursor: pointer; }
      .pirate-tooltip { position: absolute; background: #111; color: #d4af37; padding: 8px 12px; border-radius: 5px; font-size: 14px; font-weight: bold; pointer-events: none; z-index: 1000001; border: 1px solid #d4af37; }
      .pirate-highlight { background-color: rgba(212,175,55,0.3) !important; cursor: pointer !important; }
    `;
    document.head.appendChild(style);
  };

  // Toolbar
  const createToolbar = () => {
    if (document.querySelector('.pirate-toolbar')) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'pirate-toolbar';
    toolbar.innerHTML = '🏴‍☠️';
    toolbar.title = 'Pirate Translator - Click to open panel, drag to move';
    let isDragging = false, startX, startY, startTop, startRight;
    toolbar.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX; startY = e.clientY;
      const rect = toolbar.getBoundingClientRect();
      startTop = rect.top; startRight = window.innerWidth - rect.right;
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      e.preventDefault();
    });
    const handleDrag = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX, deltaY = e.clientY - startY;
      const newTop = Math.max(0, Math.min(window.innerHeight - 60, startTop + deltaY));
      const newRight = Math.max(10, Math.min(window.innerWidth - 60, startRight - deltaX));
      toolbar.style.top = newTop + 'px';
      toolbar.style.right = newRight + 'px';
      toolbar.style.transform = 'none';
    };
    const handleDragEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (Math.abs(e.clientX - startX) < 5 && Math.abs(e.clientY - startY) < 5) togglePanel();
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
    document.body.appendChild(toolbar);
  };

  // Floating Panel
  const createFloatingPanel = () => {
    if (document.querySelector('.pirate-ui-container')) return;
    const container = document.createElement('div');
    container.className = 'pirate-ui-container';
    container.innerHTML = `
      <div class="pirate-header">
        <h2>🏴‍☠️ Pirate Translator</h2>
        <button class="pirate-close" onclick="this.closest('.pirate-ui-container').classList.remove('open')">×</button>
      </div>
      <div class="pirate-section">
        <h3>Translation Controls</h3>
        <div class="pirate-toggle"><span>Enable Translation</span><div class="pirate-switch" id="translation-toggle"></div></div>
        <div class="pirate-toggle"><span>Full Page Mode</span><div class="pirate-switch" id="fullpage-toggle"></div></div>
        <div class="pirate-toggle"><span>Sound Effects</span><div class="pirate-switch" id="sound-toggle"></div></div>
        <button class="pirate-button" id="translate-page-btn">Translate Entire Page</button>
      </div>
      <div class="pirate-section">
        <h3>Pirate Dictionary Search</h3>
        <input type="text" class="pirate-search" id="word-search" placeholder="Search for English words...">
        <div class="search-results" id="search-results"></div>
      </div>
      <div class="pirate-section">
        <h3>Translation Preview</h3>
        <div class="pirate-translation-display" id="translation-display">
          <div style="text-align: center; color: #666; padding: 20px;">Hover over text or use search to see translations</div>
        </div>
      </div>
      <div class="pirate-section">
        <h3>Settings</h3>
        <div>
          <input type="checkbox" id="exclude-buttons" checked> Exclude Buttons
          <input type="checkbox" id="exclude-links" checked> Exclude Links
          <input type="checkbox" id="exclude-inputs" checked> Exclude Form Inputs
        </div>
        <button class="pirate-button" id="reset-page-btn">Reset Page</button>
      </div>
    `;
    document.body.appendChild(container);
    container.classList.add('open');
  };

  // Panel toggle
  const togglePanel = () => {
    const panel = document.querySelector('.pirate-ui-container');
    if (panel) panel.classList.toggle('open');
  };

  // Translate/restore logic
  const translateElement = (element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      if (!state.excludeElements.some(tag => node.parentElement.tagName.toLowerCase() === tag)) {
        const originalText = node.nodeValue;
        const translatedText = addPirateExclamations(translateToPirate(originalText));
        if (originalText !== translatedText) {
          const span = document.createElement('span');
          span.className = 'pirate-translated';
          span.textContent = translatedText;
          span.dataset.originalText = originalText;
          node.parentNode.replaceChild(span, node);
          state.translatedElements.add(span);
        }
      }
    }
  };
  const restoreElement = () => {
    state.translatedElements.forEach(span => {
      if (span.parentNode) {
        const originalTextNode = document.createTextNode(span.dataset.originalText);
        span.parentNode.replaceChild(originalTextNode, span);
      }
    });
    state.translatedElements.clear();
  };

  // Tooltip
  const createTooltip = (text, x, y) => {
    const existing = document.querySelector('.pirate-tooltip');
    if (existing) existing.remove();
    const tooltip = document.createElement('div');
    tooltip.className = 'pirate-tooltip';
    tooltip.textContent = translateToPirate(text);
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 40) + 'px';
    document.body.appendChild(tooltip);
    setTimeout(() => { if (tooltip.parentNode) tooltip.remove(); }, 2000);
  };

  // Search
  const setupSearch = () => {
    const searchInput = document.getElementById('word-search');
    const searchResults = document.getElementById('search-results');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      searchResults.innerHTML = '';
      if (query.length < 2) return;
      Object.entries(pirateDictionary)
          .filter(([en, pi]) => en.includes(query) || pi.includes(query))
          .slice(0, 10)
          .forEach(([en, pi]) => {
            const result = document.createElement('div');
            result.className = 'search-result';
            result.innerHTML = `<div class="translation-pair"><span class="original-text">${en}</span><span class="pirate-text">${pi}</span></div>`;
            result.addEventListener('click', () => updateTranslationDisplay(en, pi));
            searchResults.appendChild(result);
          });
    });
  };

  // Translation display
  const updateTranslationDisplay = (original, pirate) => {
    const display = document.getElementById('translation-display');
    const pair = document.createElement('div');
    pair.className = 'translation-pair';
    pair.innerHTML = `<span class="original-text">${original}</span><span class="pirate-text">${pirate}</span>`;
    display.insertBefore(pair, display.firstChild);
    while (display.children.length > 10) display.removeChild(display.lastChild);
  };

  // Event handlers
  const setupEventHandlers = () => {
    document.getElementById('translation-toggle').addEventListener('click', function() {
      state.translationEnabled = !state.translationEnabled;
      this.classList.toggle('active', state.translationEnabled);
      if (state.translationEnabled) {
        translateElement(document.body);
        setupHoverListeners();
      } else {
        restoreElement();
        removeHoverListeners();
      }
      saveState();
    });
    document.getElementById('fullpage-toggle').addEventListener('click', function() {
      state.fullPageTranslation = !state.fullPageTranslation;
      this.classList.toggle('active', state.fullPageTranslation);
      if (state.fullPageTranslation) {
        translateElement(document.body);
      } else {
        restoreElement();
      }
      saveState();
    });
    document.getElementById('sound-toggle').addEventListener('click', function() {
      state.soundEnabled = !state.soundEnabled;
      this.classList.toggle('active', state.soundEnabled);
      playSeaShanty();
      saveState();
    });
    document.getElementById('translate-page-btn').addEventListener('click', () => {
      state.translationEnabled = true;
      translateElement(document.body);
    });
    document.getElementById('reset-page-btn').addEventListener('click', () => location.reload());
    document.getElementById('exclude-buttons').addEventListener('change', updateExcludeSettings);
    document.getElementById('exclude-links').addEventListener('change', updateExcludeSettings);
    document.getElementById('exclude-inputs').addEventListener('change', updateExcludeSettings);
  };

  // Exclude settings
  const updateExcludeSettings = () => {
    state.excludeElements = [
      ...document.getElementById('exclude-buttons').checked ? ['button'] : [],
      ...document.getElementById('exclude-links').checked ? ['a'] : [],
      ...document.getElementById('exclude-inputs').checked ? ['input', 'textarea', 'select'] : []
    ].flat();
    saveState();
  };

  // Hover listeners
  const handleMouseOver = (e) => {
    if (!state.translationEnabled) return;
    const element = e.target;
    if (state.excludeElements.includes(element.tagName.toLowerCase())) return;
    const text = element.textContent?.trim();
    if (text && text.length > 0 && text.length < 100) {
      const pirateText = translateToPirate(text);
      if (pirateText !== text) {
        element.classList.add('pirate-highlight');
        createTooltip(text, e.pageX, e.pageY);
        const clickHandler = () => {
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
  const setupHoverListeners = () => {
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
  };
  const removeHoverListeners = () => {
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
  };

  // Sound
  const playSeaShanty = () => {
    if (!state.soundAudio) {
      state.soundAudio = document.createElement('audio');
      state.soundAudio.src = 'https://raw.githubusercontent.com/Prarambha369/pirateDictionary/main/mujak.mp3';
      state.soundAudio.loop = true;
      document.body.appendChild(state.soundAudio);
    }
    if (state.soundAudio.paused) state.soundAudio.play();
    else state.soundAudio.pause();
  };

  // Init
  const init = () => {
    injectStyles();
    createToolbar();
    createFloatingPanel();
    setupSearch();
    setupEventHandlers();
    updateExcludeSettings();
  };

  init();

  // Cleanup
  window.removePirateTranslator = () => {
    document.querySelectorAll('.pirate-ui-container, .pirate-toolbar, #pirate-translator-styles').forEach(el => el.remove());
    removeHoverListeners();
    restoreElement();
    window.pirateTranslatorActive = false;
  };
})();