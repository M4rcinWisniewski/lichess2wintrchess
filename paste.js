browser.runtime.onMessage.addListener((message) => {
  if (message.action === "pastePGN") {
    function findAndPasteToTextarea(pgnText) {
      const targetElement = document.querySelector("textarea");

      if (targetElement) {
        targetElement.value = pgnText;
        targetElement.focus();

        // Trigger events
        targetElement.dispatchEvent(new Event("input", { bubbles: true }));
        targetElement.dispatchEvent(new Event("change", { bubbles: true }));
        targetElement.dispatchEvent(new Event("paste", { bubbles: true }));

        // Click button
        setTimeout(() => {
          const button = document.querySelector(
            "button.rHBNQrpvd7mwKp3HqjVQ.rXk_dTAAN7SfhkEPu9mU",
          );
          if (button) {
            button.click();
          } else {
            alert("PGN pasted but button not found!");
          }
        }, 500);

        return true;
      }
      return false;
    }

    // Try immediately first
    if (findAndPasteToTextarea(message.pgnText)) {
      return;
    }

    // Watch for textarea to appear
    const observer = new MutationObserver((mutations) => {
      if (findAndPasteToTextarea(message.pgnText)) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
    }, 60000);
  }
});
