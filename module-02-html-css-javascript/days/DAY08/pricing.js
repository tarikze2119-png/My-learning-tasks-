const VAT_RATE = 0.15;

export const withVat = (amount) => amount * (1 + VAT_RATE);

export const format = (amount) => `${amount.toFixed(2)} ETB`;

export const total = (items) => 
  items.reduce((sum, { price, qty }) => sum + price * qty, 0);
