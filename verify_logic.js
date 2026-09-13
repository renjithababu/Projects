import assert from 'assert';

// 1. Dynamic Probability Engine formula verification
function evaluateRagebaitProbability(
  copiedTimestamp,
  pastedTimestamp = Date.now(),
  baseProbability = 0.05,
  maxProbability = 0.85,
  timeToMaxSec = 60
) {
  if (!copiedTimestamp || copiedTimestamp <= 0) {
    const roll = Math.random();
    return {
      elapsedSeconds: 0,
      calculatedProbability: baseProbability,
      shouldTriggerRagebait: roll < baseProbability,
    };
  }

  const elapsedSeconds = Math.max(0, (pastedTimestamp - copiedTimestamp) / 1000);
  const t = Math.min(1, elapsedSeconds / Math.max(1, timeToMaxSec));
  const smoothFactor = t * t * (3 - 2 * t);
  const calculatedProbability = baseProbability + (maxProbability - baseProbability) * smoothFactor;
  const roll = Math.random();

  return {
    elapsedSeconds,
    calculatedProbability,
    shouldTriggerRagebait: roll < calculatedProbability,
  };
}

// 2. Homoglyph and Degradation Engine verification
const HOMOGLYPH_MAP = {
  'a': ['\u0430'],
  'A': ['\u0410'],
  'c': ['\u0441'],
  'C': ['\u0421'],
  'e': ['\u0435'],
  'E': ['\u0415'],
  'i': ['\u0456'],
  'I': ['\u0406'],
  'o': ['\u043e'],
  'O': ['\u041e'],
  'p': ['\u0440'],
  'P': ['\u0420'],
  's': ['\u0455'],
  'S': ['\u0405'],
  'x': ['\u0445'],
  'X': ['\u0425'],
  'y': ['\u0443'],
};

const VOWEL_REGEX = /^[aeiouAEIOU]$/;

function injectHomoglyphs(text, rate) {
  const chars = Array.from(text);
  let modified = false;
  const result = chars.map((char) => {
    const candidates = HOMOGLYPH_MAP[char];
    if (candidates && Math.random() < rate) {
      modified = true;
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
    return char;
  });

  if (!modified && rate > 0) {
    const eligibleIndices = [];
    for (let i = 0; i < chars.length; i++) {
      if (HOMOGLYPH_MAP[chars[i]]) eligibleIndices.push(i);
    }
    if (eligibleIndices.length > 0) {
      const pick = eligibleIndices[Math.floor(Math.random() * eligibleIndices.length)];
      result[pick] = HOMOGLYPH_MAP[chars[pick]][0];
    }
  }

  return result.join('');
}

function stripVowels(text, stripRatio) {
  const chars = Array.from(text);
  return chars
    .filter((char) => {
      if (VOWEL_REGEX.test(char)) {
        return Math.random() >= stripRatio;
      }
      return true;
    })
    .join('');
}

function degradeClipboardText(text, elapsedSeconds) {
  if (!text) return { text, tier: 'sparse_homoglyphs' };

  if (elapsedSeconds < 15) {
    return {
      text: injectHomoglyphs(text, 0.18),
      tier: 'sparse_homoglyphs',
      description: '0-15s: Sparse homoglyphs',
    };
  } else if (elapsedSeconds < 30) {
    return {
      text: stripVowels(text, 0.30),
      tier: 'strip_30_vowels',
      description: '15-30s: 30% vowels stripped',
    };
  } else {
    const stripped = stripVowels(text, 0.60);
    return {
      text: injectHomoglyphs(stripped, 0.65),
      tier: 'heavy_degradation',
      description: '30s+: 60% vowels stripped + heavy homoglyphs',
    };
  }
}

console.log('=== TEST 1: Probability Scaling ===');
const p0 = evaluateRagebaitProbability(1000, 1000, 0.05, 0.85, 60);
console.log(`0s: ${(p0.calculatedProbability * 100).toFixed(2)}% (Target: 5%)`);
assert.strictEqual(p0.calculatedProbability, 0.05);

const p30 = evaluateRagebaitProbability(1000, 31000, 0.05, 0.85, 60);
console.log(`30s: ${(p30.calculatedProbability * 100).toFixed(2)}% (Target: 45%)`);
assert(p30.calculatedProbability > 0.40 && p30.calculatedProbability < 0.50);

const p60 = evaluateRagebaitProbability(1000, 61000, 0.05, 0.85, 60);
console.log(`60s: ${(p60.calculatedProbability * 100).toFixed(2)}% (Target: 85%)`);
assert.strictEqual(p60.calculatedProbability, 0.85);

const p90 = evaluateRagebaitProbability(1000, 91000, 0.05, 0.85, 60);
console.log(`90s: ${(p90.calculatedProbability * 100).toFixed(2)}% (Target: capped at 85%)`);
assert.strictEqual(p90.calculatedProbability, 0.85);

console.log('\n=== TEST 2: Degradation Engine ===');
const sample = 'The quick brown fox jumps over the lazy dog. Pineapple on pizza is supreme.';

// Tier 1: 0-15s
const t1 = degradeClipboardText(sample, 5);
console.log(`Tier 1 (5s): "${t1.text}" [Tier: ${t1.tier}]`);
assert.strictEqual(t1.tier, 'sparse_homoglyphs');
// Verify unicode character exists
let hasHomoglyph = false;
for (const char of t1.text) {
  if (['\u0430', '\u0435', '\u043e', '\u0440', '\u0441', '\u0443', '\u0445', '\u0455', '\u0456'].includes(char)) {
    hasHomoglyph = true;
    break;
  }
}
assert(hasHomoglyph, 'Tier 1 must contain homoglyphs');

// Tier 2: 15-30s
const t2 = degradeClipboardText(sample, 20);
console.log(`Tier 2 (20s): "${t2.text}" [Tier: ${t2.tier}]`);
assert.strictEqual(t2.tier, 'strip_30_vowels');
const countOrigVowels = (sample.match(/[aeiouAEIOU]/g) || []).length;
const countT2Vowels = (t2.text.match(/[aeiouAEIOU]/g) || []).length;
console.log(`Vowels: Original ${countOrigVowels} -> Tier 2 ${countT2Vowels}`);
assert(countT2Vowels < countOrigVowels, 'Vowels must be stripped in Tier 2');

// Tier 3: 30s+
const t3 = degradeClipboardText(sample, 45);
console.log(`Tier 3 (45s): "${t3.text}" [Tier: ${t3.tier}]`);
assert.strictEqual(t3.tier, 'heavy_degradation');
const countT3Vowels = (t3.text.match(/[aeiouAEIOU]/g) || []).length;
console.log(`Vowels: Original ${countOrigVowels} -> Tier 3 ${countT3Vowels}`);
assert(countT3Vowels < countOrigVowels, 'Vowels must be heavily stripped in Tier 3');

console.log('\n🎉 ALL LOGIC ENGINE TESTS PASSED PERFECTLY!');
