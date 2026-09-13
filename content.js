// The Dramatic Scroll Bar - Content Script
// Tier 1: Paywall Repulsion & Tier 3: The System Meltdown (KDE Plasma Konsole Hydra)

(() => {
  console.log("[Dramatic Scroll Bar] Armed: Tier 1 (Paywall) & Tier 3 (KDE Konsole Hydra).");

  // ==========================================
  // 1. CINEMATIC AUDIO & PHYSICALITY CONTROLLER
  // ==========================================
  let audioCtx = null;

  function hasUserGesture() {
    return Boolean(navigator.userActivation && navigator.userActivation.hasBeenActive);
  }

  function initAudioContext() {
    if (!hasUserGesture()) return null;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  // Pre-arm AudioContext ONLY on true user gestures (pointer/key/touch).
  // "wheel" is intentionally excluded because Chrome Autoplay policy does not consider wheel a user activation!
  ["pointerdown", "click", "keydown", "touchstart"].forEach((evt) => {
    window.addEventListener(evt, () => initAudioContext(), { passive: true, once: true });
  });

  function playBwaaahSynth() {
    let playedLocally = false;
    if (hasUserGesture()) {
      try {
        const ctx = initAudioContext();
        if (ctx && ctx.state === "running") {
          const now = ctx.currentTime;

          // Master gain envelope: aggressive instant attack, 1.5s exponential decay
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0, now);
          masterGain.gain.linearRampToValueAtTime(0.9, now + 0.02);
          masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
          masterGain.connect(ctx.destination);

          // Decaying low-pass filter: 900Hz down to 55Hz
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(900, now);
          filter.frequency.exponentialRampToValueAtTime(55, now + 1.5);
          filter.Q.value = 4.5;
          filter.connect(masterGain);

          // Sawtooth Oscillator 1 (55Hz - A1)
          const osc1 = ctx.createOscillator();
          osc1.type = "sawtooth";
          osc1.frequency.setValueAtTime(55, now);
          osc1.frequency.exponentialRampToValueAtTime(45, now + 1.5);
          osc1.connect(filter);

          // Heavily detuned Sawtooth Oscillator 2 (55.85Hz - thick beating chorus)
          const osc2 = ctx.createOscillator();
          osc2.type = "sawtooth";
          osc2.frequency.setValueAtTime(55.85, now);
          osc2.frequency.exponentialRampToValueAtTime(45.6, now + 1.5);
          osc2.connect(filter);

          // Sub-bass foundation sine (27.5Hz sub-thud)
          const subOsc = ctx.createOscillator();
          subOsc.type = "sine";
          subOsc.frequency.setValueAtTime(27.5, now);
          subOsc.connect(filter);

          osc1.start(now);
          osc2.start(now);
          subOsc.start(now);

          osc1.stop(now + 1.55);
          osc2.stop(now + 1.55);
          subOsc.stop(now + 1.55);

          playedLocally = true;
        }
      } catch (e) {
        console.warn("[Dramatic Scroll Bar] Web Audio Synth:", e);
      }
    }

    // Fallback: If user hasn't clicked/typed on the page yet (only scrolled),
    // route audio through the Extension's Offscreen Document which is immune to page autoplay blocks!
    if (!playedLocally) {
      try {
        chrome.runtime.sendMessage({ action: "PLAY_BWAAAH_AUDIO" }).catch(() => {});
      } catch (e) {}
    }
  }

  function playTriumphantBwaaah() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.88, now + 0.02);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      masterGain.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2400, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 1.4);
      filter.Q.value = 5.0;
      filter.connect(masterGain);

      // Pitched-Up Triumphant Fanfare (Major Triad Chord: F3, A3, C4, F4)
      [174.61, 220.0, 261.63, 349.23].forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.92, now + 1.4);
        osc.connect(filter);
        osc.start(now);
        osc.stop(now + 1.45);
      });
    } catch (e) {}
  }

  function playDistortedPunishBwaaah() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(1.0, now + 0.015);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      masterGain.connect(ctx.destination);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, now);
      filter.frequency.exponentialRampToValueAtTime(30, now + 1.6);
      filter.Q.value = 7.5;
      filter.connect(masterGain);

      // Guttural detuned saw cluster
      [42.0, 43.1, 84.0].forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 1.6);
        osc.connect(filter);
        osc.start(now);
        osc.stop(now + 1.65);
      });

      const subOsc = ctx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(28, now);
      subOsc.frequency.exponentialRampToValueAtTime(18, now + 1.6);
      subOsc.connect(filter);
      subOsc.start(now);
      subOsc.stop(now + 1.65);
    } catch (e) {}
  }

  function playExplosionSound() {
    let playedLocally = false;
    if (hasUserGesture()) {
      try {
        const ctx = initAudioContext();
        if (ctx && ctx.state === "running") {
          const now = ctx.currentTime;

          // 1. White noise burst for crunchy explosion blast
          const bufferSize = ctx.sampleRate * 0.7;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.22));
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1400, now);
          filter.frequency.exponentialRampToValueAtTime(70, now + 0.65);

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(1.0, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

          whiteNoise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          whiteNoise.start(now);

          // 2. Sub-bass boom oscillator
          const subOsc = ctx.createOscillator();
          subOsc.type = "sawtooth";
          subOsc.frequency.setValueAtTime(95, now);
          subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.75);

          const subGain = ctx.createGain();
          subGain.gain.setValueAtTime(0.95, now);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.start(now);
          subOsc.stop(now + 0.85);

          playedLocally = true;
        }
      } catch (e) {
        console.warn("[Dramatic Scroll Bar] Explosion synth caught:", e);
      }
    }

    if (!playedLocally) {
      try {
        chrome.runtime.sendMessage({ action: "PLAY_EXPLOSION_AUDIO" }).catch(() => {});
      } catch (e) {}
    }
  }

  function triggerPhysicalShake() {
    document.body.classList.remove("dramatic-physical-shake");
    void document.body.offsetWidth; // Force reflow
    document.body.classList.add("dramatic-physical-shake");
    setTimeout(() => {
      document.body.classList.remove("dramatic-physical-shake");
    }, 300);
  }

  function playPaywallAudio() {
    try {
      chrome.runtime.sendMessage({ action: "PLAY_PAYWALL_AUDIO" }).catch(() => {});
    } catch (e) {}
  }

  function playKonsoleAudio() {
    try {
      chrome.runtime.sendMessage({ action: "PLAY_KONSOLE_AUDIO" }).catch(() => {});
    } catch (e) {}
  }

  function playAvalancheAudio() {
    try {
      chrome.runtime.sendMessage({ action: "PLAY_AVALANCHE_AUDIO" }).catch(() => {});
    } catch (e) {}
  }

  function playScannerAudio() {
    try {
      chrome.runtime.sendMessage({ action: "PLAY_SCANNER_AUDIO" }).catch(() => {});
    } catch (e) {}
  }

  function triggerUnlockAudio() {
    try {
      chrome.runtime.sendMessage({ action: "TRIGGER_UNLOCK_CLICKED" }).catch(() => {});
    } catch (e) {}
  }

  function stopAudio() {
    try {
      chrome.runtime.sendMessage({ action: "STOP_AUDIO" }).catch(() => {});
    } catch (e) {}
    try {
      if (typeof audioCtx !== "undefined" && audioCtx && audioCtx.state === "running") {
        audioCtx.suspend().catch(() => {});
      }
    } catch (e) {}
  }

  // ==========================================
  // 2. TIER 1: PAYWALL MODAL & IDLE ESCAPE
  // ==========================================
  let paywallActive = false;
  let tier1Triggered = false;
  let currentPaywallParagraph = null;

  function spawnPaywall(targetParagraph, force = false) {
    if (paywallActive || (!force && tier1Triggered)) return;
    tier1Triggered = true;
    paywallActive = true;
    currentPaywallParagraph = targetParagraph;

    console.log("%c[Dramatic Scroll Bar] 🔒 Tier 1 Paywall Fired!", "color: #ffaa00; font-weight: bold; font-size: 14px;");

    playPaywallAudio();

    if (targetParagraph) {
      targetParagraph.classList.add("dramatic-blurred-para");
    }

    const backdrop = document.createElement("div");
    backdrop.className = "dramatic-paywall-backdrop";

    backdrop.innerHTML = `
      <div class="dramatic-paywall-card" id="dramatic-paywall-card">
        <button class="dramatic-slippery-close" id="dramatic-slippery-close" aria-label="Close">✕</button>
        <div class="dramatic-paywall-badge">🔒 Premium Content</div>
        <h3 class="dramatic-paywall-title">You've hit your free paragraph limit</h3>
        <p class="dramatic-paywall-desc">
          To unlock this exclusive paragraph and enjoy high-definition words, confirm your micro-subscription.
        </p>
        <div class="dramatic-price-box">
          <span class="dramatic-price-amount">$0.99</span>
          <span class="dramatic-price-period">/ paragraph</span>
        </div>
        <button class="dramatic-pay-btn" id="dramatic-pay-btn">
          ⚡ Unlock Now with 1-Click Pay
        </button>
        <div class="dramatic-paywall-footer">
          By clicking unlock, you agree to recurring non-refundable reading charges.
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const card = document.getElementById("dramatic-paywall-card");
    const closeBtn = document.getElementById("dramatic-slippery-close");
    const payBtn = document.getElementById("dramatic-pay-btn");

    // Brute Siege Breaker or Critical Misplay (Responsive across whole backdrop):
    backdrop.addEventListener("pointerdown", (e) => {
      if (activeCursor === "brute") {
        e.preventDefault();
        e.stopPropagation();
        executeBruteGlassShatter(targetParagraph, e.clientX, e.clientY);
      } else if (e.target === card || card.contains(e.target)) {
        if (e.target !== payBtn && e.target !== closeBtn) {
          e.preventDefault();
          e.stopPropagation();
          executeCriticalMisplay("paywall", activeCursor, targetParagraph, () => {});
        }
      }
    });

    let idleTimer = null;
    function resetIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        dismissPaywall("User stopped moving and waited for 3 seconds");
      }, 3000);
    }
    resetIdleTimer();

    let offsetX = 0;
    let offsetY = 0;
    const REPULSION_RADIUS = 55;
    const REPEL_DISTANCE = 24;

    function handleMouseMove(e) {
      resetIdleTimer();
      if (!closeBtn || !card) return;

      const btnRect = closeBtn.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const deltaX = e.clientX - btnCenterX;
      const deltaY = e.clientY - btnCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < REPULSION_RADIUS) {
        const angle = Math.atan2(deltaY, deltaX);
        offsetX -= Math.cos(angle) * REPEL_DISTANCE;
        offsetY -= Math.sin(angle) * REPEL_DISTANCE;

        const cardRect = card.getBoundingClientRect();
        const minX = -cardRect.width + 45;
        const maxX = 10;
        const minY = -10;
        const maxY = cardRect.height - 35;

        offsetX = Math.max(minX, Math.min(maxX, offsetX));
        offsetY = Math.max(minY, Math.min(maxY, offsetY));

        closeBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    function dismissPaywall(reason) {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
      stopAudio();

      if (backdrop.parentNode) {
        backdrop.remove();
      }
      if (targetParagraph) {
        targetParagraph.classList.remove("dramatic-blurred-para");
      }
      currentPaywallParagraph = null;
      paywallActive = false;
      console.log(`[Dramatic Scroll Bar] Paywall dismissed (${reason}). Ready for Rage-Scroll!`);
    }

    payBtn.addEventListener("click", () => {
      resetIdleTimer();
      triggerUnlockAudio();
      payBtn.textContent = "❌ DECLINED: Insufficient Funds (Credit -40)";
      payBtn.style.background = "#dc2626";
      setTimeout(() => {
        payBtn.textContent = "⚡ Retry 1-Click Pay ($0.99)";
        payBtn.style.background = "#2563eb";
      }, 2000);
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dismissPaywall("Close button somehow caught");
    });
  }

  // ==========================================
  // 3. TIER 3: SYSTEM MELTDOWN (KONSOLE HYDRA)
  // ==========================================
  let konsoleActive = false;
  let activeWindows = [];
  let konsoleContainer = null;

  function ensureKonsoleContainer() {
    if (!konsoleContainer || !document.body.contains(konsoleContainer)) {
      konsoleContainer = document.createElement("div");
      konsoleContainer.id = "dramatic-konsole-root";
      konsoleContainer.addEventListener("pointerdown", (e) => {
        if (activeCursor === "terminal") {
          e.preventDefault();
          e.stopPropagation();
          executeTerminalProcessKill();
        }
      });
      document.body.appendChild(konsoleContainer);
    }
    return konsoleContainer;
  }

  const KERNEL_PANIC_LOGS = [
    "Kernel panic - not syncing: Fatal exception in interrupt",
    "CPU: 3 PID: 1337 Comm: rage_scroller Tainted: G        W  O",
    "Hardware name: QEMU Standard PC (i440FX + PIIX, 1996)",
    "Call Trace: <IRQ> dump_stack+0x5c/0x7b",
    "RIP: 0010:scroll_overflow_handler+0x42/0x90",
    "RSP: 0018:ffffb50d0066cd68 EFLAGS: 00010086",
    "Out of Memory: Kill process 9421 (chrome.exe) score 999",
    "CRITICAL: BUFFER OVERFLOW AT 0xDEADBEEF -- DUMPING CORE",
    "ata1.00: exception Emask 0x0 SAct 0x0 SErr 0x0 action 0x6",
    "BUG: unable to handle kernel paging request at ffffffffffffffe0",
    "Memory cgroup out of memory: Killed process 1044 (renderer)",
    "systemd-coredump[1402]: Process 9421 dumped core (size 4.2 GB)",
    "printk: 42 messages suppressed.",
    "---[ end Kernel panic - not syncing: VFS: Unable to mount root fs ]---"
  ];

  function spawnKonsoleWindow(x, y, width = 750, height = 480) {
    const container = ensureKonsoleContainer();
    if (activeWindows.length >= 18) return; // Cap at 18 windows to fill screen safely

    const clampedX = Math.max(10, Math.min(window.innerWidth - width - 20, x));
    const clampedY = Math.max(10, Math.min(window.innerHeight - height - 20, y));

    const win = document.createElement("div");
    win.className = "dramatic-konsole-window";
    win.style.left = `${clampedX}px`;
    win.style.top = `${clampedY}px`;
    win.style.width = `${width}px`;
    win.style.height = `${height}px`;

    win.innerHTML = `
      <div class="dramatic-konsole-titlebar">
        <div class="dramatic-konsole-title">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" rx="3" fill="#1b1e20" />
            <path d="M4 5L7 8L4 11" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <line x1="8" y1="11" x2="12" y2="11" stroke="#eff0f1" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          konsole — bash — 80x24
        </div>
        <div class="dramatic-konsole-controls">
          <button class="dramatic-kbtn" title="Minimize">—</button>
          <button class="dramatic-kbtn" title="Maximize">◻</button>
          <button class="dramatic-kbtn dramatic-kbtn-close" title="Close">✕</button>
        </div>
      </div>
      <div class="dramatic-konsole-body">
        <div class="dramatic-konsole-prompt">root@plasma-desktop:~# ./kernel_diag.sh</div>
      </div>
    `;

    container.appendChild(win);
    activeWindows.push(win);

    const body = win.querySelector(".dramatic-konsole-body");
    const closeBtn = win.querySelector(".dramatic-kbtn-close");

    const handleWinStrike = (e) => {
      if (activeCursor === "terminal") {
        e.preventDefault();
        e.stopPropagation();
        executeTerminalProcessKill();
      } else {
        // If clicking close button without terminal, let it close or misplay
        if (e.target !== closeBtn) {
          e.preventDefault();
          e.stopPropagation();
          executeCriticalMisplay("konsole", activeCursor, win, () => {});
        }
      }
    };

    win.addEventListener("pointerdown", handleWinStrike);
    win.addEventListener("click", handleWinStrike);

    // Infinitely streaming red kernel panic lines
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (!win.parentNode) {
        clearInterval(logInterval);
        return;
      }
      const uptime = (performance.now() / 1000 + logIndex * 0.12).toFixed(4);
      const text = KERNEL_PANIC_LOGS[logIndex % KERNEL_PANIC_LOGS.length];
      const line = document.createElement("div");
      line.className = "dramatic-konsole-log-line critical";
      line.textContent = `[ ${uptime} ] ${text}`;
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
      logIndex++;
    }, 110);

    // Close Button: Always kills the Konsole process immediately!
    const handleCloseClick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      executeTerminalProcessKill();
    };
    closeBtn.addEventListener("pointerdown", handleCloseClick);
    closeBtn.addEventListener("click", handleCloseClick);

    return win;
  }

  let konsoleIdleTimer = null;
  function resetKonsoleIdleTimer() {
    clearTimeout(konsoleIdleTimer);
    konsoleIdleTimer = setTimeout(() => {
      dismissKonsoleMeltdown("3 seconds of peace achieved");
    }, 3000);
  }

  let isDismissingKonsole = false;
  function dismissKonsoleMeltdown(reason) {
    if (isDismissingKonsole && activeWindows.length === 0) return;
    isDismissingKonsole = true;
    konsoleActive = false;
    clearTimeout(konsoleIdleTimer);
    window.removeEventListener("mousemove", resetKonsoleIdleTimer);
    window.removeEventListener("keydown", handleKonsoleEsc);
    stopAudio();

    // Flash system recovered before dissolution & disable pointer events immediately
    activeWindows.forEach((win) => {
      win.style.pointerEvents = "none";
      const body = win.querySelector(".dramatic-konsole-body");
      if (body) {
        body.innerHTML += `<div style="color: #22c55e; font-weight: bold; margin-top: 8px;">[SYSTEM RESTORED] Linux kernel recovered. Rebooting desktop...</div>`;
        body.scrollTop = body.scrollHeight;
      }
    });

    setTimeout(() => {
      activeWindows.forEach((win) => win.remove());
      activeWindows = [];
      if (konsoleContainer) {
        konsoleContainer.remove();
        konsoleContainer = null;
      }
      isDismissingKonsole = false;
      console.log(`[Dramatic Scroll Bar] Konsole Meltdown ended (${reason}).`);
    }, 800);
  }

  function handleKonsoleEsc(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      stopAudio();
      dismissKonsoleMeltdown("Escape key pressed");
    }
  }

  function spawnKonsoleMeltdown() {
    if (konsoleActive) return;
    konsoleActive = true;

    console.log("%c[Dramatic Scroll Bar] 🚨 TIER 3: SYSTEM MELTDOWN (KONSOLE HYDRA) FIRED!", "color: #ef4444; font-weight: bold; font-size: 14px;");

    playKonsoleAudio();

    const initialW = Math.min(960, Math.max(580, Math.floor(window.innerWidth * 0.82)));
    const initialH = Math.min(580, Math.max(380, Math.floor(window.innerHeight * 0.72)));
    const startX = Math.max(10, Math.floor((window.innerWidth - initialW) / 2));
    const startY = Math.max(10, Math.floor((window.innerHeight - initialH) / 2));

    spawnKonsoleWindow(startX, startY, initialW, initialH);

    resetKonsoleIdleTimer();
    window.addEventListener("mousemove", resetKonsoleIdleTimer);
    window.addEventListener("keydown", handleKonsoleEsc);
  }

  // ==========================================
  // 4. TIER 2: THE QUANTUM CYBER-SCRAMBLER
  // ==========================================
  let tier2Triggered = false;
  let tier2Active = false;
  let activeScrambleSpans = [];
  let scrambleIntervalId = null;
  let currentScrambledElement = null;
  let originalElementHTML = null;
  let activeDismissQuantumScrambler = null;

  function dismissQuantumScrambler(reason) {
    if (typeof activeDismissQuantumScrambler === "function") {
      activeDismissQuantumScrambler(reason);
      activeDismissQuantumScrambler = null;
    } else {
      if (currentScrambledElement && originalElementHTML) {
        currentScrambledElement.innerHTML = originalElementHTML;
        currentScrambledElement.classList.remove("dramatic-scrambler-container", "dramatic-scrambler-active");
      }
      activeScrambleSpans = [];
      tier2Active = false;
      currentScrambledElement = null;
    }
  }

  const SCRAMBLE_GLYPHS = "01010110%#$@&!?/\\|<>[]{}~=+*^~0xFA0x9CдфжшщяэюЪДФЖШЩЯЭЮ∑∏πΩ∆λµσθ§⚔⚛⚡☣⚙";

  function getRandomGlyph() {
    return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
  }

  function findVisibleTarget() {
    const candidates = Array.from(document.querySelectorAll("p, h2, h3, h1"));
    const centerY = window.innerHeight / 2;

    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      const text = (el.innerText || el.textContent || "").trim();
      if (rect.top <= centerY && rect.bottom >= centerY && text.length > 25) {
        return el;
      }
    }

    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      const text = (el.innerText || el.textContent || "").trim();
      if (rect.top >= 40 && rect.bottom <= window.innerHeight - 40 && text.length > 25) {
        return el;
      }
    }

    for (const el of candidates) {
      const rect = el.getBoundingClientRect();
      const text = (el.innerText || el.textContent || "").trim();
      if (rect.top < window.innerHeight && rect.bottom > 0 && text.length > 15) {
        return el;
      }
    }

    return candidates[0] || null;
  }

  function wrapTextNodesForScramble(element) {
    const spans = [];

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text || text.trim().length === 0) return;

        const frag = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (/\s/.test(ch)) {
            frag.appendChild(document.createTextNode(ch));
          } else {
            const span = document.createElement("span");
            span.className = "dramatic-scramble-char";
            span.dataset.orig = ch;
            span.textContent = getRandomGlyph();
            frag.appendChild(span);
            spans.push(span);
          }
        }
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList?.contains("dramatic-scramble-glitch-wave")) return;
        Array.from(node.childNodes).forEach(walk);
      }
    }

    walk(element);
    return spans;
  }

  function triggerQuantumScrambler(targetElement) {
    if (tier2Active) return;
    if (!targetElement) targetElement = findVisibleTarget();
    if (!targetElement) return;

    tier2Active = true;
    tier2Triggered = true;
    currentScrambledElement = targetElement;
    originalElementHTML = targetElement.innerHTML;

    console.log("%c[Dramatic Scroll Bar] ⚛ QUANTUM CYBER-SCRAMBLER TRIGGERED!", "color: #ff1133; font-weight: bold; font-size: 15px;");

    // Zero-latency BWAAAH trailer drop + 300ms physical screen shake
    playBwaaahSynth();
    triggerPhysicalShake();

    // Preserve typography and structure while applying chromatic glitching
    targetElement.classList.add("dramatic-scrambler-container", "dramatic-scrambler-active");

    // Sweeping Glitch Wave Ripple
    const glitchWave = document.createElement("div");
    glitchWave.className = "dramatic-scramble-glitch-wave";
    targetElement.appendChild(glitchWave);
    setTimeout(() => {
      if (glitchWave.parentNode) glitchWave.remove();
    }, 850);

    // Layout-safe character transformation
    activeScrambleSpans = wrapTextNodesForScramble(targetElement);

    // Ghost Lithophane Purge or Critical Misplay:
    targetElement.addEventListener("pointerdown", (e) => {
      if (activeCursor === "ghost") {
        e.preventDefault();
        e.stopPropagation();
        executeGhostLithophanePurge(targetElement);
      } else if (activeCursor === "brute") {
        e.preventDefault();
        e.stopPropagation();
        executeCriticalMisplay("scrambler", "brute", targetElement, () => {});
      }
    });

    // --- STEP 2: THE 150PX MAGNETIC CURSOR FORCEFIELD ---
    const FORCEFIELD_RADIUS = 150;
    const HYPER_GLYPHS = "⚔⚛⚡☣⚙%#$@&!?/\\|<>[]{}+*~0x9C0xFA";
    let spanPositions = [];
    let repelledSpans = new Set();

    function cacheSpanPositions() {
      if (!tier2Active || activeScrambleSpans.length === 0) return;
      spanPositions = activeScrambleSpans.map((span) => {
        const rect = span.getBoundingClientRect();
        return {
          span,
          cx: rect.left + rect.width / 2,
          cy: rect.top + rect.height / 2,
          isRepelled: false,
        };
      });
    }

    requestAnimationFrame(() => {
      cacheSpanPositions();
    });

    window.addEventListener("scroll", cacheSpanPositions, { passive: true });
    window.addEventListener("resize", cacheSpanPositions, { passive: true });

    function handleForcefieldMouseMove(e) {
      if (!tier2Active || isDismissing || spanPositions.length === 0) return;
      resetScramblerIdle();

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Quick bounding box check: if mouse is outside target vicinity + bubble, restore all
      if (currentScrambledElement) {
        const pRect = currentScrambledElement.getBoundingClientRect();
        if (
          mouseX < pRect.left - FORCEFIELD_RADIUS ||
          mouseX > pRect.right + FORCEFIELD_RADIUS ||
          mouseY < pRect.top - FORCEFIELD_RADIUS ||
          mouseY > pRect.bottom + FORCEFIELD_RADIUS
        ) {
          if (repelledSpans.size > 0) {
            repelledSpans.forEach((item) => {
              item.span.style.transform = "";
              item.span.classList.remove("dramatic-scramble-repelled");
              item.isRepelled = false;
            });
            repelledSpans.clear();
          }
          return;
        }
      }

      // --- GHOST LITHOPHANE REVEAL: BYPASS FORCEFIELD & ILLUMINATE ORIGINAL TEXT ---
      if (activeCursor === "ghost") {
        if (repelledSpans.size > 0) {
          repelledSpans.forEach((item) => {
            item.span.style.transform = "";
            item.span.classList.remove("dramatic-scramble-repelled");
            item.isRepelled = false;
          });
          repelledSpans.clear();
        }

        const LITHOPHANE_RADIUS = 135;
        for (let i = 0; i < spanPositions.length; i++) {
          const item = spanPositions[i];
          const dx = item.cx - mouseX;
          const dy = item.cy - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < LITHOPHANE_RADIUS) {
            item.span.classList.add("lithophane-revealed");
            item.span.textContent = item.span.dataset.orig || item.span.textContent;
          } else if (item.span.classList.contains("lithophane-revealed")) {
            item.span.classList.remove("lithophane-revealed");
            item.span.textContent = getRandomGlyph();
          }
        }
        return;
      }

      const nextRepelled = new Set();

      for (let i = 0; i < spanPositions.length; i++) {
        const item = spanPositions[i];
        const dx = item.cx - mouseX;
        const dy = item.cy - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < FORCEFIELD_RADIUS) {
          nextRepelled.add(item);
          item.isRepelled = true;

          // Repulsion factor: 1.0 directly under cursor, drops to 0 at perimeter
          const factor = 1 - dist / FORCEFIELD_RADIUS;
          const repelDist = 10 + 6 * factor; // 10px to 16px slide away
          const scale = 1.0 + 0.22 * factor; // 1.0x to 1.22x swell
          const angle = Math.atan2(dy, dx);
          const transX = Math.cos(angle) * repelDist;
          const transY = Math.sin(angle) * repelDist;

          item.span.style.transform = `translate(${transX.toFixed(1)}px, ${transY.toFixed(1)}px) scale(${scale.toFixed(2)})`;
          item.span.classList.add("dramatic-scramble-repelled");

          // Hyper-active instant glyph spin inside forcefield
          if (Math.random() < 0.6) {
            item.span.textContent = HYPER_GLYPHS[Math.floor(Math.random() * HYPER_GLYPHS.length)];
          }
        }
      }

      // Reset letters that escaped the forcefield bubble
      repelledSpans.forEach((item) => {
        if (!nextRepelled.has(item)) {
          item.span.style.transform = "";
          item.span.classList.remove("dramatic-scramble-repelled");
          item.isRepelled = false;
        }
      });

      repelledSpans = nextRepelled;
    }

    window.addEventListener("mousemove", handleForcefieldMouseMove);

    // --- STEP 3: SELECTOR GASLIGHTING & HIGHLIGHT WARFARE ---
    let selectedSpans = new Set();
    let trollDebounceTimer = null;
    const TROLL_MESSAGES = [
      "CAN'T READ?",
      "TRY HARDER!",
      "NICE TRY!",
      "BWAAAH!",
      "HELD HOSTAGE",
      "ERROR: 404 WORDS",
      "N0 PEAK1NG!"
    ];

    function handleSelectionChange() {
      if (!tier2Active || isDismissing || !currentScrambledElement) return;

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        if (selectedSpans.size > 0) {
          selectedSpans.forEach((span) => {
            span.classList.remove("dramatic-scramble-selected", "dramatic-scramble-troll");
            span.textContent = span.dataset.origGlitch || getRandomGlyph();
          });
          selectedSpans.clear();
        }
        clearTimeout(trollDebounceTimer);
        return;
      }

      const range = sel.getRangeAt(0);
      if (!currentScrambledElement.contains(range.commonAncestorContainer) &&
          !range.intersectsNode(currentScrambledElement)) {
        return;
      }

      const nextSelected = new Set();

      for (let i = 0; i < activeScrambleSpans.length; i++) {
        const span = activeScrambleSpans[i];
        try {
          if (range.intersectsNode(span)) {
            nextSelected.add(span);
            if (!span.dataset.origGlitch) {
              span.dataset.origGlitch = span.textContent;
            }
            // Disappearing selection: letters vanish into glowing blanks
            span.classList.add("dramatic-scramble-selected");
          }
        } catch (e) {}
      }

      selectedSpans.forEach((span) => {
        if (!nextSelected.has(span)) {
          span.classList.remove("dramatic-scramble-selected", "dramatic-scramble-troll");
          span.textContent = span.dataset.origGlitch || getRandomGlyph();
        }
      });

      selectedSpans = nextSelected;

      // Character Splicing: If user selects at least 5 letters, splice into upside-down troll text
      clearTimeout(trollDebounceTimer);
      if (selectedSpans.size >= 5) {
        trollDebounceTimer = setTimeout(() => {
          if (!tier2Active || selectedSpans.size === 0) return;
          const trollMsg = TROLL_MESSAGES[Math.floor(Math.random() * TROLL_MESSAGES.length)];
          const spansArr = Array.from(selectedSpans);
          spansArr.forEach((span, idx) => {
            span.textContent = trollMsg[idx % trollMsg.length];
            span.classList.remove("dramatic-scramble-selected");
            span.classList.add("dramatic-scramble-troll");
          });
        }, 130);
      }
    }

    function handleCopyTrap(e) {
      if (!tier2Active || !currentScrambledElement) return;

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

      const range = sel.getRangeAt(0);
      if (currentScrambledElement.contains(range.commonAncestorContainer) ||
          range.intersectsNode(currentScrambledElement)) {
        e.preventDefault();

        const trollPhrases = [
          "ha-ha-ha-ha-BWAAAH-ha-ha-ha-ha-BWAAAH ",
          "WHY ARE YOU COPYING GARBAGE? TRY HARDER ",
          "0xDEADBEEF 0x000000 0xFA11ED 0xBWAAAH ",
          "Nice try! The words are held hostage. ⚔⚛ "
        ];
        const basePhrase = trollPhrases[Math.floor(Math.random() * trollPhrases.length)];
        const trollText = basePhrase.repeat(16).trim();

        if (e.clipboardData) {
          e.clipboardData.setData("text/plain", trollText);
        }
        console.log("%c[Dramatic Scroll Bar] 📋 Clipboard hijacked! Injected mocking laughter.", "color: #ff1133; font-weight: bold;");
      }
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("copy", handleCopyTrap);

    // Live Cryptographic Ticker Loop
    clearInterval(scrambleIntervalId);
    scrambleIntervalId = setInterval(() => {
      if (!tier2Active || activeScrambleSpans.length === 0) {
        clearInterval(scrambleIntervalId);
        return;
      }

      // 1. Regular background cycle: ~18% of un-repelled characters
      const countToUpdate = Math.max(3, Math.floor(activeScrambleSpans.length * 0.18));
      for (let i = 0; i < countToUpdate; i++) {
        const randIdx = Math.floor(Math.random() * activeScrambleSpans.length);
        const span = activeScrambleSpans[randIdx];
        if (span && !span.classList.contains("dramatic-scramble-repelled") && !span.classList.contains("dramatic-scramble-troll")) {
          span.textContent = getRandomGlyph();
        }
      }

      // 2. Accelerated spinning chaos for repelled letters (double speed & frenzy!)
      if (repelledSpans.size > 0) {
        repelledSpans.forEach((item) => {
          if (!item.span.classList.contains("dramatic-scramble-troll")) {
            item.span.textContent = HYPER_GLYPHS[Math.floor(Math.random() * HYPER_GLYPHS.length)];
          }
        });
      }
    }, 45);

    // 5-Second Inactivity / Escape Recovery
    let scramblerIdleTimer = null;
    let isDismissing = false;

    function resetScramblerIdle() {
      if (isDismissing) return;
      clearTimeout(scramblerIdleTimer);
      scramblerIdleTimer = setTimeout(() => {
        dismissQuantumScrambler("3 seconds of peace achieved");
      }, 3000);
    }

    function handleScramblerEsc(e) {
      if (e.key === "Escape") {
        dismissQuantumScrambler("Escape key pressed");
      }
    }

    activeDismissQuantumScrambler = function(reason) {
      if (isDismissing) return;
      isDismissing = true;
      activeDismissQuantumScrambler = null;
      clearTimeout(scramblerIdleTimer);
      clearTimeout(trollDebounceTimer);
      clearInterval(scrambleIntervalId);
      window.removeEventListener("mousemove", resetScramblerIdle);
      window.removeEventListener("mousemove", handleForcefieldMouseMove);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("copy", handleCopyTrap);
      window.removeEventListener("scroll", cacheSpanPositions);
      window.removeEventListener("resize", cacheSpanPositions);
      window.removeEventListener("keydown", handleScramblerEsc);

      console.log(`[Dramatic Scroll Bar] 🔓 Quantum Scrambler dismissed (${reason}). Restoring text...`);

      if (currentScrambledElement) {
        currentScrambledElement.classList.remove("dramatic-scrambler-active");

        // Smooth decrypt transition: restore original characters in rapid cascade
        activeScrambleSpans.forEach((span, idx) => {
          setTimeout(() => {
            span.style.transform = "";
            span.textContent = span.dataset.orig || span.textContent;
            span.style.color = "";
            span.style.textShadow = "none";
          }, Math.min(600, idx * 8));
        });

        setTimeout(() => {
          if (currentScrambledElement) {
            ignoredInitialElements.add(currentScrambledElement);
            if (originalElementHTML) {
              currentScrambledElement.innerHTML = originalElementHTML;
              currentScrambledElement.classList.remove("dramatic-scrambler-container");
            }
          }
          activeScrambleSpans = [];
          spanPositions = [];
          repelledSpans.clear();
          tier2Active = false;
          currentScrambledElement = null;
          lastEncounterEndTime = performance.now();
          console.log("[Dramatic Scroll Bar] ✨ Text decrypted! Ready for Rage-Scroll.");
        }, 750);
      } else {
        tier2Active = false;
        lastEncounterEndTime = performance.now();
      }
    };

    resetScramblerIdle();
    window.addEventListener("keydown", handleScramblerEsc);
  }

  // ==========================================
  // 5. TRIGGER & SCROLL OBSERVER ENGINE
  // ==========================================
  const initialScrollY = window.scrollY;
  let userHasPhysicallyScrolled = false;
  let armedForTrigger = false;

  function markUserScrolled() {
    userHasPhysicallyScrolled = true;
    if (Math.abs(window.scrollY - initialScrollY) > 350) {
      armedForTrigger = true;
    }
  }

  window.addEventListener("wheel", markUserScrolled, { passive: true });
  window.addEventListener("touchmove", markUserScrolled, { passive: true });
  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", "Space"].includes(e.code)) {
      markUserScrolled();
    }
  }, { passive: true });

  // Scroll Speed & Velocity Tracking
  let lastScrollY = window.scrollY;
  let lastScrollTime = performance.now();
  let currentVelocity = 0; // px/ms
  let recentMaxVelocity = 0;
  let velocityDecayTimer = null;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = currentTime - lastScrollTime;

      if (deltaTime > 0) {
        currentVelocity = deltaY / deltaTime;
        if (currentVelocity > recentMaxVelocity) {
          recentMaxVelocity = currentVelocity;
        }
        clearTimeout(velocityDecayTimer);
        velocityDecayTimer = setTimeout(() => {
          recentMaxVelocity = 0;
          currentVelocity = 0;
        }, 220);
      }

      if (userHasPhysicallyScrolled && Math.abs(currentScrollY - initialScrollY) > 350) {
        armedForTrigger = true;
      }

      // High-velocity scroll leap: trigger a true Blind Switch-In random encounter!
      if (
        armedForTrigger &&
        !activeTelegraph &&
        !paywallActive &&
        !tier2Active &&
        !konsoleActive &&
        deltaTime > 0 &&
        (currentVelocity > 2.0 || deltaY > 600)
      ) {
        const visibleTarget = findVisibleTarget() || document.querySelector("p");
        if (visibleTarget) {
          triggerRandomEncounter(visibleTarget);
        }
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    },
    { passive: true }
  );

  function isHugeParagraph(p) {
    const textLen = (p.textContent || "").trim().length;
    return textLen > 200 || p.clientHeight > 80;
  }

  function isDramaticTarget(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "h1" || tag === "h2" || tag === "h3") return true;
    if (tag === "p" && isHugeParagraph(el)) return true;
    return false;
  }

  const ignoredInitialElements = new WeakSet();
  function registerInitialElements() {
    const all = document.querySelectorAll("h1, h2, h3, p");
    all.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        ignoredInitialElements.add(el);
      }
    });
  }
  registerInitialElements();

  let lastEncounterEndTime = 0;
  const ENCOUNTER_COOLDOWN_MS = 1400;

  function triggerRandomEncounter(target) {
    if (freeScrollMode) return;
    if (activeTelegraph || paywallActive || tier2Active || konsoleActive) return;
    if (performance.now() - lastEncounterEndTime < ENCOUNTER_COOLDOWN_MS) return;

    let paragraph = target.tagName.startsWith("H")
      ? (target.nextElementSibling?.tagName === "P" ? target.nextElementSibling : document.querySelector("p") || target)
      : target;

    const THREATS = ["paywall", "scrambler", "konsole"];
    const chosenThreat = THREATS[Math.floor(Math.random() * THREATS.length)];

    if (!bossBattleActive) {
      bossBattleActive = true;
      bossMaxHP = 5;
      bossCurrentHP = 5;
    }

    console.log(`[Dramatic Scroll Bar] 🎲 Boss Encounter Phase [${bossCurrentHP}/${bossMaxHP}] rolling threat: [${chosenThreat.toUpperCase()}]`);

    const callbacks = {
      paywall: () => spawnPaywall(paragraph),
      scrambler: () => triggerQuantumScrambler(paragraph),
      konsole: () => spawnKonsoleMeltdown()
    };

    startTelegraphPhase(chosenThreat, paragraph, callbacks[chosenThreat], true);
  }

  const elementEnterTimes = new WeakMap();

  const observer = new IntersectionObserver(
    (entries) => {
      if (!armedForTrigger) return;

      for (const entry of entries) {
        const target = entry.target;
        if (ignoredInitialElements.has(target)) continue;

        if (entry.isIntersecting) {
          if (!elementEnterTimes.has(target)) {
            elementEnterTimes.set(target, performance.now());
          }

          // --- THE BLIND SWITCH-IN (RANDOMIZATION ENGINE) ---
          if (recentMaxVelocity > 1.2 || currentVelocity > 1.2) {
            triggerRandomEncounter(target);
            break;
          }
        } else {
          if (elementEnterTimes.has(target)) {
            const dwellTime = performance.now() - elementEnterTimes.get(target);
            elementEnterTimes.delete(target);

            // Scrolled past top in < 1.4s without reading
            if (entry.boundingClientRect.bottom < 0 && dwellTime < 1400) {
              triggerRandomEncounter(target);
              break;
            }
          }
        }
      }
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: [0.0, 0.2],
    }
  );

  function observeTargets(container = document) {
    const targets = container.querySelectorAll("h1, h2, h3, p");
    targets.forEach((el) => {
      if (isDramaticTarget(el)) {
        observer.observe(el);
      }
    });
  }

  observeTargets();

  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          observeTargets(node);
        }
      }
    }
  });

  if (document.body) {
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  // ==========================================
  // THE DUEL HUD: USER HP & SEGMENTED BOSS HP
  // ==========================================
  let userHP = 100;
  let userHpDockEl = null;
  let activeBossHpEl = null;

  // Persistent Multi-Stage Boss Battle State
  let bossBattleActive = false;
  let bossMaxHP = 5;
  let bossCurrentHP = 5;

  // Free Scroll Mode & Victory Modal Controller
  let freeScrollMode = false;
  let freeScrollPillEl = null;

  function enableFreeScrollMode() {
    freeScrollMode = true;
    bossBattleActive = false;
    bossCurrentHP = 5;
    if (activeTelegraph) {
      dismissTelegraph(true);
    }
    removeBossHPBar();
    const modal = document.getElementById("dramatic-victory-dialog");
    if (modal) modal.remove();

    if (!freeScrollPillEl) {
      freeScrollPillEl = document.createElement("div");
      freeScrollPillEl.id = "dramatic-free-scroll-pill";
      freeScrollPillEl.innerHTML = `
        <span>🛡️ FREE SCROLL ACTIVE</span>
        <button class="dramatic-rearm-btn" id="dramatic-rearm-btn">⚔️ Re-Arm Combat</button>
      `;
      document.body.appendChild(freeScrollPillEl);

      freeScrollPillEl.querySelector("#dramatic-rearm-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        disableFreeScrollMode();
      });
    }
    showCombatStamp("[ 🛡️ FREE SCROLL ENGAGED // SCROLL FREELY ]", "ghost", 1400);
    console.log("%c[Dramatic Scroll Bar] 🛡️ FREE SCROLL MODE ACTIVE — Traps suppressed.", "color: #22c55e; font-weight: bold;");
  }

  function disableFreeScrollMode() {
    freeScrollMode = false;
    bossBattleActive = false;
    bossCurrentHP = 5;
    removeBossHPBar();
    updateUserHP(100); // restore defenses to full
    if (freeScrollPillEl && freeScrollPillEl.parentNode) {
      freeScrollPillEl.remove();
    }
    freeScrollPillEl = null;
    lastEncounterEndTime = performance.now();
    showCombatStamp("[ ⚔️ COMBAT RE-ARMED // DEFENSES ONLINE ]", "boss-strike", 1400);
    console.log("%c[Dramatic Scroll Bar] ⚔️ COMBAT DEFENSES RESTORED.", "color: #ff4400; font-weight: bold;");
  }

  function showBossVictoryDialog() {
    const existing = document.getElementById("dramatic-victory-dialog");
    if (existing) existing.remove();

    const dialog = document.createElement("div");
    dialog.id = "dramatic-victory-dialog";
    dialog.innerHTML = `
      <div class="dramatic-victory-card">
        <button class="dramatic-victory-close" id="dramatic-victory-close" title="Close">✕</button>
        <div class="dramatic-victory-badge">⚔️ COMBAT VICTORY // BOSS DEFEATED</div>
        <h2 class="dramatic-victory-title">🎉 now u can scroll freely</h2>
        <p class="dramatic-victory-desc">
          The Boss anomaly has been shattered! Would you like to scroll freely without interruptions, or re-arm defenses to try again?
        </p>
        <div class="dramatic-victory-actions">
          <button class="dramatic-btn-free-scroll" id="dramatic-btn-free-scroll">🛡️ Scroll Freely</button>
          <button class="dramatic-btn-try-again" id="dramatic-btn-try-again">⚔️ Try Again</button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    const closeBtn = dialog.querySelector("#dramatic-victory-close");
    const freeScrollBtn = dialog.querySelector("#dramatic-btn-free-scroll");
    const tryAgainBtn = dialog.querySelector("#dramatic-btn-try-again");

    const closeDialog = () => {
      dialog.classList.add("fade-out");
      setTimeout(() => {
        if (dialog.parentNode) dialog.remove();
      }, 350);
    };

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDialog();
    });

    freeScrollBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDialog();
      enableFreeScrollMode();
    });

    tryAgainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDialog();
      disableFreeScrollMode();
    });
  }

  function createUserHPDock() {
    if (userHpDockEl) return;
    userHpDockEl = document.createElement("div");
    userHpDockEl.id = "dramatic-user-hp-dock";
    userHpDockEl.innerHTML = `
      <div class="dramatic-user-hp-header">
        <span>🛡️ READER DEFENSES</span>
        <span class="dramatic-user-hp-val" id="dramatic-user-hp-text">100 / 100 HP</span>
      </div>
      <div class="dramatic-user-hp-track">
        <div class="dramatic-user-hp-fill" id="dramatic-user-hp-fill" style="width: 100%;"></div>
      </div>
    `;
    document.body.appendChild(userHpDockEl);
  }

  function updateUserHP(delta) {
    userHP = Math.max(0, Math.min(100, userHP + delta));
    if (!userHpDockEl) createUserHPDock();

    const txt = userHpDockEl.querySelector("#dramatic-user-hp-text");
    const fill = userHpDockEl.querySelector("#dramatic-user-hp-fill");

    if (txt) txt.textContent = `${userHP} / 100 HP`;
    if (fill) {
      fill.style.width = `${userHP}%`;
      fill.classList.remove("warning", "critical");
      if (userHP <= 25) {
        fill.classList.add("critical");
        if (txt) txt.style.color = "#ef4444";
      } else if (userHP <= 50) {
        fill.classList.add("warning");
        if (txt) txt.style.color = "#fbbf24";
      } else {
        if (txt) txt.style.color = "#22c55e";
      }
    }

    if (delta < 0) {
      userHpDockEl.classList.remove("damage-flash");
      void userHpDockEl.offsetWidth;
      userHpDockEl.classList.add("damage-flash");
      setTimeout(() => {
        if (userHpDockEl) userHpDockEl.classList.remove("damage-flash");
      }, 400);
    }

    if (userHP <= 0) {
      console.log("%c[Dramatic Scroll Bar] 💀 USER HP DEPLETED! Total Wipeout incoming...", "color: #ff0000; font-weight: bold; font-size: 16px;");
      if (typeof triggerWipeoutSequence === "function") {
        triggerWipeoutSequence();
      }
    }
  }

  let isWipeoutActive = false;

  function triggerWipeoutSequence() {
    if (isWipeoutActive) return;
    isWipeoutActive = true;

    console.log("%c[Dramatic Scroll Bar] 💥 TRIGGERING WIPEOUT: PAGE STYLES DISMANTLED // RETREAT TO APEX", "color: #ff0033; font-weight: bold; font-size: 16px;");

    // 1. Audio and rumble
    playDistortedPunishBwaaah();
    triggerPhysicalShake();

    // 2. Dismiss any active telegraph and Boss HUD
    dismissTelegraph(true);
    bossBattleActive = false;
    bossCurrentHP = 5;
    removeBossHPBar();

    // 3. Temporarily dismantle page styles (CSS Stripping)
    const disabledStyles = [];
    const styleNodes = document.querySelectorAll('link[rel="stylesheet"], style');
    styleNodes.forEach((node) => {
      const href = node.getAttribute("href") || "";
      const id = node.id || "";
      const isExtension = href.includes("chrome-extension:") ||
                          href.includes("styles.css") ||
                          id.startsWith("dramatic-");
      if (!isExtension) {
        disabledStyles.push(node);
        node.disabled = true;
      }
    });

    // 4. Inject #dramatic-wipeout-overlay
    const overlay = document.createElement("div");
    overlay.id = "dramatic-wipeout-overlay";
    overlay.innerHTML = `
      <div class="dramatic-wipeout-title">⚠️ DEFENSES SHATTERED</div>
      <div class="dramatic-wipeout-sub">SYSTEM COLLAPSE // FORCED RETREAT TO APEX</div>
      <div class="dramatic-wipeout-bar">
        <div class="dramatic-wipeout-fill"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    // 5. Force scroll back to apex (top)
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 350);

    // 6. After 2.4s: Restore CSS, reset HP, rearm system
    setTimeout(() => {
      // Restore styles
      disabledStyles.forEach((node) => {
        try {
          node.disabled = false;
        } catch (e) {}
      });

      // Remove wipeout overlay
      if (overlay.parentNode) {
        overlay.remove();
      }

      // Restore full User HP
      updateUserHP(100);

      // Re-arm state
      isWipeoutActive = false;
      armedForTrigger = true;
      console.log("%c[Dramatic Scroll Bar] 🛡️ DEFENSES RESTORED // READY FOR DESCENT", "color: #22c55e; font-weight: bold;");
    }, 2400);
  }

  function createBossHPBar(targetElement = null, totalSegments = 5, label = "☠️ BOSS HP // 5-SECTOR COMBAT LOCK") {
    // If Boss HP bar already exists in DOM, update header text and return it (do NOT wipe shattered segments!)
    if (activeBossHpEl && activeBossHpEl.parentNode) {
      const headerSpan = activeBossHpEl.querySelector(".dramatic-boss-hp-header span:first-child");
      if (headerSpan) headerSpan.textContent = label;
      return activeBossHpEl;
    }

    removeBossHPBar();

    const wrapper = document.createElement("div");
    wrapper.className = "dramatic-boss-hp-wrapper";

    let segmentsHTML = "";
    for (let i = 0; i < totalSegments; i++) {
      segmentsHTML += `
        <div class="dramatic-boss-hp-segment" data-seg="${i}">
          <div class="dramatic-boss-hp-seg-fill"></div>
        </div>
      `;
    }

    wrapper.innerHTML = `
      <div class="dramatic-boss-hp-header">
        <span>${label}</span>
        <span class="dramatic-boss-seg-count">${totalSegments} / ${totalSegments} SECTORS</span>
      </div>
      <div class="dramatic-boss-hp-segments">
        ${segmentsHTML}
      </div>
    `;

    document.body.appendChild(wrapper);
    activeBossHpEl = wrapper;
    return wrapper;
  }

  function drainBossSegment(segmentIndex, remaining, total) {
    if (!activeBossHpEl) return;
    const seg = activeBossHpEl.querySelector(`.dramatic-boss-hp-segment[data-seg="${segmentIndex}"]`);
    if (seg) {
      seg.classList.add("shattered");
    }
    const countEl = activeBossHpEl.querySelector(".dramatic-boss-seg-count");
    if (countEl) {
      countEl.textContent = `${remaining} / ${total} SECTORS`;
    }
  }

  function removeBossHPBar(delayMs = 0) {
    if (!activeBossHpEl) return;
    const bar = activeBossHpEl;
    activeBossHpEl = null;
    if (delayMs > 0) {
      setTimeout(() => {
        if (bar && bar.parentNode) {
          bar.remove();
        }
      }, delayMs);
    } else {
      if (bar.parentNode) {
        bar.remove();
      }
    }
  }

  // ==========================================
  // CURSOR PARTY: STATE & THE 1.5s TELEGRAPH
  // ==========================================
  let activeCursor = "brute"; // 'brute' | 'ghost' | 'terminal'
  let customCursorEl = null;
  let rosterHudEl = null;
  let activeTelegraph = null;
  let fieldBannerEl = null;

  function playTelegraphAudio(threatType) {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.setValueAtTime(1100, now + 0.08);
      osc.frequency.setValueAtTime(740, now + 0.16);
      osc.frequency.setValueAtTime(1250, now + 0.24);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {}
  }

  function playCounterSuccessAudio() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.2, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  function getFieldBanner() {
    if (fieldBannerEl) return fieldBannerEl;
    fieldBannerEl = document.createElement("div");
    fieldBannerEl.id = "dramatic-field-banner";
    fieldBannerEl.innerHTML = `
      <div class="dramatic-field-badge" id="dramatic-banner-badge">THREAT</div>
      <div class="dramatic-field-info">
        <div class="dramatic-field-title" id="dramatic-banner-title">FIELD ANOMALY DETECTED</div>
        <div class="dramatic-field-counter-hint" id="dramatic-banner-hint">SELECT HARD COUNTER BEFORE WINDOW CLOSES</div>
      </div>
    `;
    document.body.appendChild(fieldBannerEl);
    return fieldBannerEl;
  }

  function playClippedBassHit() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.09);
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  function startTelegraphPhase(threatType, targetElement, deployCallback, isBossOverride = null) {
    if (activeTelegraph) {
      dismissTelegraph(true);
    }

    const el = targetElement || document.querySelector("p") || document.body;
    
    // Ensure Multi-Stage Persistent Boss is initialized
    if (!bossBattleActive) {
      bossBattleActive = true;
      bossMaxHP = 5;
      bossCurrentHP = 5;
    }

    // Mount or refresh Boss HP bar (preserves existing shattered segments across scrolling)
    createBossHPBar(document.body, bossMaxHP, `☠️ BOSS HP // ${bossMaxHP}-SECTOR COMBAT LOCK`);

    // Hits required to clear this individual paragraph's ambush:
    const ambushHits = Math.random() < 0.35 ? 2 : 1;

    const banner = getFieldBanner();
    const badge = banner.querySelector("#dramatic-banner-badge");
    const title = banner.querySelector("#dramatic-banner-title");
    const hint = banner.querySelector("#dramatic-banner-hint");

    let comboStrike = 0;
    let currentThreat = threatType;
    let currentTimerId = null;

    function updateBannerThreat(t, strikeNum = 1) {
      banner.className = `threat-${t} visible`;
      const phaseStr = ambushHits > 1 ? ` [PHASE ${strikeNum}/${ambushHits}]` : "";
      if (t === "paywall") {
        badge.textContent = `BOSS HP: ${bossCurrentHP}/${bossMaxHP} // PAYWALL${phaseStr}`;
        title.textContent = `⚠️ FIELD ANOMALY: REINFORCED LOCK${phaseStr}`;
        hint.innerHTML = "Deploy <strong>[1] BRUTE</strong> to strike!";
      } else if (t === "scrambler") {
        badge.textContent = `BOSS HP: ${bossCurrentHP}/${bossMaxHP} // SCRAMBLER${phaseStr}`;
        title.textContent = `☣️ QUANTUM CIPHER: SPECTRAL PURGE${phaseStr}`;
        hint.innerHTML = "Deploy <strong>[2] GHOST</strong> to strike!";
      } else if (t === "konsole") {
        badge.textContent = `BOSS HP: ${bossCurrentHP}/${bossMaxHP} // HYDRA${phaseStr}`;
        title.textContent = `💥 KERNEL HYDRA: SIGKILL TERMINATION${phaseStr}`;
        hint.innerHTML = "Deploy <strong>[3] TERMINAL</strong> to strike!";
      }
    }

    updateBannerThreat(currentThreat, 1);
    playTelegraphAudio(currentThreat);

    el.classList.add("dramatic-telegraph-target", `threat-${currentThreat}`);

    const overlay = document.createElement("div");
    overlay.className = "dramatic-telegraph-overlay";
    overlay.innerHTML = `
      <div class="dramatic-telegraph-corner tl"></div>
      <div class="dramatic-telegraph-corner tr"></div>
      <div class="dramatic-telegraph-corner bl"></div>
      <div class="dramatic-telegraph-corner br"></div>
      <div class="dramatic-telegraph-timer-container">
        <div class="dramatic-telegraph-timer-track">
          <div class="dramatic-telegraph-timer-fill"></div>
        </div>
        <div class="dramatic-telegraph-timer-badge">⏱️ 3.0s // BOSS HP: ${bossCurrentHP}/${bossMaxHP}</div>
      </div>
    `;
    el.appendChild(overlay);

    function resetTimer(durationMs) {
      clearTimeout(currentTimerId);
      const fill = overlay.querySelector(".dramatic-telegraph-timer-fill");
      const badgeEl = overlay.querySelector(".dramatic-telegraph-timer-badge");

      if (fill) {
        fill.style.animation = "none";
        void fill.offsetWidth;
        fill.style.animation = `dramatic-timer-burn ${durationMs}ms linear forwards`;
      }
      if (badgeEl) {
        badgeEl.textContent = ambushHits > 1
          ? `⏱️ ${(durationMs / 1000).toFixed(1)}s // STRIKE ${comboStrike + 1}/${ambushHits}`
          : `⏱️ ${(durationMs / 1000).toFixed(1)}s // BOSS HP: ${bossCurrentHP}/${bossMaxHP}`;
      }

      currentTimerId = setTimeout(() => {
        console.log(`[Dramatic Scroll Bar] ⏳ Window expired! Threat deploying...`);
        playDistortedPunishBwaaah();
        triggerPhysicalShake();
        updateUserHP(-25);
        dismissTelegraph(false, false);
        deployCallback();
      }, durationMs);
    }

    resetTimer(3000);

    let lastHitTimestamp = 0;

    const executeStrike = (counterUsed) => {
      const now = performance.now();
      // 200ms debounce
      if (now - lastHitTimestamp < 200) return;

      const requiredCounter = {
        paywall: "brute",
        scrambler: "ghost",
        konsole: "terminal"
      }[currentThreat];

      if (counterUsed === requiredCounter) {
        lastHitTimestamp = now;

        if (comboStrike < ambushHits - 1) {
          // --- THE FLINCH & RANDOM SHIFT (multi-hit ambush on paragraph) ---
          comboStrike++;
          playClippedBassHit();
          triggerPhysicalShake();

          showCombatStamp(`[ STRIKE ${comboStrike}/${ambushHits} CONNECTED // WEAKPOINT CRACKED ]`, "boss-strike", 850);

          // Flinch animation
          el.classList.remove("dramatic-boss-flinch");
          void el.offsetWidth;
          el.classList.add("dramatic-boss-flinch");

          // Shift threat randomly to a DIFFERENT threat!
          const otherThreats = ["paywall", "scrambler", "konsole"].filter(t => t !== currentThreat);
          currentThreat = otherThreats[Math.floor(Math.random() * otherThreats.length)];
          if (activeTelegraph) activeTelegraph.threatType = currentThreat;

          // Update visual aura on element
          el.classList.remove("threat-paywall", "threat-scrambler", "threat-konsole");
          el.classList.add(`threat-${currentThreat}`);

          // Update banner and audio
          updateBannerThreat(currentThreat, comboStrike + 1);
          playTelegraphAudio(currentThreat);

          // Reset reaction timer to 3.0s (3000ms)
          resetTimer(3000);
          return;
        }

        // --- AMBUSH DESTROYED ON THIS PARAGRAPH: DAMAGE PERSISTENT BOSS HP ---
        bossCurrentHP--;
        const shatteredIdx = bossMaxHP - bossCurrentHP - 1;
        drainBossSegment(shatteredIdx, bossCurrentHP, bossMaxHP);

        // Execute suppression visual on paragraph
        if (currentThreat === "paywall") {
          executeBruteGlassShatter(el);
        } else if (currentThreat === "scrambler") {
          executeGhostLithophanePurge(el);
        } else if (currentThreat === "konsole") {
          executeTerminalProcessKill();
        }

        if (bossCurrentHP <= 0) {
          // --- FINAL BOSS DEFEAT! ---
          playTriumphantBwaaah();
          playCounterSuccessAudio();
          triggerPhysicalShake();
          showCombatStamp("[ ☠️ BOSS TERMINATED // SYSTEM PURGED ]", "boss-finish", 1300);
          dismissTelegraph(false, true);
          bossBattleActive = false;
          setTimeout(() => {
            showBossVictoryDialog();
          }, 1100);
        } else {
          // --- BOSS SURVIVES & RETREATS DOWN THE PAGE ---
          playClippedBassHit();
          triggerPhysicalShake();
          showCombatStamp(`[ 💥 BOSS WEAKENED // HP: ${bossCurrentHP}/${bossMaxHP} // SCROLL DOWN! ]`, "boss-strike", 1000);
          dismissTelegraph(false, false); // Keep Boss HP Bar active!

          // Instruct reader to scroll down to pursue
          const bannerEl = getFieldBanner();
          bannerEl.className = "visible";
          const bBadge = bannerEl.querySelector("#dramatic-banner-badge");
          const bTitle = bannerEl.querySelector("#dramatic-banner-title");
          const bHint = bannerEl.querySelector("#dramatic-banner-hint");
          if (bBadge) bBadge.textContent = `BOSS FLEEING // ${bossCurrentHP}/${bossMaxHP} SECTORS REMAINING`;
          if (bTitle) bTitle.textContent = `⚠️ ANOMALY PURGED // SCROLL DOWN TO INTERCEPT BOSS`;
          if (bHint) bHint.innerHTML = `Keep scrolling down to force the Boss out of hiding!`;
          setTimeout(() => {
            if (bannerEl && !activeTelegraph) {
              bannerEl.classList.remove("visible");
            }
          }, 2400);
        }

      } else {
        // --- WRONG COUNTER MISFIRE / DEFLECT ---
        playDeflectionZapAudio();
        triggerPhysicalShake();
        updateUserHP(-15);
        lastHitTimestamp = now;

        if (hint) {
          hint.innerHTML = `<span style="color: #ff3344; font-weight: bold;">⚡ DEFLECTED (-15 HP)! Switch to counter: [${requiredCounter.toUpperCase()}]</span>`;
        }
      }
    };

    const onStrike = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      executeStrike(activeCursor);
    };

    overlay.addEventListener("pointerdown", onStrike);
    el.addEventListener("pointerdown", onStrike);

    activeTelegraph = {
      threatType: currentThreat,
      targetElement: el,
      overlay,
      onStrike,
      executeStrike,
      clearTimer: () => clearTimeout(currentTimerId),
      deployCallback
    };
  }

  function dismissTelegraph(removeBannerNow = true, delayHpRemove = false) {
    if (!activeTelegraph) return;
    if (activeTelegraph.clearTimer) activeTelegraph.clearTimer();

    // Only remove Boss HP bar if boss is dead, or wipeout, or delayHpRemove is true
    if (!bossBattleActive || bossCurrentHP <= 0 || delayHpRemove) {
      if (delayHpRemove) {
        removeBossHPBar(1000);
      } else {
        removeBossHPBar();
      }
    }

    if (activeTelegraph.overlay && activeTelegraph.overlay.parentNode) {
      activeTelegraph.overlay.remove();
    }
    if (activeTelegraph.targetElement) {
      if (activeTelegraph.onStrike) {
        activeTelegraph.targetElement.removeEventListener("pointerdown", activeTelegraph.onStrike);
      }
      activeTelegraph.targetElement.classList.remove(
        "dramatic-telegraph-target",
        "dramatic-boss-flinch",
        "threat-paywall",
        "threat-scrambler",
        "threat-konsole"
      );
    }
    activeTelegraph = null;
    lastEncounterEndTime = performance.now();

    if (fieldBannerEl) {
      if (removeBannerNow) {
        fieldBannerEl.classList.remove("visible");
      } else {
        setTimeout(() => {
          if (fieldBannerEl && !activeTelegraph) {
            fieldBannerEl.classList.remove("visible");
          }
        }, 1400);
      }
    }
  }

  // ==========================================
  // SUPER EFFECTIVE AUDIO & VISUAL EXECUTIONS
  // ==========================================
  function showCombatStamp(text, variant = "terminal", duration = 850) {
    const existing = document.querySelectorAll(".dramatic-combat-stamp");
    existing.forEach((el) => el.remove());

    const stamp = document.createElement("div");
    stamp.className = `dramatic-combat-stamp ${variant}`;
    stamp.textContent = text;
    document.body.appendChild(stamp);

    setTimeout(() => {
      stamp.classList.add("fade-out");
      setTimeout(() => {
        if (stamp.parentNode) stamp.remove();
      }, 350);
    }, duration);
  }

  function playGlassShatterAudio() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      [1800, 2400, 3200, 4800, 5600].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq + (Math.random() * 200 - 100), now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + 0.45);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + idx * 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      });
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(90, now);
      subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.3);
      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.3);
    } catch (e) {}
  }

  function playLithophanePurgeAudio() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      [440, 660, 880, 1320, 1760].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.6);
        gain.gain.setValueAtTime(0.18, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + 0.75);
      });
    } catch (e) {}
  }

  function playProcessKillAudio() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.55);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.58);
    } catch (e) {}
  }

  function executeBruteGlassShatter(targetParagraph, clickX, clickY) {
    showCombatStamp("[ SIEGE BREACH // ARMOR SHATTERED ]", "brute", 900);
    playGlassShatterAudio();
    triggerPhysicalShake();

    const originX = clickX || window.innerWidth / 2;
    const originY = clickY || window.innerHeight / 2;

    const shardCount = 28;
    for (let i = 0; i < shardCount; i++) {
      const shard = document.createElement("div");
      shard.className = "dramatic-glass-shard";

      const w = 18 + Math.random() * 38;
      const h = 18 + Math.random() * 38;
      shard.style.width = `${w}px`;
      shard.style.height = `${h}px`;
      shard.style.left = `${originX - w / 2}px`;
      shard.style.top = `${originY - h / 2}px`;

      const clips = [
        "polygon(20% 0%, 100% 15%, 80% 100%, 0% 85%)",
        "polygon(0% 0%, 90% 10%, 100% 80%, 15% 100%)",
        "polygon(50% 0%, 100% 70%, 75% 100%, 0% 60%)",
        "polygon(0% 25%, 70% 0%, 100% 90%, 25% 100%)"
      ];
      shard.style.clipPath = clips[i % clips.length];
      document.body.appendChild(shard);

      const angle = Math.random() * Math.PI * 2;
      const force = 80 + Math.random() * 220;
      const destX = Math.cos(angle) * force;
      const destY = Math.sin(angle) * force + (100 + Math.random() * 250);
      const rot = -180 + Math.random() * 360;

      requestAnimationFrame(() => {
        shard.style.transform = `translate(${destX}px, ${destY}px) rotate(${rot}deg) scale(${0.4 + Math.random() * 0.6})`;
        shard.style.opacity = "0";
      });

      setTimeout(() => {
        if (shard.parentNode) shard.remove();
      }, 850);
    }

    const backdrop = document.querySelector(".dramatic-paywall-backdrop");
    if (backdrop) {
      backdrop.style.pointerEvents = "none";
      backdrop.style.transition = "transform 0.4s ease, opacity 0.4s ease";
      backdrop.style.transform = "scale(0.9) rotate(2deg)";
      backdrop.style.opacity = "0";
      setTimeout(() => {
        if (backdrop.parentNode) backdrop.remove();
      }, 400);
    }
    paywallActive = false;
    tier1Triggered = true;

    const para = targetParagraph || currentPaywallParagraph || document.querySelector(".dramatic-blurred-para");
    if (para) {
      para.classList.remove("dramatic-blurred-para");
      para.style.transition = "filter 0.5s ease";
      para.style.filter = "none";
    }
    currentPaywallParagraph = null;
    console.log("%c[Dramatic Scroll Bar] 💥 Paywall SHATTERED into physical pieces by The Brute!", "color: #ff4400; font-weight: bold;");
  }

  function executeGhostLithophanePurge(targetElement) {
    showCombatStamp("[ CIPHER PURGED // ENTROPY NULLIFIED ]", "ghost", 900);
    playLithophanePurgeAudio();

    const el = targetElement || currentScrambledElement;
    if (el) {
      const flare = document.createElement("div");
      flare.className = "dramatic-lithophane-flare";
      el.style.position = "relative";
      el.appendChild(flare);
      setTimeout(() => {
        if (flare.parentNode) flare.remove();
      }, 800);
    }

    if (tier2Active) {
      dismissQuantumScrambler("Purged by The Ghost Lithophane");
    }
    tier2Triggered = true;
    console.log("%c[Dramatic Scroll Bar] ✨ Quantum Scrambler PURGED by The Ghost!", "color: #00f0ff; font-weight: bold;");
  }

  function executeTerminalProcessKill() {
    konsoleActive = false;
    showCombatStamp("[ PROCESS TERMINATED // SIGKILL -9 ]", "terminal", 900);
    playProcessKillAudio();

    const grid = document.createElement("div");
    grid.className = "dramatic-node-grid-overlay";
    document.body.appendChild(grid);

    const stamp = document.createElement("div");
    stamp.className = "dramatic-process-killed-stamp";
    stamp.textContent = "[ PROCESS TERMINATED // SIGKILL -9 ]";
    document.body.appendChild(stamp);

    const windows = document.querySelectorAll(".dramatic-konsole-window");
    windows.forEach((win) => {
      win.style.pointerEvents = "none";
      const rect = win.getBoundingClientRect();
      const ashCount = 18;
      for (let a = 0; a < ashCount; a++) {
        const ash = document.createElement("div");
        ash.className = "dramatic-terminal-ash";
        ash.style.left = `${rect.left + Math.random() * rect.width}px`;
        ash.style.top = `${rect.top + Math.random() * rect.height}px`;
        document.body.appendChild(ash);

        const aAngle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
        const aDist = 40 + Math.random() * 100;
        requestAnimationFrame(() => {
          ash.style.transform = `translate(${Math.cos(aAngle) * aDist}px, ${Math.sin(aAngle) * aDist}px) scale(0)`;
          ash.style.opacity = "0";
        });
        setTimeout(() => {
          if (ash.parentNode) ash.remove();
        }, 650);
      }

      win.style.transition = "transform 0.4s ease, opacity 0.4s ease, filter 0.4s ease";
      win.style.transform = "scale(0.8) translateY(-20px)";
      win.style.filter = "brightness(3) blur(6px)";
      win.style.opacity = "0";
    });

    setTimeout(() => {
      dismissKonsoleMeltdown("Process killed via SIGKILL -9");
      if (grid.parentNode) grid.remove();
      if (stamp.parentNode) stamp.remove();
    }, 850);

    console.log("%c[Dramatic Scroll Bar] 💻 Konsole Cascade VAPORIZED by The Terminal (kill -9)!", "color: #00ff66; font-weight: bold;");
  }

  function playDeflectionZapAudio() {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.setValueAtTime(80, now + 0.1);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  function executeCriticalMisplay(threatType, wrongCursor, targetElement, deployCallback) {
    dismissTelegraph(false);
    playDistortedPunishBwaaah();
    playDeflectionZapAudio();
    triggerPhysicalShake();
    updateUserHP(-35);

    const banner = getFieldBanner();
    const badge = banner.querySelector("#dramatic-banner-badge");
    const title = banner.querySelector("#dramatic-banner-title");
    const hint = banner.querySelector("#dramatic-banner-hint");

    if (threatType === "scrambler" && wrongCursor === "brute") {
      // --- CRITICAL PUNISHMENT: BRUTE ATTACKED SCRAMBLER ---
      // Scrambler absorbs the hit, permanently corrupts paragraph, and spawns Konsole Hydra!
      badge.textContent = "CRITICAL FAILURE";
      title.textContent = "❌ MISPLAY: BRUTE ABSORBED // PERMANENT CIPHER LOCK!";
      hint.textContent = "Text permanently corrupted! Retaliation: System Meltdown deployed!";

      if (targetElement) {
        targetElement.style.color = "#ff0033";
        targetElement.style.textShadow = "0 0 8px #ff0000";
        targetElement.style.userSelect = "none";
        targetElement.textContent = "0xDEAD_CIPHER_PERMANENT_LOCK // CANNOT_BE_REVERSED // ENTROPY_100% // ⚔⚛⚡☣⚙ ".repeat(6);
      }

      setTimeout(() => {
        spawnKonsoleMeltdown();
      }, 500);

    } else if (threatType === "paywall") {
      // --- PENALTY: GHOST OR TERMINAL ATTACKED PAYWALL ---
      badge.textContent = "DEFLECTED";
      title.textContent = `❌ ${wrongCursor.toUpperCase()} INEFFECTIVE // PRICE SURGE PENALTY!`;
      hint.textContent = "Paywall absorbed hit: Micro-charge surged to $9.99 & repulsion amplified!";

      deployCallback();

      setTimeout(() => {
        const priceEl = document.querySelector(".dramatic-price-amount");
        if (priceEl) {
          priceEl.textContent = "$9.99";
          priceEl.style.color = "#ff1133";
          priceEl.style.textShadow = "0 0 10px #ff1133";
        }
        const badgeEl = document.querySelector(".dramatic-paywall-badge");
        if (badgeEl) {
          badgeEl.textContent = "🚨 CRITICAL MISPLAY SURGE // $9.99 FEE";
          badgeEl.style.background = "#ff1133";
        }
      }, 100);

    } else if (threatType === "konsole") {
      // --- PENALTY: BRUTE OR GHOST ATTACKED HYDRA ---
      badge.textContent = "OVERLOAD";
      title.textContent = `❌ ${wrongCursor.toUpperCase()} FAILED // HYDRA ACCELERATED (4X)!`;
      hint.textContent = "Root process multiplied! Quadruple terminal cascade unleashed!";

      spawnKonsoleMeltdown();
      setTimeout(() => {
        spawnKonsoleWindow(20, 40, 480, 320);
        spawnKonsoleWindow(window.innerWidth - 500, window.innerHeight - 380, 480, 320);
      }, 300);

    } else {
      badge.textContent = "CRITICAL MISPLAY";
      title.textContent = `❌ MISPLAY // ${wrongCursor.toUpperCase()} IS INEFFECTIVE!`;
      hint.textContent = "Trap retaliating...";
      deployCallback();
    }
  }

  function handleTelegraphStrike(threatType, targetElement, deployCallback) {
    if (!activeTelegraph) return;
    clearTimeout(activeTelegraph.timerId);

    const requiredCounter = {
      paywall: "brute",
      scrambler: "ghost",
      konsole: "terminal"
    }[threatType];

    const banner = getFieldBanner();
    const badge = banner.querySelector("#dramatic-banner-badge");
    const title = banner.querySelector("#dramatic-banner-title");
    const hint = banner.querySelector("#dramatic-banner-hint");

    if (activeCursor === requiredCounter) {
      console.log(`%c[Dramatic Scroll Bar] 🎯 HARD COUNTER SUCCESSFUL! Used ${activeCursor.toUpperCase()} against ${threatType.toUpperCase()}`, "color: #22c55e; font-weight: bold; font-size: 13px;");
      playTriumphantBwaaah();
      playCounterSuccessAudio();
      triggerPhysicalShake();

      badge.textContent = "COUNTER SUCCESS";
      title.textContent = `🎯 HARD COUNTER EXECUTED: [${activeCursor.toUpperCase()}]!`;
      hint.textContent = `Field anomaly [${threatType.toUpperCase()}] instantly suppressed and nullified!`;

      if (threatType === "paywall") {
        executeBruteGlassShatter(targetElement);
      } else if (threatType === "scrambler") {
        executeGhostLithophanePurge(targetElement);
      } else if (threatType === "konsole") {
        executeTerminalProcessKill();
      }

      dismissTelegraph(false, true);
    } else {
      console.log(`%c[Dramatic Scroll Bar] ❌ WRONG COUNTER! Used ${activeCursor.toUpperCase()} vs required ${requiredCounter.toUpperCase()}`, "color: #ef4444; font-weight: bold; font-size: 13px;");
      executeCriticalMisplay(threatType, activeCursor, targetElement, deployCallback);
    }
  }

  function playCursorSwitchAudio(type) {
    if (!hasUserGesture()) return;
    try {
      const ctx = initAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "brute") {
        // Heavy metallic clank
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === "ghost") {
        // Ethereal sine glide
        osc.type = "sine";
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "terminal") {
        // Crisp 8-bit prompt tick
        osc.type = "square";
        osc.frequency.setValueAtTime(1100, now);
        osc.frequency.setValueAtTime(1500, now + 0.04);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {}
  }

  function createCustomCursor() {
    if (customCursorEl) return;
    customCursorEl = document.createElement("div");
    customCursorEl.id = "dramatic-custom-cursor";
    document.body.appendChild(customCursorEl);
    document.body.classList.add("dramatic-combat-mode");

    renderCursorIcon();

    let lastSparkTime = 0;
    window.addEventListener("pointermove", (e) => {
      if (!customCursorEl) return;
      customCursorEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // Brute creates spark trail on movement
      if (activeCursor === "brute") {
        const now = performance.now();
        if (now - lastSparkTime > 75) {
          lastSparkTime = now;
          spawnBruteSpark(e.clientX, e.clientY);
        }
      }
    }, { passive: true });
  }

  function spawnBruteSpark(x, y) {
    const spark = document.createElement("div");
    spark.className = "dramatic-brute-spark";
    spark.style.left = `${x + (Math.random() * 10 - 5)}px`;
    spark.style.top = `${y + (Math.random() * 10 - 5)}px`;
    document.body.appendChild(spark);
    requestAnimationFrame(() => {
      spark.style.transform = `translate(${(Math.random() - 0.5) * 24}px, ${10 + Math.random() * 20}px) scale(0)`;
      spark.style.opacity = "0";
    });
    setTimeout(() => {
      if (spark.parentNode) spark.remove();
    }, 400);
  }

  function renderCursorIcon() {
    if (!customCursorEl) return;
    customCursorEl.innerHTML = "";

    if (activeCursor === "brute") {
      // Iron Spiked Gauntlet SVG
      customCursorEl.innerHTML = `
        <svg class="dramatic-cursor-icon-brute" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 40 L24 20 L38 20 L50 36 L44 54 L20 56 Z" fill="#2d3748" stroke="#ff4400" stroke-width="2.5"/>
          <path d="M22 20 L22 10 L30 10 L30 20" stroke="#e2e8f0" stroke-width="2"/>
          <path d="M30 20 L30 6 L38 6 L38 20" stroke="#e2e8f0" stroke-width="2"/>
          <circle cx="26" cy="34" r="3" fill="#ff4400"/>
          <circle cx="36" cy="34" r="3" fill="#ff4400"/>
          <polygon points="18,36 12,30 22,32" fill="#e2e8f0"/>
          <polygon points="44,36 50,30 40,32" fill="#e2e8f0"/>
        </svg>
      `;
    } else if (activeCursor === "ghost") {
      // Ethereal Spectral Wisp
      const wisp = document.createElement("div");
      wisp.className = "dramatic-cursor-icon-ghost";
      customCursorEl.appendChild(wisp);
    } else if (activeCursor === "terminal") {
      // Neon CLI Prompt
      const term = document.createElement("div");
      term.className = "dramatic-cursor-icon-terminal";
      term.innerHTML = `<span>&gt;&nbsp;root@mesh:~#</span><span class="dramatic-cursor-terminal-blink"></span>`;
      customCursorEl.appendChild(term);
    }
  }

  function createRosterHUD() {
    if (rosterHudEl) return;
    rosterHudEl = document.createElement("div");
    rosterHudEl.id = "dramatic-roster-hud";
    rosterHudEl.innerHTML = `
      <div class="dramatic-roster-header">
        <span class="dramatic-roster-title">⚡ CURSOR PARTY // ROSTER</span>
        <span>TACTICAL SWITCH</span>
      </div>
      <div class="dramatic-roster-slots">
        <div class="dramatic-roster-slot slot-brute" data-cursor="brute">
          <span class="dramatic-roster-key">[1]</span>
          <span class="dramatic-roster-icon">🥊</span>
          <span class="dramatic-roster-label">BRUTE</span>
          <span class="dramatic-roster-sub">SIEGE</span>
        </div>
        <div class="dramatic-roster-slot slot-ghost" data-cursor="ghost">
          <span class="dramatic-roster-key">[2]</span>
          <span class="dramatic-roster-icon">👻</span>
          <span class="dramatic-roster-label">GHOST</span>
          <span class="dramatic-roster-sub">SPECTRAL</span>
        </div>
        <div class="dramatic-roster-slot slot-terminal" data-cursor="terminal">
          <span class="dramatic-roster-key">[3]</span>
          <span class="dramatic-roster-icon">💻</span>
          <span class="dramatic-roster-label">TERMINAL</span>
          <span class="dramatic-roster-sub">KILL -9</span>
        </div>
      </div>
    `;

    document.body.appendChild(rosterHudEl);

    // Slot click listeners
    const slots = rosterHudEl.querySelectorAll(".dramatic-roster-slot");
    slots.forEach((slot) => {
      slot.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetCursor = slot.dataset.cursor;
        if (targetCursor) {
          switchActiveCursor(targetCursor);
        }
      });
    });

    updateRosterHUD();
  }

  function updateRosterHUD() {
    if (!rosterHudEl) return;
    const slots = rosterHudEl.querySelectorAll(".dramatic-roster-slot");
    slots.forEach((slot) => {
      if (slot.dataset.cursor === activeCursor) {
        slot.classList.add("active");
      } else {
        slot.classList.remove("active");
      }
    });
  }

  function switchActiveCursor(cursorType) {
    if (activeCursor === cursorType) return;
    activeCursor = cursorType;
    console.log(`[Dramatic Scroll Bar] ⚔️ Switched Cursor to: ${activeCursor.toUpperCase()}`);
    playCursorSwitchAudio(activeCursor);
    renderCursorIcon();
    updateRosterHUD();
  }

  // Keyboard shortcut listener (Keys 1, 2, 3)
  window.addEventListener("keydown", (e) => {
    // Avoid intercepting typing in input fields
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
      return;
    }

    if (e.key === "1") {
      switchActiveCursor("brute");
    } else if (e.key === "2") {
      switchActiveCursor("ghost");
    } else if (e.key === "3") {
      switchActiveCursor("terminal");
    }
  });

  // Initialize Cursor Party & Duel HUD when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      createCustomCursor();
      createRosterHUD();
      createUserHPDock();
    });
  } else {
    createCustomCursor();
    createRosterHUD();
    createUserHPDock();
  }

  // Console helper for instant testing
  window.switchActiveCursor = switchActiveCursor;
  window.getActiveCursor = () => activeCursor;
  window.getUserHP = () => userHP;
  window.damageUserHP = (amount) => updateUserHP(-amount);
  window.healUserHP = (amount) => updateUserHP(amount);

  window.testTier1Paywall = () => {
    armedForTrigger = true;
    spawnPaywall(document.querySelector("p"));
  };

  window.testCyberScrambler = (selector) => {
    let target = selector ? document.querySelector(selector) : null;
    if (!target) target = findVisibleTarget();
    if (target) {
      triggerQuantumScrambler(target);
    } else {
      console.warn("[Dramatic Scroll Bar] No visible text found to scramble.");
    }
  };

  window.testKonsoleMeltdown = () => {
    spawnKonsoleMeltdown();
  };

  window.testBwaaahDrop = () => {
    playBwaaahSynth();
    triggerPhysicalShake();
  };

  window.testTelegraph = (threatType = "paywall") => {
    const target = findVisibleTarget() || document.querySelector("p") || document.body;
    const callbacks = {
      paywall: () => spawnPaywall(target),
      scrambler: () => triggerQuantumScrambler(target),
      konsole: () => spawnKonsoleMeltdown()
    };
    startTelegraphPhase(threatType, target, callbacks[threatType] || (() => console.log("Deploy trap!")), false);
  };

  window.testBossEncounter = (initialThreat = "paywall") => {
    const target = findVisibleTarget() || document.querySelector("p") || document.body;
    const callbacks = {
      paywall: () => spawnPaywall(target),
      scrambler: () => triggerQuantumScrambler(target),
      konsole: () => spawnKonsoleMeltdown()
    };
    startTelegraphPhase(initialThreat, target, callbacks[initialThreat] || (() => console.log("Deploy trap!")), true);
  };

  window.testWipeoutSequence = triggerWipeoutSequence;
  window.enableFreeScrollMode = enableFreeScrollMode;
  window.disableFreeScrollMode = disableFreeScrollMode;
  window.showBossVictoryDialog = showBossVictoryDialog;
  window.getFreeScrollMode = () => freeScrollMode;
  window.getBossHP = () => bossCurrentHP;
  window.isBossActive = () => bossBattleActive;
})();
