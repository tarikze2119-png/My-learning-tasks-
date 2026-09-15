import { cartReducer, initialCartState } from "./cartReducer.js";

console.log("--- Testing cartReducer with plain objects ---");

const state0 = initialCartState;
const state1 = cartReducer(state0, {
  type: "add",
  dish: { id: 1, name: "Doro Wot", price: 240 }
});
console.log("Test 1 (Add new dish):", state1.items.length === 1 && state1.items[0].name === "Doro Wot" ? "PASSED" : "FAILED");

const state2 = cartReducer(state1, {
  type: "add",
  dish: { id: 1, name: "Doro Wot", price: 240 }
});
console.log("Test 2 (Add existing dish increments quantity):", state2.items[0].quantity === 2 ? "PASSED" : "FAILED");

const state3 = cartReducer(state2, {
  type: "add",
  dish: { id: 2, name: "Shiro Tegabino", price: 140 }
});
console.log("Test 3 (Add second dish):", state3.items.length === 2 ? "PASSED" : "FAILED");

const state4 = cartReducer(state3, {
  type: "remove",
  id: 1
});
console.log("Test 4 (Remove dish):", state4.items.length === 1 && state4.items[0].id === 2 ? "PASSED" : "FAILED");

const state5 = cartReducer(state4, {
  type: "clear"
});
console.log("Test 5 (Clear cart):", state5.items.length === 0 ? "PASSED" : "FAILED");

try {
  cartReducer(state5, { type: "INVALID_ACTION" });
  console.log("Test 6 (Unknown action throws error): FAILED");
} catch (e) {
  console.log("Test 6 (Unknown action throws error): PASSED ->", e.message);
}

console.log("--- All direct reducer tests executed successfully! ---");
