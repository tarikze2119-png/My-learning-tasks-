/**
 * dishes.js — API client abstraction for Addis Eats dishes
 */
export async function fetchDishes(category = "All", signal) {
  const res = await fetch("/data/dishes.json", { signal });
  if (!res.ok) {
    throw new Error(`Failed to load dishes (HTTP ${res.status})`);
  }
  const allDishes = await res.json();
  if (category === "All" || !category) {
    return allDishes;
  }
  return allDishes.filter((dish) => dish.category.toLowerCase() === category.toLowerCase());
}

export async function fetchDishById(id, signal) {
  const res = await fetch("/data/dishes.json", { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch dish (HTTP ${res.status})`);
  }
  const allDishes = await res.json();
  const dish = allDishes.find((d) => String(d.id) === String(id));
  return dish || null;
}
