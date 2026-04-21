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
    name: "Basic",
    priceId: "price_1TOJQ4RaUpUkrJxzbUspAfS9", 
    price: "$0",
    limits: { tokens: 100 },
    features: [
      "Basic CV parsing",
      "5 Mock interview sessions",
      "Standard report",
    ],
  },
  {
    name: "Pro",
    priceId: "price_1TOJSuRaUpUkrJxzpaVV8Nwz", 
    price: "$9.99",
    limits: { tokens: 1000 },
    features: [
      "Advance semantic CV parsing",
      "Unlimited Mock interview sessions",
      "Real-time behavioral metrics",
      "Deep-dive gap analysis",
    ],
  },
  {
    name: "Premium",
    priceId: "price_1TOJUFRaUpUkrJxzcgGsuzIu", 
    price: "$15.99",
    limits: { tokens: 10000 },
    features: [
      "Everything in Pro",
      "Human-expert review",
      "Priority AI processing",
      "1-on-1 counselor simulation",
      "Custom roadmap build",
    ],
  },
];