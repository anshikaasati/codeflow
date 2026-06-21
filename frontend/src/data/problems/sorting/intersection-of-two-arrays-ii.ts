import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "intersection-of-two-arrays-ii",
  title: "Intersection of Two Arrays II",
  difficulty: "Easy",
  category: "Sorting",
  patterns: ["Sorting"],
  url: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
  description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.`,
  examples: [
    {
      "input": "nums1 = [1,2,2,1], nums2 = [2,2]",
      "output": "[2,2]",
      "explanation": "2 appears twice in both arrays."
    }
  ],
  constraints: [
    "1 <= nums1.length, nums2.length <= 1000",
    "0 <= nums1[i], nums2[i] <= 1000"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1, 2, 2, 1};
    vector<int> nums2 = {2, 2};
    vector<int> res = sol.intersect(nums1, nums2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1, 2, 2, 1};
    vector<int> nums2 = {2, 2};
    vector<int> res = sol.intersect(nums1, nums2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1, 2, 2, 1};
    vector<int> nums2 = {2, 2};
    vector<int> res = sol.intersect(nums1, nums2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> counts;
        for (int x : nums1) {
            counts[x]++;
        }
        vector<int> res;
        for (int x : nums2) {
            if (counts[x] > 0) {
                res.push_back(x);
                counts[x]--;
            }
        }
        return res;
    }
};

int main() {
    Solution sol;
    vector<int> nums1 = {1, 2, 2, 1};
    vector<int> nums2 = {2, 2};
    vector<int> res = sol.intersect(nums1, nums2);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums1 = [1, 2, 2, 1]
    nums2 = [2, 2]
    res = sol.intersect(nums1, nums2)
    print(" ".join(map(str, res)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Bubble sort or selection sort comparing all pairs repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
from typing import List

class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums1 = [1, 2, 2, 1]
    nums2 = [2, 2]
    res = sol.intersect(nums1, nums2)
    print(" ".join(map(str, res)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Divide-and-conquer sorting (Merge Sort or Quick Sort) in O(N log N) time.`,
        code: `// Better Solution
// TODO: Implement optimized approach
from typing import List

class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == '__main__':
    sol = Solution()
    nums1 = [1, 2, 2, 1]
    nums2 = [2, 2]
    res = sol.intersect(nums1, nums2)
    print(" ".join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Linear time sorting (like bucket sort or counting sort) taking advantage of constraints.`,
        code: `from typing import List

class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        counts = {}
        for x in nums1:
            counts[x] = counts.get(x, 0) + 1
        res = []
        for x in nums2:
            if x in counts and counts[x] > 0:
                res.append(x)
                counts[x] -= 1
        return res

if __name__ == '__main__':
    sol = Solution()
    nums1 = [1, 2, 2, 1]
    nums2 = [2, 2]
    res = sol.intersect(nums1, nums2)
    print(" ".join(map(str, res)))`
      }
    }
  }
};

export default problem;
