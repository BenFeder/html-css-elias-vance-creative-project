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

/* Parallax / reveal handler for header image so the face can be revealed when cropping occurs.
   This adjusts translateY of the .header-bg image based on how much the header is scrolled.
   It is subtle and clamped so it doesn't fight page scrolling. */
const header = document.querySelector(".header");
const headerImg = document.querySelector(".header-bg");
if (header && headerImg) {
  window.addEventListener(
    "scroll",
    () => {
      const rect = header.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // When header is fully in view, progress is 0 -> when header top reaches top of viewport, progress 1
      const progress = Math.min(
        Math.max(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
          0
        ),
        1
      );

      // Map progress to translateY range: from 0% to -20% (move image up to reveal lower parts)
      const maxTranslate = 20; // percent
      const translateY = -maxTranslate * progress;

      headerImg.style.transform = `translateY(${translateY}%)`;
    },
    { passive: true }
  );
}
