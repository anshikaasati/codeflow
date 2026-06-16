import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "balanced-binary-tree",
  title: "Balanced Binary Tree",
  difficulty: "Easy",
  category: "Trees",
  url: "https://leetcode.com/problems/balanced-binary-tree/",
  description: "Given a binary tree, determine if it is **height-balanced**.\n\nA height-balanced binary tree is a binary tree in which the left and right subtrees of every node differ in height by no more than 1.",
  examples: [
  {
    "input": "root = [3,9,20,null,null,15,7]",
    "output": "true"
  },
  {
    "input": "root = [1,2,2,3,3,null,null,4,4]",
    "output": "false"
  },
  {
    "input": "root = []",
    "output": "true"
  }
],
  constraints: [
  "The number of nodes in the tree is in the range [0, 5000].",
  "-10^4 <= Node.val <= 10^4"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode{int val;TreeNode*left,*right;TreeNode(int x):val(x),left(nullptr),right(nullptr){}};

class Solution {
    int height(TreeNode* n){
        if(!n) return 0;
        int l=height(n->left), r=height(n->right);
        if(l==-1||r==-1||abs(l-r)>1) return -1;
        return 1+max(l,r);
    }
public:
    bool isBalanced(TreeNode* root){return height(root)!=-1;}
};

int main(){
    TreeNode* t=new TreeNode(3);
    t->left=new TreeNode(9); t->right=new TreeNode(20);
    t->right->left=new TreeNode(15); t->right->right=new TreeNode(7);
    Solution sol; cout<<boolalpha<<sol.isBalanced(t)<<endl; // true
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def height(self, n: Optional[TreeNode]) -> int:
        if not n:
            return 0
        l = self.height(n.left)
        r = self.height(n.right)
        if l == -1 or r == -1 or abs(l - r) > 1:
            return -1
        return 1 + max(l, r)

    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        return self.height(root) != -1

if __name__ == '__main__':
    t = TreeNode(3)
    t.left = TreeNode(9)
    t.right = TreeNode(20)
    t.right.left = TreeNode(15)
    t.right.right = TreeNode(7)
    sol = Solution()
    print(sol.isBalanced(t))  # true`
    }
  }
};

export default problem;
