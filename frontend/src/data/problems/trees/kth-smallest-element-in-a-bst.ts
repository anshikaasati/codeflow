import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "kth-smallest-element-in-a-bst",
  title: "Kth Smallest Element in a BST",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
  description: "Given the `root` of a binary search tree, and an integer `k`, return the `kth` smallest value (**1-indexed**) of all the values of the nodes in the tree.",
  examples: [
  {
    "input": "root = [3,1,4,null,2], k = 1",
    "output": "1"
  },
  {
    "input": "root = [5,3,6,2,4,null,null,1], k = 3",
    "output": "3"
  }
],
  constraints: [
  "The number of nodes in the tree is n.",
  "1 <= k <= n <= 10^4",
  "0 <= Node.val <= 10^4"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
    int count = 0, result = 0;
    void inorder(TreeNode* node, int k) {
        if (!node) return;
        inorder(node->left, k);
        if (++count == k) { result = node->val; return; }
        inorder(node->right, k);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        count = 0;
        inorder(root, k);
        return result;
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(1); root->right = new TreeNode(4);
    root->left->right = new TreeNode(2);
    Solution sol;
    cout << sol.kthSmallest(root, 1) << endl; // 1
    return 0;
}`
    },
    python: {
      starterCode: `from typing import Optional

class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        self.count = 0
        self.result = None
        self.inorder(root, k)
        return self.result

    def inorder(self, node: Optional[TreeNode], k: int) -> None:
        if not node:
            return
        self.inorder(node.left, k)
        self.count += 1
        if self.count == k:
            self.result = node.val
            return
        self.inorder(node.right, k)

if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(1)
    root.right = TreeNode(4)
    root.left.right = TreeNode(2)
    sol = Solution()
    print(sol.kthSmallest(root, 1))  # 1`
    }
  }
};

export default problem;
