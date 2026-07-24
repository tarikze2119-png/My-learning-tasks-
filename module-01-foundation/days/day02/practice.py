print("#1")
temp=15
if temp<15:
    print("warm")
elif temp<28:
    print("hot")
else :
    print("cold")

print("#2")
for r in range(1,11):
    print(f"Recipt {r}")

print("#3")
for n in range(1,21):
    if n%2==0:
        print(f" {n}")
print("#4")
def aplay_discount(price, percent=0.1):
    new_price=price-(price*percent)
    return new_price
print(f"your new bill without discount is {aplay_discount(200,0)}")
print(f"your new bill with discount is {aplay_discount(200)}")

print("#5")
n=5
while n>0:
    print(n)
    n=n-1
print("Liftoff!")
