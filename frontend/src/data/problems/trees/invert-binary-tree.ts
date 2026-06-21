import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "invert-binary-tree",
  title: "Invert Binary Tree",
  difficulty: "Easy",
  category: "Trees",
  patterns: ["Tree","DFS","Recursion"],
  url: "https://leetcode.com/problems/invert-binary-tree/",
  description: `Given the \`root\` of a binary tree, invert the tree, and return its root.`,
  examples: [
    {
      "input": "root = [4,2,7,1,3,6,9]",
      "output": "[4,7,2,9,6,3,1]"
    },
    {
      "input": "root = [2,1,3]",
      "output": "[2,3,1]"
    },
    {
      "input": "root = []",
      "output": "[]"
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 100].",
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
    TreeNode* invertTree(TreeNode* root) {
        // Write your code here
        return nullptr;
    }
};

void printLevel(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        auto node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    cout << endl;
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left  = new TreeNode(2); root->right = new TreeNode(7);
    root->left->left  = new TreeNode(1); root->left->right  = new TreeNode(3);
    root->right->left = new TreeNode(6); root->right->right = new TreeNode(9);
    Solution sol;
    printLevel(sol.invertTree(root)); // 4 7 2 9 6 3 1
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
    TreeNode* invertTree(TreeNode* root) {
        // Write your code here
        return nullptr;
    }
};

void printLevel(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        auto node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    cout << endl;
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left  = new TreeNode(2); root->right = new TreeNode(7);
    root->left->left  = new TreeNode(1); root->left->right  = new TreeNode(3);
    root->right->left = new TreeNode(6); root->right->right = new TreeNode(9);
    Solution sol;
    printLevel(sol.invertTree(root)); // 4 7 2 9 6 3 1
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
    TreeNode* invertTree(TreeNode* root) {
        // Write your code here
        return nullptr;
    }
};

void printLevel(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        auto node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    cout << endl;
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left  = new TreeNode(2); root->right = new TreeNode(7);
    root->left->left  = new TreeNode(1); root->left->right  = new TreeNode(3);
    root->right->left = new TreeNode(6); root->right->right = new TreeNode(9);
    Solution sol;
    printLevel(sol.invertTree(root)); // 4 7 2 9 6 3 1
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
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};

void printLevel(TreeNode* root) {
    if (!root) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        auto node = q.front(); q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    cout << endl;
}

int main() {
    TreeNode* root = new TreeNode(4);
    root->left  = new TreeNode(2); root->right = new TreeNode(7);
    root->left->left  = new TreeNode(1); root->left->right  = new TreeNode(3);
    root->right->left = new TreeNode(6); root->right->right = new TreeNode(9);
    Solution sol;
    printLevel(sol.invertTree(root)); // 4 7 2 9 6 3 1
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
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Write your code here
        pass
def print_level(root: Optional[TreeNode]) -> None:
    if not root:
        return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.val, end=" ")
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    print()

if __name__ == '__main__':
    root = TreeNode(4)
    root.left  = TreeNode(2)
    root.right = TreeNode(7)
    root.left.left  = TreeNode(1)
    root.left.right  = TreeNode(3)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(9)
    sol = Solution()
    print("Before Inversion:")
    print_level(root)
    print("After Inversion:")
    print_level(sol.invertTree(root))`,
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
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Write your code here
        pass
def print_level(root: Optional[TreeNode]) -> None:
    if not root:
        return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.val, end=" ")
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    print()

if __name__ == '__main__':
    root = TreeNode(4)
    root.left  = TreeNode(2)
    root.right = TreeNode(7)
    root.left.left  = TreeNode(1)
    root.left.right  = TreeNode(3)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(9)
    sol = Solution()
    print("Before Inversion:")
    print_level(root)
    print("After Inversion:")
    print_level(sol.invertTree(root))`
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
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Write your code here
        pass
def print_level(root: Optional[TreeNode]) -> None:
    if not root:
        return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.val, end=" ")
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    print()

if __name__ == '__main__':
    root = TreeNode(4)
    root.left  = TreeNode(2)
    root.right = TreeNode(7)
    root.left.left  = TreeNode(1)
    root.left.right  = TreeNode(3)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(9)
    sol = Solution()
    print("Before Inversion:")
    print_level(root)
    print("After Inversion:")
    print_level(sol.invertTree(root))`
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
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root

def print_level(root: Optional[TreeNode]) -> None:
    if not root:
        return
    queue = [root]
    while queue:
        node = queue.pop(0)
        print(node.val, end=" ")
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    print()

if __name__ == '__main__':
    root = TreeNode(4)
    root.left  = TreeNode(2)
    root.right = TreeNode(7)
    root.left.left  = TreeNode(1)
    root.left.right  = TreeNode(3)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(9)
    sol = Solution()
    print("Before Inversion:")
    print_level(root)
    print("After Inversion:")
    print_level(sol.invertTree(root))`
      }
    }
  }
};

export default problem;
