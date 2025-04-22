// redirect.js

window.addEventListener("DOMContentLoaded", () => {
    const width = window.innerWidth;
  
    // Redirect to mobile version if screen width is less than or equal to 768px
    if (width >= 902) {
        window.location.href = "index.html";
      }      
  });
  