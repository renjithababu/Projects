import assert from 'assert';
import { evaluateRagebaitProbability } from './src/content/probabilityEngine';
import { getRandomRagebaitPayload } from './src/content/ragebaitSwapper';
import { degradeClipboardText, HOMOGLYPH_MAP } from './src/content/degradationEngine';
import { DEFAULT_RAGEBAIT_LIST } from './src/utils/defaults';

console.log('--- Starting Engine Unit Verification ---');

// 1. Test Probability Engine
console.log('\n[1] Testing Probability Engine Time-Scaling:');
const p0 = evaluateRagebaitProbability(1000, 1000, 0.05, 0.85, 60);
console.log(`  0s idle probability: ${(p0.calculatedProbability * 100).toFixed(2)}% (Expected ~5.00%)`);
assert.strictEqual(p0.calculatedProbability, 0.05);

const p30 = evaluateRagebaitProbability(1000, 31000, 0.05, 0.85, 60);
console.log(`  30s idle probability: ${(p30.calculatedProbability * 100).toFixed(2)}% (Expected ~45.00%)`);
assert(p30.calculatedProbability > 0.4 && p30.calculatedProbability < 0.5);

const p60 = evaluateRagebaitProbability(1000, 61000, 0.05, 0.85, 60);
console.log(`  60s idle probability: ${(p60.calculatedProbability * 100).toFixed(2)}% (Expected 85.00%)`);
assert.strictEqual(p60.calculatedProbability, 0.85);

const p120 = evaluateRagebaitProbability(1000, 121000, 0.05, 0.85, 60);
console.log(`  120s idle probability: ${(p120.calculatedProbability * 100).toFixed(2)}% (Expected capped at 85.00%)`);
assert.strictEqual(p120.calculatedProbability, 0.85);

// 2. Test Ragebait Swapper
console.log('\n[2] Testing Ragebait Payload Swapper:');
const payload1 = getRandomRagebaitPayload(DEFAULT_RAGEBAIT_LIST);
const payload2 = getRandomRagebaitPayload(DEFAULT_RAGEBAIT_LIST);
console.log(`  Take 1: "${payload1}"`);
console.log(`  Take 2: "${payload2}"`);
assert(DEFAULT_RAGEBAIT_LIST.includes(payload1));
assert(DEFAULT_RAGEBAIT_LIST.includes(payload2));

// 3. Test Degradation Engine - Tier 1: 0-15s (Sparse Homoglyphs)
console.log('\n[3] Testing Degradation Engine Tier 1 (0–15s - Sparse Homoglyphs):');
const sampleText = 'Vim is just an inferior version of Notepad, and pineapple belongs on all pizza.';
const resTier1 = degradeClipboardText(sampleText, 5);
console.log(`  Original: "${sampleText}"`);
console.log(`  Degraded: "${resTier1.text}"`);
console.log(`  Tier: ${resTier1.tier}`);
assert.strictEqual(resTier1.tier, 'sparse_homoglyphs');

// Check that homoglyphs exist in the string
let hasHomoglyphs = false;
for (const char of resTier1.text) {
  for (const glyphs of Object.values(HOMOGLYPH_MAP)) {
    if (glyphs.includes(char)) {
      hasHomoglyphs = true;
      break;
    }
  }
}
console.log(`  Homoglyphs detected: ${hasHomoglyphs}`);
assert(hasHomoglyphs, 'Homoglyphs should be detected in Tier 1');

// 4. Test Degradation Engine - Tier 2: 15-30s (30% Vowel Stripping)
console.log('\n[4] Testing Degradation Engine Tier 2 (15–30s - 30% Vowels Stripped):');
const resTier2 = degradeClipboardText(sampleText, 20);
console.log(`  Original: "${sampleText}"`);
console.log(`  Degraded: "${resTier2.text}"`);
console.log(`  Tier: ${resTier2.tier}`);
assert.strictEqual(resTier2.tier, 'strip_30_vowels');
const origVowels = (sampleText.match(/[aeiouAEIOU]/g) || []).length;
const tier2Vowels = (resTier2.text.match(/[aeiouAEIOU]/g) || []).length;
console.log(`  Original vowel count: ${origVowels} -> Degraded vowel count: ${tier2Vowels}`);
assert(tier2Vowels < origVowels, 'Vowel count should decrease in Tier 2');

// 5. Test Degradation Engine - Tier 3: 30s+ (60% Vowel Stripping + Heavy Homoglyphs)
console.log('\n[5] Testing Degradation Engine Tier 3 (30s+ - 60% Vowels Stripped + Heavy Homoglyphs):');
const resTier3 = degradeClipboardText(sampleText, 45);
console.log(`  Original: "${sampleText}"`);
console.log(`  Degraded: "${resTier3.text}"`);
console.log(`  Tier: ${resTier3.tier}`);
assert.strictEqual(resTier3.tier, 'heavy_degradation');
const tier3Vowels = (resTier3.text.match(/[aeiouAEIOU]/g) || []).length;
console.log(`  Original vowel count: ${origVowels} -> Degraded vowel count: ${tier3Vowels}`);
assert(tier3Vowels < origVowels);

console.log('\n✅ All unit verifications passed successfully!');
