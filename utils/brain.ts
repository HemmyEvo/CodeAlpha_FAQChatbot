import { faqData } from "./data";

// 1. Text Preprocessing (Tokenization & Cleaning)
// Requirement: "Preprocess the text... tokenize, clean"
function preprocess(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/) // Tokenize by whitespace
    .filter((word) => word.length > 2); // Remove short noise words (like "is", "a")
}

// 2. Create a Vector from Text based on a Vocabulary
function textToVector(tokens: string[], vocabulary: string[]): number[] {
  return vocabulary.map((word) => (tokens.includes(word) ? 1 : 0));
}

// 3. Cosine Similarity Algorithm
// Requirement: "techniques like cosine similarity"
function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));

  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}

// 4. Main Function to Find Best Answer
export function findBestMatch(userQuery: string) {
  // A. Build Vocabulary from all FAQs + User Query
  const allQuestions = faqData.map((f) => f.question);
  const queryTokens = preprocess(userQuery);
  
  // Combine all words into a unique set (The "Bag of Words")
  const allTokens = new Set<string>();
  queryTokens.forEach(t => allTokens.add(t));
  allQuestions.forEach(q => preprocess(q).forEach(t => allTokens.add(t)));
  const vocabulary = Array.from(allTokens);

  // B. Convert User Query to Vector
  const queryVector = textToVector(queryTokens, vocabulary);

  // C. Compare with every FAQ
  let bestMatchIndex = -1;
  let highestScore = 0;

  faqData.forEach((faq, index) => {
    const faqTokens = preprocess(faq.question);
    const faqVector = textToVector(faqTokens, vocabulary);
    
    const score = calculateCosineSimilarity(queryVector, faqVector);

    if (score > highestScore) {
      highestScore = score;
      bestMatchIndex = index;
    }
  });

  // Threshold: If similarity is too low (e.g., < 0.3), return a fallback
  if (highestScore < 0.3) {
    return {
      answer: "I'm not sure about that. Could you please rephrase or contact support?",
      score: highestScore
    };
  }

  return {
    answer: faqData[bestMatchIndex].answer,
    score: highestScore,
    matchedQuestion: faqData[bestMatchIndex].question
  };
}