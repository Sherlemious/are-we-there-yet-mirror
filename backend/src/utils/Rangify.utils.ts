export interface range {
  min: number;
  max: number;
}

/**
 * Generates a specified number of ranges between a minimum and maximum value.
 *
 * @param min - The minimum value of the overall range.
 * @param max - The maximum value of the overall range.
 * @param numRanges - The number of ranges to generate.
 * @returns A promise that resolves to an array of range objects.
 *
 * @example
 * // Generate 5 ranges between 10 and 100
 * generateRanges(10, 100, 5).then(ranges => console.log(ranges));
 * // Output: [
 * //   { min: 10, max: 28 },
 * //   { min: 28, max: 46 },
 * //   { min: 46, max: 64 },
 * //   { min: 64, max: 82 },
 * //   { min: 82, max: 100 }
 * // ]
 */

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
