import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, drawPixel) {
  // RGBA buffer with filter byte 0 at the start of each row
  const rowLength = 1 + width * 4;
  const rawData = Buffer.alloc(rowLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const [r, g, b, a] = drawPixel(x, y, width, height);
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      const byte = buf[i];
      for (let j = 0; j < 8; j++) {
        const bit = (crc ^ (byte >> j)) & 1;
        crc = (crc >>> 1) ^ (bit ? 0xedb88320 : 0);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeChunk(type, data) {
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);

    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bit depth
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT chunk
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// Flame icon drawer
function drawFlameIcon(x, y, width, height) {
  const nx = (x / width) * 2 - 1; // [-1, 1]
  const ny = (y / height) * 2 - 1; // [-1, 1] (top is -1, bottom is 1)

  const distSq = nx * nx + ny * ny;

  // Background rounded rect / circle with glow
  if (distSq > 0.95) {
    return [0, 0, 0, 0]; // Transparent outside
  }

  // Dark crimson circle background
  const bgR = 15;
  const bgG = 23;
  const bgB = 42;

  // Flame shape calculation
  // Flame center around nx = 0, ny = 0.1
  const fx = nx;
  const fy = ny - 0.1;
  const flameBase = (fx * fx * 3) + Math.max(0, fy * 2);
  const isFlame = (flameBase < 0.5) && (ny < 0.6) && (ny > -0.7 + Math.abs(nx) * 0.5);

  if (isFlame) {
    // Inner core yellow, outer fiery crimson
    const coreDist = fx * fx * 6 + (fy - 0.2) * (fy - 0.2) * 4;
    if (coreDist < 0.2) {
      return [254, 240, 138, 255]; // Light yellow core
    } else if (coreDist < 0.5) {
      return [249, 115, 22, 255]; // Orange
    } else {
      return [225, 29, 72, 255]; // Crimson #e11d48
    }
  }

  // Background gradient
  return [bgR + 15, bgG + 10, bgB + 20, 255];
}

const assetsDir = path.resolve('src/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

[16, 48, 128].forEach((size) => {
  const png = createPng(size, size, drawFlameIcon);
  fs.writeFileSync(path.join(assetsDir, `icon-${size}.png`), png);
  console.log(`Generated icon-${size}.png (${size}x${size})`);
});
