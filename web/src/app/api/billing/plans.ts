export const plans = {
  basic: {
    id: "basic",
    name: "Piano Basic",
    price: 19,
    stripe_price_id: process.env.STRIPE_PRICE_BASIC,
  },
  pro: {
    id: "pro",
    name: "Piano Pro",
    price: 49,
    stripe_price_id: process.env.STRIPE_PRICE_PRO,
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    stripe_price_id: process.env.STRIPE_PRICE_ENTERPRISE,
  }
};
