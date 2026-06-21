import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "sort-list",
  title: "Sort List",
  difficulty: "Medium",
  category: "Linked List",
  patterns: ["Linked List"],
  url: "https://leetcode.com/problems/sort-list/",
  description: "Given the `head` of a linked list, return the list after sorting it in **ascending order**.\n\nCan you sort the linked list in `O(n log n)` time and `O(1)` memory (i.e. constant space)?",
  examples: [
  {
    "input": "head = [4,2,1,3]",
    "output": "[1,2,3,4]"
  },
  {
    "input": "head = [-1,5,3,4,0]",
    "output": "[-1,0,3,4,5]"
  },
  {
    "input": "head = []",
    "output": "[]"
  }
],
  constraints: [
  "The number of nodes in the list is in the range [0, 5 * 10^4].",
  "-10^5 <= Node.val <= 10^5"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct ListNode{int val;ListNode*next;ListNode(int x):val(x),next(nullptr){}};

class Solution {
    ListNode* merge(ListNode* a, ListNode* b){
        ListNode d(0); ListNode* c=&d;
        while(a&&b){if(a->val<=b->val){c->next=a;a=a->next;}else{c->next=b;b=b->next;}c=c->next;}
        c->next=a?a:b; return d.next;
    }
public:
    ListNode* sortList(ListNode* head) {
        if(!head||!head->next) return head;
        ListNode* slow=head,*fast=head->next;
        while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
        ListNode* mid=slow->next; slow->next=nullptr;
        return merge(sortList(head),sortList(mid));
    }
};

ListNode* make(vector<int>v){ListNode*d=new ListNode(0);ListNode*c=d;for(int x:v){c->next=new ListNode(x);c=c->next;}return d->next;}
void print(ListNode*h){while(h){cout<<h->val;if(h->next)cout<<"->";h=h->next;}cout<<endl;}

int main(){
    Solution sol;
    print(sol.sortList(make({4,2,1,3}))); // 1->2->3->4
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
    def merge(self, a: ListNode, b: ListNode) -> ListNode:
        dummy = ListNode(0)
        c = dummy
        while a and b:
            if a.val <= b.val:
                c.next = a
                a = a.next
            else:
                c.next = b
                b = b.next
            c = c.next
        if a:
            c.next = a
        elif b:
            c.next = b
        return dummy.next

    def sortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        mid = slow.next
        slow.next = None
        return self.merge(self.sortList(head), self.sortList(mid))

def make(v: List[int]) -> ListNode:
    dummy = ListNode(0)
    c = dummy
    for x in v:
        c.next = ListNode(x)
        c = c.next
    return dummy.next

def print_list(h: ListNode) -> None:
    while h:
        print(h.val, end="->" if h.next else "\\n")
        h = h.next

if __name__ == '__main__':
    sol = Solution()
    print_list(sol.sortList(make([4, 2, 1, 3])))  # 1->2->3->4`
    }
  }
};

export default problem;
