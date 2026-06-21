import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "binary-tree-maximum-path-sum",
  title: "Binary Tree Maximum Path Sum",
  difficulty: "Hard",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
  description: "A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.\\n\\nThe **path sum** of a path is the sum of the node's values in the path.\\n\\nGiven the `root` of a binary tree, return the maximum **path sum** of any **non-empty** path.",
  examples: [
  {
    "input": "root = [1,2,3]",
    "output": "6",
    "explanation": "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6."
  },
  {
    "input": "root = [-10,9,20,null,null,15,7]",
    "output": "42",
    "explanation": "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42."
  }
],
  constraints: [
  "The number of nodes in the tree is in the range [1, 3 * 10^4].",
  "-1000 <= Node.val <= 1000"
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
    int maxPath = INT_MIN;
    int dfs(TreeNode* root) {
        if (!root) return 0;
        int left = max(0, dfs(root->left));
        int right = max(0, dfs(root->right));
        maxPath = max(maxPath, left + right + root->val);
        return root->val + max(left, right);
    }
public:
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return maxPath;
    }
};

int main() {
    TreeNode* root = new TreeNode(-10);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    cout << sol.maxPathSum(root) << endl; // 42
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
    def __init__(self):
        self.maxPath = float('-inf')

    def dfs(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        left = max(0, self.dfs(root.left))
        right = max(0, self.dfs(root.right))
        self.maxPath = max(self.maxPath, left + right + root.val)
        return root.val + max(left, right)

    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.dfs(root)
        return self.maxPath

if __name__ == '__main__':
    root = TreeNode(-10)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    print(sol.maxPathSum(root))  # 42`
    }
  }
};

export default problem;
