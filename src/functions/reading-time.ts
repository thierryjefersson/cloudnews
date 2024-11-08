export default function readingTime(text: string) {
  const wordsPerMinute = 250;

  const words = text
    .replace(/<[^>]+>/g, "")
    .split(/\s+/)
    .filter(Boolean);

  const minutes = Math.ceil(words.length / wordsPerMinute);

  return minutes;
}
