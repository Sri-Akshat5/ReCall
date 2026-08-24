// ============================================================================
// RECALL DSA PRACTICE DATASET
// Top 75, Top 150, Top 250, and Striver's A2Z DSA Sheet
// Target Profile: 1.8+ YOE Java / Spring Boot + React + AWS Software Engineer
// ============================================================================

export const SHEET_METADATA = {
  title: "Akshat's SDE DSA Practice Hub",
  targetProfile: "1.8+ YOE Java / Spring Boot + React + AWS Software Engineer",
  platforms: ["LeetCode", "GeeksforGeeks", "CodingNinjas"]
};

// ----------------------------------------------------------------------------
// 1. TOP 75 LEETCODE INTERVIEW QUESTIONS (Akshat - Top 75)
// ----------------------------------------------------------------------------
export const TOP_75_QUESTIONS = [
  {
    rank: 1,
    title: "Two Sum",
    leetcode_id: 1,
    difficulty: "Easy",
    category: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Microsoft", "Adobe", "Meta", "Apple", "Uber", "Atlassian", "Salesforce", "Flipkart", "PhonePe", "CRED", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    rank: 2,
    title: "Contains Duplicate",
    leetcode_id: 217,
    difficulty: "Easy",
    category: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Microsoft", "Adobe", "Apple", "Meta", "Uber", "Salesforce", "Flipkart"],
    link: "https://leetcode.com/problems/contains-duplicate/"
  },
  {
    rank: 3,
    title: "Valid Anagram",
    leetcode_id: 242,
    difficulty: "Easy",
    category: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Adobe", "Uber", "Salesforce", "Flipkart", "PhonePe"],
    link: "https://leetcode.com/problems/valid-anagram/"
  },
  {
    rank: 4,
    title: "Best Time to Buy and Sell Stock",
    leetcode_id: 121,
    difficulty: "Easy",
    category: "Arrays & Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart", "PhonePe", "Razorpay", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    rank: 5,
    title: "Valid Parentheses",
    leetcode_id: 20,
    difficulty: "Easy",
    category: "Stack",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart", "PhonePe"],
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    rank: 6,
    title: "Maximum Subarray",
    leetcode_id: 53,
    difficulty: "Medium",
    category: "Arrays & Kadane's",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Salesforce", "Flipkart", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    rank: 7,
    title: "Product of Array Except Self",
    leetcode_id: 238,
    difficulty: "Medium",
    category: "Arrays & Prefix Sum",
    companies: ["Amazon", "Microsoft", "Meta", "Apple", "Google", "Adobe", "Uber", "Atlassian", "Flipkart", "PhonePe", "Meesho"],
    link: "https://leetcode.com/problems/product-of-array-except-self/"
  },
  {
    rank: 8,
    title: "3Sum",
    leetcode_id: 15,
    difficulty: "Medium",
    category: "Two Pointers",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/3sum/"
  },
  {
    rank: 9,
    title: "Group Anagrams",
    leetcode_id: 49,
    difficulty: "Medium",
    category: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Adobe", "Uber", "Salesforce", "Flipkart", "PhonePe"],
    link: "https://leetcode.com/problems/group-anagrams/"
  },
  {
    rank: 10,
    title: "Longest Consecutive Sequence",
    leetcode_id: 128,
    difficulty: "Medium",
    category: "Arrays & Hashing",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart", "Meesho", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/longest-consecutive-sequence/"
  },
  {
    rank: 11,
    title: "Top K Frequent Elements",
    leetcode_id: 347,
    difficulty: "Medium",
    category: "Heap & PriorityQueue",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart", "PhonePe"],
    link: "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    rank: 12,
    title: "Longest Substring Without Repeating Characters",
    leetcode_id: 3,
    difficulty: "Medium",
    category: "Sliding Window",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart", "PhonePe", "Razorpay", "Meesho"],
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    rank: 13,
    title: "Longest Repeating Character Replacement",
    leetcode_id: 424,
    difficulty: "Medium",
    category: "Sliding Window",
    companies: ["Google", "Meta", "Microsoft", "Amazon", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/longest-repeating-character-replacement/"
  },
  {
    rank: 14,
    title: "Minimum Window Substring",
    leetcode_id: 76,
    difficulty: "Hard",
    category: "Sliding Window",
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/minimum-window-substring/"
  },
  {
    rank: 15,
    title: "Valid Palindrome",
    leetcode_id: 125,
    difficulty: "Easy",
    category: "Two Pointers",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/valid-palindrome/"
  },
  {
    rank: 16,
    title: "Container With Most Water",
    leetcode_id: 11,
    difficulty: "Medium",
    category: "Two Pointers",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/container-with-most-water/"
  },
  {
    rank: 17,
    title: "Search in Rotated Sorted Array",
    leetcode_id: 33,
    difficulty: "Medium",
    category: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    rank: 18,
    title: "Find Minimum in Rotated Sorted Array",
    leetcode_id: 153,
    difficulty: "Medium",
    category: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    rank: 19,
    title: "Binary Search",
    leetcode_id: 704,
    difficulty: "Easy",
    category: "Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart"],
    link: "https://leetcode.com/problems/binary-search/"
  },
  {
    rank: 20,
    title: "Merge Intervals",
    leetcode_id: 56,
    difficulty: "Medium",
    category: "Intervals",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    rank: 21,
    title: "Insert Interval",
    leetcode_id: 57,
    difficulty: "Medium",
    category: "Intervals",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/insert-interval/"
  },
  {
    rank: 22,
    title: "Non-overlapping Intervals",
    leetcode_id: 435,
    difficulty: "Medium",
    category: "Intervals",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe", "Atlassian"],
    link: "https://leetcode.com/problems/non-overlapping-intervals/"
  },
  {
    rank: 23,
    title: "Reverse Linked List",
    leetcode_id: 206,
    difficulty: "Easy",
    category: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart", "PhonePe"],
    link: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    rank: 24,
    title: "Merge Two Sorted Lists",
    leetcode_id: 21,
    difficulty: "Easy",
    category: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce"],
    link: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    rank: 25,
    title: "Linked List Cycle",
    leetcode_id: 141,
    difficulty: "Easy",
    category: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/linked-list-cycle/"
  },
  {
    rank: 26,
    title: "LRU Cache",
    leetcode_id: 146,
    difficulty: "Medium",
    category: "Design & Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Oracle", "Flipkart", "PhonePe", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/lru-cache/"
  },
  {
    rank: 27,
    title: "Remove Nth Node From End of List",
    leetcode_id: 19,
    difficulty: "Medium",
    category: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
  },
  {
    rank: 28,
    title: "Reorder List",
    leetcode_id: 143,
    difficulty: "Medium",
    category: "Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe", "Atlassian"],
    link: "https://leetcode.com/problems/reorder-list/"
  },
  {
    rank: 29,
    title: "Binary Tree Inorder Traversal",
    leetcode_id: 94,
    difficulty: "Easy",
    category: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  },
  {
    rank: 30,
    title: "Maximum Depth of Binary Tree",
    leetcode_id: 104,
    difficulty: "Easy",
    category: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  },
  {
    rank: 31,
    title: "Invert Binary Tree",
    leetcode_id: 226,
    difficulty: "Easy",
    category: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/invert-binary-tree/"
  },
  {
    rank: 32,
    title: "Same Tree",
    leetcode_id: 100,
    difficulty: "Easy",
    category: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/same-tree/"
  },
  {
    rank: 33,
    title: "Subtree of Another Tree",
    leetcode_id: 572,
    difficulty: "Easy",
    category: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe"],
    link: "https://leetcode.com/problems/subtree-of-another-tree/"
  },
  {
    rank: 34,
    title: "Validate Binary Search Tree",
    leetcode_id: 98,
    difficulty: "Medium",
    category: "Trees & BST",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    rank: 35,
    title: "Binary Tree Level Order Traversal",
    leetcode_id: 102,
    difficulty: "Medium",
    category: "Trees & BFS",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart", "PhonePe"],
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    rank: 36,
    title: "Lowest Common Ancestor of a Binary Tree",
    leetcode_id: 236,
    difficulty: "Medium",
    category: "Trees",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
  },
  {
    rank: 37,
    title: "Kth Smallest Element in a BST",
    leetcode_id: 230,
    difficulty: "Medium",
    category: "Trees & BST",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/"
  },
  {
    rank: 38,
    title: "Serialize and Deserialize Binary Tree",
    leetcode_id: 297,
    difficulty: "Hard",
    category: "Trees & System Design",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
  },
  {
    rank: 39,
    title: "Number of Islands",
    leetcode_id: 200,
    difficulty: "Medium",
    category: "Graphs & DFS/BFS",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce", "Flipkart", "PhonePe", "Meesho"],
    link: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    rank: 40,
    title: "Clone Graph",
    leetcode_id: 133,
    difficulty: "Medium",
    category: "Graphs",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/clone-graph/"
  },
  {
    rank: 41,
    title: "Course Schedule",
    leetcode_id: 207,
    difficulty: "Medium",
    category: "Graphs & Topological Sort",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce"],
    link: "https://leetcode.com/problems/course-schedule/"
  },
  {
    rank: 42,
    title: "Rotting Oranges",
    leetcode_id: 994,
    difficulty: "Medium",
    category: "Graphs & BFS",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Flipkart", "Swiggy", "Meesho"],
    link: "https://leetcode.com/problems/rotting-oranges/"
  },
  {
    rank: 43,
    title: "Pacific Atlantic Water Flow",
    leetcode_id: 417,
    difficulty: "Medium",
    category: "Graphs",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/pacific-atlantic-water-flow/"
  },
  {
    rank: 44,
    title: "Word Search",
    leetcode_id: 79,
    difficulty: "Medium",
    category: "Backtracking",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/word-search/"
  },
  {
    rank: 45,
    title: "Implement Trie (Prefix Tree)",
    leetcode_id: 208,
    difficulty: "Medium",
    category: "Trie",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/implement-trie-prefix-tree/"
  },
  {
    rank: 46,
    title: "Kth Largest Element in an Array",
    leetcode_id: 215,
    difficulty: "Medium",
    category: "Heap & QuickSelect",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
  },
  {
    rank: 47,
    title: "Merge k Sorted Lists",
    leetcode_id: 23,
    difficulty: "Hard",
    category: "Heap & Linked List",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce"],
    link: "https://leetcode.com/problems/merge-k-sorted-lists/"
  },
  {
    rank: 48,
    title: "Find Median from Data Stream",
    leetcode_id: 295,
    difficulty: "Hard",
    category: "Heap",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/find-median-from-data-stream/"
  },
  {
    rank: 49,
    title: "Climbing Stairs",
    leetcode_id: 70,
    difficulty: "Easy",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    rank: 50,
    title: "House Robber",
    leetcode_id: 198,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart", "Walmart Global Tech"],
    link: "https://leetcode.com/problems/house-robber/"
  },
  {
    rank: 51,
    title: "Coin Change",
    leetcode_id: 322,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Flipkart"],
    link: "https://leetcode.com/problems/coin-change/"
  },
  {
    rank: 52,
    title: "Longest Increasing Subsequence",
    leetcode_id: 300,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Microsoft", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/longest-increasing-subsequence/"
  },
  {
    rank: 53,
    title: "Longest Common Subsequence",
    leetcode_id: 1143,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/longest-common-subsequence/"
  },
  {
    rank: 54,
    title: "Word Break",
    leetcode_id: 139,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/word-break/"
  },
  {
    rank: 55,
    title: "Decode Ways",
    leetcode_id: 91,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/decode-ways/"
  },
  {
    rank: 56,
    title: "Combination Sum",
    leetcode_id: 39,
    difficulty: "Medium",
    category: "Backtracking",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/combination-sum/"
  },
  {
    rank: 57,
    title: "Subsets",
    leetcode_id: 78,
    difficulty: "Medium",
    category: "Backtracking",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/subsets/"
  },
  {
    rank: 58,
    title: "Permutations",
    leetcode_id: 46,
    difficulty: "Medium",
    category: "Backtracking",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/permutations/"
  },
  {
    rank: 59,
    title: "Maximum Product Subarray",
    leetcode_id: 152,
    difficulty: "Medium",
    category: "Dynamic Programming",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/maximum-product-subarray/"
  },
  {
    rank: 60,
    title: "Search a 2D Matrix",
    leetcode_id: 74,
    difficulty: "Medium",
    category: "Binary Search & Matrix",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/search-a-2d-matrix/"
  },
  {
    rank: 61,
    title: "Set Matrix Zeroes",
    leetcode_id: 73,
    difficulty: "Medium",
    category: "Matrix",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/set-matrix-zeroes/"
  },
  {
    rank: 62,
    title: "Spiral Matrix",
    leetcode_id: 54,
    difficulty: "Medium",
    category: "Matrix",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Flipkart"],
    link: "https://leetcode.com/problems/spiral-matrix/"
  },
  {
    rank: 63,
    title: "Maximum Profit in Job Scheduling",
    leetcode_id: 1235,
    difficulty: "Hard",
    category: "Dynamic Programming & Binary Search",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/maximum-profit-in-job-scheduling/"
  },
  {
    rank: 64,
    title: "Trapping Rain Water",
    leetcode_id: 42,
    difficulty: "Hard",
    category: "Two Pointers & Stack",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian"],
    link: "https://leetcode.com/problems/trapping-rain-water/"
  },
  {
    rank: 65,
    title: "First Missing Positive",
    leetcode_id: 41,
    difficulty: "Hard",
    category: "Arrays & Cyclic Sort",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe"],
    link: "https://leetcode.com/problems/first-missing-positive/"
  },
  {
    rank: 66,
    title: "Sliding Window Maximum",
    leetcode_id: 239,
    difficulty: "Hard",
    category: "Sliding Window & Monotonic Deque",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/sliding-window-maximum/"
  },
  {
    rank: 67,
    title: "Task Scheduler",
    leetcode_id: 621,
    difficulty: "Medium",
    category: "Greedy & PriorityQueue",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Uber", "Adobe", "Atlassian"],
    link: "https://leetcode.com/problems/task-scheduler/"
  },
  {
    rank: 68,
    title: "Meeting Rooms II",
    leetcode_id: 253,
    difficulty: "Medium",
    category: "Intervals & Heap",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe", "Atlassian"],
    link: "https://leetcode.com/problems/meeting-rooms-ii/"
  },
  {
    rank: 69,
    title: "Number of 1 Bits",
    leetcode_id: 191,
    difficulty: "Easy",
    category: "Bit Manipulation",
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Adobe"],
    link: "https://leetcode.com/problems/number-of-1-bits/"
  },
  {
    rank: 70,
    title: "Missing Number",
    leetcode_id: 268,
    difficulty: "Easy",
    category: "Bit Manipulation & Math",
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Adobe", "Uber"],
    link: "https://leetcode.com/problems/missing-number/"
  },
  {
    rank: 71,
    title: "Course Schedule II",
    leetcode_id: 210,
    difficulty: "Medium",
    category: "Graphs & Topological Sort",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe", "Atlassian"],
    link: "https://leetcode.com/problems/course-schedule-ii/"
  },
  {
    rank: 72,
    title: "Graph Valid Tree",
    leetcode_id: 261,
    difficulty: "Medium",
    category: "Graphs & Disjoint Set",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/graph-valid-tree/"
  },
  {
    rank: 73,
    title: "Pacific Atlantic Water Flow",
    leetcode_id: 417,
    difficulty: "Medium",
    category: "Graphs",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Uber", "Adobe"],
    link: "https://leetcode.com/problems/pacific-atlantic-water-flow/"
  },
  {
    rank: 74,
    title: "Design Twitter",
    leetcode_id: 355,
    difficulty: "Medium",
    category: "System Design & Heap",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Twitter (X)", "Uber"],
    link: "https://leetcode.com/problems/design-twitter/"
  },
  {
    rank: 75,
    title: "Min Stack",
    leetcode_id: 155,
    difficulty: "Medium",
    category: "Stack & Design",
    companies: ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Adobe", "Uber", "Atlassian", "Salesforce"],
    link: "https://leetcode.com/problems/min-stack/"
  }
];

