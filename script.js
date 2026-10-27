(function () {
  "use strict";

  var THEME_KEY = "portfolio-theme";
  var html = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");
  var searchInput = document.getElementById("project-search");
  var cards = document.querySelectorAll(".project-card");
  var noResults = document.getElementById("no-results");
  var searchStatus = document.getElementById("search-status");
  var chatForm = document.getElementById("chat-form");
  var chatInput = document.getElementById("chat-input");
  var chatLog = document.getElementById("chat-log");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function preferredTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    var isDark = theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      var icon = themeToggle.querySelector(".theme-toggle-icon");
      var text = themeToggle.querySelector(".theme-toggle-text");
      if (icon) {
        icon.textContent = isDark ? "☀️" : "🌙";
      }
      if (text) {
        text.textContent = isDark ? "Light" : "Dark";
      }
    }
  }

  applyTheme(preferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next =
        html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  function setMenuOpen(open) {
    if (!primaryNav || !navToggle) {
      return;
    }
    if (open) {
      primaryNav.classList.add("is-open");
    } else {
      primaryNav.classList.remove("is-open");
    }
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  window.togglePrimaryNav = function () {
    var open = navToggle.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  };

  if (primaryNav) {
    var navLinks = primaryNav.getElementsByTagName("a");
    var i;
    for (i = 0; i < navLinks.length; i += 1) {
      navLinks[i].addEventListener("click", function () {
        setMenuOpen(false);
      });
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  function filterProjects() {
    if (!searchInput) {
      return;
    }
    var query = searchInput.value.trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var haystack = [
        card.getAttribute("data-title") || "",
        card.getAttribute("data-description") || "",
        card.getAttribute("data-tech") || "",
      ]
        .join(" ")
        .toLowerCase();
      var match = query === "" || haystack.indexOf(query) !== -1;
      card.hidden = !match;
      if (match) {
        visible += 1;
      }
    });

    if (noResults) {
      noResults.hidden = visible !== 0;
    }

    if (searchStatus) {
      if (query === "") {
        searchStatus.textContent = "Showing all " + cards.length + " projects.";
      } else if (visible === 0) {
        searchStatus.textContent = "No projects found for \"" + query + "\".";
      } else {
        searchStatus.textContent =
          "Showing " + visible + " of " + cards.length + " projects.";
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
    filterProjects();
  }

  /**
   * LOCAL DEMO ONLY.
   * This function returns preset text in the browser. It does not call an
   * AI API and must not use API keys.
   *
   * Later API integration (do this on a server, not in this file):
   * 1. Send the user message to your own backend endpoint.
   * 2. Keep secrets such as API keys on the server.
   * 3. Replace getLocalDemoReply() with the backend response.
   */
  function getLocalDemoReply(message) {
    var text = message.toLowerCase();
    if (text.indexOf("project") !== -1) {
      return "This local demo can point you to the Projects section. There are five starter project cards on this page.";
    }
    if (text.indexOf("contact") !== -1 || text.indexOf("email") !== -1) {
      return "Use the Contact section placeholders for email, phone, LinkedIn, and GitHub. This chatbot is not connected to a live service.";
    }
    if (text.indexOf("skill") !== -1) {
      return "The Skills section lists beginner topics such as Python and web fundamentals. Replace them with your own skills.";
    }
    return "I am a local demo chatbot, not a live AI. Replace getLocalDemoReply() in script.js when you add a backend later. Never put API keys in this website.";
  }

  function addChatBubble(text, who) {
    if (!chatLog) {
      return;
    }
    var bubble = document.createElement("p");
    bubble.className = "chat-bubble " + who;
    bubble.textContent = text;
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var message = chatInput.value.trim();
      if (!message) {
        return;
      }
      addChatBubble(message, "user");
      chatInput.value = "";
      addChatBubble(getLocalDemoReply(message), "bot");
    });
  }
})();
