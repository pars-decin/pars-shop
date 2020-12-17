import shortHash from 'short-hash';

export default function mergeHashedLevels(levels) {
  let hashedLevel = '';

  levels.forEach(level => (hashedLevel = hashedLevel + shortHash(level)));

  return hashedLevel;
}
