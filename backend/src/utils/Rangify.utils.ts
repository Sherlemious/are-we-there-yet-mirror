export interface range {
  min: number;
  max: number;
}

async function generateRanges(min: number, max: number, numRanges: number): Promise<range[]> {
  const rangeSize = (max - min) / numRanges;
  const ranges: range[] = [];

  for (let i = 0; i < numRanges; i++) {
    const rangeStart = min + i * rangeSize;
    const rangeEnd = i === numRanges - 1 ? max : rangeStart + rangeSize;
    ranges.push({ min: rangeStart, max: rangeEnd });
  }

  return ranges;
}

export { generateRanges };
