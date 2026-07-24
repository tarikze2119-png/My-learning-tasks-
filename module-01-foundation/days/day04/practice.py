class book:
    def __init__(self, title, autor, page):
        self.title = title
        self.autor = autor
        self.page = page

    def decribe(self):
        print(f"{self.title}: {self.autor}: {self.page}")

b = book("Java", "J.J Thomson", 500)
b.decribe()
b = book("Python", "William", 400)
b.decribe()

class product:
    def __init__(self, name, price, quantity=5):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, n):
        if n >= 0:
            self.__quantity = n
        else:
            print("Quantity cannot be below zero")

    def restock(self, n):
        self.quantity += n

    def sell(self, n):
        self.quantity -= n

p1 = product("Java", "700(ETB)")
p2 = product("Python", "400(ETB)")
p3 = product("python", "800(ETB)")

p1.sell(2)

print(p1.name, p1.quantity)
print(p2.name, p2.quantity)
print(p3.name, p3.quantity)