export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export const suggestions = [
  "Track my order",
  "Return policy",
  "Payment options",
  "Contact Human Agent",
  "Forgot password"
];

// Enterprise Knowledge Base
export const faqData: FAQ[] = [
  // --- GENERAL ---
  { question: "Who are you?", answer: "I am Emmanuel, the AI Customer Support Agent for Hemmyevo.", category: "general" },
  { question: "What is Hemmyevo?", answer: "Hemmyevo is a premier fashion technology brand curated by Atilola Emmanuel Oluwatoba.", category: "general" },
  
  // --- SHIPPING & LOGISTICS ---
  { question: "Where is my order?", answer: "You can track your order status by clicking 'Track Order' in your account dashboard or providing your Order ID here.", category: "shipping" },
  { question: "Do you ship internationally?", answer: "Yes, we ship to the UK, USA, Canada, and Ghana via DHL Express (3-7 working days).", category: "shipping" },
  { question: "How much is shipping?", answer: "Shipping is free for orders over ₦100,000. For Lagos: ₦2,500. Nationwide: ₦4,500.", category: "shipping" },
  { question: "My package is delayed", answer: "I apologize for the delay. Logistics can be unpredictable. Please email support@hemmyevo.store with your ID for priority resolution.", category: "shipping" },

  // --- RETURNS & REFUNDS ---
  { question: "Can I return an item?", answer: "We have a 7-day return policy. Items must be unworn with tags attached.", category: "returns" },
  { question: "How do I get a refund?", answer: "Refunds are processed to your original payment method within 5-10 business days after we receive the returned item.", category: "returns" },
  { question: "I received the wrong item", answer: "We are so sorry! Please upload a photo of the item in the chat (feature coming soon) or email us immediately.", category: "returns" },

  // --- PAYMENTS ---
  { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, Verve, Bank Transfer (via Paystack), and Crypto (USDT).", category: "payment" },
  { question: "Is my card safe?", answer: "Absolutely. We use SSL encryption and do not store your card details directly.", category: "payment" },
  { question: "My payment failed", answer: "Please check your bank limits or try a different card. You can also try the Bank Transfer option at checkout.", category: "payment" },

  // --- TECHNICAL / ACCOUNT ---
  { question: "I forgot my password", answer: "Click 'Forgot Password' on the login page. We will send a reset link to your email.", category: "technical" },
  { question: "How do I change my address?", answer: "Go to Account Settings > Address Book to edit or add a new delivery address.", category: "technical" },
  { question: "Delete my account", answer: "We're sad to see you go. Please contact privacy@hemmyevo.store to request data deletion.", category: "technical" },
  
  // --- CONTACT ---
  { question: "Can I speak to a human?", answer: "Our human agents are available 9 AM - 5 PM WAT. You can leave a message here and they will reply via email.", category: "contact" },
  { question: "Where is your office?", answer: "We are located at LAUTECH Area, Ogbomosho, Nigeria.", category: "contact" }
];