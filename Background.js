// Background Service Worker - The Dramatic Scroll Bar

let creatingOffscreenPromise = null;

async function ensureOffscreenDocument() {
  const offscreenUrl = chrome.runtime.getURL("offscreen.html");
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return;
  }

  if (creatingOffscreenPromise) {
    await creatingOffscreenPromise;
  } else {
    creatingOffscreenPromise = chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Plays dramatic sound effects and meme audio cues",
    });
    await creatingOffscreenPromise;
    creatingOffscreenPromise = null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "PLAY_PAYWALL_AUDIO") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "PLAY_PAYWALL_AUDIO" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "TRIGGER_UNLOCK_CLICKED") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "TRIGGER_UNLOCK_CLICKED" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "PLAY_EXPLOSION_AUDIO") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "PLAY_EXPLOSION_AUDIO" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "PLAY_BWAAAH_AUDIO") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "PLAY_BWAAAH_AUDIO" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "PLAY_KONSOLE_AUDIO") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "PLAY_KONSOLE_AUDIO" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "PLAY_AVALANCHE_AUDIO") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "PLAY_AVALANCHE_AUDIO" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "PLAY_SCANNER_AUDIO") {
    ensureOffscreenDocument()
      .then(() => {
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "PLAY_SCANNER_AUDIO" }).catch(() => {});
        }, 30);
      })
      .catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  } else if (message.action === "STOP_AUDIO") {
    chrome.runtime.sendMessage({ action: "STOP_AUDIO" }).catch(() => {});
    sendResponse({ status: "ok" });
    return true;
  }
});
