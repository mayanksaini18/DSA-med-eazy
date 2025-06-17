// DSA Quiz Questions Database
const questionsData = {
    arrays: [
        {
            question: "What is the time complexity of accessing an element in an array by index?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0,
            explanation: "Array access by index is O(1) because we can directly calculate the memory address."
        },
        {
            question: "Which operation has O(n) time complexity in arrays?",
            options: ["Access", "Search (unsorted)", "Insert at end", "Delete at end"],
            correct: 1,
            explanation: "Searching in an unsorted array requires checking each element, giving O(n) complexity."
        },
        {
            question: "What happens when you try to access an array element beyond its bounds in most languages?",
            options: ["Returns 0", "Returns null", "Throws an error", "Creates new element"],
            correct: 2,
            explanation: "Most programming languages throw an index out of bounds error for safety."
        },
        {
            question: "In a dynamic array, what is the amortized time complexity of append operation?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0,
            explanation: "Although occasionally O(n) due to resizing, the amortized complexity is O(1)."
        },
        {
            question: "Which of the following is NOT an advantage of arrays?",
            options: ["Random access", "Cache locality", "Dynamic size", "Memory efficiency"],
            correct: 2,
            explanation: "Traditional arrays have fixed size. Dynamic arrays exist but aren't the default in all languages."
        }
    ],
    
    strings: [
        {
            question: "What is the time complexity of string concatenation in most languages?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 1,
            explanation: "String concatenation typically requires creating a new string and copying characters, giving O(n) complexity."
        },
        {
            question: "Which algorithm is commonly used for pattern matching in strings?",
            options: ["Binary Search", "KMP Algorithm", "Quick Sort", "Dijkstra's Algorithm"],
            correct: 1,
            explanation: "KMP (Knuth-Morris-Pratt) algorithm is specifically designed for efficient string pattern matching."
        },
        {
            question: "What is the space complexity of storing a string of length n?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 1,
            explanation: "A string of length n requires O(n) space to store all characters."
        },
        {
            question: "In ASCII, how many bits are used to represent each character?",
            options: ["4 bits", "6 bits", "7 bits", "8 bits"],
            correct: 3,
            explanation: "ASCII uses 8 bits (1 byte) per character, though only 7 bits are used for the character set."
        }
    ],
    
    linkedlists: [
        {
            question: "What is the time complexity of inserting at the beginning of a linked list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            correct: 0,
            explanation: "Inserting at the beginning only requires updating a few pointers, giving O(1) complexity."
        },
        {
            question: "Which operation is more efficient in linked lists compared to arrays?",
            options: ["Random access", "Sequential access", "Insertion at beginning", "Binary search"],
            correct: 2,
            explanation: "Insertion at the beginning is O(1) in linked lists but O(n) in arrays due to shifting."
        },
        {
            question: "What is the main disadvantage of linked lists?",
            options: ["Fixed size", "No random access", "Can't store different data types", "Limited to integers"],
            correct: 1,
            explanation: "Linked lists don't support random access - you must traverse from the head to reach any element."
        },
        {
            question: "In a doubly linked list, each node contains:",
            options: ["Only data", "Data and next pointer", "Data and previous pointer", "Data, next and previous pointers"],
            correct: 3,
            explanation: "Doubly linked lists have pointers to both the next and previous nodes for bidirectional traversal."
        }
    ],
    
    trees: [
        {
            question: "What is the maximum number of nodes at level k in a binary tree?",
            options: ["k", "2k", "2^k", "2^(k-1)"],
            correct: 2,
            explanation: "At level k, a binary tree can have at most 2^k nodes (starting from level 0)."
        },
        {
            question: "Which traversal visits the root node first?",
            options: ["Inorder", "Preorder", "Postorder", "Level order"],
            correct: 1,
            explanation: "Preorder traversal visits the root first, then left subtree, then right subtree."
        },
        {
            question: "What is the height of a balanced binary search tree with n nodes?",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
            correct: 1,
            explanation: "A balanced BST maintains O(log n) height by keeping the tree structure balanced."
        },
        {
            question: "In a complete binary tree with n nodes, what is the maximum height?",
            options: ["log n", "⌊log₂ n⌋", "⌈log₂ n⌉", "n"],
            correct: 2,
            explanation: "The height of a complete binary tree is ⌈log₂(n+1)⌉ - 1, which is ⌈log₂ n⌉."
        }
    ],
    
    graphs: [
        {
            question: "Which data structure is commonly used to implement BFS?",
            options: ["Stack", "Queue", "Priority Queue", "Array"],
            correct: 1,
            explanation: "BFS uses a queue to process nodes level by level in a first-in-first-out manner."
        },
        {
            question: "What is the time complexity of DFS in an adjacency list representation?",
            options: ["O(V)", "O(E)", "O(V + E)", "O(VE)"],
            correct: 2,
            explanation: "DFS visits all vertices (V) and explores all edges (E), giving O(V + E) complexity."
        },
        {
            question: "Which algorithm is used to find the shortest path in an unweighted graph?",
            options: ["DFS", "BFS", "Dijkstra's", "Floyd-Warshall"],
            correct: 1,
            explanation: "BFS finds the shortest path in unweighted graphs by exploring nodes level by level."
        },
        {
            question: "What is a strongly connected component?",
            options: ["A graph with no cycles", "A maximal set of vertices with paths between all pairs", "A tree structure", "A graph with weighted edges"],
            correct: 1,
            explanation: "A strongly connected component is a maximal set of vertices where there's a path from every vertex to every other vertex."
        }
    ],
    
    dp: [
        {
            question: "What is the key principle behind dynamic programming?",
            options: ["Divide and conquer", "Greedy choice", "Optimal substructure", "All of the above"],
            correct: 2,
            explanation: "Dynamic programming relies on optimal substructure - optimal solutions contain optimal solutions to subproblems."
        },
        {
            question: "Which approach uses memoization?",
            options: ["Top-down DP", "Bottom-up DP", "Greedy algorithm", "Divide and conquer"],
            correct: 0,
            explanation: "Top-down DP uses memoization to store results of subproblems and avoid recomputation."
        },
        {
            question: "What is the time complexity of the naive recursive Fibonacci solution?",
            options: ["O(n)", "O(n²)", "O(2^n)", "O(log n)"],
            correct: 2,
            explanation: "The naive recursive Fibonacci has exponential time complexity O(2^n) due to repeated calculations."
        },
        {
            question: "The longest common subsequence problem exhibits which property?",
            options: ["Greedy choice property", "Optimal substructure only", "Overlapping subproblems only", "Both optimal substructure and overlapping subproblems"],
            correct: 3,
            explanation: "LCS has both optimal substructure and overlapping subproblems, making it suitable for DP."
        }
    ]
};

// Topics configuration
const topics = [
    { id: 'arrays', name: 'Arrays', icon: '📊', difficulty: 'Easy', questions: 5, completed: 0 },
    { id: 'strings', name: 'Strings', icon: '🔤', difficulty: 'Easy', questions: 4, completed: 0 },
    { id: 'linkedlists', name: 'Linked Lists', icon: '🔗', difficulty: 'Medium', questions: 4, completed: 0 },
    { id: 'trees', name: 'Trees', icon: '🌳', difficulty: 'Medium', questions: 4, completed: 0 },
    { id: 'graphs', name: 'Graphs', icon: '🕸️', difficulty: 'Hard', questions: 4, completed: 0 },
    { id: 'dp', name: 'Dynamic Programming', icon: '⚡', difficulty: 'Hard', questions: 4, completed: 0 }
];
