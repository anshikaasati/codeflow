import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "majority-element",
  title: "Majority Element",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  patterns: ["Array"],
  url: "https://leetcode.com/problems/majority-element/",
  description: `Given an array \`nums\` of size \`n\`, return the majority element. The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.`,
  examples: [
    {
      "input": "nums = [3,2,3]",
      "output": "3"
    },
    {
      "input": "nums = [2,2,1,1,1,2,2]",
      "output": "2"
    }
  ],
  constraints: [
    "n == nums.length",
    "1 <= n <= 5 * 10^4",
    "-10^9 <= nums[i] <= 10^9"
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a = {3,2,3};
    cout << sol.majorityElement(a) << endl; // 3
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
    int majorityElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a = {3,2,3};
    cout << sol.majorityElement(a) << endl; // 3
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
    int majorityElement(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};
int main() {
    Solution sol;
    vector<int> a = {3,2,3};
    cout << sol.majorityElement(a) << endl; // 3
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
    int majorityElement(vector<int>& nums) {
        int candidate = nums[0], count = 1;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (count == 0) { candidate = nums[i]; count = 1; }
            else if (nums[i] == candidate) count++;
            else count--;
        }
        return candidate;
    }
};
int main() {
    Solution sol;
    vector<int> a = {3,2,3};
    cout << sol.majorityElement(a) << endl; // 3
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [3, 2, 3]
    print(sol.majorityElement(a))  # 3`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Compare all elements or subsegments using nested loops to verify the condition.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [3, 2, 3]
    print(sol.majorityElement(a))  # 3`
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
    def majorityElement(self, nums: List[int]) -> int:
        # Write your code here
        return 0
if __name__ == "__main__":
    sol = Solution()
    a = [3, 2, 3]
    print(sol.majorityElement(a))  # 3`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Use a single pass linear scan with optimized hashing, frequency tables, or in-place marking.`,
        code: `from typing import List

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate = nums[0]
        count = 1
        for i in range(1, len(nums)):
            if count == 0:
                candidate = nums[i]
                count = 1
            elif nums[i] == candidate:
                count += 1
            else:
                count -= 1
        return candidate

if __name__ == "__main__":
    sol = Solution()
    a = [3, 2, 3]
    print(sol.majorityElement(a))  # 3`
      }
    }
  }
};

export default problem;
