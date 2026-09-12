/**
 * orders.js — API client abstraction for order submission
 * Simulates real-world validation and server responses (e.g. 422 Unprocessable Entity)
 */
export async function placeOrder(orderPayload) {
  // Simulate network latency (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { name, phone, area } = orderPayload;
  const validPhone = /^(?:\+251|0)9\d{8}$/.test(phone?.trim() || "");

  if (!name?.trim() || !validPhone || !area) {
    const error = new Error("Order validation failed on server");
    error.status = 422;
    error.fieldErrors = {};
    if (!name?.trim()) error.fieldErrors.name = "Name is required by server";
    if (!validPhone) error.fieldErrors.phone = "Invalid TeleBirr format on server";
    if (!area) error.fieldErrors.area = "Valid delivery area required";
    throw error;
  }

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  return {
    id: orderId,
    createdAt: new Date().toISOString(),
    ...orderPayload,
    status: "Confirmed",
  };
}
