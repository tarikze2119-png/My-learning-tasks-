from collections import deque

class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self.history = []

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.__balance += amount
        self.history.append(("deposit", amount))
        print(f"[{self.account_number}] Deposited {amount} ETB. Balance: {self.balance} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self.__balance:
            raise ValueError("Insufficient funds.")
        self.__balance -= amount
        self.history.append(("withdraw", amount))
        print(f"[{self.account_number}] Withdrew {amount} ETB. Balance: {self.balance} ETB")

    def undo_last(self):
        if not self.history:
            print(f"[{self.account_number}] No transactions to undo.")
            return

        action, amount = self.history.pop()

        if action == "deposit":
            self.__balance -= amount
            print(f"[{self.account_number}] ↩️ UNDO: Reversed deposit of {amount} ETB. Balance: {self.balance} ETB")
        elif action == "withdraw":
            self.__balance += amount
            print(f"[{self.account_number}] ↩️ UNDO: Reversed withdrawal of {amount} ETB. Balance: {self.balance} ETB")

    def __str__(self):
        return f"{self.owner} (Acc: {self.account_number}) - {self.balance} ETB"

class AccountRegistry: 
    def __init__(self): 
        self.by_number = {}      
        self.order = []          

    def add(self, acc): 
        if acc.account_number not in self.by_number:
            self.by_number[acc.account_number] = acc 
            self.order.append(acc.account_number) 

    def find(self, number): 
        return self.by_number.get(number)    

    def list_all(self):
        return [self.by_number[num] for num in self.order]

class Branch: 
    def __init__(self, name): 
        self.name = name 
        self.children = []
        self.accounts = []
        
    def add_child(self, branch):
        self.children.append(branch)
        
    def add_account(self, account):
        self.accounts.append(account)
        
    def total_balance(self): 
        total = sum(a.balance for a in self.accounts) 
        for child in self.children:   
            total += child.total_balance() 
        return total 

def bfs(transfers, start):
    visited = set()
    queue = deque([start])
    reachable = []
    
    while queue:
        current = queue.popleft()
        
        if current not in visited:
            visited.add(current)
            reachable.append(current)
            
            recipients = transfers.get(current, [])
            for recipient in recipients:
                if recipient not in visited:
                    queue.append(recipient)
                    
    return reachable

if __name__ == "__main__":
    
    registry = AccountRegistry()

    print("=== Registering Accounts ===")
    acc1 = Account("Almaz", "1001", 500)
    acc2 = Account("Dawit", "1002", 1200)
    acc3 = Account("Tigist", "1003", 300)

    registry.add(acc1)
    registry.add(acc2)
    registry.add(acc3)

    print("\n=== All Accounts (Insertion Order) ===")
    for acc in registry.list_all():
        print(acc)

    print("\n=== Finding Account 1002 ===")
    found_acc = registry.find("1002")
    print(f"Found: {found_acc}")

    print("\n=== Testing Transactions & Undo ===")
    acc1.deposit(200)
    acc1.withdraw(50)
    acc1.deposit(100)

    print("\nStarting Undo process...")
    acc1.undo_last()
    acc1.undo_last()
    acc1.undo_last()
    acc1.undo_last()

    print("\n=== Branch Balance (Recursive Tree) ===")
    hq = Branch("Head Office - Addis Ababa")
    hq.add_account(Account("Corporate", "1000", 500000))
    
    north_region = Branch("Northern Region")
    hq.add_child(north_region)
    
    south_region = Branch("Southern Region")
    hq.add_child(south_region)
    
    bahir_dar = Branch("Bahir Dar Branch")
    bahir_dar.add_account(Account("Abebe", "1004", 15000))
    bahir_dar.add_account(Account("Kebede", "1005", 20000))
    north_region.add_child(bahir_dar)
    
    hawassa = Branch("Hawassa Branch")
    hawassa.add_account(Account("Chala", "1006", 10000))
    south_region.add_child(hawassa)
    
    print(f"Total Balance at {bahir_dar.name}: {bahir_dar.total_balance()} ETB")
    print(f"Total Balance at {north_region.name}: {north_region.total_balance()} ETB")
    print(f"Total Balance across entire bank (HQ): {hq.total_balance()} ETB")

    print("\n=== Transfer Reachability (BFS Graph) ===")
    transfers_graph = {
        "1001": ["1002", "1003"],
        "1002": ["1004"],
        "1003": ["1005"],
        "1004": [],
        "1005": ["1001"],
        "1099": ["1004"]
    }
    
    start_node = "1001"
    reachable_accounts = bfs(transfers_graph, start_node)
    
    print(f"Accounts reachable from {start_node} via transfer chain:")
    print(" -> ".join(reachable_accounts))