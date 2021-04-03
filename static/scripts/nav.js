const highlightScrollMargin = 60;
const navElement = document.querySelector("nav");

function scrollToNavItem() {
  var path = window.location.href
    .split("/")
    .pop()
    .replace(/\.html/, "");
  document.querySelectorAll("nav a").forEach(function (link) {
    var href = link.attributes.href.value.replace(/\.html/, "");
    if (path === href) {
      link.scrollIntoView({ block: "center" });
      return;
    }
  });
}

function highlightCurrentItem() {
  let currentlyHighlighted;
  var handler = function (i) {
    const pos = window.scrollY;
    let killswitch = false;
    document.querySelectorAll(".vapi-section").forEach((e) => {
      if (!killswitch) {
        if (e.offsetTop >= pos) {
          const newlyHighlighted = e.className
            .replace("vapi-section", "")
            .trim();
          killswitch = true;
          if (currentlyHighlighted !== newlyHighlighted) {
            currentlyHighlighted = newlyHighlighted;
            const target = document.querySelector(
              "nav ." +
                currentVersionClass +
                ' [data-method="' +
                newlyHighlighted +
                '"]'
            );
            if (target) {
              const baseOffset = document.querySelector(
                "nav ." + currentVersionClass
              ).offsetTop;
              const rect = target.getBoundingClientRect();
              document
                .querySelectorAll("nav .highlighted")
                .forEach((n) => n.classList.remove("highlighted"));
              target.classList.add("highlighted");
              if (
                rect.y >
                nav.clientHeight + nav.offsetTop - highlightScrollMargin
              ) {
                navElement.scrollTo(
                  0,
                  target.offsetTop +
                    baseOffset -
                    navElement.clientHeight +
                    rect.height +
                    highlightScrollMargin
                );
              } else if (rect.y < nav.offsetTop + highlightScrollMargin) {
                navElement.scrollTo(
                  0,
                  target.offsetTop + baseOffset - highlightScrollMargin
                );
              }
            }
          }
        }
      }
    });
  };
  document.addEventListener("scroll", handler, { passive: true });
}

scrollToNavItem();
highlightCurrentItem();
