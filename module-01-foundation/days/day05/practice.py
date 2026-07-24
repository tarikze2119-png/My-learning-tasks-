from abc import ABC, abstractmethod



class Vehicle(ABC):

    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        """Must be implemented by all subclasses."""
        pass


# 1. Car Subclass
class Car(Vehicle):

    def wheels(self):
        return 4



class Truck(Vehicle):

    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity  

    def describe(self):
        print(f"{self.make} {self.model} (Capacity: {self.capacity} tons)")

    def wheels(self):
        return 6



if __name__ == "__main__":

    fleet = [
        Car("Toyota", "Corolla"),
        Truck("Isuzu", "FVR", 10),
        Car("Hyundai", "Elantra"),
        Truck("Volvo", "FH16", 25),
    ]

    print("=== Vehicle Fleet Overview ===\n")

    
    for vehicle in fleet:
        vehicle.describe()
        print(f"   └─ Number of wheels: {vehicle.wheels()}\n")