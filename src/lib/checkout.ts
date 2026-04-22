export type CheckoutProvider = 'lemon_squeezy' | 'stripe';
export type TierName = 'Starter' | 'Pro' | 'Agency';

const DEFAULT_PROVIDER: CheckoutProvider = 'lemon_squeezy';

const DEFAULT_URLS: Record<CheckoutProvider, Record<TierName, string>> = {
  lemon_squeezy: {
    Starter: 'https://commerceforge.lemonsqueezy.com/checkout/buy/7e933d75-d50f-4bf8-8930-517d23a3d4c0',
    Pro: 'https://commerceforge.lemonsqueezy.com/checkout/buy/50c14f58-9873-40e7-b443-f01f6de4abe6',
    Agency: 'https://commerceforge.lemonsqueezy.com/checkout/buy/43f8aad2-731f-4b72-bf67-a46d8c54e524',
  },
  stripe: {
    Starter: 'https://buy.stripe.com/5kQdR85fi2TH8NUeXK7IY00',
    Pro: 'https://buy.stripe.com/00w6oGdLOgKx0hog1O7IY01',
    Agency: 'https://buy.stripe.com/5kQaEWbDG2TH7JQeXK7IY02',
  },
};

function normalizeProvider(value: string | undefined): CheckoutProvider {
  return value?.toLowerCase() === 'stripe' ? 'stripe' : DEFAULT_PROVIDER;
}

export const checkoutProvider = normalizeProvider(import.meta.env.PUBLIC_CHECKOUT_PROVIDER);

export const checkoutProviderLabel =
  checkoutProvider === 'stripe' ? 'Stripe' : 'Lemon Squeezy';

export const paymentMethodsCopy =
  checkoutProvider === 'stripe'
    ? 'All major credit cards via Stripe. Taxes are calculated at checkout.'
    : 'All major credit cards and PayPal via Lemon Squeezy. VAT is handled automatically for EU purchases.';

export const pricingTaxCopy =
  checkoutProvider === 'stripe'
    ? 'All prices exclude VAT. Taxes are calculated at checkout. Refund requests may be submitted within 7 days in accordance with our Terms.'
    : 'All prices exclude VAT. VAT is applied automatically for EU purchases. Refund requests may be submitted within 7 days in accordance with our Terms.';

export const checkoutDeliveryCopy =
  checkoutProvider === 'stripe'
    ? 'Secure checkout via Stripe. Delivery is provided manually after purchase.'
    : 'Secure checkout via Lemon Squeezy. Repository access is delivered after purchase.';

export const privacyPolicyUrl =
  checkoutProvider === 'stripe'
    ? 'https://stripe.com/privacy'
    : 'https://www.lemonsqueezy.com/privacy';

export const paymentProcessingCopy =
  checkoutProvider === 'stripe'
    ? 'Payments are processed by Stripe. We do not store your full payment card details.'
    : 'Payments are processed by Lemon Squeezy (a Stripe company), which acts as the Merchant of Record. We do not store your full payment card details.';

export const checkoutCookiesCopy =
  checkoutProvider === 'stripe'
    ? 'if you proceed to purchase via Stripe, Stripe may set its own cookies or similar technologies on its checkout pages under its own policies.'
    : 'if you proceed to purchase via Lemon Squeezy, Lemon Squeezy may set its own cookies or similar technologies on its checkout pages under its own policies.';

export const internationalTransfersCopy =
  checkoutProvider === 'stripe'
    ? 'Your data may be transferred to and processed in countries outside the European Economic Area (e.g. the United States, where GitHub and Stripe operate). Such transfers are governed by EU Standard Contractual Clauses or equivalent safeguards.'
    : 'Your data may be transferred to and processed in countries outside the European Economic Area (e.g. the United States, where GitHub and Lemon Squeezy operate). Such transfers are governed by EU Standard Contractual Clauses or equivalent safeguards.';

export const paymentSecurityCopy =
  checkoutProvider === 'stripe'
    ? 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or disclosure. Payments are encrypted via TLS and handled entirely by Stripe. We do not store payment card data on our servers.'
    : 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or disclosure. Payments are encrypted via TLS and handled entirely by Lemon Squeezy. We do not store payment card data on our servers.';

export function getCheckoutUrl(tierName: TierName): string {
  const providerKey = checkoutProvider === 'stripe' ? 'STRIPE' : 'LEMON_SQUEEZY';
  const envKey = `PUBLIC_${providerKey}_${tierName.toUpperCase()}_URL`;
  return import.meta.env[envKey] ?? DEFAULT_URLS[checkoutProvider][tierName];
}
