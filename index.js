const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const root = document.documentElement;

// Simple toggle using computed styles (no dataset/localStorage).
function changeColorMode() {
  const styles = getComputedStyle(root);
  const currentBg = styles.getPropertyValue("--background-color-light").trim();

  // If the variable is missing or currently the light value, switch to dark.
  if (
    !currentBg ||
    currentBg === "#f7f7f7" ||
    currentBg.toLowerCase() === "rgb(247, 247, 247)"
  ) {
    root.style.setProperty("--background-color-light", "#191919");
    root.style.setProperty("--text-color-dark", "#f7f7f7");
  } else {
    root.style.setProperty("--background-color-light", "#f7f7f7");
    root.style.setProperty("--text-color-dark", "#191919");
  }

  const btn = document.querySelector(".change-color-mode");
  if (btn) {
    const newBg = getComputedStyle(root)
      .getPropertyValue("--background-color-light")
      .trim();
    btn.textContent =
      newBg === "#191919" || newBg.toLowerCase() === "rgb(25, 25, 25)"
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
  }
}

// Ensure variables have sensible defaults if not present in CSS inline/root
function ensureDefaults() {
  const styles = getComputedStyle(root);
  const currentBg = styles.getPropertyValue("--background-color-light").trim();
  const currentText = styles.getPropertyValue("--text-color-dark").trim();
  if (!currentBg) root.style.setProperty("--background-color-light", "#f7f7f7");
  if (!currentText) root.style.setProperty("--text-color-dark", "#191919");

  const btn = document.querySelector(".change-color-mode");
  if (btn) {
    const bg = getComputedStyle(root)
      .getPropertyValue("--background-color-light")
      .trim();
    btn.textContent =
      bg === "#191919" || bg.toLowerCase() === "rgb(25, 25, 25)"
        ? "Switch to Light Mode"
        : "Switch to Dark Mode";
  }
}

ensureDefaults();

const changeColorModeButton = document.querySelector(".change-color-mode");
if (changeColorModeButton) {
  changeColorModeButton.addEventListener("click", changeColorMode);
}
