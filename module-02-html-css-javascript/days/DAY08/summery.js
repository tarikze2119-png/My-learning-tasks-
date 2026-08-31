import { withVat, format } from './pricing.js';
import { orders } from './order.js';

const highValueOrders = orders
  .map(order => {
    const rawTotal = order.items.reduce((sum, { price, qty }) => sum + price * qty, 0);
    return {
      ...order,
      total: withVat(rawTotal)
    };
  })
  .filter(order => order.total > 500);

const grandTotal = highValueOrders.reduce((sum, order) => sum + order.total, 0);

console.log("=== ADDIS MARKET ORDER SUMMARY ===");
highValueOrders.forEach(order => {
  console.log(`Order #${order.id} - ${order.customer}: ${format(order.total)}`);
});

console.log("---------------------------------");
console.log(`Grand Total: ${format(grandTotal)}`);