import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "reorder-list",
  title: "Reorder List",
  difficulty: "Medium",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/reorder-list/",
  description: `You are given the head of a singly linked-list. The list can be represented as:
\`L0 → L1 → … → Ln - 1 → Ln\`

Reorder the list to be on the following form:
\`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
  examples: [
    {
      "input": "head = [1,2,3,4]",
      "output": "[1,4,2,3]"
    },
    {
      "input": "head = [1,2,3,4,5]",
      "output": "[1,5,2,4,3]"
    }
  ],
  constraints: [
    "The number of nodes in the list is in the range [1, 5 * 10^4].",
    "1 <= Node.val <= 1000"
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
    void reorderList(ListNode* head) {
        // Write your code here
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
    ListNode* list = makeList({1,2,3,4,5});
    sol.reorderList(list);
    printList(list); // 1->5->2->4->3
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    void reorderList(ListNode* head) {
        // Write your code here
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
    ListNode* list = makeList({1,2,3,4,5});
    sol.reorderList(list);
    printList(list); // 1->5->2->4->3
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    void reorderList(ListNode* head) {
        // Write your code here
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
    ListNode* list = makeList({1,2,3,4,5});
    sol.reorderList(list);
    printList(list); // 1->5->2->4->3
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        // Find middle
        ListNode* slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next; fast = fast->next->next;
        }
        // Reverse second half
        ListNode* second = slow->next;
        slow->next = nullptr;
        ListNode* prev = nullptr;
        while (second) {
            ListNode* nxt = second->next;
            second->next = prev; prev = second; second = nxt;
        }
        // Merge two halves
        ListNode* first = head; second = prev;
        while (second) {
            ListNode* tmp1 = first->next, *tmp2 = second->next;
            first->next = second; second->next = tmp1;
            first = tmp1; second = tmp2;
        }
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
    ListNode* list = makeList({1,2,3,4,5});
    sol.reorderList(list);
    printList(list); // 1->5->2->4->3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: ListNode) -> None:
        # Write your code here
        pass
def makeList(v: List[int]) -> ListNode:
    dummy = ListNode(0)
    cur = dummy
    for x in v:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

def printList(h: ListNode) -> None:
    while h:
        print(h.val, end="->" if h.next else "")
        h = h.next
    print()

if __name__ == '__main__':
    sol = Solution()
    list = makeList([1,2,3,4,5])
    sol.reorderList(list)
    printList(list)  # 1->5->2->4->3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: ListNode) -> None:
        # Write your code here
        pass
def makeList(v: List[int]) -> ListNode:
    dummy = ListNode(0)
    cur = dummy
    for x in v:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

def printList(h: ListNode) -> None:
    while h:
        print(h.val, end="->" if h.next else "")
        h = h.next
    print()

if __name__ == '__main__':
    sol = Solution()
    list = makeList([1,2,3,4,5])
    sol.reorderList(list)
    printList(list)  # 1->5->2->4->3`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: ListNode) -> None:
        # Write your code here
        pass
def makeList(v: List[int]) -> ListNode:
    dummy = ListNode(0)
    cur = dummy
    for x in v:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

def printList(h: ListNode) -> None:
    while h:
        print(h.val, end="->" if h.next else "")
        h = h.next
    print()

if __name__ == '__main__':
    sol = Solution()
    list = makeList([1,2,3,4,5])
    sol.reorderList(list)
    printList(list)  # 1->5->2->4->3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `from typing import List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: ListNode) -> None:
        if not head or not head.next:
            return
        # Find middle
        slow = head
        fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
        # Reverse second half
        second = slow.next
        slow.next = None
        prev = None
        while second:
            nxt = second.next
            second.next = prev
            prev = second
            second = nxt
        # Merge two halves
        first = head
        second = prev
        while second:
            tmp1 = first.next
            tmp2 = second.next
            first.next = second
            second.next = tmp1
            first = tmp1
            second = tmp2

def makeList(v: List[int]) -> ListNode:
    dummy = ListNode(0)
    cur = dummy
    for x in v:
        cur.next = ListNode(x)
        cur = cur.next
    return dummy.next

def printList(h: ListNode) -> None:
    while h:
        print(h.val, end="->" if h.next else "")
        h = h.next
    print()

if __name__ == '__main__':
    sol = Solution()
    list = makeList([1,2,3,4,5])
    sol.reorderList(list)
    printList(list)  # 1->5->2->4->3`
      }
    }
  }
};

export default problem;
