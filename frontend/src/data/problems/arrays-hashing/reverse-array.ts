import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "reverse-array",
  title: "Reverse Array",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://www.geeksforgeeks.org/program-to-reverse-an-array/",
  description: `Given an array (or vector) of integers, reverse the elements in-place and return the reversed array.`,
  examples: [
    {
      "input": "nums = [1,2,3,4,5]",
      "output": "[5,4,3,2,1]",
      "explanation": "The elements are reversed."
    }
  ],
  constraints: [
    "1 <= nums.length <= 1000",
    "-10^5 <= nums[i] <= 10^5"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4, 5};
    vector<int> res = sol.reverseArray(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4, 5};
    vector<int> res = sol.reverseArray(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4, 5};
    vector<int> res = sol.reverseArray(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        int i = 0, j = nums.size() - 1;
        while (i < j) {
            swap(nums[i], nums[j]);
            i++;
            j--;
        }
        return nums;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4, 5};
    vector<int> res = sol.reverseArray(nums);
    for (int x : res) cout << x << " ";
    cout << endl;
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def reverseArray(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4, 5]
    res = sol.reverseArray(nums)
    print(' '.join(map(str, res)))`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def reverseArray(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4, 5]
    res = sol.reverseArray(nums)
    print(' '.join(map(str, res)))`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Sort the array first to group elements, or use a Hash Set/Map to track seen values.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List

class Solution:
    def reverseArray(self, nums: List[int]) -> List[int]:
        # Write your code here
        return []
if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4, 5]
    res = sol.reverseArray(nums)
    print(' '.join(map(str, res)))`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `from typing import List

class Solution:
    def reverseArray(self, nums: List[int]) -> List[int]:
        i, j = 0, len(nums) - 1
        while i < j:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
            j -= 1
        return nums

if __name__ == "__main__":
    sol = Solution()
    nums = [1, 2, 3, 4, 5]
    res = sol.reverseArray(nums)
    print(' '.join(map(str, res)))`
      }
    }
  }
};

export default problem;
