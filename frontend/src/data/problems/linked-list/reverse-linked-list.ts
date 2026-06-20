import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "reverse-linked-list",
  title: "Reverse Linked List",
  difficulty: "Easy",
  category: "Linked List",
  url: "https://leetcode.com/problems/reverse-linked-list/",
  description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
  examples: [
  {
    "input": "head = [1,2,3,4,5]",
    "output": "[5,4,3,2,1]"
  },
  {
    "input": "head = [1,2]",
    "output": "[2,1]"
  },
  {
    "input": "head = []",
    "output": "[]"
  }
],
  constraints: [
  "The number of nodes in the list is the range [0, 5000].",
  "-5000 <= Node.val <= 5000"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};

ListNode* makeList(vector<int> v) {
    ListNode* dummy = new ListNode(0);
    ListNode* cur = dummy;
    for (int x : v) { cur->next = new ListNode(x); cur = cur->next; }
    return dummy->next;
}

void printList(ListNode* head) {
    while (head) { cout << head->val; if (head->next) cout << " -> "; head = head->next; }
    cout << endl;
}

int main() {
    Solution sol;
    ListNode* list = makeList({1,2,3,4,5});
    printList(sol.reverseList(list)); // 5 -> 4 -> 3 -> 2 -> 1
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev

def make_list(values: list[int]) -> ListNode:
    dummy = ListNode(0)
    cur = dummy
    for value in values:
        cur.next = ListNode(value)
        cur = cur.next
    return dummy.next

def print_list(head: ListNode) -> None:
    while head:
        print(head.val, end=" -> " if head.next else "\\n")
        head = head.next

if __name__ == '__main__':
    sol = Solution()
    list_ = make_list([1, 2, 3, 4, 5])
    print_list(sol.reverseList(list_))  # 5 -> 4 -> 3 -> 2 -> 1`
    },
    java: {
      starterCode: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}

class Main {
    static ListNode makeList(int[] v) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (int x : v) {
            cur.next = new ListNode(x);
            cur = cur.next;
        }
        return dummy.next;
    }

    static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val);
            if (head.next != null) {
                System.out.print(" -> ");
            }
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        ListNode list = makeList(new int[]{1, 2, 3, 4, 5});
        printList(sol.reverseList(list)); // 5 -> 4 -> 3 -> 2 -> 1
    }
}`
    }
  }
};

export default problem;
