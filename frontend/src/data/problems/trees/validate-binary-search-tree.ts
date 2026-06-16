import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "validate-binary-search-tree",
  title: "Validate Binary Search Tree",
  difficulty: "Medium",
  category: "Trees",
  url: "https://leetcode.com/problems/validate-binary-search-tree/",
  description: "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
  examples: [
  {
    "input": "root = [2,1,3]",
    "output": "true"
  },
  {
    "input": "root = [5,1,4,null,null,3,6]",
    "output": "false",
    "explanation": "The root node's value is 5 but its right child's value is 4."
  }
],
  constraints: [
  "The number of nodes in the tree is in the range [1, 10^4].",
  "-2^31 <= Node.val <= 2^31 - 1"
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
    bool validate(TreeNode* node, long minVal, long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return validate(node->left, minVal, node->val)
            && validate(node->right, node->val, maxVal);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    TreeNode* t1 = new TreeNode(2);
    t1->left = new TreeNode(1); t1->right = new TreeNode(3);
    cout << sol.isValidBST(t1) << endl; // true

    TreeNode* t2 = new TreeNode(5);
    t2->left = new TreeNode(1); t2->right = new TreeNode(4);
    t2->right->left = new TreeNode(3); t2->right->right = new TreeNode(6);
    cout << sol.isValidBST(t2) << endl; // false
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
    def validate(self, node: Optional[TreeNode], min_val: int, max_val: int) -> bool:
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (self.validate(node.left, min_val, node.val) and
                self.validate(node.right, node.val, max_val))

    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        return self.validate(root, -float('inf'), float('inf'))

if __name__ == '__main__':
    sol = Solution()
    print(sol.isValidBST(TreeNode(2)))
    print(sol.isValidBST(TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))))`
    }
  }
};

export default problem;
