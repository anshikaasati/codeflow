import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "task-scheduler",
  title: "Task Scheduler",
  difficulty: "Medium",
  category: "Heap / Priority Queue",
  patterns: ["Heap","Greedy"],
  url: "https://leetcode.com/problems/task-scheduler/",
  description: "Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\\n\\nHowever, there is a non-negative integer `n` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.\\n\\nReturn the least number of units of time that the CPU will take to finish all the given tasks.",
  examples: [
  {
    "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
    "output": "8"
  },
  {
    "input": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0",
    "output": "6"
  },
  {
    "input": "tasks = [\"A\",\"A\",\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\"], n = 2",
    "output": "16"
  }
],
  constraints: [
  "1 <= tasks.length <= 10^4",
  "tasks[i] is upper-case English letter.",
  "0 <= n <= 100"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    Solution sol;
    vector<char> tasks = {'A','A','A','B','B','B'};
    cout << sol.leastInterval(tasks, 2) << endl; // 8
    return 0;
}`,
      solutionCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        int freq[26] = {};
        for (char c : tasks) freq[c - 'A']++;
        int maxFreq = *max_element(begin(freq), end(freq));
        int maxCount = count(begin(freq), end(freq), maxFreq);
        return max((int)tasks.size(), (maxFreq - 1) * (n + 1) + maxCount);
    }
};

int main() {
    Solution sol;
    vector<char> tasks = {'A','A','A','B','B','B'};
    cout << sol.leastInterval(tasks, 2) << endl; // 8
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List
from collections import Counter

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        # Write your code here
        return 0
if __name__ == '__main__':
    sol = Solution()
    tasks = ['A', 'A', 'A', 'B', 'B', 'B']
    print(sol.leastInterval(tasks, 2))  # 8`,
      solutionCode: `from typing import List
from collections import Counter

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        freq = Counter(tasks)
        max_freq = max(freq.values())
        max_count = list(freq.values()).count(max_freq)
        return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)

if __name__ == '__main__':
    sol = Solution()
    tasks = ['A', 'A', 'A', 'B', 'B', 'B']
    print(sol.leastInterval(tasks, 2))  # 8`
    }
  }
};

export default problem;
