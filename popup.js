document.getElementById("analyse").addEventListener("click", () => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action: "analyse" });
  });
});

//switch  to manual
const mainView = document.getElementById("mainView");
const manualView = document.getElementById("manualView");
const showManualBtn = document.getElementById("showManual");
const goBackBtn = document.getElementById("goBack");

showManualBtn.addEventListener("click", () => {
  mainView.style.display = "none";
  manualView.style.display = "block";
});

goBackBtn.addEventListener("click", () => {
  manualView.style.display = "none";
  mainView.style.display = "block";
});