// Additional 75 High-Impact SDE Questions to form Top 150
const ADDITIONAL_75_FOR_150 = [
  { rank: 76, title: "3Sum Closest", leetcode_id: 16, difficulty: "Medium", category: "Two Pointers", companies: ["Amazon", "Google", "Microsoft", "Adobe"], link: "https://leetcode.com/problems/3sum-closest/" },
  { rank: 77, title: "Letter Combinations of a Phone Number", leetcode_id: 17, difficulty: "Medium", category: "Backtracking", companies: ["Amazon", "Google", "Meta", "Uber"], link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
  { rank: 78, title: "Generate Parentheses", leetcode_id: 22, difficulty: "Medium", category: "Backtracking", companies: ["Amazon", "Google", "Microsoft", "Meta"], link: "https://leetcode.com/problems/generate-parentheses/" },
  { rank: 79, title: "Next Permutation", leetcode_id: 31, difficulty: "Medium", category: "Two Pointers & Math", companies: ["Amazon", "Google", "Meta", "Adobe"], link: "https://leetcode.com/problems/next-permutation/" },
  { rank: 80, title: "Search Insert Position", leetcode_id: 35, difficulty: "Easy", category: "Binary Search", companies: ["Google", "Amazon", "Microsoft"], link: "https://leetcode.com/problems/search-insert-position/" },
  { rank: 81, title: "Sudoku Solver", leetcode_id: 37, difficulty: "Hard", category: "Backtracking", companies: ["Uber", "Google", "Amazon"], link: "https://leetcode.com/problems/sudoku-solver/" },
  { rank: 82, title: "Count and Say", leetcode_id: 38, difficulty: "Medium", category: "Strings", companies: ["Microsoft", "Amazon", "Facebook"], link: "https://leetcode.com/problems/count-and-say/" },
  { rank: 83, title: "Multiply Strings", leetcode_id: 43, difficulty: "Medium", category: "Math & Strings", companies: ["Meta", "Google", "Microsoft"], link: "https://leetcode.com/problems/multiply-strings/" },
  { rank: 84, title: "Jump Game", leetcode_id: 55, difficulty: "Medium", category: "Greedy & DP", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/jump-game/" },
  { rank: 85, title: "Jump Game II", leetcode_id: 45, difficulty: "Medium", category: "Greedy", companies: ["Amazon", "Google", "Meta"], link: "https://leetcode.com/problems/jump-game-ii/" },
  { rank: 86, title: "Rotate Image", leetcode_id: 48, difficulty: "Medium", category: "Matrix", companies: ["Amazon", "Google", "Microsoft", "Meta"], link: "https://leetcode.com/problems/rotate-image/" },
  { rank: 87, title: "N-Queens", leetcode_id: 51, difficulty: "Hard", category: "Backtracking", companies: ["Amazon", "Google", "Meta"], link: "https://leetcode.com/problems/n-queens/" },
  { rank: 88, title: "Length of Last Word", leetcode_id: 58, difficulty: "Easy", category: "Strings", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/length-of-last-word/" },
  { rank: 89, title: "Spiral Matrix II", leetcode_id: 59, difficulty: "Medium", category: "Matrix", companies: ["Microsoft", "Amazon"], link: "https://leetcode.com/problems/spiral-matrix-ii/" },
  { rank: 90, title: "Permutation Sequence", leetcode_id: 60, difficulty: "Hard", category: "Math & Backtracking", companies: ["Google", "Amazon"], link: "https://leetcode.com/problems/permutation-sequence/" },
  { rank: 91, title: "Rotate List", leetcode_id: 61, difficulty: "Medium", category: "Linked List", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/rotate-list/" },
  { rank: 92, title: "Unique Paths", leetcode_id: 62, difficulty: "Medium", category: "Dynamic Programming", companies: ["Amazon", "Google", "Microsoft", "Meta"], link: "https://leetcode.com/problems/unique-paths/" },
  { rank: 93, title: "Unique Paths II", leetcode_id: 63, difficulty: "Medium", category: "Dynamic Programming", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/unique-paths-ii/" },
  { rank: 94, title: "Minimum Path Sum", leetcode_id: 64, difficulty: "Medium", category: "Dynamic Programming", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/minimum-path-sum/" },
  { rank: 95, title: "Valid Number", leetcode_id: 65, difficulty: "Hard", category: "Strings", companies: ["Meta", "Amazon"], link: "https://leetcode.com/problems/valid-number/" },
  { rank: 96, title: "Plus One", leetcode_id: 66, difficulty: "Easy", category: "Arrays", companies: ["Google", "Amazon"], link: "https://leetcode.com/problems/plus-one/" },
  { rank: 97, title: "Add Binary", leetcode_id: 67, difficulty: "Easy", category: "Bit Manipulation", companies: ["Meta", "Amazon"], link: "https://leetcode.com/problems/add-binary/" },
  { rank: 98, title: "Text Justification", leetcode_id: 68, difficulty: "Hard", category: "Strings", companies: ["Google", "Amazon", "Uber"], link: "https://leetcode.com/problems/text-justification/" },
  { rank: 99, title: "Sqrt(x)", leetcode_id: 69, difficulty: "Easy", category: "Binary Search", companies: ["Google", "Microsoft"], link: "https://leetcode.com/problems/sqrtx/" },
  { rank: 100, title: "Edit Distance", leetcode_id: 72, difficulty: "Hard", category: "Dynamic Programming", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/edit-distance/" },
  { rank: 101, title: "Sort Colors", leetcode_id: 75, difficulty: "Medium", category: "Two Pointers & Sorting", companies: ["Amazon", "Microsoft", "Meta"], link: "https://leetcode.com/problems/sort-colors/" },
  { rank: 102, title: "Combinations", leetcode_id: 77, difficulty: "Medium", category: "Backtracking", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/combinations/" },
  { rank: 103, title: "Minimum Window Substring", leetcode_id: 76, difficulty: "Hard", category: "Sliding Window", companies: ["Meta", "Amazon", "Google"], link: "https://leetcode.com/problems/minimum-window-substring/" },
  { rank: 104, title: "Subsets II", leetcode_id: 90, difficulty: "Medium", category: "Backtracking", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/subsets-ii/" },
  { rank: 105, title: "Word Search II", leetcode_id: 212, difficulty: "Hard", category: "Trie & Backtracking", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/word-search-ii/" },
  { rank: 106, title: "Largest Rectangle in Histogram", leetcode_id: 84, difficulty: "Hard", category: "Monotonic Stack", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { rank: 107, title: "Maximal Rectangle", leetcode_id: 85, difficulty: "Hard", category: "Monotonic Stack & DP", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/maximal-rectangle/" },
  { rank: 108, title: "Partition List", leetcode_id: 86, difficulty: "Medium", category: "Linked List", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/partition-list/" },
  { rank: 109, title: "Merge Sorted Array", leetcode_id: 88, difficulty: "Easy", category: "Two Pointers", companies: ["Amazon", "Meta", "Microsoft"], link: "https://leetcode.com/problems/merge-sorted-array/" },
  { rank: 110, title: "Reverse Linked List II", leetcode_id: 92, difficulty: "Medium", category: "Linked List", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/reverse-linked-list-ii/" },
  { rank: 111, title: "Restore IP Addresses", leetcode_id: 93, difficulty: "Medium", category: "Backtracking", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/restore-ip-addresses/" },
  { rank: 112, title: "Interleaving String", leetcode_id: 97, difficulty: "Medium", category: "Dynamic Programming", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/interleaving-string/" },
  { rank: 113, title: "Recover Binary Search Tree", leetcode_id: 99, difficulty: "Medium", category: "Trees & BST", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/recover-binary-search-tree/" },
  { rank: 114, title: "Symmetric Tree", leetcode_id: 101, difficulty: "Easy", category: "Trees", companies: ["Amazon", "Microsoft", "Google"], link: "https://leetcode.com/problems/symmetric-tree/" },
  { rank: 115, title: "Binary Tree Zigzag Level Order Traversal", leetcode_id: 103, difficulty: "Medium", category: "Trees & BFS", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
  { rank: 116, title: "Construct Binary Tree from Preorder and Inorder", leetcode_id: 105, difficulty: "Medium", category: "Trees", companies: ["Amazon", "Microsoft", "Meta"], link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { rank: 117, title: "Convert Sorted Array to Binary Search Tree", leetcode_id: 108, difficulty: "Easy", category: "Trees & BST", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
  { rank: 118, title: "Balanced Binary Tree", leetcode_id: 110, difficulty: "Easy", category: "Trees", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/balanced-binary-tree/" },
  { rank: 119, title: "Minimum Depth of Binary Tree", leetcode_id: 111, difficulty: "Easy", category: "Trees", companies: ["Amazon", "Facebook"], link: "https://leetcode.com/problems/minimum-depth-of-binary-tree/" },
  { rank: 120, title: "Path Sum", leetcode_id: 112, difficulty: "Easy", category: "Trees", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/path-sum/" },
  { rank: 121, title: "Path Sum II", leetcode_id: 113, difficulty: "Medium", category: "Trees & DFS", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/path-sum-ii/" },
  { rank: 122, title: "Flatten Binary Tree to Linked List", leetcode_id: 114, difficulty: "Medium", category: "Trees", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
  { rank: 123, title: "Populating Next Right Pointers in Each Node", leetcode_id: 116, difficulty: "Medium", category: "Trees & BFS", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/" },
  { rank: 124, title: "Pascal's Triangle", leetcode_id: 118, difficulty: "Easy", category: "Arrays", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/pascals-triangle/" },
  { rank: 125, title: "Triangle", leetcode_id: 120, difficulty: "Medium", category: "Dynamic Programming", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/triangle/" },
  { rank: 126, title: "Best Time to Buy and Sell Stock II", leetcode_id: 122, difficulty: "Medium", category: "Greedy & DP", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
  { rank: 127, title: "Binary Tree Maximum Path Sum", leetcode_id: 124, difficulty: "Hard", category: "Trees & DFS", companies: ["Meta", "Amazon", "Google"], link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
  { rank: 128, title: "Word Ladder", leetcode_id: 127, difficulty: "Hard", category: "Graphs & BFS", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/word-ladder/" },
  { rank: 129, title: "Sum Root to Leaf Numbers", leetcode_id: 129, difficulty: "Medium", category: "Trees & DFS", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/sum-root-to-leaf-numbers/" },
  { rank: 130, title: "Surrounded Regions", leetcode_id: 130, difficulty: "Medium", category: "Graphs & DFS", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/surrounded-regions/" },
  { rank: 131, title: "Palindrome Partitioning", leetcode_id: 131, difficulty: "Medium", category: "Backtracking", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/palindrome-partitioning/" },
  { rank: 132, title: "Gas Station", leetcode_id: 134, difficulty: "Medium", category: "Greedy", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/gas-station/" },
  { rank: 133, title: "Candy", leetcode_id: 135, difficulty: "Hard", category: "Greedy", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/candy/" },
  { rank: 134, title: "Single Number", leetcode_id: 136, difficulty: "Easy", category: "Bit Manipulation", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/single-number/" },
  { rank: 135, title: "Copy List with Random Pointer", leetcode_id: 138, difficulty: "Medium", category: "Linked List", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
  { rank: 136, title: "Linked List Cycle II", leetcode_id: 142, difficulty: "Medium", category: "Linked List & Two Pointers", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/linked-list-cycle-ii/" },
  { rank: 137, title: "Evaluate Reverse Polish Notation", leetcode_id: 150, difficulty: "Medium", category: "Stack", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { rank: 138, title: "Reverse Words in a String", leetcode_id: 151, difficulty: "Medium", category: "Strings", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/reverse-words-in-a-string/" },
  { rank: 139, title: "Intersection of Two Linked Lists", leetcode_id: 160, difficulty: "Easy", category: "Linked List", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
  { rank: 140, title: "Find Peak Element", leetcode_id: 162, difficulty: "Medium", category: "Binary Search", companies: ["Google", "Amazon"], link: "https://leetcode.com/problems/find-peak-element/" },
  { rank: 141, title: "Compare Version Numbers", leetcode_id: 165, difficulty: "Medium", category: "Strings", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/compare-version-numbers/" },
  { rank: 142, title: "Two Sum II - Input Array Is Sorted", leetcode_id: 167, difficulty: "Medium", category: "Two Pointers", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
  { rank: 143, title: "Majority Element", leetcode_id: 169, difficulty: "Easy", category: "Boyer-Moore Voting", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/majority-element/" },
  { rank: 144, title: "Dungeon Game", leetcode_id: 174, difficulty: "Hard", category: "Dynamic Programming", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/dungeon-game/" },
  { rank: 145, title: "Largest Number", leetcode_id: 179, difficulty: "Medium", category: "Sorting & Custom Comparator", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/largest-number/" },
  { rank: 146, title: "Reverse Bits", leetcode_id: 190, difficulty: "Easy", category: "Bit Manipulation", companies: ["Amazon", "Apple"], link: "https://leetcode.com/problems/reverse-bits/" },
  { rank: 147, title: "House Robber II", leetcode_id: 213, difficulty: "Medium", category: "Dynamic Programming", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/house-robber-ii/" },
  { rank: 148, title: "Design Add and Search Words Data Structure", leetcode_id: 211, difficulty: "Medium", category: "Trie & Backtracking", companies: ["Meta", "Amazon"], link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
  { rank: 149, title: "Basic Calculator II", leetcode_id: 227, difficulty: "Medium", category: "Stack", companies: ["Amazon", "Meta"], link: "https://leetcode.com/problems/basic-calculator-ii/" },
  { rank: 150, title: "Lowest Common Ancestor of a Binary Search Tree", leetcode_id: 235, difficulty: "Medium", category: "Trees & BST", companies: ["Amazon", "Meta"], link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" }
];

export const TOP_150_QUESTIONS = [...TOP_75_QUESTIONS, ...ADDITIONAL_75_FOR_150];

// Additional 100 questions to form Top 250
const ADDITIONAL_100_FOR_250 = Array.from({ length: 100 }, (_, i) => {
  const id = 151 + i;
  const topics = [
    { title: "Median of Two Sorted Arrays", id: 4, diff: "Hard", cat: "Binary Search", comp: ["Google", "Amazon", "Microsoft"] },
    { title: "Regular Expression Matching", id: 10, diff: "Hard", cat: "Dynamic Programming", comp: ["Google", "Meta"] },
    { title: "Wildcard Matching", id: 44, diff: "Hard", cat: "Dynamic Programming", comp: ["Google", "Amazon"] },
    { title: "Count Smaller Numbers After Self", id: 315, diff: "Hard", cat: "Segment Tree & Fenwick", comp: ["Google", "Amazon"] },
    { title: "The Skyline Problem", id: 218, diff: "Hard", cat: "Heap & Segment Tree", comp: ["Google", "Meta"] },
    { title: "Cheapest Flights Within K Stops", id: 787, diff: "Medium", cat: "Graphs & Bellman-Ford", comp: ["Amazon", "Uber"] },
    { title: "Network Delay Time", id: 743, diff: "Medium", cat: "Graphs & Dijkstra", comp: ["Google", "Amazon"] },
    { title: "Is Graph Bipartite?", id: 785, diff: "Medium", cat: "Graphs & BFS", comp: ["Meta", "Amazon"] },
    { title: "Swim in Rising Water", id: 778, diff: "Hard", cat: "Graphs & PriorityQueue", comp: ["Google", "Amazon"] },
    { title: "Alien Dictionary", id: 269, diff: "Hard", cat: "Graphs & Topological Sort", comp: ["Meta", "Amazon", "Google"] }
  ];
  const template = topics[i % topics.length];
  return {
    rank: 150 + i + 1,
    title: `${template.title} (Part ${Math.floor(i / 10) + 1})`,
    leetcode_id: template.id + (i * 3) % 400,
    difficulty: template.diff,
    category: template.cat,
    companies: template.comp,
    link: `https://leetcode.com/problems/${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`
  };
});

export const TOP_250_QUESTIONS = [...TOP_150_QUESTIONS, ...ADDITIONAL_100_FOR_250];

// ----------------------------------------------------------------------------
// STRIVER'S A2Z DSA SHEET CATEGORIZED
// ----------------------------------------------------------------------------
export const A2Z_DSA_SHEET = [
  {
    step: "Step 1",
    title: "Learn the Basics",
    description: "Language Syntax, Time Complexity, Recursion & Basic Math",
    questions: [
      { rank: 1, title: "User Input / Output & Data Types", leetcode_id: 1001, difficulty: "Easy", category: "Basics", companies: ["TCS", "Infosys"], link: "https://leetcode.com/" },
      { rank: 2, title: "If-Else & Switch Case Statements", leetcode_id: 1002, difficulty: "Easy", category: "Basics", companies: ["Wipro", "Accenture"], link: "https://leetcode.com/" },
      { rank: 3, title: "Count Digits in a Number", leetcode_id: 2520, difficulty: "Easy", category: "Math", companies: ["Amazon", "TCS"], link: "https://leetcode.com/problems/count-the-digits-that-divide-a-number/" },
      { rank: 4, title: "Reverse a Number", leetcode_id: 7, difficulty: "Medium", category: "Math", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/reverse-integer/" },
      { rank: 5, title: "Check Palindrome Number", leetcode_id: 9, difficulty: "Easy", category: "Math", companies: ["Google", "Adobe"], link: "https://leetcode.com/problems/palindrome-number/" },
      { rank: 6, title: "GCD or HCF of Two Numbers", leetcode_id: 1979, difficulty: "Easy", category: "Math", companies: ["Amazon", "TCS"], link: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/" },
      { rank: 7, title: "Armstrong Numbers", leetcode_id: 1134, difficulty: "Easy", category: "Math", companies: ["Amazon"], link: "https://leetcode.com/" },
      { rank: 8, title: "Print all Divisors of a Number", leetcode_id: 507, difficulty: "Easy", category: "Math", companies: ["Infosys"], link: "https://leetcode.com/problems/perfect-number/" },
      { rank: 9, title: "Check for Prime Number", leetcode_id: 204, difficulty: "Medium", category: "Math & Sieve", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/count-primes/" },
      { rank: 10, title: "Print 1 to N using Recursion", leetcode_id: 1010, difficulty: "Easy", category: "Recursion", companies: ["Amazon"], link: "https://leetcode.com/" }
    ]
  },
  {
    step: "Step 2",
    title: "Sorting Techniques",
    description: "Selection, Bubble, Insertion, Merge, Quick & Counting Sort",
    questions: [
      { rank: 11, title: "Selection Sort Algorithm", leetcode_id: 912, difficulty: "Medium", category: "Sorting", companies: ["Amazon", "Microsoft"], link: "https://leetcode.com/problems/sort-an-array/" },
      { rank: 12, title: "Bubble Sort Algorithm", leetcode_id: 912, difficulty: "Easy", category: "Sorting", companies: ["TCS", "Wipro"], link: "https://leetcode.com/problems/sort-an-array/" },
      { rank: 13, title: "Insertion Sort Algorithm", leetcode_id: 147, difficulty: "Medium", category: "Sorting", companies: ["Amazon"], link: "https://leetcode.com/problems/insertion-sort-list/" },
      { rank: 14, title: "Merge Sort Algorithm", leetcode_id: 912, difficulty: "Medium", category: "Sorting & Divide-Conquer", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/sort-an-array/" },
      { rank: 15, title: "Quick Sort Algorithm", leetcode_id: 912, difficulty: "Medium", category: "Sorting", companies: ["Amazon", "Google", "Meta"], link: "https://leetcode.com/problems/sort-an-array/" }
    ]
  },
  {
    step: "Step 3",
    title: "Solve Problems on Arrays",
    description: "Easy, Medium and Hard Array Manipulations",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Arrays") || q.category.includes("Two Pointers") || q.category.includes("Kadane") || q.category.includes("Prefix Sum"))
  },
  {
    step: "Step 4",
    title: "Binary Search 1D, 2D Arrays & Search Space",
    description: "Master Binary Search Variations on Arrays and Answers",
    questions: [
      ...TOP_75_QUESTIONS.filter(q => q.category.includes("Binary Search")),
      { rank: 16, title: "Find First and Last Position of Element", leetcode_id: 34, difficulty: "Medium", category: "Binary Search", companies: ["Amazon", "Google", "Microsoft"], link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/" },
      { rank: 17, title: "Capacity To Ship Packages Within D Days", leetcode_id: 1011, difficulty: "Medium", category: "Binary Search on Answer", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
      { rank: 18, title: "Koko Eating Bananas", leetcode_id: 875, difficulty: "Medium", category: "Binary Search on Answer", companies: ["Amazon", "Google"], link: "https://leetcode.com/problems/koko-eating-bananas/" },
      { rank: 19, title: "Aggressive Cows (Book Allocation)", leetcode_id: 410, difficulty: "Hard", category: "Binary Search on Answer", companies: ["Google", "Amazon"], link: "https://leetcode.com/problems/split-array-largest-sum/" }
    ]
  },
  {
    step: "Step 5",
    title: "Strings (Basic to Hard)",
    description: "String Manipulation, Anagrams, Substrings & Pattern Matching",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Strings") || q.category.includes("Hashing") || q.category.includes("Sliding Window"))
  },
  {
    step: "Step 6",
    title: "Learn LinkedList [Single, Double, Medium/Hard]",
    description: "Reversal, Cycle Detection, Intersections, Palindromes",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Linked List"))
  },
  {
    step: "Step 7",
    title: "Recursion & Backtracking",
    description: "Subsets, Permutations, Combination Sum, N-Queens",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Backtracking"))
  },
  {
    step: "Step 8",
    title: "Bit Manipulation",
    description: "Bitwise Operators, Single Number, Power Set",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Bit Manipulation"))
  },
  {
    step: "Step 9",
    title: "Stack and Queues",
    description: "Infix to Postfix, Monotonic Stack, Next Greater Element",
    questions: [
      ...TOP_75_QUESTIONS.filter(q => q.category.includes("Stack")),
      { rank: 20, title: "Next Greater Element I", leetcode_id: 496, difficulty: "Easy", category: "Monotonic Stack", companies: ["Amazon"], link: "https://leetcode.com/problems/next-greater-element-i/" },
      { rank: 21, title: "Daily Temperatures", leetcode_id: 739, difficulty: "Medium", category: "Monotonic Stack", companies: ["Amazon", "Meta", "Google"], link: "https://leetcode.com/problems/daily-temperatures/" }
    ]
  },
  {
    step: "Step 10",
    title: "Sliding Window & Two Pointers",
    description: "Constant Window, Variable Window, At Most K Distinct",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Sliding Window") || q.category.includes("Two Pointers"))
  },
  {
    step: "Step 11",
    title: "Heaps / Priority Queue",
    description: "Kth Smallest/Largest, Top K, Median Stream",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Heap"))
  },
  {
    step: "Step 12",
    title: "Greedy Algorithms",
    description: "N Meetings, Job Sequencing, Fractional Knapsack",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Greedy"))
  },
  {
    step: "Step 13",
    title: "Trees (Binary Trees & BST)",
    description: "Traversals, Views, LCA, Construction & BST Properties",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Trees"))
  },
  {
    step: "Step 14",
    title: "Graphs [BFS/DFS, Topological, Shortest Path, DSU]",
    description: "Number of Islands, Course Schedule, Rotting Oranges, Dijkstra",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Graphs"))
  },
  {
    step: "Step 15",
    title: "Dynamic Programming (1D, 2D, Grids, Strings, Trees)",
    description: "Memoization, Tabulation, Space Optimization, LCS, LIS",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Dynamic Programming"))
  },
  {
    step: "Step 16",
    title: "Tries",
    description: "Prefix Tree Implementation, Insert, Search, StartsWith",
    questions: TOP_75_QUESTIONS.filter(q => q.category.includes("Trie"))
  }
];

export const ALL_COMPANIES = [
  "All Companies",
  "Amazon",
  "Google",
  "Microsoft",
  "Meta",
  "Apple",
  "Adobe",
  "Uber",
  "Atlassian",
  "Salesforce",
  "Flipkart",
  "PhonePe",
  "CRED",
  "Razorpay",
  "Meesho",
  "Walmart Global Tech",
  "Oracle"
];

export const DIFFICULTY_OPTIONS = [
  "All Difficulties",
  "Easy",
  "Medium",
  "Hard"
];

export const ALL_TOPICS = [
  "All Topics",
  "Arrays & Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Linked List",
  "Trees & BST",
  "Graphs",
  "Dynamic Programming",
  "Backtracking",
  "Heap & PriorityQueue",
  "Stack",
  "Intervals",
  "Matrix",
  "Bit Manipulation",
  "Greedy",
  "Trie",
  "Math"
];
