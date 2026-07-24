# inventory.py

stock = {}

# Load stock from file
try:
    with open("stock.txt", "r") as f:
        for line in f:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")

# Function to adjust stock quantity
def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount
    print(f"{item} updated to {stock[item]}")

# Example updates
adjust("Paracetamol", 5)      # Increase stock
adjust("Amoxicillin", -3)     # Decrease stock
adjust("Vitamin C", 8)        # Add new item if it doesn't exist

# Display all stock
print("\nCurrent Stock:")
for item, qty in stock.items():
    print(f"{item}: {qty}")

# Report low-stock items
print("\nLow Stock Items (less than 10):")
low = [item for item, qty in stock.items() if qty < 10]

if low:
    for item in low:
        print(f"- {item} ({stock[item]})")
else:
    print("No low-stock items.")

# Save updated stock back to file
with open("stock.txt", "w") as f:
    for item, qty in stock.items():
        f.write(f"{item},{qty}\n")

print("\nStock has been saved to stock.txt.")