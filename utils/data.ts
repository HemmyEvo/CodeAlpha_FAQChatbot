export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

// The Knowledge Base for Hemmyevo Store
export const faqData: FAQ[] = [
  {
    question: "What is Hemmyevo?",
    answer: "Hemmyevo is a premium e-commerce store specializing in fashion and accessories, curated by Atilola Emmanuel.",
    category: "general"
  },
  {
    question: "How do I place an order?",
    answer: "You can place an order directly through our website. Just add items to your cart and proceed to checkout using our secure payment gateway.",
    category: "orders"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and mobile money payments suitable for Nigerian and international customers.",
    category: "payment"
  },
  {
    question: "Do you offer delivery or shipping?",
    answer: "Yes! We offer nationwide delivery within Nigeria and international shipping to select countries.",
    category: "shipping"
  },
  {
    question: "How long does delivery take?",
    answer: "For Ogbomosho and Lagos, delivery takes 1-3 business days. Other states take 3-5 business days.",
    category: "shipping"
  },
  {
    question: "Can I return an item?",
    answer: "We accept returns within 7 days of delivery if the item is damaged or incorrect. Please keep the tags on.",
    category: "returns"
  },
  {
    question: "Where is your office located?",
    answer: "Our operations are based in Ogbomosho, near LAUTECH.",
    category: "general"
  },
  {
    question: "Do you have sizes for everyone?",
    answer: "Yes, we stock a wide range of sizes. Check the size chart on each product page for specific measurements.",
    category: "products"
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via our contact page or email us at support@hemmyevo.store.",
    category: "support"
  }
];