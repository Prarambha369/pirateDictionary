(() => {
  // Show loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.textContent = '🏴‍☠️ Loading pirate dictionary...';
  loadingIndicator.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: gold;
    padding: 20px;
    border-radius: 10px;
    z-index: 10000;
    font-family: 'Pirata One', cursive, serif;
  `;
  document.body.appendChild(loadingIndicator);

  // Try to fetch the dictionary with retry logic
  const fetchWithRetry = (url, retries = 3, delay = 1000) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          const error = new Error(`Failed to load pirate dictionary: ${response.statusText}`);
          error.status = response.status;
          throw error;
        }
        return response.json();
      })
      .catch((error) => {
        if (retries > 0) {
          console.warn(`Fetch failed, retrying (${retries} attempts left)...`, error);
          return new Promise(resolve => setTimeout(resolve, delay))
            .then(() => fetchWithRetry(url, retries - 1, delay * 1.5));
        }
        throw error;
      });
  };

  // Try to load dictionary from the same origin first, then fall back to embedded dictionary
  fetchWithRetry('pirateDictionary.json')
    .catch(error => {
      console.warn('Failed to load dictionary from same origin, using embedded dictionary:', error);

      // Embedded minimal dictionary for fallback
      return {
        "hello": "ahoy",
        "friend": "matey",
        "sir": "matey",
        "the": "thar",
        "my": "me",
        "is": "be",
        "are": "be",
        "you": "ye",
        "your": "yer",
        "to": "ta",
        "for": "fer",
        "with": "wit",
        "and": "n'",
        "yes": "aye",
        "no": "nay",
        "money": "doubloons",
        "treasure": "booty",
        "water": "grog",
        "ship": "vessel",
        "boat": "skiff",
        "man": "buccaneer",
        "woman": "wench",
        "boy": "lad",
        "girl": "lass"
      };
    })
    .then((pirateDictionary) => {
      console.log("Pirate dictionary loaded successfully!");
      // Remove loading indicator
      document.body.removeChild(loadingIndicator);

      const pirateExclamations = [
        "Arrr!", "Shiver me timbers!", "Blimey!", "Yo-ho-ho!", "Avast ye!"
      ];

      const translateToPirate = (text) => {
        const regex = new RegExp(`\\b(${Object.keys(pirateDictionary).join("|")})\\b`, "gi");
        return text.replace(regex, (match) => {
            const lowerMatch = match.toLowerCase();
            return pirateDictionary[lowerMatch] || match;
        });
      };

      const insertPirateExclamations = (text) => {
        const sentences = text.split(/([.!?])/);
        return sentences
          .map((sentence, index) => {
            if (index % 2 === 0 && Math.random() < 0.05) {
              return `${pirateExclamations[Math.floor(Math.random() * pirateExclamations.length)]} ${sentence}`;
            }
            return sentence;
          })
          .join("");
      };

      const walkAndTranslate = (node) => {
        // Skip null or undefined nodes
        if (!node) {
          return;
        }

        // Skip nodes that have already been processed
        if (node.dataset && node.dataset.pirated) {
          return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
          const originalText = node.nodeValue;
          const translatedText = insertPirateExclamations(translateToPirate(originalText));
          if (originalText !== translatedText && originalText.trim() !== '') {
            try {
              const span = document.createElement("span");
              span.textContent = translatedText;
              span.style.transition = "background-color 0.5s";
              span.style.backgroundColor = "gold";
              span.dataset.pirated = "true";
              setTimeout(() => {
                try {
                  span.style.backgroundColor = "";
                } catch (e) {
                  console.debug("Could not reset background color:", e);
                }
              }, 500);

              // Create a wrapper span to maintain DOM structure
              const wrapper = document.createElement("span");
              wrapper.appendChild(span);
              wrapper.dataset.pirated = "true";

              node.parentNode.replaceChild(wrapper, node);
            } catch (e) {
              console.debug("Could not replace text node:", e);
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Skip certain elements
          if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "NOSCRIPT", "SVG", "CANVAS", "VIDEO", "AUDIO"].includes(node.tagName)) {
            return;
          }

          // Mark this node as processed
          try {
            if (node.dataset) {
              node.dataset.pirated = "true";
            }
          } catch (e) {
            // Some elements might not support dataset
            console.debug("Could not mark node as processed:", e);
          }

          // Check for Shadow DOM
          if (node.shadowRoot) {
            try {
              // Process Shadow DOM
              Array.from(node.shadowRoot.childNodes).forEach(walkAndTranslate);
            } catch (e) {
              console.debug("Could not process Shadow DOM:", e);
            }
          }

          // Process child nodes
          try {
            Array.from(node.childNodes).forEach(walkAndTranslate);
          } catch (e) {
            console.debug("Could not process child nodes:", e);
          }
        }
      };

      const injectBanner = () => {
        const banner = document.createElement("div");
        banner.textContent = "🏴‍☠️ Pirate Mode Activated!";
        banner.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: black;
          color: white;
          font-family: 'Pirata One', cursive, serif;
          font-size: 24px;
          text-align: center;
          padding: 10px;
          z-index: 10000;
        `;
        const resetLink = document.createElement("a");
        resetLink.textContent = "Reset to normal";
        resetLink.href = "#";
        resetLink.style.cssText = "color: red; margin-left: 20px;";
        resetLink.onclick = () => location.reload();
        banner.appendChild(resetLink);
        document.body.appendChild(banner);
      };

      const applyPirateStyling = () => {
        document.body.style.transform = "rotate(-1.5deg)";
        document.body.style.fontFamily = "'Pirata One', cursive, serif";
      };

      const playSeaShanty = () => {
        try {
          // Create primary audio element with SoundCloud track
          const audio = document.createElement("audio");
          audio.src = "https://on.soundcloud.com/k5UfG5qPXFXomDiCA";
          audio.loop = true;

          // Create backup audio element with reliable fallback
          const backupAudio = document.createElement("audio");
          backupAudio.src = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";
          backupAudio.loop = true;

          // Track which audio source is active
          let activeAudio = audio;

          // Function to toggle audio playback with fallback
          const toggleAudioPlayback = () => {
            if (activeAudio.paused) {
              activeAudio.play()
                .catch((err) => {
                  console.warn("Primary audio failed, trying backup:", err);
                  // If primary audio fails, switch to backup
                  activeAudio = backupAudio;
                  backupAudio.play()
                    .catch((backupErr) => {
                      console.error("Backup audio also failed:", backupErr);
                      alert("Arr! Ye browser be blockin' our sea shanty! Click anywhere on the page first, then try again.");
                    });
                });
            } else {
              activeAudio.pause();
            }
          };

          // Try to autoplay, but handle potential browser restrictions
          audio.play()
            .then(() => {
              console.log("Sea shanty playing successfully!");
              activeAudio = audio;
            })
            .catch((err) => {
              console.warn("Autoplay prevented by browser, trying backup:", err);
              // Try backup audio
              backupAudio.play()
                .then(() => {
                  console.log("Backup sea shanty playing successfully!");
                  activeAudio = backupAudio;
                })
                .catch((backupErr) => {
                  console.warn("Backup autoplay also prevented:", backupErr);
                  // We'll still add the toggle button so user can start manually
                });
            });

          // Create toggle button
          const toggleButton = document.createElement("button");
          toggleButton.textContent = "🎵 Toggle Sea Shanty";
          toggleButton.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            z-index: 10000;
            background: black;
            color: white;
            border: 1px solid white;
            padding: 5px 10px;
            cursor: pointer;
            font-family: 'Pirata One', cursive, serif;
          `;
          toggleButton.onclick = toggleAudioPlayback;

          // Add one-time click handler to document for browsers that require user interaction
          document.addEventListener('click', () => {
            if (audio.paused && backupAudio.paused) {
              toggleAudioPlayback();
            }
          }, { once: true });

          document.body.appendChild(toggleButton);
          document.body.appendChild(audio);
          document.body.appendChild(backupAudio);
        } catch (e) {
          console.error("Error setting up sea shanty:", e);
        }
      };

      const handleFaviconRequest = () => {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏴‍☠️</text></svg>";
        document.head.appendChild(link);
      };

      const initializePirateMode = () => {
        // Check if Pirate Mode is already active
        if (window.pirateModeActive) {
          console.log("Pirate Mode already active!");
          return;
        }

        // Set flag to indicate Pirate Mode is active
        window.pirateModeActive = true;

        // Check if we're on a protected site (browser internal pages)
        const isProtectedSite = () => {
          const protectedDomains = [
            'chrome://', 'about:', 'moz-extension://',
            'chrome-extension://', 'safari-extension://'
          ];
          return protectedDomains.some(d => location.href.startsWith(d));
        };

        if (isProtectedSite()) {
          console.warn("Pirate Mode cannot run on browser internal pages");
          alert("Arr! Ye can't run Pirate Mode on browser internal pages!");
          window.pirateModeActive = false;
          return;
        }

        // Use try-catch blocks for each operation to handle potential CSP restrictions
        try {
          handleFaviconRequest();
        } catch (e) {
          console.warn("Failed to update favicon:", e);
        }

        try {
          injectBanner();
        } catch (e) {
          console.warn("Failed to inject banner:", e);
        }

        try {
          applyPirateStyling();
        } catch (e) {
          console.warn("Failed to apply pirate styling:", e);
        }

        try {
          playSeaShanty();
        } catch (e) {
          console.warn("Failed to play sea shanty:", e);
        }

        try {
          // Process main document
          walkAndTranslate(document.body);

          // Try to process iframes if possible
          try {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
              try {
                // Only process same-origin iframes (CORS will block cross-origin)
                if (iframe.contentDocument) {
                  walkAndTranslate(iframe.contentDocument.body);
                }
              } catch (iframeError) {
                // Silently ignore cross-origin iframe errors
                console.debug("Could not access iframe content (likely cross-origin):", iframeError);
              }
            });
          } catch (iframesError) {
            console.warn("Failed to process iframes:", iframesError);
          }
        } catch (e) {
          console.warn("Failed to translate page:", e);
        }

        // Set up mutation observer to handle dynamically added content
        try {
          // Check if MutationObserver is supported
          if (window.MutationObserver) {
            // Use debouncing to avoid excessive processing
            const debounce = (func, wait) => {
              let timeout;
              return function executedFunction(...args) {
                const later = () => {
                  clearTimeout(timeout);
                  func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
              };
            };

            // Create a debounced version of walkAndTranslate
            const debouncedTranslate = debounce((node) => {
              try {
                walkAndTranslate(node);
              } catch (e) {
                console.warn("Error in debounced translate:", e);
              }
            }, 300); // 300ms debounce time

            const observer = new MutationObserver((mutations) => {
              try {
                // Process in batches to improve performance
                const nodesToProcess = new Set();

                mutations.forEach((mutation) => {
                  if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                      if (node.nodeType === Node.ELEMENT_NODE) {
                        nodesToProcess.add(node);
                      }
                    });
                  }
                });

                // Process unique nodes with debouncing
                nodesToProcess.forEach(debouncedTranslate);
              } catch (e) {
                console.warn("Error in mutation observer callback:", e);
              }
            });

            // Start observing the document with the configured parameters
            observer.observe(document.body, { 
              childList: true, 
              subtree: true,
              attributes: false,
              characterData: false
            });

            // Store observer reference for potential cleanup
            window.pirateObserver = observer;

            // Add cleanup on page unload
            window.addEventListener('beforeunload', () => {
              if (window.pirateObserver) {
                window.pirateObserver.disconnect();
              }
              window.pirateModeActive = false;
            });

            // Special handling for React/Vue/Angular apps
            // These frameworks often use virtual DOM and batch updates
            // Periodically check for new content that might have been missed
            const checkForNewContent = () => {
              if (window.pirateModeActive) {
                try {
                  // Find all elements without the pirated flag
                  const unprocessedElements = document.querySelectorAll('*:not([data-pirated])');
                  if (unprocessedElements.length > 0) {
                    console.debug(`Found ${unprocessedElements.length} unprocessed elements, processing...`);
                    unprocessedElements.forEach(debouncedTranslate);
                  }
                } catch (e) {
                  console.debug("Error in periodic content check:", e);
                }

                // Continue checking while pirate mode is active
                setTimeout(checkForNewContent, 2000); // Check every 2 seconds
              }
            };

            // Start periodic checking after a delay
            setTimeout(checkForNewContent, 2000);
          } else {
            console.warn("MutationObserver not supported, dynamic content won't be translated");
          }
        } catch (e) {
          console.warn("Failed to set up mutation observer:", e);
        }
      };

      initializePirateMode();
    })
    .catch((error) => {
      console.error("Error initializing Pirate Translator:", error);

      // Remove loading indicator if it exists
      if (document.body.contains(loadingIndicator)) {
        document.body.removeChild(loadingIndicator);
      }

      // Show error message to user
      const errorMessage = document.createElement('div');
      errorMessage.textContent = `🏴‍☠️ Arr! Failed to load pirate dictionary! ${error.message}`;
      errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: red;
        padding: 20px;
        border-radius: 10px;
        z-index: 10000;
        font-family: 'Pirata One', cursive, serif;
        max-width: 80%;
        text-align: center;
      `;

      // Add retry button
      const retryButton = document.createElement('button');
      retryButton.textContent = 'Try Again';
      retryButton.style.cssText = `
        margin-top: 15px;
        padding: 8px 16px;
        background: gold;
        color: black;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Pirata One', cursive, serif;
      `;
      retryButton.onclick = () => {
        document.body.removeChild(errorMessage);
        location.reload();
      };

      errorMessage.appendChild(document.createElement('br'));
      errorMessage.appendChild(retryButton);
      document.body.appendChild(errorMessage);
    });
})();
