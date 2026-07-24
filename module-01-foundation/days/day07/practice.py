import time
from collections import deque


def benchmark_lookup():
    print("=== 2. List vs. Dict Lookup Benchmark ===")
    size = 100_000
    target = f"ACC_{size - 2}"  

    fake_list = [f"ACC_{i}" for i in range(size)]
    fake_dict = {f"ACC_{i}": True for i in range(size)}

    start_time = time.perf_counter()
    _ = target in fake_list
    list_time = time.perf_counter() - start_time

    start_time = time.perf_counter()
    _ = target in fake_dict
    dict_time = time.perf_counter() - start_time

    print(f"Target searched: '{target}' across {size:,} entries")
    print(f"List search time: {list_time:.6f} seconds")
    print(f"Dict search time: {dict_time:.6f} seconds")
    if dict_time > 0:
        print(f"Dict was ~{int(list_time / dict_time):,}x faster!")
    print()


class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Cannot pop from an empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0


def reverse_names_with_stack(names):
    stack = Stack()
    for name in names:
        stack.push(name)

    reversed_names = []
    while not stack.is_empty():
        reversed_names.append(stack.pop())

    return reversed_names


def simulate_bank_queue():
    print("=== 4. Bank Queue Simulation ===")
    bank_queue = deque()

    customers = ["Abebe", "Kebede", "Almaz", "Tigist", "Dawit"]

    print("Enqueuing customers:")
    for customer in customers:
        print(f"  --> {customer} arrived")
        bank_queue.append(customer)

    print("\nServing customers (FIFO):")
    while bank_queue:
        served = bank_queue.popleft()
        print(f"  <-- Serving: {served}")
    print()


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head
        elements = []
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")


if __name__ == "__main__":

    benchmark_lookup()

    print("=== 3. Stack List Reversal ===")
    original_names = ["Abebe", "Almaz", "Kebede", "Dawit", "Tigist"]
    reversed_names = reverse_names_with_stack(original_names)
    print(f"Original: {original_names}")
    print(f"Reversed: {reversed_names}\n")

    simulate_bank_queue()

    print("=== 5. Singly Linked List ===")
    ll = LinkedList()
    ll.push_front("Account 1003")
    ll.push_front("Account 1002")
    ll.push_front("Account 1001")
    print("Linked List Contents (Front to Back):")
    ll.print_all()