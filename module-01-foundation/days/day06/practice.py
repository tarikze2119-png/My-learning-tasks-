import math
from abc import ABC, abstractmethod


class Report:
    def __init__(self, title, content):
        self.title = title
        self.content = content

    def generate(self):
        return f"--- {self.title} ---\n{self.content}"


class ReportSaver:
    def save_to_file(self, report, filename):
        print(f"[Saver] Saving report '{report.title}' to {filename}...")


class ReportEmailer:
    def send_email(self, report, recipient):
        print(f"[Emailer] Emailing report '{report.title}' to {recipient}...")


class Shape(ABC):
    @abstractmethod
    def area(self):
        pass


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * (self.radius ** 2)


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


def print_area(shape: Shape):
    print(f"Area of {shape.__class__.__name__}: {shape.area():.2f}")


class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        kind = kind.lower()
        if kind == "circle":
            return Circle(*args)
        elif kind == "square":
            return Square(*args)
        elif kind == "triangle":
            return Triangle(*args)
        else:
            raise ValueError(f"Unknown shape type: '{kind}'")


class NewsAgency:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, subscriber):
        self._subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self._subscribers:
            subscriber.update(news)


class NewsChannel:
    def __init__(self, channel_name):
        self.channel_name = channel_name

    def update(self, news):
        print(f" [{self.channel_name} Breaking News]: {news}")


class MobileAlert:
    def __init__(self, app_name):
        self.app_name = app_name

    def update(self, news):
        print(f" [{self.app_name} Push Notification]: {news}")


if __name__ == "__main__":

   
    rep = Report("Monthly Audit", "All accounts balanced for July.")
    saver = ReportSaver()
    emailer = ReportEmailer()

    saver.save_to_file(rep, "audit_july.txt")
    emailer.send_email(rep, "manager@addisbank.et")

    shapes = [Circle(5), Square(4), Triangle(6, 3)]
    for s in shapes:
        print_area(s)

    
    settings1 = AppSettings()
    settings2 = AppSettings()
    print(f"Settings 1 Currency: {settings1.currency}")
    print(f"Settings 2 Currency: {settings2.currency}")
    print(f"Are settings1 and settings2 the exact same instance? {settings1 is settings2}")

   
    factory_circle = ShapeFactory.create("circle", 10)
    factory_square = ShapeFactory.create("square", 5)
    print(f"Factory created: {factory_circle.__class__.__name__}")
    print_area(factory_circle)
    print_area(factory_square)


    agency = NewsAgency()
    tv_channel = NewsChannel("EBC TV")
    phone_app = MobileAlert("Addis News App")

    agency.subscribe(tv_channel)
    agency.subscribe(phone_app)

    agency.notify("New Digital Banking Platform Launched in Addis Ababa!")