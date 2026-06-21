import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "binary-tree-vertical-order-traversal",
  title: "Binary Tree Vertical Order Traversal",
  difficulty: "Medium",
  category: "Trees",
  patterns: ["Tree","BFS","Queue"],
  url: "https://leetcode.com/problems/binary-tree-vertical-order-traversal/",
  description: `Given the \`root\` of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).\\n\\nIf two nodes are in the same row and column, the order should be from **left to right**.`,
  examples: [
    {
      "input": "root = [3,9,20,null,null,15,7]",
      "output": "[[9],[3,15],[20],[7]]"
    },
    {
      "input": "root = [3,9,8,4,0,1,7]",
      "output": "[[4],[9],[3,0,1],[8],[7]]"
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
    vector<vector<int>> verticalOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    for (auto& v : sol.verticalOrder(root)) {
        for (int i : v) cout << i << " ";
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
    vector<vector<int>> verticalOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    for (auto& v : sol.verticalOrder(root)) {
        for (int i : v) cout << i << " ";
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
    vector<vector<int>> verticalOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    for (auto& v : sol.verticalOrder(root)) {
        for (int i : v) cout << i << " ";
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
    vector<vector<int>> verticalOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        map<int, vector<int>> m;
        queue<pair<TreeNode*, int>> q;
        q.push({root, 0});
        
        while (!q.empty()) {
            auto curr = q.front(); q.pop();
            TreeNode* node = curr.first;
            int col = curr.second;
            m[col].push_back(node->val);
            if (node->left) q.push({node->left, col - 1});
            if (node->right) q.push({node->right, col + 1});
        }
        
        for (auto& p : m) res.push_back(p.second);
        return res;
    }
};

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    Solution sol;
    for (auto& v : sol.verticalOrder(root)) {
        for (int i : v) cout << i << " ";
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
    def verticalOrder(self, root: TreeNode) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    for v in sol.verticalOrder(root):
        print(' '.join(map(str, v)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare subtrees or paths repeatedly by traversing the tree naive recursive style.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def verticalOrder(self, root: TreeNode) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    for v in sol.verticalOrder(root):
        print(' '.join(map(str, v)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `DFS (recursion) or BFS (queue) tree traversals using extra tracking maps or objects.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def verticalOrder(self, root: TreeNode) -> List[List[int]]:
        # Write your code here
        return []
if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    for v in sol.verticalOrder(root):
        print(' '.join(map(str, v)))`
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
    def verticalOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []
        
        res = {}
        queue = [(root, 0)]
        
        while queue:
            node, col = queue.pop(0)
            if col not in res:
                res[col] = []
            res[col].append(node.val)
            if node.left:
                queue.append((node.left, col - 1))
            if node.right:
                queue.append((node.right, col + 1))
        
        return [res[col] for col in sorted(res.keys())]

if __name__ == '__main__':
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)
    sol = Solution()
    for v in sol.verticalOrder(root):
        print(' '.join(map(str, v)))`
      }
    }
  }
};

export default problem;
