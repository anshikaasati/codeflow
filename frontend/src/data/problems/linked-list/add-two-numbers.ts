import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "add-two-numbers",
  title: "Add Two Numbers",
  difficulty: "Medium",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/add-two-numbers/",
  description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
  examples: [
    {
      "input": "l1 = [2,4,3], l2 = [5,6,4]",
      "output": "[7,0,8]",
      "explanation": "342 + 465 = 807."
    },
    {
      "input": "l1 = [0], l2 = [0]",
      "output": "[0]"
    },
    {
      "input": "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
      "output": "[8,9,9,9,0,0,0,1]"
    }
  ],
  constraints: [
    "The number of nodes in each linked list is in the range [1, 100].",
    "0 <= Node.val <= 9",
    "It is guaranteed that the list represents a number that does not have leading zeros."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your code here
        return nullptr;
    }
};

ListNode* make(vector<int>v){ListNode*d=new ListNode(0);ListNode*c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}
void print(ListNode*h){while(h){cout<<h->val;if(h->next)cout<<"->";h=h->next;}cout<<endl;}

int main(){
    Solution sol;
    print(sol.addTwoNumbers(make({2,4,3}),make({5,6,4}))); // 7->0->8
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

struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your code here
        return nullptr;
    }
};

ListNode* make(vector<int>v){ListNode*d=new ListNode(0);ListNode*c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}
void print(ListNode*h){while(h){cout<<h->val;if(h->next)cout<<"->";h=h->next;}cout<<endl;}

int main(){
    Solution sol;
    print(sol.addTwoNumbers(make({2,4,3}),make({5,6,4}))); // 7->0->8
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

struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Write your code here
        return nullptr;
    }
};

ListNode* make(vector<int>v){ListNode*d=new ListNode(0);ListNode*c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}
void print(ListNode*h){while(h){cout<<h->val;if(h->next)cout<<"->";h=h->next;}cout<<endl;}

int main(){
    Solution sol;
    print(sol.addTwoNumbers(make({2,4,3}),make({5,6,4}))); // 7->0->8
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

struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); ListNode* cur=&dummy; int carry=0;
        while(l1||l2||carry){
            int sum=carry+(l1?l1->val:0)+(l2?l2->val:0);
            cur->next=new ListNode(sum%10); cur=cur->next;
            carry=sum/10;
            if(l1)l1=l1->next; if(l2)l2=l2->next;
        }
        return dummy.next;
    }
};

ListNode* make(vector<int>v){ListNode*d=new ListNode(0);ListNode*c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}
void print(ListNode*h){while(h){cout<<h->val;if(h->next)cout<<"->";h=h->next;}cout<<endl;}

int main(){
    Solution sol;
    print(sol.addTwoNumbers(make({2,4,3}),make({5,6,4}))); // 7->0->8
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
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
    print("->".join(parts))

if __name__ == '__main__':
    sol = Solution()
    res = sol.addTwoNumbers(make_list([2, 4, 3]), make_list([5, 6, 4]))
    print_list(res)  # 7->0->8`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Convert the linked list into an array or use nested loops over list elements.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
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
    print("->".join(parts))

if __name__ == '__main__':
    sol = Solution()
    res = sol.addTwoNumbers(make_list([2, 4, 3]), make_list([5, 6, 4]))
    print_list(res)  # 7->0->8`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Traverse list while tracking visited nodes using a hash set.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
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
    print("->".join(parts))

if __name__ == '__main__':
    sol = Solution()
    res = sol.addTwoNumbers(make_list([2, 4, 3]), make_list([5, 6, 4]))
    print_list(res)  # 7->0->8`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `In-place pointer manipulation, slow-fast pointers, or dummy nodes to achieve O(1) auxiliary space.`,
        code: `from typing import Optional, List

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        cur = dummy
        carry = 0
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            total = carry + val1 + val2
            cur.next = ListNode(total % 10)
            cur = cur.next
            carry = total // 10
            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next
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
    print("->".join(parts))

if __name__ == '__main__':
    sol = Solution()
    res = sol.addTwoNumbers(make_list([2, 4, 3]), make_list([5, 6, 4]))
    print_list(res)  # 7->0->8`
      }
    }
  }
};

export default problem;
