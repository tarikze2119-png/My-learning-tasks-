import heapq
from collections import deque

class BSTNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return BSTNode(value)

    if value < root.val:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root

def inorder_traversal(root, result=None):
    if result is None:
        result = []

    if root:
        inorder_traversal(root.left, result)
        result.append(root.val)
        inorder_traversal(root.right, result)

    return result

def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visit_order = []

    while queue:
        vertex = queue.popleft()
        if vertex not in visited:
            visited.add(vertex)
            visit_order.append(vertex)

            for neighbor in graph.get(vertex, []):
                if neighbor not in visited:
                    queue.append(neighbor)

    return visit_order

def dfs(graph, start, visited=None, visit_order=None):
    if visited is None:
        visited = set()
    if visit_order is None:
        visit_order = []

    visited.add(start)
    visit_order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, visit_order)

    return visit_order

def process_priority_queue():
    tasks = [
        (3, "Routine Audit"),
        (1, "Critical Fraud Alert"),
        (4, "Database Backup"),
        (2, "Overdraft Warning"),
        (5, "Monthly Summary Report"),
    ]

    heap = []
    for item in tasks:
        heapq.heappush(heap, item)

    popped_order = []
    while heap:
        popped_order.append(heapq.heappop(heap))

    return popped_order

if __name__ == "__main__":

    print("=== 1 & 2. BST Construction, In-Order Traversal & Height ===")
    balances = [1200.0, 500.0, 3000.0, 200.0, 800.0, 2500.0, 4000.0]

    root = None
    for bal in balances:
        root = insert(root, bal)

    sorted_balances = inorder_traversal(root)
    tree_depth = height(root)

    print(f"Inserted Balances : {balances}")
    print(f"In-Order Traversal: {sorted_balances}")
    print(f"Tree Depth        : {tree_depth}\n")

    print("=== 3 & 4. Graph Traversals (BFS vs DFS) ===")
    branch_graph = {
        "HQ": ["Branch_A", "Branch_B"],
        "Branch_A": ["HQ", "Branch_C", "Branch_D"],
        "Branch_B": ["HQ", "Branch_E"],
        "Branch_C": ["Branch_A"],
        "Branch_D": ["Branch_A", "Branch_E"],
        "Branch_E": ["Branch_B", "Branch_D"],
    }

    start_node = "HQ"
    bfs_result = bfs(branch_graph, start_node)
    dfs_result = dfs(branch_graph, start_node)

    print(f"Starting Node: {start_node}")
    print(f"BFS Visit Order (Level by Level): {' -> '.join(bfs_result)}")
    print(f"DFS Visit Order (Deep First)    : {' -> '.join(dfs_result)}\n")

    print("=== 5. Priority Queue Processing ===")
    processed_tasks = process_priority_queue()

    print("Tasks processed by priority (1 = highest):")
    for priority, task_name in processed_tasks:
        print(f"  [Priority {priority}] {task_name}")