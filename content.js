// The Dramatic Scroll Bar - Step 2: Trigger & Intersection Observer Engine

(() => {
  console.log("[Dramatic Scroll Bar] Initializing trigger engine...");

  // Configurable thresholds and cooldowns
  const COOLDOWN_MS = 350; // Minimum time between consecutive dramatic triggers
  let lastTriggerTime = 0;
  let userHasScrolled = false;

  // Track triggered elements so we don't re-trigger the same element endlessly
  const triggeredElements = new WeakSet();

  // Flag to avoid firing all visible headers immediately on initial page load
  window.addEventListener(
    "scroll",
    () => {
      userHasScrolled = true;
    },
    { once: true, passive: true }
  );

  /**
   * Dispatches the dramatic event for visuals (Step 3) and audio (Step 4)
   */
  function triggerDramaticEvent(element, reason) {
    const now = Date.now();
    if (now - lastTriggerTime < COOLDOWN_MS) {
      return; // Throttled to prevent cacophony
    }
    lastTriggerTime = now;
    triggeredElements.add(element);

    const rect = element.getBoundingClientRect();
    const previewText = (element.textContent || "").trim().substring(0, 40);

    console.log(
      `%c[Dramatic Scroll Bar] 💥 TRIGGER! (${reason}) -> "${previewText}..."`,
      "color: #ff3333; font-weight: bold; font-size: 13px;",
      {
        tag: element.tagName,
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      }
    );

    // Custom DOM event for upcoming visual & audio modules
    const event = new CustomEvent("dramatic-scroll-trigger", {
      detail: {
        element,
        reason,
        rect,
      },
    });
    window.dispatchEvent(event);
  }

  /**
   * Helper to check if a paragraph is considered "huge"
   */
  function isHugeParagraph(p) {
    const textLen = (p.textContent || "").trim().length;
    // Huge paragraph: either long text (> 350 chars) or large rendered height (> 120px)
    return textLen > 350 || p.clientHeight > 120;
  }

  /**
   * Checks if an element qualifies as a dramatic trigger
   */
  function isDramaticTarget(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "h1" || tag === "h2" || tag === "h3") return true;
    if (tag === "p" && isHugeParagraph(el)) return true;
    return false;
  }

  // IntersectionObserver configuration:
  // Using lower thresholds [0.1, 0.35] ensures huge paragraphs or tall headers that
  // don't occupy 50% of the screen (or exceed viewport height) still trigger reliably.
  const observerOptions = {
    root: null, // Viewport
    rootMargin: "0px 0px -10% 0px", // Triggers just as element enters the upper/middle reading zone
    threshold: [0.1, 0.35],
  };

  const observer = new IntersectionObserver((entries) => {
    // Only trigger after user has actively begun scrolling
    if (!userHasScrolled) return;

    for (const entry of entries) {
      const target = entry.target;

      if (entry.isIntersecting) {
        if (!triggeredElements.has(target)) {
          const reason = target.tagName.startsWith("H")
            ? `Header ${target.tagName}`
            : "Huge Paragraph";
          triggerDramaticEvent(target, reason);
        }
      } else {
        // Reset when it leaves the viewport so scrolling back up/down can trigger it again
        triggeredElements.delete(target);
      }
    }
  }, observerOptions);

  /**
   * Collects and observes dramatic elements on the page
   */
  function observeTargets(container = document) {
    // Target headers h1, h2, h3
    const headers = container.querySelectorAll("h1, h2, h3");
    headers.forEach((h) => observer.observe(h));

    // Target paragraphs that are large
    const paras = container.querySelectorAll("p");
    paras.forEach((p) => {
      if (isHugeParagraph(p)) {
        observer.observe(p);
      }
    });
  }

  // Initial observation
  observeTargets();

  // Watch for dynamically loaded content (SPAs, infinite scroll, Wikipedia preview popups)
  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (isDramaticTarget(node)) {
            observer.observe(node);
          }
          observeTargets(node);
        }
      }
    }
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Fast-skip detection:
  // If user scrolls or skips vigorously (high velocity or large jumps),
  // detect any dramatic target currently in view or passed through.
  let lastScrollY = window.scrollY;
  let lastScrollTime = performance.now();

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = currentTime - lastScrollTime;

      // Detect high-speed scroll skip (> 1.8 px/ms or leap > 500px in < 150ms)
      if (deltaTime > 0 && (deltaY / deltaTime > 1.8 || deltaY > 500)) {
        // Find visible dramatic elements
        const visibleHeader = document.elementFromPoint(
          window.innerWidth / 2,
          window.innerHeight / 2
        );
        if (visibleHeader && isDramaticTarget(visibleHeader)) {
          triggerDramaticEvent(visibleHeader, "Fast Skip Leap");
        }
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    },
    { passive: true }
  );

  console.log("[Dramatic Scroll Bar] Observer active for headers and huge paragraphs.");
})();
