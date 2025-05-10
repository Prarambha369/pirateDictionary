(() => {
  fetch('https://raw.githubusercontent.com/Prarambha369/pirateDictionary/refs/heads/main/pirateDictionary.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load pirate dictionary: ${response.statusText}`);
        }
        return response.json();
      })
      .then((pirateDictionary) => {
        console.log("Pirate dictionary loaded successfully!");

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
          if (node.nodeType === Node.TEXT_NODE) {
            const originalText = node.nodeValue;
            const translatedText = insertPirateExclamations(translateToPirate(originalText));
            if (originalText !== translatedText) {
              node.nodeValue = translatedText;
              const span = document.createElement("span");
              span.textContent = translatedText;
              span.style.transition = "background-color 0.5s";
              span.style.backgroundColor = "gold";
              setTimeout(() => (span.style.backgroundColor = ""), 500);
              node.parentNode.replaceChild(span, node);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE && !["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.tagName)) {
            Array.from(node.childNodes).forEach(walkAndTranslate);
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
          const audio = document.createElement("audio");
          audio.src =
              audio.loop = true;
          audio.autoplay = true;

          const toggleButton = document.createElement("button");
          toggleButton.textContent = "Toggle Music";
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
        `;
          toggleButton.onclick = () => {
            if (audio.paused) {
              audio.play().catch((err) => console.error("Audio playback failed:", err));
            } else {
              audio.pause();
            }
          };

          document.body.appendChild(toggleButton);
          document.body.appendChild(audio);
        };

        const handleFaviconRequest = () => {
          const link = document.createElement("link");
          link.rel = "icon";
          link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏴‍☠️</text></svg>";
          document.head.appendChild(link);
        };

        const initializePirateMode = () => {
          handleFaviconRequest();
          injectBanner();
          applyPirateStyling();
          playSeaShanty();
          walkAndTranslate(document.body);
        };

        initializePirateMode();
      })
      .catch((error) => console.error("Error initializing Pirate Translator:", error));
})();