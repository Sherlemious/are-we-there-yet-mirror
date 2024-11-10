export default function getUserLevel(points: number): number {
  try {
    let level = 1;
    // 100k points
    if (points >= 1000000) {
      level = 3;
    } else if (points >= 500000) {
      level = 2;
    } else if (points >= 100000) {
      level = 1;
    }

    return level;
  } catch (e) {
    console.log(e);
    return 1;
  }
}
