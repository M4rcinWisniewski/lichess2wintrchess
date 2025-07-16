browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openNewTab") {
    // Create new tab
    browser.tabs
      .create({
        url: message.url,
        active: true,
      })
      .then((tab) => {
        // Wait for tab to load, then send the PGN text
        browser.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            browser.tabs.onUpdated.removeListener(listener);

            // Send PGN text to the new tab
            browser.tabs.sendMessage(tab.id, {
              action: "pastePGN",
              pgnText: message.pgnText,
            });
          }
        });
      });
  }
});
