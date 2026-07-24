print("#1")
cities=["Gonder","Addis abeba", "Mekele", "Bahir dar", "Addis abeba",  "Abama", "Gonder","Zway", "Bahir dar"]
unique_cites=set(cities)
for city in unique_cites:
    print (f"{city} it is one of Ethiopian cities")
print(len(unique_cites))
print("#2")
glosery={ "chocklate cake": 700,  "Ice cream": 150,  "Milk":100 , "coffe":80 , "makiyato": 120,  }
for item,price in glosery.items():
    print (f"{item} is {price} in our cafe")
print("#3")
prices = [100, 250, 400, 80]
prices_with_tax = [round(price * 1.15, 2) for price in prices]
print (prices_with_tax)
print("#4")
cheap_prices = [price for price in prices if price < 200]
print (cheap_prices)

names = ["Almaz", "Dawit", "Tigist"]

# 1. Write customer names to names.txt
with open("names.txt", "w") as f:
    for name in names:
        f.write(f"{name}\n")

# 2. Open names.txt and print each name back
with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())

try:
    user_input = input("Enter a number to divide 1000 by: ")
    number = float(user_input)
    result = 1000 / number
    print(f"1000 / {number} = {result}")

except ValueError:
    print("Error: Invalid input! Please enter a valid numerical value.")

except ZeroDivisionError:
    print("Error: Cannot divide by zero!")