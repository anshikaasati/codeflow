import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "merge-two-sorted-lists",
  title: "Merge Two Sorted Lists",
  difficulty: "Easy",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/merge-two-sorted-lists/",
  description: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
  examples: [
  {
    "input": "list1 = [1,2,4], list2 = [1,3,4]",
    "output": "[1,1,2,3,4,4]"
  },
  {
    "input": "list1 = [], list2 = []",
    "output": "[]"
  },
  {
    "input": "list1 = [], list2 = [0]",
    "output": "[0]"
  }
],
  constraints: [
  "The number of nodes in both lists is in the range [0, 50].",
  "-100 <= Node.val <= 100",
  "Both list1 and list2 are sorted in non-decreasing order."
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
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        // Write your code here
        return nullptr;
    }
};

ListNode* makeList(vector<int> v) {
    ListNode* dummy = new ListNode(0); ListNode* cur = dummy;
    for (int x : v) { cur->next = new ListNode(x); cur = cur->next; }
    return dummy->next;
}

void printList(ListNode* head) {
    while (head) { cout << head->val; if (head->next) cout << " -> "; head = head->next; }
    cout << endl;
}

int main() {
    Solution sol;
    printList(sol.mergeTwoLists(makeList({1,2,4}), makeList({1,3,4}))); // 1->1->2->3->4->4
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
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* cur = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) { cur->next = l1; l1 = l1->next; }
            else                    { cur->next = l2; l2 = l2->next; }
            cur = cur->next;
        }
        cur->next = l1 ? l1 : l2;
        return dummy.next;
    }
};

ListNode* makeList(vector<int> v) {
    ListNode* dummy = new ListNode(0); ListNode* cur = dummy;
    for (int x : v) { cur->next = new ListNode(x); cur = cur->next; }
    return dummy->next;
}

void printList(ListNode* head) {
    while (head) { cout << head->val; if (head->next) cout << " -> "; head = head->next; }
    cout << endl;
}

int main() {
    Solution sol;
    printList(sol.mergeTwoLists(makeList({1,2,4}), makeList({1,3,4}))); // 1->1->2->3->4->4
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass
def make_list(vals: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def print_list(head: Optional[ListNode]) -> None:
    parts = []
    curr = head
    while curr:
        parts.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(parts))

if __name__ == '__main__':
    sol = Solution()
    res = sol.mergeTwoLists(make_list([1, 2, 4]), make_list([1, 3, 4]))
    print_list(res)  # 1 -> 1 -> 2 -> 3 -> 4 -> 4`,
      solutionCode: `from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        cur = dummy
        while l1 and l2:
            if l1.val <= l2.val:
                cur.next = l1
                l1 = l1.next
            else:
                cur.next = l2
                l2 = l2.next
            cur = cur.next
        cur.next = l1 if l1 else l2
        return dummy.next

def make_list(vals: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def print_list(head: Optional[ListNode]) -> None:
    parts = []
    curr = head
    while curr:
        parts.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(parts))

if __name__ == '__main__':
    sol = Solution()
    res = sol.mergeTwoLists(make_list([1, 2, 4]), make_list([1, 3, 4]))
    print_list(res)  # 1 -> 1 -> 2 -> 3 -> 4 -> 4`
    }
  }
};

export default problem;
