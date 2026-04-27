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
    limits: { tokens: 5 },
    features: [
      "1 AI Resume Analysis",
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
      "Unlimited Resume Analysis",
      "Unlimited AI Mock Interviews",
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
      "Everything in Pro",
      "Priority AI Processing (GPT-4o)",
      "LinkedIn Profile Optimization",
      "Direct Referral Network",
      "1-on-1 Expert Review (Async)",
    ],
  },
];