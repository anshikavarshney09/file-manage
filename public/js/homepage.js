document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const uploadBtn = document.getElementById("uploadBtn");
  const closeBtn = document.getElementById("closePopupBtn");

  function openPopup() {
    if (popup) popup.classList.remove("hidden");
  }

  function closePopup() {
    if (popup) popup.classList.add("hidden");
  }

  // Open popup
  if (uploadBtn) {
    uploadBtn.addEventListener("click", openPopup);
  }

  // Close popup
  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  // backdrop click → close popup
  window.addEventListener("click", function (e) {
    if (popup && e.target === popup) {
      closePopup();
    }
  });
});
