export interface BillingPlan {
    name: string;
    priceId: string;
    price: string;
    limits: {
        tokens: number;
    };
    features: string[];
}

export const billingPlan: BillingPlan[] = [
  {
    name: "free",
    priceId: "price_1TOJQ4RaUpUkrJxzbUspAfS9", 
    price: "$0",
    limits: { tokens: 50 },
    features: [
      "50 AI tokens ",
      "1 Mock Interview Session",
      "Basic Career Roadmap",
    ],
  },
  {
    name: "pro",
    priceId: "price_1TOJSuRaUpUkrJxzpaVV8Nwz", 
    price: "$9.99",
    limits: { tokens: 1000 },
    features: [
      "1000 AI tokens",
      "AI-powered Resume Analysis",
      "AI Mock Interview Sessions",
      "Cover Letter Generator",
      "Smart Course Recommendations",
      "Salary Negotiation Bot",
    ],
  },
  {
    name: "premium",
    priceId: "price_1TOJUFRaUpUkrJxzcgGsuzIu", 
    price: "$15.99",
    limits: { tokens: 3000 },
    features: [
      "3000 AI tokens",
      "Everything in Pro Plan",
      "Priority AI Processing (GPT-4o)",
      "LinkedIn Profile Optimization",
      "Direct Referral Network",
      "1-on-1 Expert Review (Async)",
    ],
  },
];