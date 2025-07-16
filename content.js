browser.runtime.onMessage.addListener((message) => {
  if (message.action === "analyse") {
    const fenPgnTab = document.querySelector('span[data-panel="fen-pgn"]');
    if (fenPgnTab && !fenPgnTab.classList.contains("active")) {
      fenPgnTab.click();
    }

    setTimeout(() => {
      const pgnDiv = document.querySelector(".pgn");
      if (pgnDiv) {
        const pgnText = pgnDiv.textContent.trim();

        // Send the PGN text to background script to open new tab
        browser.runtime.sendMessage({
          action: "openNewTab",
          pgnText: pgnText,
          url: "https://wintrchess.com/",
        });
      } else {
        alert("PGN div not found! Check if you are in game analysis!");
      }
    }, 100);
  }
});
