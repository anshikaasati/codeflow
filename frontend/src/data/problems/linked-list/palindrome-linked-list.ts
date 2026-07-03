import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "palindrome-linked-list",
  title: "Palindrome Linked List",
  difficulty: "Easy",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/palindrome-linked-list/",
  description: `Given the \`head\` of a singly linked list, return \`true\` if it is a palindrome or \`false\` otherwise.`,
  examples: [
    {
      "input": "head = [1,2,2,1]",
      "output": "true"
    },
    {
      "input": "head = [1,2]",
      "output": "false"
    }
  ],
  constraints: [
    "The number of nodes in the list is in the range [1, 10^5].",
    "0 <= Node.val <= 9"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };

class Solution {
    ListNode* reverse(ListNode* h) {
        // Write your code here
        return nullptr;
    }
public:
    bool isPalindrome(ListNode* head) {
        // Write your code here
        return false;
    }
};

ListNode* make(vector<int> v){ListNode* d=new ListNode(0);ListNode* c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}

int main(){
    Solution sol;
    cout<<boolalpha<<sol.isPalindrome(make({1,2,2,1}))<<endl; // true
    cout<<sol.isPalindrome(make({1,2}))<<endl; // false
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

struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };

class Solution {
    ListNode* reverse(ListNode* h) {
        // Write your code here
        return nullptr;
    }
public:
    bool isPalindrome(ListNode* head) {
        // Write your code here
        return false;
    }
};

ListNode* make(vector<int> v){ListNode* d=new ListNode(0);ListNode* c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}

int main(){
    Solution sol;
    cout<<boolalpha<<sol.isPalindrome(make({1,2,2,1}))<<endl; // true
    cout<<sol.isPalindrome(make({1,2}))<<endl; // false
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

struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };

class Solution {
    ListNode* reverse(ListNode* h) {
        // Write your code here
        return nullptr;
    }
public:
    bool isPalindrome(ListNode* head) {
        // Write your code here
        return false;
    }
};

ListNode* make(vector<int> v){ListNode* d=new ListNode(0);ListNode* c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}

int main(){
    Solution sol;
    cout<<boolalpha<<sol.isPalindrome(make({1,2,2,1}))<<endl; // true
    cout<<sol.isPalindrome(make({1,2}))<<endl; // false
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

struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };

class Solution {
    ListNode* reverse(ListNode* h) {
        ListNode* p=nullptr;
        while(h){auto n=h->next;h->next=p;p=h;h=n;}
        return p;
    }
public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        ListNode* slow=head,*fast=head;
        while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
        ListNode* second=reverse(slow);
        while(second){
            if(head->val!=second->val) return false;
            head=head->next;
            second=second->next;
        }
        return true;
    }
};

ListNode* make(vector<int> v){ListNode* d=new ListNode(0);ListNode* c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}

int main(){
    Solution sol;
    cout<<boolalpha<<sol.isPalindrome(make({1,2,2,1}))<<endl; // true
    cout<<sol.isPalindrome(make({1,2}))<<endl; // false
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
    def reverse(self, h: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # Write your code here
        return False
def make_list(vals: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPalindrome(make_list([1, 2, 2, 1])))  # True
    print(sol.isPalindrome(make_list([1, 2])))        # False`,
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
    def reverse(self, h: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # Write your code here
        return False
def make_list(vals: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPalindrome(make_list([1, 2, 2, 1])))  # True
    print(sol.isPalindrome(make_list([1, 2])))        # False`
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
    def reverse(self, h: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        pass
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # Write your code here
        return False
def make_list(vals: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPalindrome(make_list([1, 2, 2, 1])))  # True
    print(sol.isPalindrome(make_list([1, 2])))        # False`
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
    def reverse(self, h: Optional[ListNode]) -> Optional[ListNode]:
        p = None
        while h:
            n = h.next
            h.next = p
            p = h
            h = n
        return p

    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        second = self.reverse(slow)
        curr = head
        while second:
            if curr.val != second.val:
                return False
            curr = curr.next
            second = second.next
        return True

def make_list(vals: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

if __name__ == '__main__':
    sol = Solution()
    print(sol.isPalindrome(make_list([1, 2, 2, 1])))  # True
    print(sol.isPalindrome(make_list([1, 2])))        # False`
      }
    }
  }
};

export default problem;
