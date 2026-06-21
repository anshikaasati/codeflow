import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "binary-tree-level-order-traversal",
  title: "Binary Tree Level Order Traversal",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","BFS","Queue"],
  url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
  examples: [
    {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "[[3],[9,20],[15,7]]"
    },
    {
      "input": "root = [1]",
      "output": "[[1]]"
    },
    {
      "input": "root = []",
      "output": "[]"
    }
  ],
  constraints: [
    "The number of nodes in the tree is in the range [0, 2000].",
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
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    auto res = sol.levelOrder(root);
    for (auto& level : res) {
        for (int v : level) cout << v << " ";
        cout << endl;
    }
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
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    auto res = sol.levelOrder(root);
    for (auto& level : res) {
        for (int v : level) cout << v << " ";
        cout << endl;
    }
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
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    auto res = sol.levelOrder(root);
    for (auto& level : res) {
        for (int v : level) cout << v << " ";
        cout << endl;
    }
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
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                auto node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left  = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left  = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    auto res = sol.levelOrder(root);
    for (auto& level : res) {
        for (int v : level) cout << v << " ";
        cout << endl;
    }
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    res = sol.levelOrder(root)
    
    for i, level in enumerate(res):
        print(f"Level {i+1}: ", end='')
        print(' '.join(map(str, level)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    res = sol.levelOrder(root)
    
    for i, level in enumerate(res):
        print(f"Level {i+1}: ", end='')
        print(' '.join(map(str, level)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    res = sol.levelOrder(root)
    
    for i, level in enumerate(res):
        print(f"Level {i+1}: ", end='')
        print(' '.join(map(str, level)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Single-pass DFS/BFS tree traversal, gathering metrics or updating values in-place with constant height memory.`,
        code: `from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []
        
        result = []
        queue = [root]
        
        while queue:
            level = []
            level_size = len(queue)
            
            for _ in range(level_size):
                node = queue.pop(0)
                level.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(level)
        
        return result

if __name__ == '__main__':
    root = TreeNode(3)
    root.left  = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left  = TreeNode(15)
    root.right.right = TreeNode(7)
    
    sol = Solution()
    res = sol.levelOrder(root)
    
    for i, level in enumerate(res):
        print(f"Level {i+1}: ", end='')
        print(' '.join(map(str, level)))`
      }
    }
  }
};

export default problem;
