const fs = require('fs');

function compress(inputPath, outputPath, windowSize = 20, lookAheadSize = 15) {
  const inputBuffer = fs.readFileSync(inputPath); // Read as Buffer
  const input = Array.from(inputBuffer); // Convert to array of bytes
  const output = [];

  let cursor = 0;
  while (cursor < input.length) {
    let matchLength = 0;
    let matchDistance = 0;
    const windowStart = Math.max(0, cursor - windowSize);
    const window = input.slice(windowStart, cursor);

    for (let i = 0; i < window.length; i++) {
      let length = 0;
      while (
        length < lookAheadSize &&
        window[i + length] === input[cursor + length]
      ) {
        length++;
      }
      if (length > matchLength) {
        matchLength = length;
        matchDistance = window.length - i;
      }
    }

    if (matchLength > 0) {
      const nextByte = input[cursor + matchLength] ?? 0;
      output.push([matchDistance, matchLength, nextByte]);
      cursor += matchLength + 1;
    } else {
      output.push([0, 0, input[cursor]]);
      cursor++;
    }
  }

  // Write JSON-encoded output
  fs.writeFileSync(outputPath, JSON.stringify(output));
}

function decompress(inputPath, outputPath) {
  const data = JSON.parse(fs.readFileSync(inputPath)); // Already UTF-8 safe
  const result = [];

  for (const [distance, length, nextByte] of data) {
    if (distance === 0 && length === 0) {
      result.push(nextByte);
    } else {
      const start = result.length - distance;
      for (let i = 0; i < length; i++) {
        result.push(result[start + i]);
      }
      result.push(nextByte);
    }
  }

  fs.writeFileSync(outputPath, Buffer.from(result));
}

module.exports = { compress, decompress };
