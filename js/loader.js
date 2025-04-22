window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const main = document.getElementById("main-content");

  // Ensure loader stays visible for at least 3 seconds
  setTimeout(() => {
      // Fade-out the loader smoothly
      loader.style.transition = "opacity 1s ease-out";
      loader.style.opacity = 0;

      // After 1 second (for fade-out), remove loader and show main content
      setTimeout(() => {
          loader.style.visibility = "hidden"; // Completely hide the loader after the fade-out
          main.style.visibility = "visible"; // Ensure main content is visible
          main.classList.remove("hidden"); // Remove "hidden" class to show main content
          main.style.transition = "opacity 1s ease-in"; // Apply fade-in effect
          main.style.opacity = 1; // Make main content visible
      }, 1000); // Wait for the fade-out to finish before hiding the loader
  }, 3000); // Loader stays visible for 3 seconds
});