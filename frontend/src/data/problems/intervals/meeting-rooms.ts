import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "meeting-rooms",
  title: "Meeting Rooms",
  difficulty: "Easy",
  category: "Intervals",
  url: "https://leetcode.com/problems/meeting-rooms/",
  description: "Given an array of meeting time `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.",
  examples: [
  {
    "input": "intervals = [[0,30],[5,10],[15,20]]",
    "output": "false"
  },
  {
    "input": "intervals = [[7,10],[2,4]]",
    "output": "true"
  }
],
  constraints: [
  "0 <= intervals.length <= 10^4",
  "intervals[i].length == 2",
  "0 <= starti < endi <= 10^6"
],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        if (intervals.empty()) return true;
        sort(intervals.begin(), intervals.end());
        for (int i = 1; i < (int)intervals.size(); i++)
            if (intervals[i][0] < intervals[i-1][1]) return false;
        return true;
    }
};

int main() {
    Solution sol;
    cout << boolalpha;
    vector<vector<int>> m1 = {{0,30},{5,10},{15,20}};
    cout << sol.canAttendMeetings(m1) << endl; // false
    vector<vector<int>> m2 = {{7,10},{2,4}};
    cout << sol.canAttendMeetings(m2) << endl; // true
    return 0;
}`
    },
    python: {
      starterCode: `from typing import List

class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        if not intervals:
            return True
        intervals.sort(key=lambda x: x[0])
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                return False
        return True

if __name__ == '__main__':
    sol = Solution()
    m1 = [[0, 30], [5, 10], [15, 20]]
    print(sol.canAttendMeetings(m1))  # False
    m2 = [[7, 10], [2, 4]]
    print(sol.canAttendMeetings(m2))  # True
`
    }
  }
};

export default problem;
