function initializeFoldableMenus() {
  var foldables = document.querySelectorAll(".foldable");
  for (var f in foldables) {
    if (foldables.hasOwnProperty(f)) {
      foldables[f].addEventListener("click", (e) => {
        if (e.target.parentElement.dataset.type !== "method") {
          e.currentTarget.classList.toggle("unfolded");
          e.preventDefault();
        }
      });
    }
  }
}

initializeFoldableMenus();
