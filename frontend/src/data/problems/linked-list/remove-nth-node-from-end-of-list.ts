import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "remove-nth-node-from-end-of-list",
  title: "Remove Nth Node From End of List",
  difficulty: "Medium",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  description: "Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.",
  examples: [
  {
    "input": "head = [1,2,3,4,5], n = 2",
    "output": "[1,2,3,5]"
  },
  {
    "input": "head = [1], n = 1",
    "output": "[]"
  },
  {
    "input": "head = [1,2], n = 1",
    "output": "[1]"
  }
],
  constraints: [
  "The number of nodes in the list is sz.",
  "1 <= sz <= 30",
  "0 <= Node.val <= 100",
  "1 <= n <= sz"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your code here
        return nullptr;
    }
};

ListNode* makeList(vector<int> v) {
    ListNode* dummy = new ListNode(0); ListNode* cur = dummy;
    for (int x : v) { cur->next = new ListNode(x); cur = cur->next; }
    return dummy->next;
}

void printList(ListNode* h) {
    while (h) { cout << h->val; if (h->next) cout << " -> "; h = h->next; }
    cout << endl;
}

int main() {
    Solution sol;
    printList(sol.removeNthFromEnd(makeList({1,2,3,4,5}), 2)); // 1->2->3->5
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* fast = &dummy, *slow = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) { slow = slow->next; fast = fast->next; }
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete;
        return dummy.next;
    }
};

ListNode* makeList(vector<int> v) {
    ListNode* dummy = new ListNode(0); ListNode* cur = dummy;
    for (int x : v) { cur->next = new ListNode(x); cur = cur->next; }
    return dummy->next;
}

void printList(ListNode* h) {
    while (h) { cout << h->val; if (h->next) cout << " -> "; h = h->next; }
    cout << endl;
}

int main() {
    Solution sol;
    printList(sol.removeNthFromEnd(makeList({1,2,3,4,5}), 2)); // 1->2->3->5
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        # Write your code here
        return []
def make_list(values: List[int]) -> ListNode:
    dummy = ListNode(0)
    current = dummy
    for value in values:
        current.next = ListNode(value)
        current = current.next
    return dummy.next

def print_list(head: ListNode) -> None:
    while head:
        print(head.val, end="->" if head.next else "")
        head = head.next
    print()

if __name__ == "__main__":
    solution = Solution()
    print_list(solution.removeNthFromEnd(make_list([1, 2, 3, 4, 5]), 2))  # 1->2->3->5`,
      solutionCode: `from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy = ListNode(0)
        dummy.next = head
        fast = dummy
        slow = dummy
        for _ in range(n + 1):
            fast = fast.next
        while fast:
            slow = slow.next
            fast = fast.next
        to_delete = slow.next
        slow.next = slow.next.next
        return dummy.next

def make_list(values: List[int]) -> ListNode:
    dummy = ListNode(0)
    current = dummy
    for value in values:
        current.next = ListNode(value)
        current = current.next
    return dummy.next

def print_list(head: ListNode) -> None:
    while head:
        print(head.val, end="->" if head.next else "")
        head = head.next
    print()

if __name__ == "__main__":
    solution = Solution()
    print_list(solution.removeNthFromEnd(make_list([1, 2, 3, 4, 5]), 2))  # 1->2->3->5`
    }
  }
};

export default problem;
