import type { ProblemDefinition } from '../types';

const problem: ProblemDefinition = {
  id: "design-twitter",
  title: "Design Twitter",
  difficulty: "Medium",
  category: "Heap / Priority Queue",
  patterns: ["Heap"],
  url: "https://leetcode.com/problems/design-twitter/",
  description: `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the \`10\` most recent tweets in the user's news feed.

Implement the Twitter class:
- \`Twitter()\` Initializes your twitter object.
- \`void postTweet(int userId, int tweetId)\` Composes a new tweet with ID \`tweetId\` by the user \`userId\`. Each call to this function will be made with a unique \`tweetId\`.
- \`List<Integer> getNewsFeed(int userId)\` Retrieves the \`10\` most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be **ordered from most recent to least recent**.
- \`void follow(int followerId, int followeeId)\` The user with ID \`followerId\` started following the user with ID \`followeeId\`.
- \`void unfollow(int followerId, int followeeId)\` The user with ID \`followerId\` stopped following the user with ID \`followeeId\`.`,
  examples: [
    {
      "input": "[\"Twitter\", \"postTweet\", \"getNewsFeed\", \"follow\", \"postTweet\", \"getNewsFeed\", \"unfollow\", \"getNewsFeed\"]\n[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]",
      "output": "[null, null, [5], null, null, [6, 5], null, [5]]"
    }
  ],
  constraints: [
    "1 <= userId, followerId, followeeId <= 500",
    "0 <= tweetId <= 10^4",
    "All the tweets have unique IDs.",
    "At most 3 * 10^4 calls will be made to postTweet, getNewsFeed, follow, and unfollow."
  ],
  languages: {
    cpp: {
      starterCode: `#include <bits/stdc++.h>
using namespace std;

class Twitter {
public:
    Twitter() {
        
    }
    
    void postTweet(int userId, int tweetId) {
        
    }
    
    vector<int> getNewsFeed(int userId) {
        return {};
    }
    
    void follow(int followerId, int followeeId) {
        
    }
    
    void unfollow(int followerId, int followeeId) {
        
    }
};

int main(){
    Twitter t; t.postTweet(1,5); t.postTweet(1,3);
    for(int v:t.getNewsFeed(1)) cout<<v<<" "; cout<<endl; // 3 5
    return 0;
}`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `// Brute Force Approach
// TODO: Implement brute force
#include <bits/stdc++.h>
using namespace std;

class Twitter {
    int time=0;
    unordered_map<int,vector<pair<int,int>>> tweets; // userId -> [(time, tweetId)]
    unordered_map<int,unordered_set<int>> following;
public:
    void postTweet(int userId,int tweetId){ tweets[userId].push_back({time++,tweetId}); }
    vector<int> getNewsFeed(int userId){
        priority_queue<tuple<int,int,int,int>> pq; // (time, tweetId, userId, idx)
        auto addUser=[&](int uid){
            auto&tw=tweets[uid];
            if(!tw.empty()) pq.push({tw.back().first,tw.back().second,uid,(int)tw.size()-1});
        };
        addUser(userId);
        for(int fid:following[userId]) addUser(fid);
        vector<int> res;
        while(!pq.empty()&&(int)res.size()<10){
            auto[t,tid,uid,idx]=pq.top();pq.pop();
            res.push_back(tid);
            if(idx>0) pq.push({tweets[uid][idx-1].first,tweets[uid][idx-1].second,uid,idx-1});
        }
        return res;
    }
    void follow(int f,int e){ if(f!=e) following[f].insert(e); }
    void unfollow(int f,int e){ following[f].erase(e); }
};

int main(){
    Twitter t; t.postTweet(1,5); t.postTweet(1,3);
    for(int v:t.getNewsFeed(1)) cout<<v<<" "; cout<<endl; // 3 5
    return 0;
}`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `// Better Solution
// TODO: Implement optimized approach
#include <bits/stdc++.h>
using namespace std;

class Twitter {
    int time=0;
    unordered_map<int,vector<pair<int,int>>> tweets; // userId -> [(time, tweetId)]
    unordered_map<int,unordered_set<int>> following;
public:
    void postTweet(int userId,int tweetId){ tweets[userId].push_back({time++,tweetId}); }
    vector<int> getNewsFeed(int userId){
        priority_queue<tuple<int,int,int,int>> pq; // (time, tweetId, userId, idx)
        auto addUser=[&](int uid){
            auto&tw=tweets[uid];
            if(!tw.empty()) pq.push({tw.back().first,tw.back().second,uid,(int)tw.size()-1});
        };
        addUser(userId);
        for(int fid:following[userId]) addUser(fid);
        vector<int> res;
        while(!pq.empty()&&(int)res.size()<10){
            auto[t,tid,uid,idx]=pq.top();pq.pop();
            res.push_back(tid);
            if(idx>0) pq.push({tweets[uid][idx-1].first,tweets[uid][idx-1].second,uid,idx-1});
        }
        return res;
    }
    void follow(int f,int e){ if(f!=e) following[f].insert(e); }
    void unfollow(int f,int e){ following[f].erase(e); }
};

int main(){
    Twitter t; t.postTweet(1,5); t.postTweet(1,3);
    for(int v:t.getNewsFeed(1)) cout<<v<<" "; cout<<endl; // 3 5
    return 0;
}`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `#include <bits/stdc++.h>
using namespace std;

class Twitter {
    int time=0;
    unordered_map<int,vector<pair<int,int>>> tweets; // userId -> [(time, tweetId)]
    unordered_map<int,unordered_set<int>> following;
public:
    void postTweet(int userId,int tweetId){ tweets[userId].push_back({time++,tweetId}); }
    vector<int> getNewsFeed(int userId){
        priority_queue<tuple<int,int,int,int>> pq; // (time, tweetId, userId, idx)
        auto addUser=[&](int uid){
            auto&tw=tweets[uid];
            if(!tw.empty()) pq.push({tw.back().first,tw.back().second,uid,(int)tw.size()-1});
        };
        addUser(userId);
        for(int fid:following[userId]) addUser(fid);
        vector<int> res;
        while(!pq.empty()&&(int)res.size()<10){
            auto[t,tid,uid,idx]=pq.top();pq.pop();
            res.push_back(tid);
            if(idx>0) pq.push({tweets[uid][idx-1].first,tweets[uid][idx-1].second,uid,idx-1});
        }
        return res;
    }
    void follow(int f,int e){ if(f!=e) following[f].insert(e); }
    void unfollow(int f,int e){ following[f].erase(e); }
};

int main(){
    Twitter t; t.postTweet(1,5); t.postTweet(1,3);
    for(int v:t.getNewsFeed(1)) cout<<v<<" "; cout<<endl; // 3 5
    return 0;
}`
      }
    },
    python: {
      starterCode: `from typing import List, Dict, Set, Tuple

class Twitter:
    def __init__(self):
        pass

    def postTweet(self, userId: int, tweetId: int) -> None:
        pass

    def getNewsFeed(self, userId: int) -> List[int]:
        return []

    def follow(self, followerId: int, followeeId: int) -> None:
        pass

    def unfollow(self, followerId: int, followeeId: int) -> None:
        pass

if __name__ == '__main__':
    t = Twitter()
    t.postTweet(1, 5)
    t.postTweet(1, 3)
    for v in t.getNewsFeed(1):
        print(v, end=" ")
    print()  # 3 5`,
      bruteSolution: {
        title: "Brute Force",
        timeComplexity: "O(N^2)",
        spaceComplexity: "O(1)",
        approach: `Sort the array or search for max/min elements repeatedly.`,
        code: `# Brute Force Approach
# TODO: Implement brute force
from typing import List, Dict, Set, Tuple
from heapq import heappop, heappush

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets: Dict[int, List[Tuple[int, int]]] = {}  # userId -> [(time, tweetId)]
        self.following: Dict[int, Set[int]] = {}

    def postTweet(self, userId: int, tweetId: int) -> None:
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        pq = []
        def add_user(uid: int) -> None:
            if uid in self.tweets and self.tweets[uid]:
                heappush(pq, (-self.tweets[uid][-1][0], self.tweets[uid][-1][1], uid, len(self.tweets[uid]) - 1))
        add_user(userId)
        if userId in self.following:
            for fid in self.following[userId]:
                add_user(fid)
        res = []
        while pq and len(res) < 10:
            t, tid, uid, idx = heappop(pq)
            res.append(tid)
            if idx > 0:
                heappush(pq, (-self.tweets[uid][idx-1][0], self.tweets[uid][idx-1][1], uid, idx-1))
        return res

    def follow(self, f: int, e: int) -> None:
        if f != e:
            if f not in self.following:
                self.following[f] = set()
            self.following[f].add(e)

    def unfollow(self, f: int, e: int) -> None:
        if f in self.following:
            self.following[f].discard(e)

if __name__ == '__main__':
    t = Twitter()
    t.postTweet(1, 5)
    t.postTweet(1, 3)
    for v in t.getNewsFeed(1):
        print(v, end=" ")
    print()  # 3 5`
      },
      betterSolution: {
        title: "Better Solution",
        timeComplexity: "O(N log N)",
        spaceComplexity: "O(N)",
        approach: `Insert all elements into a max-heap or min-heap and extract.`,
        code: `# Better Solution
# TODO: Implement optimized approach
from typing import List, Dict, Set, Tuple
from heapq import heappop, heappush

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets: Dict[int, List[Tuple[int, int]]] = {}  # userId -> [(time, tweetId)]
        self.following: Dict[int, Set[int]] = {}

    def postTweet(self, userId: int, tweetId: int) -> None:
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        pq = []
        def add_user(uid: int) -> None:
            if uid in self.tweets and self.tweets[uid]:
                heappush(pq, (-self.tweets[uid][-1][0], self.tweets[uid][-1][1], uid, len(self.tweets[uid]) - 1))
        add_user(userId)
        if userId in self.following:
            for fid in self.following[userId]:
                add_user(fid)
        res = []
        while pq and len(res) < 10:
            t, tid, uid, idx = heappop(pq)
            res.append(tid)
            if idx > 0:
                heappush(pq, (-self.tweets[uid][idx-1][0], self.tweets[uid][idx-1][1], uid, idx-1))
        return res

    def follow(self, f: int, e: int) -> None:
        if f != e:
            if f not in self.following:
                self.following[f] = set()
            self.following[f].add(e)

    def unfollow(self, f: int, e: int) -> None:
        if f in self.following:
            self.following[f].discard(e)

if __name__ == '__main__':
    t = Twitter()
    t.postTweet(1, 5)
    t.postTweet(1, 3)
    for v in t.getNewsFeed(1):
        print(v, end=" ")
    print()  # 3 5`
      },
      optimalSolution: {
        title: "Optimal Solution",
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)",
        approach: `Maintain a min/max heap of size K, or use quickselect to get elements in-place with minimal overhead.`,
        code: `from typing import List, Dict, Set, Tuple
from heapq import heappop, heappush

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets: Dict[int, List[Tuple[int, int]]] = {}  # userId -> [(time, tweetId)]
        self.following: Dict[int, Set[int]] = {}

    def postTweet(self, userId: int, tweetId: int) -> None:
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        pq = []
        def add_user(uid: int) -> None:
            if uid in self.tweets and self.tweets[uid]:
                heappush(pq, (-self.tweets[uid][-1][0], self.tweets[uid][-1][1], uid, len(self.tweets[uid]) - 1))
        add_user(userId)
        if userId in self.following:
            for fid in self.following[userId]:
                add_user(fid)
        res = []
        while pq and len(res) < 10:
            t, tid, uid, idx = heappop(pq)
            res.append(tid)
            if idx > 0:
                heappush(pq, (-self.tweets[uid][idx-1][0], self.tweets[uid][idx-1][1], uid, idx-1))
        return res

    def follow(self, f: int, e: int) -> None:
        if f != e:
            if f not in self.following:
                self.following[f] = set()
            self.following[f].add(e)

    def unfollow(self, f: int, e: int) -> None:
        if f in self.following:
            self.following[f].discard(e)

if __name__ == '__main__':
    t = Twitter()
    t.postTweet(1, 5)
    t.postTweet(1, 3)
    for v in t.getNewsFeed(1):
        print(v, end=" ")
    print()  # 3 5`
      }
    }
  }
};

export default problem;
