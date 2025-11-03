export const motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you've ever wanted is on the other side of fear.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "Don't watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",
  "Your limitation—it's only your imagination.",
];

export function getRandomQuote(): string {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

export function getDailyQuote(): string {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return motivationalQuotes[seed % motivationalQuotes.length];
}
