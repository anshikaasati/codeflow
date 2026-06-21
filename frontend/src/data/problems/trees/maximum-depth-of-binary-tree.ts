import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "maximum-depth-of-binary-tree",
  title: "Maximum Depth of Binary Tree",
  difficulty: "Easy",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
  examples: [
    {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "3"
    },
    {
      "input": "root = [1,null,2]",
      "output": "2"
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 10^4].",
    "-100 <= Node.val <= 100"
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
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        return 0;
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    cout << sol.maxDepth(root) << endl; // 3
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        return 0;
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    cout << sol.maxDepth(root) << endl; // 3
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        return 0;
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    cout << sol.maxDepth(root) << endl; // 3
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    cout << sol.maxDepth(root) << endl; // 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    print(sol.maxDepth(root))  # 3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    print(sol.maxDepth(root))  # 3`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    print(sol.maxDepth(root))  # 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))

if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    print(sol.maxDepth(root))  # 3`
      }
    }
  }
};

export default problem;
