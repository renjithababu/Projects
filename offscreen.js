// Offscreen Audio Player for The Dramatic Scroll Bar
// Bypasses Chrome webpage autoplay policy restrictions & handles sequence management

let paywallAudio = null;
let laughingCatAudio = null;
let konsoleAudio = null;
let avalancheAudio = null;
let scannerAudio = null;
let shouldResumePaywallAfterLaugh = true;

function createAudio(candidates, loop = false) {
  for (const path of candidates) {
    try {
      const a = new Audio(path);
      a.volume = 1.0;
      a.loop = loop;
      return a;
    } catch (e) {}
  }
  return null;
}

function getPaywallAudio() {
  if (!paywallAudio) {
    paywallAudio = createAudio([
      "assets/paywall_shock.mp3",
      "assets/paywall_shock.mp3.mpeg",
      "assets/paywall_shock.wav",
      "assets/hans_zimmer.wav"
    ], true);
  }
  return paywallAudio;
}

function getLaughingCatAudio() {
  if (!laughingCatAudio) {
    laughingCatAudio = createAudio([
      "assets/laughing_cat.mp3",
      "assets/laughing_cat.mp3.mpeg",
      "assets/laughing_cat.wav",
      "assets/bwaaah.wav"
    ], false);
  }
  return laughingCatAudio;
}

function getKonsoleAudio() {
  if (!konsoleAudio) {
    konsoleAudio = createAudio([
      "assets/system_alarm.wav",
      "assets/system_alarm.mp3",
      "assets/bwaaah.wav"
    ], true);
  }
  return konsoleAudio;
}

function getAvalancheAudio() {
  if (!avalancheAudio) {
    avalancheAudio = createAudio([
      "assets/avalanche_impact.wav",
      "assets/bwaaah.wav"
    ], false);
  }
  return avalancheAudio;
}

function getScannerAudio() {
  if (!scannerAudio) {
    scannerAudio = createAudio([
      "assets/scanner_sweep.wav",
      "assets/system_alarm.wav"
    ], true);
  }
  return scannerAudio;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "PLAY_PAYWALL_AUDIO") {
    shouldResumePaywallAfterLaugh = true;
    const pAudio = getPaywallAudio();
    if (pAudio) {
      pAudio.loop = true;
      pAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Paywall audio play caught:", err));
    }
    sendResponse({ status: "playing_paywall_loop" });
    return true;
  }

  if (message.action === "TRIGGER_UNLOCK_CLICKED") {
    // 1. Immediately stop the repeating paywall audio
    if (paywallAudio) {
      paywallAudio.pause();
      paywallAudio.currentTime = 0;
    }

    // 2. Play the laughing cat audio alone
    const lAudio = getLaughingCatAudio();
    if (lAudio) {
      lAudio.currentTime = 0;
      lAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Laughing cat play caught:", err));

      // 3. When laughing cat finishes, resume repeating the paywall audio
      lAudio.onended = () => {
        if (shouldResumePaywallAfterLaugh && paywallAudio) {
          paywallAudio.loop = true;
          paywallAudio.play().catch(() => {});
        }
      };
    }
    sendResponse({ status: "playing_laugh_alone" });
    return true;
  }

  if (message.action === "PLAY_KONSOLE_AUDIO") {
    shouldResumePaywallAfterLaugh = false;
    const kAudio = getKonsoleAudio();
    if (kAudio) {
      kAudio.loop = true;
      kAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Konsole alarm audio play caught:", err));
    }
    sendResponse({ status: "playing_konsole_alarm" });
    return true;
  }

  if (message.action === "PLAY_EXPLOSION_AUDIO") {
    shouldResumePaywallAfterLaugh = false;
    const expAudio = createAudio([
      "assets/avalanche_impact.wav",
      "assets/hans_zimmer.wav",
      "assets/bwaaah.wav"
    ], false);
    if (expAudio) {
      expAudio.currentTime = 0;
      expAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Explosion audio caught:", err));
    }
    sendResponse({ status: "playing_explosion" });
    return true;
  }

  if (message.action === "PLAY_BWAAAH_AUDIO") {
    shouldResumePaywallAfterLaugh = false;
    const bAudio = createAudio([
      "assets/hans_zimmer.wav",
      "assets/bwaaah.wav",
      "assets/paywall_shock.mp3"
    ], false);
    if (bAudio) {
      bAudio.currentTime = 0;
      bAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Bwaaah audio caught:", err));
    }
    sendResponse({ status: "playing_bwaaah" });
    return true;
  }

  if (message.action === "PLAY_AVALANCHE_AUDIO") {
    shouldResumePaywallAfterLaugh = false;
    const avAudio = getAvalancheAudio();
    if (avAudio) {
      avAudio.currentTime = 0;
      avAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Avalanche audio play caught:", err));
    }
    sendResponse({ status: "playing_avalanche_impact" });
    return true;
  }

  if (message.action === "PLAY_SCANNER_AUDIO") {
    shouldResumePaywallAfterLaugh = false;
    const sAudio = getScannerAudio();
    if (sAudio) {
      sAudio.loop = true;
      sAudio.play().catch((err) => console.warn("[Dramatic Scroll Bar] Scanner sweep audio play caught:", err));
    }
    sendResponse({ status: "playing_scanner_sweep" });
    return true;
  }

  if (message.action === "STOP_AUDIO") {
    shouldResumePaywallAfterLaugh = false;
    [paywallAudio, laughingCatAudio, konsoleAudio, avalancheAudio, scannerAudio].forEach((a) => {
      if (a) {
        a.volume = 0;
        a.pause();
        a.currentTime = 0;
      }
    });
    sendResponse({ status: "all_stopped" });
    return true;
  }
});
