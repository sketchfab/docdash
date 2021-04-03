const nav = document.querySelector("nav");

function openCurrentMenu() {
  if (currentVersion) {
    const version = document.querySelector(
      "." + currentVersion[0].replace(/\./gi, "_")
    );
    version.classList.add("unfolded");
    nav.scrollTo(0, version.offsetTop);
  }
}

function initializeFoldableMenus() {
  openCurrentMenu();
  document.querySelectorAll(".foldable").forEach((e) =>
    e.addEventListener("click", (e) => {
      if (
        e.target.parentElement.dataset.type !== "method" &&
        e.currentTarget.classList.contains("unfolded")
      ) {
        e.currentTarget.classList.remove("unfolded");
        e.preventDefault();
      }
    })
  );
}

initializeFoldableMenus();
