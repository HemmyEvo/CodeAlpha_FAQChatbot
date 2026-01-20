import { faqData } from "./data";

// 1. STOPWORDS (Noise words to ignore)
const STOPWORDS = new Set([
  "the", "is", "at", "which", "on", "a", "an", "and", "or", "but", "if", "of", "to", "in", "for", "with", "my", "i", "how", "do", "does", "can", "what", "where", "why", "please", "help", "me"
]);

// 2. Advanced Preprocessing
function preprocess(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove special chars
    .split(/\s+/) // Split into words
    .filter(word => word.length > 2 && !STOPWORDS.has(word)); // Remove noise
}

// 3. Vectorization
function textToVector(tokens: string[], vocabulary: string[]): number[] {
  return vocabulary.map((word) => (tokens.includes(word) ? 1 : 0));
}

// 4. Cosine Similarity Math
function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}

// 5. Smart Matching Engine
export function findBestMatch(userQuery: string) {
  const allQuestions = faqData.map((f) => f.question);
  const queryTokens = preprocess(userQuery);
  
  // Build Vocabulary
  const allTokens = new Set<string>();
  queryTokens.forEach(t => allTokens.add(t));
  allQuestions.forEach(q => preprocess(q).forEach(t => allTokens.add(t)));
  const vocabulary = Array.from(allTokens);

  const queryVector = textToVector(queryTokens, vocabulary);

  let bestMatchIndex = -1;
  let highestScore = 0;

  // Compare against every FAQ
  faqData.forEach((faq, index) => {
    const faqTokens = preprocess(faq.question);
    const faqVector = textToVector(faqTokens, vocabulary);
    const score = calculateCosineSimilarity(queryVector, faqVector);

    if (score > highestScore) {
      highestScore = score;
      bestMatchIndex = index;
    }
  });

  // Thresholds
  if (highestScore > 0.4) {
    return { answer: faqData[bestMatchIndex].answer, score: highestScore };
  } else if (highestScore > 0.2) {
    // Low confidence fallback
    return { answer: "I think you're asking about " + faqData[bestMatchIndex].category + ", but I'm not 100% sure. Can you be more specific?", score: highestScore };
  } else {
    return { answer: "I'm not sure I understand. Try asking about 'shipping', 'returns', or 'payments'.", score: 0 };
  }
}