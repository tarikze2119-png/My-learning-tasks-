import random

def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])

def count_down(n):
    if n <= 0:
        return
    print(n, end=" " if n > 1 else "\n")
    count_down(n - 1)

def binary_search(items, target):
    low, high = 0, len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)

def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return False

if __name__ == "__main__":

    print("=== 1. Recursive Functions ===")
    sample_nums = [10, 20, 30, 40, 50]
    print(f"Recursive sum of {sample_nums}: {total(sample_nums)}")
    print("Counting down from 5:")
    count_down(5)
    print()

    print("=== 2. Binary Search ===")
    balances = [150.0, 300.0, 750.0, 1200.0, 5000.0, 8900.0]
    target_balance = 1200.0
    idx = binary_search(balances, target_balance)
    print(f"Sorted Balances: {balances}")
    print(f"Index of {target_balance} ETB: {idx}")
    print(f"Index of 999.0 ETB (Missing): {binary_search(balances, 999.0)}\n")

    print("=== 3. Merge Sort Verification ===")
    random_list = [random.randint(1, 100) for _ in range(10)]
    custom_sorted = merge_sort(random_list)
    builtin_sorted = sorted(random_list)

    print(f"Unsorted List : {random_list}")
    print(f"Merge Sorted  : {custom_sorted}")
    print(f"Matches sorted()? {custom_sorted == builtin_sorted}\n")

    print("=== 4. Sort Tuples by Balance Descending ===")
    accounts = [
        ("Almaz", 1200.50),
        ("Dawit", 450.00),
        ("Tigist", 8900.00),
        ("Abebe", 3000.25),
    ]
    sorted_accounts = sorted(accounts, key=lambda acc: acc[1], reverse=True)

    print("Accounts sorted by balance (highest first):")
    for name, bal in sorted_accounts:
        print(f"  • {name}: {bal:.2f} ETB")
    print()

    print("=== 5. Two Pointers Pair Sum ===")
    sorted_arr = [2, 7, 11, 15, 20, 28]
    target_1 = 22
    target_2 = 10

    print(f"Array: {sorted_arr}")
    print(f"Has pair summing to {target_1}? {has_pair(sorted_arr, target_1)}")
    print(f"Has pair summing to {target_2}? {has_pair(sorted_arr, target_2)}")