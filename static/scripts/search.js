var searchAttr = "data-search-mode";
var searchField = document.getElementById("nav-search");
function contains(a, m) {
  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m) !== -1;
}

//on search
searchField.addEventListener("keyup", function (event) {
  var search = this.value.toUpperCase();

  if (!search) {
    //no search, show all results
    document.documentElement.removeAttribute(searchAttr);

    if (currentVersion) {
      document.querySelectorAll(".foldable").forEach(function (el) {
        el.classList.remove("hidden");
      });
    } else {
      document.querySelectorAll(".foldable").forEach(function (el) {
        el.classList.remove("unfoldable");
      });
    }

    history.replaceState({}, "", location.origin + location.pathname);

    document
      .querySelectorAll("nav > ul > li:not(.level-hide)")
      .forEach(function (elem) {
        elem.style.display = "block";
      });

    if (typeof hideAllButCurrent === "function") {
      //let's do what ever collapse wants to do
      hideAllButCurrent();
    } else {
      //menu by default should be opened
      document
        .querySelectorAll("nav > ul > li > ul li")
        .forEach(function (elem) {
          elem.style.display = "block";
        });
    }
  } else {
    //we are searching
    document.documentElement.setAttribute(searchAttr, "");

    if (currentVersion) {
      document
        .querySelectorAll(".foldable:not(." + currentVersionClass + ")")
        .forEach(function (el) {
          el.classList.add("hidden");
        });
    } else {
      document.querySelectorAll(".foldable").forEach(function (el) {
        el.classList.add("unfoldable");
      });
    }

    history.replaceState(
      {},
      "",
      location.origin + location.pathname + "?q=" + this.value
    );

    //show all parents
    document.querySelectorAll("nav > ul > li").forEach(function (elem) {
      elem.style.display = "block";
    });
    //hide all results
    document.querySelectorAll("nav > ul > li > ul li").forEach(function (elem) {
      elem.style.display = "none";
    });
    //show results matching filter
    document.querySelectorAll("nav > ul > li > ul a").forEach(function (elem) {
      if (!contains(elem.parentNode, search)) {
        return;
      }
      elem.parentNode.style.display = "block";
    });
    //hide parents without children
    document.querySelectorAll("nav > ul > li").forEach(function (parent) {
      var countSearchA = 0;
      parent.querySelectorAll("a").forEach(function (elem) {
        if (contains(elem, search)) {
          countSearchA++;
        }
      });

      var countUl = 0;
      var countUlVisible = 0;
      parent.querySelectorAll("ul").forEach(function (ulP) {
        // count all elements that match the search
        if (contains(ulP, search)) {
          countUl++;
        }

        // count all visible elements
        var children = ulP.children;
        for (i = 0; i < children.length; i++) {
          var elem = children[i];
          if (elem.style.display != "none") {
            countUlVisible++;
          }
        }
      });

      if (countSearchA == 0 && countUl === 0) {
        //has no child at all and does not contain text
        parent.style.display = "none";
      } else if (countSearchA == 0 && countUlVisible == 0) {
        //has no visible child and does not contain text
        parent.style.display = "none";
      }
    });
  }
});

if (initialSearch) {
  searchField.value = initialSearch;
  searchField.dispatchEvent(new Event("keyup"));
}
