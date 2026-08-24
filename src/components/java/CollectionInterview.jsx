import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Code2,
  Terminal,
  Table as TableIcon,
  HelpCircle,
  BadgeAlert,
  Database,
  Layers,
  Sparkles,
  ChevronRight,
  Filter
} from "lucide-react";
import { getKeywordDefinition } from "./javaKeywordsData";
import { CustomDropdown } from "../common/CustomDropdown";
import { renderFormattedText } from "../../utils/formatText";

// ============================================================================
// JAVA COLLECTIONS FRAMEWORK INTERVIEW QUESTION BANK (49 MASTER QUESTIONS)
// ============================================================================
export const COLLECTION_QUESTIONS = [
  // --------------------------------------------------------------------------
  // BASIC / CORE QUESTIONS (1 - 13)
  // --------------------------------------------------------------------------
  {
    id: "col-q1",
    question: "1. What is a collection in Java?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "A Collection in Java is a framework that provides an architecture to store, retrieve, manipulate, and manage groups of objects dynamically.",
    properAnswer: "In Java, a Collection represents a single unit containing a group of individual objects. The Java Collections Framework (JCF) defines standard interfaces (List, Set, Queue) and implementations (ArrayList, HashSet) to handle dynamic grouping without fixed array limitations.",
    explanation: [
      "Dynamic Sizing: Unlike arrays, collection instances auto-expand and shrink as elements are added or removed.",
      "Single Unit Abstraction: Treats multiple objects as a single logical entity for passing, filtering, and iteration.",
      "Standardized API: Uniform methods across all structures like add(), remove(), contains(), and iterator()."
    ],
    interviewLines: [
      "A Collection acts as a dynamic container holding multiple object references as a single entity.",
      "JCF reduces programming effort by providing standard, high-performance data structures out-of-the-box."
    ],
    keywords: [{ word: "Collection Framework" }, { word: "Dynamic Sizing" }, { word: "java.util" }]
  },

  {
    id: "col-q2",
    question: "2. Differentiate between Collection and Collections in Java.",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "Collection is a core root interface for data structures, whereas Collections is a static utility class in java.util providing algorithmic helper methods.",
    properAnswer: "Collection (interface) defines the contract for storing groups of objects (implemented by List, Set, Queue). Collections (class) consists exclusively of static utility methods like Collections.sort(), Collections.reverse(), and Collections.synchronizedList().",
    explanation: [
      "Collection is an interface defining structure; Collections is a utility class providing operations.",
      "Collection cannot be instantiated directly; Collections has a private constructor and static methods.",
      "Collection is part of the type hierarchy; Collections provides algorithms operating on that hierarchy."
    ],
    tableData: {
      headers: ["Parameters", "Collection (Interface)", "Collections (Utility Class)"],
      rows: [
        ["Type", "Root Interface in Java", "Utility Class in java.util"],
        ["Purpose", "Used to store and manage groups of objects", "Used to perform operations on collection objects"],
        ["Package", "java.util.Collection", "java.util.Collections"],
        ["Usage", "Implemented by List, Set, Queue", "Provides static methods like sort(), reverse(), shuffle()"],
        ["Functions", "Defines basic structure (add, remove, size)", "Provides static algorithms & wrapper factories"]
      ]
    },
    interviewLines: [
      "Collection is the interface hierarchy root; Collections is the static algorithm utility class.",
      "Never confuse java.util.Collection with java.util.Collections!"
    ],
    keywords: [{ word: "Collection Interface" }, { word: "Collections Utility Class" }, { word: "Static Methods" }]
  },

  {
    id: "col-q3",
    question: "3. Explain the hierarchy of the Collection framework in Java.",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "The hierarchy starts with Iterable<T> -> Collection<E> -> List, Set, Queue. Map<K,V> is a separate independent interface hierarchy.",
    properAnswer: "The top-level interface is Iterable<T>, which is extended by Collection<E>. Collection is sub-divided into List (ordered), Set (unique), and Queue (FIFO/priority). Map<K,V> operates on Key-Value pairs and forms its own separate hierarchy.",
    explanation: [
      "Iterable<T>: Root interface enabling for-each loop traversal via iterator().",
      "Collection<E>: Main container interface extended by List, Set, and Queue.",
      "List: Ordered collection permitting duplicates (ArrayList, LinkedList, Vector).",
      "Set: Unordered collection enforcing uniqueness (HashSet, LinkedHashSet, TreeSet).",
      "Queue / Deque: Processing queue (PriorityQueue, ArrayDeque).",
      "Map: Key-Value mapping hierarchy (HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap)."
    ],
    codeSnippet: `import java.util.*;

public class CollectionHierarchyExample {
    public static void main(String[] args) {
        // List implementation (Ordered, Duplicates Allowed)
        List<String> list = new ArrayList<>();
        list.add("Java"); list.add("Python");

        // Set implementation (Unique Elements)
        Set<String> set = new HashSet<>();
        set.add("Apple"); set.add("Banana");

        // Queue implementation (Priority Ordering)
        Queue<Integer> queue = new PriorityQueue<>();
        queue.add(10); queue.add(5);

        System.out.println("List: " + list);
        System.out.println("Set: " + set);
        System.out.println("Queue: " + queue);
    }
}`,
    interviewLines: [
      "Iterable sits at the top of Collection, while Map remains an independent key-value hierarchy.",
      "List preserves order, Set enforces uniqueness, Queue manages processing order."
    ],
    keywords: [{ word: "Iterable Interface" }, { word: "Collection Hierarchy" }, { word: "Map Hierarchy" }]
  },

  {
    id: "col-q4",
    question: "4. What are the advantages of the Collection framework?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "Reduces programming effort, provides high-performance ready-made data structures, promotes code reuse, and standardizes data handling APIs.",
    properAnswer: "The Java Collection Framework provides off-the-shelf optimized data structures, eliminating the need to write custom linked lists or hash maps from scratch. It enhances performance, code interoperability, and developer productivity.",
    explanation: [
      "Ready-made Data Structures: Out-of-the-box implementations of lists, trees, hashes, and queues.",
      "Reduced Development Effort: Standard APIs mean developers don't reinvent basic algorithms.",
      "High Performance: Tested, tuned algorithms by JDK engineers (e.g. Red-Black trees, Dual-Pivot Quicksort).",
      "Interoperability: Uniform API interfaces allow seamless exchange of collections across libraries."
    ],
    interviewLines: [
      "JCF provides production-grade data structures out-of-the-box, boosting developer velocity and application speed.",
      "Standard interfaces foster clean abstraction and software component reusability."
    ],
    keywords: [{ word: "Code Reusability" }, { word: "Standard APIs" }, { word: "Performance Tuning" }]
  },

  {
    id: "col-q5",
    question: "5. Explain the various interfaces used in the Collection framework.",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "Core interfaces: Collection, List (ordered duplicates), Set (unique), Queue (FIFO), Deque (double-ended), and Map (key-value pairs).",
    properAnswer: "JCF divides data structures into distinct interface contracts: Collection is the root; List maintains insertion order; Set guarantees uniqueness; Queue/Deque handle pipeline processing; Map maps unique keys to values.",
    explanation: [
      "Collection: Core super-interface declaring fundamental operations (add, remove, contains).",
      "List: Positional access collection allowing duplicates.",
      "Set: Collection preventing duplicate entries based on equals().",
      "Queue / Deque: First-In-First-Out and double-ended operational pipelines.",
      "Map: Associative dictionary storing unique keys mapped to values."
    ],
    tableData: {
      headers: ["Interface", "Explanation"],
      rows: [
        ["Collection", "The root interface representing a group of objects."],
        ["List", "An ordered collection that allows duplicate elements."],
        ["Set", "A collection that does not allow duplicate elements."],
        ["Queue", "A collection used to store elements in FIFO (First In First Out) order."],
        ["Deque", "A double-ended queue supporting insertion/deletion from both ends."],
        ["Map", "Stores data in key-value pairs where each key is unique."]
      ]
    },
    interviewLines: [
      "Interfaces define behavioral contracts; concrete classes provide optimized runtime storage.",
      "Map does not extend Collection, but forms an essential part of the JCF ecosystem."
    ],
    keywords: [{ word: "List Interface" }, { word: "Set Interface" }, { word: "Queue Interface" }, { word: "Map Interface" }]
  },

  {
    id: "col-q6",
    question: "6. Difference between ArrayList and LinkedList.",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "ArrayList uses a contiguous resizable array (fast index lookup O(1)); LinkedList uses a doubly linked list (fast node relinking O(1) at ends).",
    properAnswer: "ArrayList is backed by an array, making positional get(i) operations fast O(1), but middle insertions slow due to element shifting. LinkedList uses doubly-linked nodes, making insertions/deletions fast without shifting, but index lookups slow O(N).",
    explanation: [
      "Memory Storage: ArrayList stores elements contiguously; LinkedList allocates nodes on the heap with prev/next pointers.",
      "Access Time: ArrayList is O(1) random access; LinkedList requires sequential O(N) traversal.",
      "Insertion/Deletion: LinkedList relinks pointers in O(1) if node reference is known; ArrayList shifts array elements.",
      "Memory Overhead: LinkedList consumes significantly more memory due to 24-byte Node pointer allocations per item."
    ],
    tableData: {
      headers: ["Parameters", "ArrayList", "LinkedList"],
      rows: [
        ["Structure", "Backed by a dynamic resizable array", "Backed by a doubly linked list"],
        ["Access Time", "Faster O(1) random index access", "Slower O(N) sequential access traversal"],
        ["Insertion & Deletion", "Slower in middle (requires element array copy)", "Faster pointer relinking (no array shifting)"],
        ["Memory Usage", "Lower memory footprint (contiguous buffer)", "Higher memory (stores 2 pointers per Node)"],
        ["Performance Focus", "Best for read-heavy & index access workflows", "Best for frequent head/tail insertion workflows"]
      ]
    },
    interviewLines: [
      "Default to ArrayList for superior CPU cache locality unless frequent middle insertions are proven.",
      "LinkedList has a high 24-byte per-node pointer memory penalty."
    ],
    keywords: [{ word: "ArrayList" }, { word: "LinkedList" }, { word: "Random Access" }, { word: "Doubly Linked List" }]
  },

  {
    id: "col-q7",
    question: "7. Can you add a null element to a TreeSet or HashSet?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Coding / Practical",
    summary: "HashSet permits 1 null element (stored at bucket 0). TreeSet disallows null and throws NullPointerException due to compareTo() execution.",
    properAnswer: "HashSet allows a single null value because its backing HashMap maps null to bucket index 0. TreeSet disallows null elements because it compares items to maintain sorted order—calling compareTo() or comparator.compare() on null throws NullPointerException.",
    explanation: [
      "HashSet Null Behavior: Delegates to HashMap.put(null, PRESENT) which hashes null to bucket 0 safely.",
      "TreeSet Null Behavior: Attempts natural ordering or custom comparison; comparing null to any object results in NPE.",
      "Single Null Limit: HashSet permits only 1 null because Set enforces element uniqueness."
    ],
    codeSnippet: `import java.util.*;

public class NullExample {
    public static void main(String[] args) {
        // HashSet allows ONE null value
        HashSet<String> hashSet = new HashSet<>();
        hashSet.add(null);
        hashSet.add("Java");
        System.out.println("HashSet: " + hashSet); // [null, Java]

        // TreeSet throws NullPointerException on null
        TreeSet<String> treeSet = new TreeSet<>();
        try {
            treeSet.add(null);
        } catch (NullPointerException e) {
            System.out.println("TreeSet does not allow null values! Threw NullPointerException.");
        }
    }
}`,
    interviewLines: [
      "HashSet allows 1 null key in bucket 0; TreeSet throws NPE because sorting requires comparison.",
      "Never put null into sorted collections relying on Comparable/Comparator."
    ],
    keywords: [{ word: "HashSet Null Support" }, { word: "TreeSet NPE" }, { word: "Comparable Null Check" }]
  },

  {
    id: "col-q8",
    question: "8. Differentiate between List and Set in Java.",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "List is an ordered collection allowing duplicates with index access. Set is an unordered collection enforcing element uniqueness.",
    properAnswer: "List maintains exact insertion order and permits duplicate items accessible via index. Set forbids duplicate elements (determined via equals() and hashCode()) and generally does not provide index-based access.",
    explanation: [
      "Duplicates: List permits duplicate values; Set filters out duplicates.",
      "Ordering: List guarantees insertion sequence; Set (like HashSet) provides no ordering guarantees (except LinkedHashSet/TreeSet).",
      "Indexing: List supports get(int index); Set does not support positional indexing."
    ],
    tableData: {
      headers: ["Parameters", "List", "Set"],
      rows: [
        ["Duplicate Elements", "Allows duplicate elements", "Disallows duplicate elements"],
        ["Order", "Maintains exact insertion order", "Unordered (except LinkedHashSet/TreeSet)"],
        ["Index Access", "Supports positional index access (get(i))", "Does NOT support index-based access"],
        ["Use Case", "Used when sequence & duplicates are needed", "Used when enforcing unique elements"],
        ["Implementations", "ArrayList, LinkedList, Vector", "HashSet, TreeSet, LinkedHashSet"]
      ]
    },
    interviewLines: [
      "Use List when element sequence matters; use Set when uniqueness is mandatory.",
      "Set uniqueness depends directly on correct equals() and hashCode() overrides."
    ],
    keywords: [{ word: "List vs Set" }, { word: "Duplicate Prevention" }, { word: "Insertion Order" }]
  },

  {
    id: "col-q9",
    question: "9. What is an Iterator in Java Collections?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "An Iterator is an object used to traverse collection elements sequentially while safely removing elements via remove().",
    properAnswer: "Iterator<E> is a universal forward-only cursor for Collection implementations. It defines three primary methods: hasNext() to check for elements, next() to retrieve the element and advance, and remove() to safely delete the current item without triggering ConcurrentModificationException.",
    explanation: [
      "Forward Traversal: Moves single-direction through elements.",
      "Safe Deletion: iterator.remove() safely alters underlying collection during iteration.",
      "Universal API: Supported by all Collection types extending Iterable."
    ],
    codeSnippet: `import java.util.*;

public class IteratorExample {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("Java", "Python", "C++"));

        Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()) {
            String element = iterator.next();
            if(element.equals("Python")) {
                iterator.remove(); // Safe removal during loop!
            }
        }
        System.out.println("Filtered List: " + list); // ["Java", "C++"]
    }
}`,
    interviewLines: [
      "Iterator enables safe element removal during loop execution via iterator.remove().",
      "Direct collection modification inside a for-each loop triggers ConcurrentModificationException."
    ],
    keywords: [{ word: "Iterator Interface" }, { word: "hasNext()" }, { word: "next()" }, { word: "Safe Removal" }]
  },

  {
    id: "col-q10",
    question: "10. What is a PriorityQueue in Java?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "PriorityQueue is an unbounded queue backed by a Min-Binary Heap that processes elements based on natural priority or a Comparator.",
    properAnswer: "PriorityQueue orders elements according to their priority rather than FIFO insertion order. Internally backed by a Min-Heap array, the head of the queue is always the smallest element (or highest priority element defined by a custom Comparator).",
    explanation: [
      "Min-Heap Architecture: Smallest element resides at index 0 (peek() is O(1)).",
      "Logarithmic Operations: offer() and poll() take O(log N) time due to heap siftUp/siftDown rebalancing.",
      "Null Disallowance: Prohibits null elements because priority comparison fails on null."
    ],
    interviewLines: [
      "PriorityQueue maintains a Min-Heap where peek() gives the highest-priority element in O(1) time.",
      "Ideal for task scheduling, Dijkstra's algorithm, and top-K element problems."
    ],
    keywords: [{ word: "PriorityQueue" }, { word: "Min-Heap" }, { word: "Comparator Sorting" }]
  },

  {
    id: "col-q11",
    question: "11. What is the difference between HashMap and Hashtable?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "HashMap is unsynchronized (fast) and allows 1 null key. Hashtable is synchronized (slow legacy) and disallows null keys/values.",
    properAnswer: "HashMap is an unsynchronized, high-performance map allowing 1 null key and multiple null values. Hashtable is a legacy JDK 1.0 class with global synchronized locks on methods, causing severe thread contention, and disallowing any null keys or values.",
    explanation: [
      "Synchronization: Hashtable locks the entire map on every call; HashMap has zero locking overhead.",
      "Null Support: HashMap allows 1 null key & multiple null values; Hashtable throws NPE on any null.",
      "Modern Alternative: Replace Hashtable with ConcurrentHashMap for thread-safe concurrent access."
    ],
    tableData: {
      headers: ["Feature", "HashMap", "Hashtable"],
      rows: [
        ["Thread Safety", "Unsynchronized (Not Thread-Safe, Fast)", "Synchronized (Thread-Safe, Slow due to global locks)"],
        ["Null Support", "Allows 1 null key & multiple null values", "Disallows null keys AND null values (throws NPE)"],
        ["Inheritance", "Extends AbstractMap", "Extends legacy Dictionary class"],
        ["Iteration", "Uses Iterator (Fail-Fast)", "Uses Enumerator & Iterator"],
        ["Modern Status", "Standard modern Map choice", "Deprecated legacy class (use ConcurrentHashMap)"]
      ]
    },
    interviewLines: [
      "Hashtable uses heavy method-level synchronization; HashMap is fast but unsynchronized.",
      "Always use ConcurrentHashMap instead of Hashtable for concurrent multi-threaded workloads."
    ],
    keywords: [{ word: "HashMap" }, { word: "Hashtable" }, { word: "Synchronization" }, { word: "Null Key Support" }]
  },

  {
    id: "col-q12",
    question: "12. What is the difference between Iterator and ListIterator?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "Iterator is single-direction forward for all Collections; ListIterator is bi-directional (forward & backward) specifically for Lists.",
    properAnswer: "Iterator traverses elements forward-only across any Collection (List, Set, Queue). ListIterator extends Iterator specifically for List implementations, enabling bi-directional traversal (hasPrevious(), previous()), index inspection, and element replacement/addition.",
    explanation: [
      "Scope: Iterator applies to all Collection types; ListIterator applies ONLY to List.",
      "Direction: Iterator is forward-only; ListIterator moves forward and backward.",
      "Modification: ListIterator allows adding (add()) and replacing (set()) elements during iteration."
    ],
    tableData: {
      headers: ["Feature", "Iterator", "ListIterator"],
      rows: [
        ["Applicability", "Works with all Collection types (List, Set, Queue)", "Works ONLY with List implementations"],
        ["Direction", "Forward direction traversal only", "Bi-directional (Forward and Backward)"],
        ["Methods", "hasNext(), next(), remove()", "hasPrevious(), previous(), nextIndex(), add(), set()"],
        ["Modification", "Can only remove elements", "Can remove, replace (set), and insert (add) elements"]
      ]
    },
    interviewLines: [
      "ListIterator provides bi-directional traversal and list modifications specifically for List types.",
      "Use ListIterator when navigating backward or replacing items during list iteration."
    ],
    keywords: [{ word: "Iterator vs ListIterator" }, { word: "Bi-directional Traversal" }, { word: "hasPrevious()" }]
  },

  {
    id: "col-q13",
    question: "13. What is the difference between ArrayList and Vector in Java?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "ArrayList is unsynchronized, fast, and grows by 50%. Vector is legacy, synchronized, slow, and doubles its size (100% growth).",
    properAnswer: "ArrayList is a modern, unsynchronized dynamic array expanding capacity by 50% (1.5x factor). Vector is a legacy JDK 1.0 synchronized class expanding capacity by 100% (2x factor), incurring heavy method lock overhead.",
    explanation: [
      "Synchronization: Vector locks all methods via synchronized; ArrayList has no locking.",
      "Growth Factor: ArrayList grows by 50% (oldCapacity * 1.5); Vector doubles capacity (oldCapacity * 2).",
      "Legacy Status: Vector is legacy; ArrayList is the modern standard."
    ],
    interviewLines: [
      "Vector is a legacy synchronized dynamic array; ArrayList is the fast, unsynchronized modern replacement.",
      "Vector doubles its array size on resize, consuming double the memory compared to ArrayList's 1.5x growth."
    ],
    keywords: [{ word: "ArrayList vs Vector" }, { word: "Resizing Growth Factor" }, { word: "Legacy Vector" }]
  },

  // --------------------------------------------------------------------------
  // INTERMEDIATE QUESTIONS (14 - 25)
  // --------------------------------------------------------------------------
  {
    id: "col-q14",
    question: "14. How does HashMap work internally in Java?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Internal Working",
    summary: "HashMap uses an array of buckets Node<K,V>[]. Keys are mapped via hash code to bucket index (n-1)&hash. Collisions form linked lists or Red-Black trees.",
    properAnswer: "HashMap stores entries in an array of buckets Node<K,V>[tableIndex]. When put(key, value) is called, it calculates hash = key.hashCode() ^ (hash >>> 16) and computes index = (n - 1) & hash. If multiple keys hash to the same bucket, entries chain into a linked list. In Java 8+, if a bucket's list length reaches 8, it converts into a Red-Black Tree.",
    explanation: [
      "Hash Index Formula: index = (n - 1) & hash, where n is array capacity (power of 2).",
      "Bit-Spreading Hash Function: h ^ (h >>> 16) mixes high and low bits to minimize collisions.",
      "Java 8 Treeification: Linked lists exceeding 8 nodes treeify into Red-Black Trees (search drops from O(N) to O(log N))."
    ],
    codeSnippet: `import java.util.*;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();

        map.put(1, "Apple");
        map.put(2, "Banana");
        map.put(3, "Orange");

        System.out.println("Value for key 2: " + map.get(2)); // "Banana"

        for(Map.Entry<Integer, String> entry : map.entrySet()){
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
    interviewLines: [
      "HashMap maps keys to bucket indices using (n-1)&hash, chaining collisions into linked lists or Red-Black trees.",
      "Java 8 treeification caps worst-case collision lookup at O(log N)."
    ],
    keywords: [{ word: "HashMap Internals" }, { word: "Bucket Array" }, { word: "Hash Indexing" }, { word: "Treeification" }]
  },

  {
    id: "col-q15",
    question: "15. What is the load factor in HashMap, and why is it important?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Internal Working",
    summary: "Load factor (default 0.75) defines the capacity threshold ratio before HashMap triggers rehashing to double its bucket array size.",
    properAnswer: "The load factor is a measure of how full the HashMap is allowed to get before its capacity is automatically increased. The default load factor is 0.75, meaning when 75% of bucket capacity is filled, the map doubles its capacity and rehashes entries to prevent bucket collisions.",
    explanation: [
      "Threshold Formula: Threshold = Capacity * Load Factor (e.g. 16 * 0.75 = 12 entries).",
      "Time vs Space Trade-off: Lower load factor reduces collisions (faster lookup) but consumes more memory.",
      "0.75 Optimal Balance: 0.75 strikes the ideal statistical balance between time performance and memory overhead."
    ],
    interviewLines: [
      "Default load factor 0.75 balances O(1) lookup performance against memory expansion overhead.",
      "When element count exceeds Capacity * LoadFactor, HashMap triggers rehashing."
    ],
    keywords: [{ word: "Load Factor" }, { word: "Rehashing Threshold" }, { word: "0.75 Default" }]
  },

  {
    id: "col-q16",
    question: "16. What is rehashing in Java Collections?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Internal Working",
    summary: "Rehashing is doubling the HashMap array size and recalculating bucket indices for all existing entries when threshold is breached.",
    properAnswer: "Rehashing occurs when the number of elements in a hash-based collection exceeds the load factor threshold. Java creates a new internal array of double capacity (e.g. 16 -> 32) and recalculates the bucket index for every existing key, redistributing entries to maintain O(1) performance.",
    explanation: [
      "Array Doubling: New array capacity = oldCapacity * 2.",
      "Index Recalculation: Since array size n changed, (n - 1) & hash produces new bucket indices.",
      "Collision Reduction: Distributes tightly packed collision chains across newly allocated buckets."
    ],
    interviewLines: [
      "Rehashing doubles bucket array size and recalculates indices for all entries to keep collisions low.",
      "Pre-sizing HashMap with initial capacity avoids expensive runtime rehashing passes."
    ],
    keywords: [{ word: "Rehashing" }, { word: "Capacity Expansion" }, { word: "Index Redistribution" }]
  },

  {
    id: "col-q17",
    question: "17. Why must equals() and hashCode() be overridden together in Java?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "Overriding both guarantees that two equal objects produce the identical hash code, preventing duplicate entries and retrieval failures in HashMaps/HashSets.",
    properAnswer: "According to the Java Object contract: If two objects are equal according to equals(), they MUST return the exact same hashCode(). If only equals() is overridden, two logically identical objects will generate different hash codes, placing them in different buckets and making retrieval impossible.",
    explanation: [
      "Bucket Placement: HashMap uses hashCode() to locate the target bucket.",
      "Equality Inspection: HashMap uses equals() inside the target bucket to locate the exact match.",
      "Contract Violation Trap: If hashCode() differs, equals() will never even be called, breaking Set uniqueness!"
    ],
    interviewLines: [
      "If two objects are equal according to equals(), their hashCode() MUST be identical.",
      "Failing to override hashCode() alongside equals() breaks HashMap and HashSet lookups."
    ],
    keywords: [{ word: "equals() and hashCode() Contract" }, { word: "Bucket Lookup" }, { word: "HashSet Integrity" }]
  },

  {
    id: "col-q18",
    question: "18. What is Comparable in Java, and when is it used?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "Comparable<T> interface (java.lang) defines natural sorting order for a class via compareTo(T o).",
    properAnswer: "Comparable is an interface implemented by a domain class to define its natural sorting sequence. By implementing compareTo(T o), instances of the class can be sorted automatically by Collections.sort(list) or stored in sorted collections like TreeSet/TreeMap.",
    explanation: [
      "Natural Order: Defines single default sorting sequence directly inside the class source code.",
      "compareTo Return Contract: Returns negative int if this < o, zero if this == o, positive int if this > o.",
      "Intrusive Modification: Requires editing the class file directly to implement Comparable."
    ],
    interviewLines: [
      "Comparable defines natural sorting order inside the domain class via compareTo().",
      "Used by default by Collections.sort() and TreeSet/TreeMap."
    ],
    keywords: [{ word: "Comparable Interface" }, { word: "compareTo()" }, { word: "Natural Sorting" }]
  },

  {
    id: "col-q19",
    question: "19. How does the Comparator interface help in sorting collections?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Coding / Practical",
    summary: "Comparator<T> interface (java.util) enables custom, multiple sorting strategies external to the domain class via compare(T o1, T o2).",
    properAnswer: "Comparator allows developers to define custom, external sorting logic without modifying the original class. Multiple Comparator classes or lambdas can be created to sort objects by different fields (e.g. sort by Name, sort by Age, sort by Salary).",
    explanation: [
      "External Strategy: Does not require modifying the target class source code.",
      "Multiple Sorting Sequences: Can create endless sorting strategies for the same object.",
      "Lambda Ready: Can be instantiated concisely via Comparator.comparing(Student::getName)."
    ],
    codeSnippet: `import java.util.*;

class Student {
    int id;
    String name;

    Student(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

class SortByName implements Comparator<Student> {
    public int compare(Student a, Student b) {
        return a.name.compareTo(b.name);
    }
}

public class ComparatorExample {
    public static void main(String[] args) {
        List<Student> list = new ArrayList<>();
        list.add(new Student(3, "Nehal"));
        list.add(new Student(1, "Brent"));
        list.add(new Student(2, "Ashley"));

        // Custom sort using Comparator strategy
        Collections.sort(list, new SortByName());

        for(Student s : list) {
            System.out.println(s.id + ": " + s.name);
        }
    }
}`,
    interviewLines: [
      "Comparator enables multiple custom external sorting strategies without modifying the domain class.",
      "Use Comparator lambdas for flexible field-based sorting."
    ],
    keywords: [{ word: "Comparator Interface" }, { word: "compare()" }, { word: "Custom Sorting Strategy" }]
  },

  {
    id: "col-q20",
    question: "20. What are fail-fast iterators in Java Collections?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "Fail-fast iterators immediately throw ConcurrentModificationException if the collection is structurally modified during iteration.",
    properAnswer: "Fail-fast iterators (used in ArrayList, HashSet, HashMap) monitor an internal modCount variable. If the underlying collection is structurally modified (add/remove) during iteration by any method other than iterator.remove(), the iterator immediately throws ConcurrentModificationException.",
    explanation: [
      "modCount Check: Compares expectedModCount == modCount on every next() invocation.",
      "Early Failure: Prevents non-deterministic behavior and silent corruption during concurrent loop mutation.",
      "Standard Collections: All standard java.util collection iterators are fail-fast."
    ],
    interviewLines: [
      "Fail-fast iterators throw ConcurrentModificationException if collection modCount changes during loop.",
      "Never mutate a collection directly inside a loop; use iterator.remove() instead."
    ],
    keywords: [{ word: "Fail-Fast Iterators" }, { word: "ConcurrentModificationException" }, { word: "modCount" }]
  },

  {
    id: "col-q21",
    question: "21. What is CopyOnWriteArrayList, and when should it be used?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "CopyOnWriteArrayList is a thread-safe List where writes clone the underlying array, making reads lock-free and fast.",
    properAnswer: "CopyOnWriteArrayList (java.util.concurrent) is a thread-safe variant of ArrayList. Every write operation (add, set, remove) creates a fresh copy of the internal Object[] array. Reads lock zero resources, making it exceptionally fast for read-heavy, write-rare multi-threaded scenarios.",
    explanation: [
      "Copy-on-Write Strategy: Mutating operations lock and copy the whole array buffer.",
      "Lock-Free Reads: Reading threads access the immutable array snapshot without locks.",
      "Weakly Consistent Iterators: Iterator operates on snapshot array, never throwing ConcurrentModificationException."
    ],
    interviewLines: [
      "CopyOnWriteArrayList clones array on writes, providing ultra-fast lock-free reads for read-heavy scenarios.",
      "Avoid when write operations are frequent due to array allocation and GC memory overhead."
    ],
    keywords: [{ word: "CopyOnWriteArrayList" }, { word: "Lock-Free Reads" }, { word: "Snapshot Iteration" }]
  },

  {
    id: "col-q22",
    question: "22. How does TreeMap maintain the sorted order of elements?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Internal Working",
    summary: "TreeMap uses a self-balancing Red-Black Binary Search Tree to maintain sorted keys in logarithmic time O(log N).",
    properAnswer: "TreeMap stores key-value pairs in a Red-Black Tree. Whenever a key is inserted, updated, or removed, the tree performs rotations and color rebalancing to maintain logarithmic height balance, guaranteeing O(log N) performance for search and insertion.",
    explanation: [
      "Red-Black Tree: Self-balancing BST guaranteeing height is bounded at 2 * log(N + 1).",
      "Sorting Strategy: Orders keys by natural order (Comparable) or custom Comparator.",
      "NavigableMap API: Enables range methods like subMap(), headMap(), ceilingKey(), and floorKey()."
    ],
    interviewLines: [
      "TreeMap maintains key order via a self-balancing Red-Black Tree with O(log N) complexity.",
      "Disallows null keys because tree balancing requires key comparison."
    ],
    keywords: [{ word: "TreeMap Internals" }, { word: "Red-Black Tree" }, { word: "NavigableMap" }]
  },

  {
    id: "col-q23",
    question: "23. What are synchronized collections in Java?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "Synchronized collections wrap unsynchronized collections with synchronized wrapper methods using Collections.synchronizedList/Map.",
    properAnswer: "Synchronized collections are thread-safe wrappers created via utility methods like Collections.synchronizedList(list) or Collections.synchronizedMap(map). They wrap every method with a synchronized(mutex) block to enforce single-thread access.",
    explanation: [
      "Mutex Locking: Locks the wrapper object on every method invocation.",
      "Coarse-Grained Locking: Can cause thread bottlenecks under high concurrency.",
      "Explicit Iteration Lock: Iterating requires manual external synchronization block on the collection instance."
    ],
    interviewLines: [
      "Synchronized collections use coarse-grained object locks; prefer java.util.concurrent classes for high concurrency.",
      "Must manually synchronize on the collection during iteration to avoid race conditions."
    ],
    keywords: [{ word: "Synchronized Collections" }, { word: "Collections.synchronizedMap" }, { word: "Mutex Lock" }]
  },

  {
    id: "col-q24",
    question: "24. What is the difference between Comparable and Comparator?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "Comparable defines single natural ordering inside domain class (compareTo). Comparator defines multiple custom sorting strategies outside (compare).",
    properAnswer: "Comparable is implemented inside the target domain class to define its default natural sort sequence. Comparator is implemented in separate classes or lambdas to provide flexible, multiple custom sorting orders without modifying the domain class.",
    tableData: {
      headers: ["Feature", "Comparable", "Comparator"],
      rows: [
        ["Package", "java.lang.Comparable", "java.util.Comparator"],
        ["Method", "compareTo(T o)", "compare(T o1, T o2)"],
        ["Modifies Class?", "YES (Requires modifying class source code)", "NO (Defined externally in separate classes/lambdas)"],
        ["Sorting Strategies", "Single natural sorting sequence", "Multiple custom sorting strategies"],
        ["Default API Use", "Collections.sort(list)", "Collections.sort(list, comparator)"]
      ]
    },
    interviewLines: [
      "Comparable modifies class source for natural sorting; Comparator creates external custom sort rules.",
      "Use Comparator lambdas for flexible UI column sorting."
    ],
    keywords: [{ word: "Comparable vs Comparator" }, { word: "Natural Order" }, { word: "External Strategy" }]
  },

  {
    id: "col-q25",
    question: "25. What is the difference between HashSet, LinkedHashSet, and TreeSet?",
    topic: "Collections Framework",
    level: "Intermediate",
    type: "Theory",
    summary: "HashSet is unordered O(1); LinkedHashSet preserves insertion order O(1); TreeSet keeps elements sorted O(log N).",
    properAnswer: "HashSet provides fast O(1) performance with zero ordering guarantees. LinkedHashSet maintains exact insertion order using a doubly-linked hash table. TreeSet sorts elements ascendingly using a Red-Black Tree in O(log N) time.",
    tableData: {
      headers: ["Feature", "HashSet", "LinkedHashSet", "TreeSet"],
      rows: [
        ["Underlying Data Structure", "HashMap", "LinkedHashMap (Hash Table + Doubly-Linked List)", "Red-Black Tree (TreeMap)"],
        ["Ordering Guarantee", "Unordered (Unpredictable sequence)", "Preserves exact Insertion Order", "Ascending Sorted Order"],
        ["Time Complexity", "O(1) average lookup", "O(1) average lookup", "O(log N) logarithmic lookup"],
        ["Null Support", "Allows 1 null element", "Allows 1 null element", "Disallows null (throws NPE)"]
      ]
    },
    interviewLines: [
      "HashSet for raw speed; LinkedHashSet for insertion order; TreeSet for sorted order.",
      "TreeSet disallows null elements completely."
    ],
    keywords: [{ word: "HashSet vs LinkedHashSet vs TreeSet" }, { word: "Ordering Trade-offs" }, { word: "Red-Black Tree Set" }]
  },

  // --------------------------------------------------------------------------
  // EXPERIENCED / ADVANCED QUESTIONS (26 - 37)
  // --------------------------------------------------------------------------
  {
    id: "col-q26",
    question: "26. How does HashMap handle collisions internally in Java 8 and later?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "Collisions initially form linked lists. If bucket node count reaches 8 and array capacity >= 64, it treeifies into a Red-Black Tree O(log N).",
    properAnswer: "In Java 8+, when keys collide into the same bucket, HashMap chains them in a singly-linked list. If the number of nodes in a bucket reaches TREEIFY_THRESHOLD (8) and table capacity is >= 64, HashMap converts the bucket list into a balanced Red-Black Tree, improving lookup from O(N) to O(log N). If nodes drop to 6 during removal, it untreeifies back to a list.",
    explanation: [
      "TREEIFY_THRESHOLD = 8: Threshold where list degrades to tree for performance defense.",
      "MIN_TREEIFY_CAPACITY = 64: Table capacity required before treeifying (otherwise table resizes instead).",
      "UNTREEIFY_THRESHOLD = 6: Shrinks tree back to simple linked list when elements decrease."
    ],
    interviewLines: [
      "Java 8 converts overloaded hash buckets (>= 8 nodes) into Red-Black Trees, capping collision lookup at O(log N).",
      "Protects against Denial-of-Service (DoS) hash collision attacks."
    ],
    keywords: [{ word: "Java 8 Treeification" }, { word: "TREEIFY_THRESHOLD" }, { word: "O(log N) Collision Defense" }]
  },

  {
    id: "col-q27",
    question: "27. How does ConcurrentHashMap achieve thread safety without locking the entire map?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "Java 8 ConcurrentHashMap uses CAS (Compare-And-Swap) for empty bucket writes and synchronized bucket-head locking for collisions.",
    properAnswer: "ConcurrentHashMap (Java 8+) eliminated legacy Segment locks. For empty buckets, it uses atomic CAS operations without locks. For bucket collisions, it locks ONLY the head node of that specific bucket bucket using synchronized(node). Reads are completely lock-free via volatile node value pointers.",
    explanation: [
      "CAS Operations: Uses sun.misc.Unsafe CAS to insert head node into empty buckets with zero lock overhead.",
      "Bucket-Head Synchronized Lock: Locks only the first node of colliding bucket chain, allowing concurrent writes to other buckets.",
      "Volatile Read Visibility: Node value and next pointers are declared volatile, guaranteeing visibility for lock-free get() reads."
    ],
    interviewLines: [
      "ConcurrentHashMap uses CAS for empty buckets and bucket-head locking for collisions, keeping reads lock-free.",
      "Provides high throughput concurrency by eliminating global map locks."
    ],
    keywords: [{ word: "ConcurrentHashMap Internals" }, { word: "CAS Operations" }, { word: "Bucket-Head Locks" }, { word: "Lock-Free Reads" }]
  },

  {
    id: "col-q28",
    question: "28. What are the internal differences between ArrayList growth and LinkedList node allocation?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "ArrayList resizes by copying contiguous array buffers (1.5x factor). LinkedList allocates heap Node objects (24-byte overhead) on every insert.",
    properAnswer: "ArrayList allocates contiguous memory arrays. When full, it allocates a new array 1.5x larger and executes System.arraycopy(). LinkedList allocates a individual 24-byte Node object on the heap for every element, linking prev/next pointers, introducing high GC memory churn.",
    explanation: [
      "ArrayList Resizing: Cost is amortized O(1), but triggers occasional System.arraycopy() memory copy operations.",
      "LinkedList Memory Penalty: Each Node object consumes 24 bytes (16-byte object header + two 4-byte references).",
      "CPU Cache Locality: ArrayList elements sit adjacent in L1/L2 cache; LinkedList nodes are scattered randomly across heap memory."
    ],
    interviewLines: [
      "ArrayList contiguous arrays offer superior L1/L2 CPU cache locality over scattered LinkedList heap nodes.",
      "LinkedList node allocation triggers GC memory pressure under high insertion throughput."
    ],
    keywords: [{ word: "ArrayList Memory Copy" }, { word: "LinkedList Node Overhead" }, { word: "CPU Cache Locality" }]
  },

  {
    id: "col-q29",
    question: "29. How are fail-fast iterators implemented internally in Java Collections?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "Iterators store expectedModCount = modCount at creation. Every next()/remove() invocation validates expectedModCount == modCount.",
    properAnswer: "Collections maintain an internal field transient int modCount incremented on structural changes. When an iterator is created, it captures int expectedModCount = modCount. On every next() call, it checks checkForComodification(). If modCount != expectedModCount, it throws ConcurrentModificationException.",
    explanation: [
      "modCount Counter: Incremented by add(), remove(), clear() in the collection.",
      "expectedModCount Snapshot: Local variable in Iterator instance.",
      "checkForComodification(): Throws ConcurrentModificationException immediately on mismatch."
    ],
    interviewLines: [
      "Fail-fast behavior is driven by modCount validation against expectedModCount on every next() step.",
      "Detects structural mutations to prevent undefined iteration state."
    ],
    keywords: [{ word: "modCount" }, { word: "expectedModCount" }, { word: "checkForComodification" }]
  },

  {
    id: "col-q30",
    question: "30. How does TreeMap maintain sorted order and guarantee logarithmic time complexity?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "TreeMap uses Red-Black Tree invariants (root is black, no consecutive red nodes, equal black-height) + tree rotations to guarantee O(log N).",
    properAnswer: "TreeMap implements a Red-Black Tree where every node is colored Red or Black. By enforcing strict invariants (e.g. no two consecutive red nodes, all paths from root to leaf have identical black-node counts), the tree automatically executes left/right rotations during insertion/deletion, keeping tree height <= 2 * log(N+1).",
    explanation: [
      "Height Bound: Height is guaranteed to never exceed 2 * log2(N + 1).",
      "Tree Rotations: Left and right rotations rebalance subtree branches when color invariants are violated.",
      "O(log N) Guarantee: Lookup, insertion, and deletion are bounded strictly to O(log N)."
    ],
    interviewLines: [
      "TreeMap guarantees O(log N) by enforcing Red-Black tree color invariants and tree rotations.",
      "Keeps tree height balanced automatically during mutations."
    ],
    keywords: [{ word: "Red-Black Invariants" }, { word: "Tree Rotations" }, { word: "Logarithmic Height Bound" }]
  },

  {
    id: "col-q31",
    question: "31. What are weakly consistent iterators in concurrent collections?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "Weakly consistent iterators (ConcurrentHashMap) never throw ConcurrentModificationException and reflect collection state at or after iterator creation.",
    properAnswer: "Weakly consistent iterators are used by java.util.concurrent collections (e.g. ConcurrentHashMap, ConcurrentSkipListMap). They operate on volatile data pointers, never throw ConcurrentModificationException, permit concurrent updates, and guarantee to traverse elements as they existed at creation.",
    explanation: [
      "No Exception: Never throws ConcurrentModificationException.",
      "Concurrent Loop Mutation: Collection can be modified by other threads while iterator loops.",
      "Snapshot Traversal: Traverses state safely without locking write operations."
    ],
    interviewLines: [
      "Weakly consistent iterators allow concurrent loop traversal without throwing ConcurrentModificationException.",
      "Used by ConcurrentHashMap to permit concurrent reads and writes."
    ],
    keywords: [{ word: "Weakly Consistent Iterators" }, { word: "Concurrent Traversal" }, { word: "Zero Lock Iterator" }]
  },

  {
    id: "col-q32",
    question: "32. What are the performance trade-offs of using CopyOnWriteArrayList?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "Trade-off: Fast lock-free O(1) reads vs slow O(N) array-copy write operations and heavy GC heap allocation.",
    properAnswer: "CopyOnWriteArrayList provides lock-free reads with maximum speed, but every write operation copies the entire underlying array. If writes occur frequently, performance degrades drastically due to O(N) array copy operations and heavy garbage collection memory churn.",
    explanation: [
      "Read Benefit: Reads take zero locks and operate on immutable snapshot array.",
      "Write Cost: Writes acquire ReentrantLock, copy array via Arrays.copyOf(), mutate copy, and swap array reference.",
      "Best Fit Scenario: Listener lists, configuration flags, or event handlers (read-heavy, write-rare)."
    ],
    interviewLines: [
      "CopyOnWriteArrayList trades slow array-copy writes for lightning-fast lock-free reads.",
      "Never use CopyOnWriteArrayList in write-heavy workflows."
    ],
    keywords: [{ word: "CopyOnWrite Trade-offs" }, { word: "Arrays.copyOf" }, { word: "Read-Heavy Optimization" }]
  },

  {
    id: "col-q33",
    question: "33. How does HashSet internally use HashMap?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "HashSet delegates directly to a private transient HashMap<E, Object> map, storing elements as map keys with dummy PRESENT value.",
    properAnswer: "HashSet is a wrapper around an internal HashMap instance: private transient HashMap<E,Object> map. When hashSet.add(e) is called, it executes map.put(e, PRESENT), where PRESENT is a dummy static Object constant. Uniqueness is guaranteed because HashMap keys are strictly unique.",
    explanation: [
      "Backing HashMap: private transient HashMap<E,Object> map = new HashMap<>();",
      "Dummy Object PRESENT: private static final Object PRESENT = new Object();",
      "Add Delegation: public boolean add(E e) { return map.put(e, PRESENT) == null; }"
    ],
    interviewLines: [
      "HashSet is backed internally by HashMap, storing elements as keys mapped to a dummy PRESENT value.",
      "HashSet add() returns true if backing map.put() returns null."
    ],
    keywords: [{ word: "HashSet Backing Store" }, { word: "HashMap Delegation" }, { word: "Dummy PRESENT Constant" }]
  },

  {
    id: "col-q34",
    question: "34. How does Java determine the bucket index in a HashMap?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "Index calculation: 1) hash = key.hashCode() ^ (hash >>> 16), 2) index = (n - 1) & hash, where n is array capacity.",
    properAnswer: "HashMap determines bucket index in 2 steps: First, it applies bit-spreading hash = (h = key.hashCode()) ^ (h >>> 16) to mix high bits into low bits. Second, it computes index = (capacity - 1) & hash. Bitwise AND & replaces expensive modulo (%) for power-of-2 capacity sizes.",
    explanation: [
      "Bit-Spreading: (h ^ (h >>> 16)) prevents bucket collisions when hash codes differ only in upper bits.",
      "Bitwise Indexing: (n - 1) & hash works as an ultra-fast equivalent to hash % n because n is guaranteed to be a power of 2.",
      "Null Key Index: Null key always maps to bucket index 0."
    ],
    interviewLines: [
      "HashMap uses (n-1)&hash bitwise operation for fast bucket index calculation.",
      "Requires array capacity to remain a power of 2."
    ],
    keywords: [{ word: "Bucket Index Calculation" }, { word: "Bitwise AND Indexing" }, { word: "Bit Spreading" }]
  },

  {
    id: "col-q35",
    question: "35. What are the main performance considerations when choosing a collection implementation?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "Consider: Time complexity of core operations (read/write/delete), ordering requirements, memory overhead, and thread concurrency demands.",
    properAnswer: "Selecting optimal collection implementations requires evaluating 4 metrics: 1) Operation Time Complexity (O(1) vs O(log N) vs O(N)), 2) Ordering Constraints (Unordered vs Insertion Order vs Sorted), 3) Memory Overhead (Array vs Node pointer overhead), 4) Thread Concurrency (Unsynchronized vs ConcurrentHashMap/COWAL).",
    explanation: [
      "Read vs Write Ratio: ArrayList/CopyOnWriteArrayList for reads; LinkedList/ConcurrentHashMap for balanced writes.",
      "Order Demands: HashSet (speed) vs LinkedHashSet (insertion order) vs TreeSet (sorted order).",
      "Concurrency Needs: ConcurrentHashMap vs synchronized wrapper vs thread-confined local collections."
    ],
    interviewLines: [
      "Evaluate time complexity, ordering guarantees, memory overhead, and thread concurrency before picking a collection.",
      "Profile real application workflows rather than assuming data structure defaults."
    ],
    keywords: [{ word: "Performance Selection Matrix" }, { word: "Time vs Space Trade-offs" }, { word: "Concurrency Demands" }]
  },

  {
    id: "col-q36",
    question: "36. What is the difference between HashMap and ConcurrentHashMap?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "HashMap is unsynchronized (not thread-safe) allowing null key/values. ConcurrentHashMap is thread-safe using CAS + bucket locks, forbidding nulls.",
    properAnswer: "HashMap is designed for single-threaded usage, permitting 1 null key and multiple null values, but risks infinite loops/corruption under concurrent writes. ConcurrentHashMap is thread-safe for high concurrency, using CAS and bucket-head locking, and strictly forbids null keys and null values.",
    tableData: {
      headers: ["Feature", "HashMap", "ConcurrentHashMap"],
      rows: [
        ["Thread Safety", "Unsynchronized (Not Thread-Safe)", "Thread-Safe (High Concurrency via CAS & Bucket Locks)"],
        ["Locking Mechanism", "None", "CAS for empty buckets + bucket-head node lock"],
        ["Null Keys & Values", "Allows 1 null key & multiple null values", "Disallows null keys AND null values (throws NPE)"],
        ["Iterator Type", "Fail-Fast (throws ConcurrentModificationException)", "Weakly Consistent (never throws ConcurrentModificationException)"],
        ["Performance", "Fastest for single-thread execution", "Fastest for multi-threaded concurrent access"]
      ]
    },
    interviewLines: [
      "HashMap is unsynchronized; ConcurrentHashMap uses fine-grained CAS and bucket locks for thread safety.",
      "ConcurrentHashMap disallows nulls to prevent concurrent lookup ambiguity."
    ],
    keywords: [{ word: "HashMap vs ConcurrentHashMap" }, { word: "Bucket Lock Granularity" }, { word: "Thread Safety" }]
  },

  {
    id: "col-q37",
    question: "37. How does ConcurrentHashMap handle null keys and values, and why?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "ConcurrentHashMap forbids null keys & values to prevent ambiguity in multi-threaded environments where get(key)==null could mean key missing or mapped to null.",
    properAnswer: "ConcurrentHashMap disallows null keys and null values. In a concurrent multi-threaded map, if map.get(key) returns null, you cannot distinguish whether the key was absent or mapped to null. Calling map.containsKey(key) to check would be unreliable because another thread could mutate the map between get() and containsKey().",
    explanation: [
      "Elimination of Ambiguity: In single-threaded HashMap, containsKey() can verify null. In multi-threaded code, checking containsKey() creates a race condition!",
      "Race Condition Trap: Thread A calls get(k)->null, then calls containsKey(k). Thread B removes k in between! Result is unpredictable.",
      "Strict Null Rejection: ConcurrentHashMap throws NullPointerException immediately if key or value is null."
    ],
    interviewLines: [
      "ConcurrentHashMap disallows nulls to eliminate concurrent ambiguity between missing keys and null values.",
      "Prevents race conditions between get() and containsKey() checks."
    ],
    keywords: [{ word: "Null Disallowance Rationale" }, { word: "Concurrent Ambiguity" }, { word: "Race Condition Prevention" }]
  },

  // --------------------------------------------------------------------------
  // SCENARIO-BASED QUESTIONS (38 - 49)
  // --------------------------------------------------------------------------
  {
    id: "col-q38",
    question: "38. When would you use an ArrayList instead of a LinkedList?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use ArrayList when application requires frequent index lookups (get(i)) or iteration, with infrequent middle modifications.",
    properAnswer: "I select ArrayList for read-heavy workflows where indexing get(i) is frequent, and element insertions occur primarily at the end. ArrayList offers O(1) random access and superior CPU cache locality, making it drastically faster and more memory-efficient than LinkedList.",
    explanation: [
      "Read-Heavy Workflows: Fast O(1) index-based array lookups.",
      "Memory Efficiency: Contiguous array uses far less memory than 24-byte LinkedList nodes.",
      "Cache Locality: CPU hardware prefetches contiguous array memory into L1/L2 caches."
    ],
    interviewLines: [
      "Choose ArrayList when read and iteration operations dominate over middle list insertions.",
      "Contiguous memory buffers optimize CPU hardware cache hits."
    ],
    keywords: [{ word: "ArrayList Selection" }, { word: "Read-Heavy Workflows" }, { word: "Index Access" }]
  },

  {
    id: "col-q39",
    question: "39. When should you choose ConcurrentHashMap over HashMap?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Choose ConcurrentHashMap whenever a Map is accessed and modified by multiple concurrent threads (e.g. shared caches, counters).",
    properAnswer: "I choose ConcurrentHashMap when building multi-threaded applications where multiple worker threads concurrently read, insert, or update key-value pairs (e.g. shared caches, rate-limit counters, user sessions). It provides thread safety without global lock bottlenecks.",
    explanation: [
      "Multi-Threaded Safety: Eliminates data corruption and infinite loops in concurrent environments.",
      "High Concurrency Throughput: Bucket-level locking lets threads update different buckets simultaneously.",
      "Atomic Operations: Built-in atomic methods like putIfAbsent(), computeIfAbsent(), and merge()."
    ],
    interviewLines: [
      "Use ConcurrentHashMap for shared multi-threaded data access to ensure thread safety without lock contention.",
      "Atomic computeIfAbsent() prevents duplicate expensive computation in concurrent caches."
    ],
    keywords: [{ word: "ConcurrentHashMap Selection" }, { word: "Shared Caches" }, { word: "Atomic Updates" }]
  },

  {
    id: "col-q40",
    question: "40. How would you implement a thread-safe cache using Java collections?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use ConcurrentHashMap combined with computeIfAbsent() for atomic lazy-loading thread-safe caching.",
    properAnswer: "I implement a thread-safe cache using ConcurrentHashMap as the storage layer. To prevent cache-stampede (where multiple threads compute the same missing key simultaneously), I use map.computeIfAbsent(key, mappingFunction) to atomically compute and insert values only once.",
    explanation: [
      "Storage Engine: ConcurrentHashMap guarantees thread-safe read/write operations.",
      "Atomic Compute: computeIfAbsent() locks only the destination bucket during calculation.",
      "Eviction Strategy: Combine with ScheduledExecutorService or LinkedHashMap for LRU/TTL eviction."
    ],
    interviewLines: [
      "Implement thread-safe caches using ConcurrentHashMap and computeIfAbsent() to prevent duplicate computation.",
      "Bucket-level locking guarantees thread safety with high throughput."
    ],
    keywords: [{ word: "Thread-Safe Cache" }, { word: "computeIfAbsent()" }, { word: "Cache Stampede Defense" }]
  },

  {
    id: "col-q41",
    question: "41. Which collection would you use for LRU caching?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Coding / Practical",
    summary: "Use LinkedHashMap with accessOrder=true and override removeEldestEntry() to build a production LRU (Least Recently Used) cache.",
    properAnswer: "I use LinkedHashMap configured with access-order mode (new LinkedHashMap<>(capacity, 0.75f, true)). When accessOrder is true, get() and put() move accessed entries to the tail. Overriding removeEldestEntry() automatically evicts the oldest entry when size exceeds capacity.",
    explanation: [
      "Access-Order Flag: Constructor parameter accessOrder=true tracks entry usage sequence.",
      "Tail Movement: Accessing an item moves it to the tail (most recently used).",
      "Automatic Eviction: Overriding removeEldestEntry(eldest) returns size() > capacity to remove head item."
    ],
    codeSnippet: `import java.util.*;

class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        // capacity, loadFactor, accessOrder = true (LRU Mode!)
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity; // Automatically evicts LRU entry!
    }
}

public class LRUExample {
    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3);

        cache.put(1, "A");
        cache.put(2, "B");
        cache.put(3, "C");
        cache.get(1);     // Access 1 ➔ Moves 1 to tail (2 is now LRU!)
        cache.put(4, "D"); // Capacity exceeded ➔ Evicts 2 ("B")!

        System.out.println("LRU Cache State: " + cache); // {3=C, 1=A, 4=D}
    }
}`,
    interviewLines: [
      "LinkedHashMap with accessOrder=true and removeEldestEntry() forms a clean, production-grade LRU cache.",
      "Accessing entries moves them to the tail, maintaining least-recently-used items at the head."
    ],
    keywords: [{ word: "LRU Cache" }, { word: "LinkedHashMap accessOrder" }, { word: "removeEldestEntry" }]
  },

  {
    id: "col-q42",
    question: "42. When would you prefer CopyOnWriteArrayList?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Prefer CopyOnWriteArrayList when reads are frequent, writes are rare, and thread safety with snapshot iteration is required.",
    properAnswer: "I use CopyOnWriteArrayList for read-heavy, write-rare multi-threaded scenarios such as registered Observer/Event Listener lists, system configuration flags, or security authority rules. It provides fast lock-free reads and safe iteration without ConcurrentModificationException.",
    explanation: [
      "Event Observer Lists: Subscribers change rarely, but event notifications fire thousands of times per second.",
      "Lock-Free Traversal: Iterators operate on immutable snapshots, ignoring concurrent subscriber additions.",
      "Write Isolation: Mutating operations clone the array, keeping readers unaffected."
    ],
    interviewLines: [
      "Use CopyOnWriteArrayList for event listeners and configuration lists where reads vastly outnumber writes.",
      "Iterators operate on immutable snapshots without lock contention."
    ],
    keywords: [{ word: "Observer Pattern Cache" }, { word: "Event Listener List" }, { word: "Snapshot Traversal" }]
  },

  {
    id: "col-q43",
    question: "43. How would you remove duplicate elements from a large list while preserving insertion order?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Pass the list into a LinkedHashSet to eliminate duplicates while preserving insertion order, then convert back to ArrayList.",
    properAnswer: "I pass the original List into a LinkedHashSet (new LinkedHashSet<>(originalList)). LinkedHashSet filters out duplicates via hash lookups while maintaining the exact original insertion sequence. Finally, I wrap it back into a new ArrayList if List interface is required.",
    explanation: [
      "Duplicate Removal: Hash table mechanics filter duplicates in O(1) time per item.",
      "Order Preservation: Doubly-linked list maintains exact insertion order.",
      "Conversion Code: List<String> deduplicated = new ArrayList<>(new LinkedHashSet<>(originalList));"
    ],
    interviewLines: [
      "LinkedHashSet removes duplicates in O(N) time while preserving original element insertion order.",
      "Wrap inside new ArrayList<>() for downstream list interface consumers."
    ],
    keywords: [{ word: "LinkedHashSet Deduplication" }, { word: "Preserving Insertion Order" }, { word: "List Conversion" }]
  },

  {
    id: "col-q44",
    question: "44. Which Java collection would you use to maintain sorted elements while frequently inserting new data?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use TreeSet (for unique elements) or TreeMap (for key-value pairs) to maintain automatic logarithmic O(log N) sorting.",
    properAnswer: "I use TreeSet (or TreeMap for key-value pairs). Backed by a self-balancing Red-Black Tree, it automatically positions newly inserted items into sorted order in O(log N) time, eliminating the need to execute manual sorting calls like Collections.sort() after every insertion.",
    explanation: [
      "Automatic Sorting: Every insertion immediately balances into correct sorted position.",
      "Logarithmic Insertion: Insertion takes O(log N) time.",
      "Continuous Sorted Order: Guarantees collection remains sorted at all times."
    ],
    interviewLines: [
      "TreeSet and TreeMap maintain continuous sorted order in O(log N) insertion time.",
      "Avoids executing expensive O(N log N) Collections.sort() calls after every insert."
    ],
    keywords: [{ word: "TreeSet Sorting" }, { word: "Continuous Sorted Order" }, { word: "Red-Black Tree Insert" }]
  },

  {
    id: "col-q45",
    question: "45. How would you design a leaderboard system where scores must always remain sorted?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use TreeMap<Score, List<PlayerId>> or ConcurrentSkipListMap for high-concurrency real-time sorted leaderboard scores.",
    properAnswer: "I use a TreeMap<Integer, List<PlayerId>> (configured with reverse Comparator for descending scores). Key represents score, value holds players with that score. For multi-threaded gaming backends, I use ConcurrentSkipListMap to allow concurrent lock-free leaderboard updates.",
    explanation: [
      "Descending Order: Use TreeMap<>(Comparator.reverseOrder()) to keep highest scores at the top.",
      "Duplicate Scores: Map score to List<PlayerId> to handle ties.",
      "Concurrent Leaderboards: Use ConcurrentSkipListMap for multi-threaded real-time updates."
    ],
    interviewLines: [
      "Design leaderboards using TreeMap or ConcurrentSkipListMap with reverse ordering to maintain sorted scores.",
      "Map score keys to Player ID lists to handle tied scores gracefully."
    ],
    keywords: [{ word: "Leaderboard Design" }, { word: "TreeMap Reverse Order" }, { word: "ConcurrentSkipListMap" }]
  },

  {
    id: "col-q46",
    question: "46. Which collection would you use if multiple threads need to read data frequently but write operations are rare?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use CopyOnWriteArrayList (for lists) or CopyOnWriteArraySet (for unique sets) for lock-free read-heavy scenarios.",
    properAnswer: "I use CopyOnWriteArrayList (or CopyOnWriteArraySet). Writes clone the underlying array, allowing reading threads to traverse data without locking or experiencing ConcurrentModificationException.",
    explanation: [
      "Zero Read Locking: Reading threads experience zero lock contention.",
      "Safe Concurrency: Writes update a newly cloned array before swapping pointer.",
      "Use Case: Feature flags, routing rules, observer notification lists."
    ],
    interviewLines: [
      "CopyOnWriteArrayList delivers maximum read throughput for read-heavy, write-rare multi-threaded systems.",
      "Readers bypass lock contention entirely."
    ],
    keywords: [{ word: "CopyOnWrite Selection" }, { word: "Zero Read Lock" }, { word: "High Read Throughput" }]
  },

  {
    id: "col-q47",
    question: "47. When would you use PriorityQueue in Java?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use PriorityQueue when processing items based on importance/priority rather than insertion order (e.g. Job Schedulers, Dijkstra's algorithm).",
    properAnswer: "I use PriorityQueue when tasks or data items must be processed based on priority order rather than arrival time. Backed by a Min-Heap, peek() retrieves the highest priority item in O(1) time. Key applications include Task Schedulers, Huffman Coding, and Dijkstra's Shortest Path algorithm.",
    explanation: [
      "Priority Processing: Processes elements by natural order or custom Comparator.",
      "O(1) Top Access: Head of queue always contains highest-priority item.",
      "Min-Heap Efficiency: offer() and poll() run in logarithmic O(log N) time."
    ],
    interviewLines: [
      "Use PriorityQueue for priority task scheduling and graph algorithms like Dijkstra's.",
      "Min-heap ensures the highest priority element is immediately available at index 0."
    ],
    keywords: [{ word: "Priority Queue Use Cases" }, { word: "Job Scheduler" }, { word: "Dijkstra Algorithm" }]
  },

  {
    id: "col-q48",
    question: "48. Which collection would you use to ensure unique elements while maintaining insertion order?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use LinkedHashSet to guarantee element uniqueness while preserving exact insertion sequence.",
    properAnswer: "I use LinkedHashSet. It combines Hash Table bucket uniqueness with a Doubly-Linked List running through all items. This guarantees that duplicate items are rejected while iteration preserves the exact insertion sequence.",
    explanation: [
      "Uniqueness Guarantee: Hash Table buckets prevent duplicate entries.",
      "Insertion Sequence: Doubly-linked list maintains exact insertion order.",
      "O(1) Performance: Maintains fast O(1) add, remove, and contains performance."
    ],
    interviewLines: [
      "LinkedHashSet delivers O(1) duplicate prevention while preserving exact element insertion order.",
      "Ideal for unique user search history and breadcrumb tracking."
    ],
    keywords: [{ word: "LinkedHashSet" }, { word: "Unique Elements" }, { word: "Insertion Sequence" }]
  },

  {
    id: "col-q49",
    question: "49. You need to count the frequency of millions of words in a large dataset. Which Java collection would you use?",
    topic: "Collections Framework",
    level: "Scenario-Based",
    type: "Scenario",
    summary: "Use HashMap<String, Integer> (or ConcurrentHashMap for multi-threading) combined with map.merge() or compute() for O(1) word frequency counting.",
    properAnswer: "I use HashMap<String, Integer> for single-threaded processing (or ConcurrentHashMap for multi-threaded parallel stream processing). I increment word counts concisely using map.merge(word, 1, Integer::sum), which offers O(1) average lookup and update speed for millions of words.",
    explanation: [
      "Fast O(1) Counting: HashMap provides average O(1) key lookup and update.",
      "Concise Merge API: map.merge(word, 1, Integer::sum) initializes word count to 1 or increments existing count atomically.",
      "Multi-Threaded Parallelism: ConcurrentHashMap enables parallel worker threads to process text chunks simultaneously."
    ],
    codeSnippet: `import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class WordFrequencyCounter {
    public static void main(String[] args) {
        List<String> words = List.of("apple", "banana", "apple", "cherry", "banana", "apple");

        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String word : words) {
            // High-performance frequency counter using map.merge()
            frequencyMap.merge(word, 1, Integer::sum);
        }

        System.out.println("Word Frequencies: " + frequencyMap); // {apple=3, banana=2, cherry=1}
    }
}`,
    interviewLines: [
      "Count large dataset frequencies using HashMap and map.merge(word, 1, Integer::sum).",
      "Offers O(1) average-time word insertion and frequency updates."
    ],
    keywords: [{ word: "Word Frequency Counter" }, { word: "map.merge()" }, { word: "ConcurrentHashMap Parallel Streams" }]
  },

  // --------------------------------------------------------------------------
  // ADVANCED / TIER-1 STAFF INTERVIEW QUESTIONS (50 - 65)
  // --------------------------------------------------------------------------
  {
    id: "col-q50",
    question: "50. What is the PECS principle in Java Collections Generics?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "PECS stands for Producer Extends, Consumer Super. Use <? extends T> when reading from a collection and <? super T> when writing into it.",
    properAnswer: "PECS is a guideline for generic wildcards: Producer Extends, Consumer Super. If your collection produces/reads items (read-only snapshot), use List<? extends T>. If your collection consumes/writes items (write-only target), use List<? super T>. If you read AND write, use exact type List<T>.",
    explanation: [
      "Producer Extends: List<? extends Number> allows reading Numbers, but disallows adding items (except null) because exact subtype is unknown at compile time.",
      "Consumer Super: List<? super Integer> allows adding Integers, but reading returns Object.",
      "Collections.copy(dest, src): Standard API example where dest is List<? super T> (Consumer) and src is List<? extends T> (Producer)."
    ],
    codeSnippet: `import java.util.*;

public class PECSExample {
    // Producer Extends: Reads numbers safely
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue();
        }
        return sum;
    }

    // Consumer Super: Writes integers safely
    public static void addNumbers(List<? super Integer> list) {
        for (int i = 1; i <= 5; i++) {
            list.add(i); // Safe to insert Integer!
        }
    }
}`,
    interviewLines: [
      "PECS: Producer Extends, Consumer Super governs generic wildcard design.",
      "Use <? extends T> for read-only sources and <? super T> for write-only destinations."
    ],
    keywords: [{ word: "PECS Principle" }, { word: "Producer Extends" }, { word: "Consumer Super" }, { word: "Generic Wildcards" }]
  },

  {
    id: "col-q51",
    question: "51. Why can't we create an array of generic types like new List<String>[10] in Java?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "Java arrays are covariant and type-checked at runtime, whereas generics use Type Erasure at compile time, causing a type-safety collision.",
    properAnswer: "Java disallows generic array creation (e.g. new List<String>[10]) due to the conflict between Array Covariance and Generic Type Erasure. Arrays enforce type checks at runtime, while Generics erase type parameters at compile-time. Allowing generic arrays would permit inserting invalid types into Object[] and cause unexpected ClassCastException.",
    explanation: [
      "Array Covariance: String[] is a subtype of Object[]; array store checks happen at runtime.",
      "Type Erasure: List<String> erases to raw List at runtime.",
      "Safety Hazard: If Object[] arr = new List<String>[10] were legal, arr[0] = new List<Integer>() would pass array check but fail silently on get(0)!"
    ],
    interviewLines: [
      "Generic arrays are forbidden because runtime Type Erasure undermines Array Covariance type checks.",
      "Use List<List<T>> instead of arrays of generic collections."
    ],
    keywords: [{ word: "Generic Array Disallowance" }, { word: "Type Erasure" }, { word: "Array Covariance" }]
  },

  {
    id: "col-q52",
    question: "52. What is EnumSet, and why is it faster than HashSet for Enum keys?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "EnumSet is a specialized Set implementation backed internally by a bit-vector (a single long or long[] array) operating via CPU bitwise math.",
    properAnswer: "EnumSet is a high-performance Set implementation designed exclusively for Java Enum types. Internally, it represents element presence using a single long bit-mask (for enums <= 64 elements, RegularEnumSet) or long[] array (JumboEnumSet). Operations like contains(), add(), and remove() execute in single CPU clock cycles using bitwise OR/AND logic.",
    explanation: [
      "Bit-Vector Representation: Bit index corresponds directly to enum ordinal().",
      "Bitwise Operators: add() executes bitwise OR (|); contains() executes bitwise AND (&).",
      "Zero Allocation: No bucket node allocations or hashCode() computations needed!"
    ],
    codeSnippet: `import java.util.*;

enum Status { PENDING, PROCESSING, APPROVED, REJECTED }

public class EnumSetExample {
    public static void main(String[] args) {
        // High-performance Bit-Vector Set
        EnumSet<Status> activeStatuses = EnumSet.of(Status.PENDING, Status.PROCESSING);

        if (activeStatuses.contains(Status.PENDING)) {
            System.out.println("Processing pending item via CPU bitwise AND check!");
        }
    }
}`,
    interviewLines: [
      "EnumSet is backed by a bit-vector (single long bitmask), making operations execute in single CPU clock cycles.",
      "Drastically faster and more memory-efficient than HashSet for Enum elements."
    ],
    keywords: [{ word: "EnumSet" }, { word: "Bit-Vector Architecture" }, { word: "RegularEnumSet vs JumboEnumSet" }]
  },

  {
    id: "col-q53",
    question: "53. What is EnumMap, and why is it preferred over HashMap for Enum keys?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "EnumMap is a compact Map backed by a single Object[] array indexed directly by enum ordinal(), achieving pure O(1) performance without hashing.",
    properAnswer: "EnumMap is a specialized Map implementation designed exclusively for Enum keys. Internally, values are stored in a simple contiguous Object[] array where key's enum.ordinal() serves directly as the array index. It completely bypasses hashing, hashCode() calls, and bucket collisions.",
    explanation: [
      "Ordinal Indexing: array[key.ordinal()] = value provides instant direct array lookup.",
      "Zero Collisions: No bucket collision chains or linked list/tree traversals.",
      "Compact Memory: Takes minimal memory compared to HashMap entry node allocations."
    ],
    interviewLines: [
      "EnumMap maps enum keys directly to array indices using enum.ordinal() with zero hashing overhead.",
      "Always use EnumMap when keys belong to a fixed Enum type."
    ],
    keywords: [{ word: "EnumMap" }, { word: "Ordinal Array Indexing" }, { word: "Zero Collision Map" }]
  },

  {
    id: "col-q54",
    question: "54. What is IdentityHashMap, and how does it differ from a standard HashMap?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "IdentityHashMap compares keys using reference equality (k1 == k2) and System.identityHashCode() instead of equals() and hashCode().",
    properAnswer: "IdentityHashMap breaks the standard Map contract by comparing keys using reference identity (k1 == k2) instead of logical equality (k1.equals(k2)). It uses System.identityHashCode(key) and stores keys/values in a flat Object[] array with linear probing for collisions.",
    explanation: [
      "Reference Equality: Two distinct String objects containing identical text ('test') are treated as TWO SEPARATE KEYS.",
      "Identity Hashcode: Uses System.identityHashCode(k) ignoring overridden hashCode().",
      "Use Cases: Topology mapping, object graph serialization (e.g. Jackson/Kryo), and compiler AST tree traversals."
    ],
    interviewLines: [
      "IdentityHashMap compares keys using == reference identity instead of equals().",
      "Used in object graph serialization frameworks to track visited object references."
    ],
    keywords: [{ word: "IdentityHashMap" }, { word: "Reference Equality ==" }, { word: "System.identityHashCode" }]
  },

  {
    id: "col-q55",
    question: "55. What is WeakHashMap, and how does it prevent memory leaks in caching?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "WeakHashMap stores keys as WeakReferences. When a key is no longer strongly referenced, Garbage Collector reclaims it and purges its map entry.",
    properAnswer: "WeakHashMap is a specialized Map where entries automatically get removed when their keys are no longer in ordinary use outside the map. Keys are wrapped in java.lang.ref.WeakReference. When the JVM Garbage Collector detects that a key has zero strong references, the key is reclaimed and its entry is automatically purged from the map via a ReferenceQueue.",
    explanation: [
      "WeakReference Keys: Entry keys do not prevent GC reclamation.",
      "ReferenceQueue Sweeping: Internal expungeStaleEntries() method cleans purged keys on map operations.",
      "Memory Leak Defense: Ideal for metadata caches (e.g. ThreadLocal-like object state wrappers) where entries must die when host objects die."
    ],
    interviewLines: [
      "WeakHashMap keys use WeakReferences, allowing GC to reclaim entries automatically when host key references disappear.",
      "Prevents memory leaks in object metadata caches."
    ],
    keywords: [{ word: "WeakHashMap" }, { word: "WeakReference Keys" }, { word: "Automatic GC Eviction" }]
  },

  {
    id: "col-q56",
    question: "56. What is the difference between ArrayBlockingQueue and LinkedBlockingQueue?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "ArrayBlockingQueue uses a fixed bounded array with 1 reentrant lock. LinkedBlockingQueue is optionally bounded with 2 separate locks (takeLock & putLock).",
    properAnswer: "ArrayBlockingQueue is a bounded circular array using a single ReentrantLock for both producers and consumers. LinkedBlockingQueue uses linked nodes with two independent locks: takeLock (for consumer poll/take) and putLock (for producer put/offer), allowing concurrent reads and writes for higher throughput.",
    tableData: {
      headers: ["Feature", "ArrayBlockingQueue", "LinkedBlockingQueue"],
      rows: [
        ["Backing Structure", "Fixed circular Object[] array", "Singly-linked Node list"],
        ["Capacity Boundedness", "Mandatory Bounded (fixed at construction)", "Optionally Bounded (default Integer.MAX_VALUE)"],
        ["Lock Granularity", "Single ReentrantLock (Locks producers & consumers together)", "Two Locks: putLock (producers) & takeLock (consumers)"],
        ["Throughput", "Moderate (producer blocks consumer)", "Higher concurrency throughput (producers & consumers work in parallel)"],
        ["Allocation", "Pre-allocates full array at construction", "Dynamically allocates Node objects on every insert"]
      ]
    },
    interviewLines: [
      "LinkedBlockingQueue uses separate putLock and takeLock for concurrent producer-consumer throughput.",
      "ArrayBlockingQueue pre-allocates contiguous memory with a single shared lock."
    ],
    keywords: [{ word: "ArrayBlockingQueue" }, { word: "LinkedBlockingQueue" }, { word: "Two-Lock Concurrency" }]
  },

  {
    id: "col-q57",
    question: "57. What is a DelayQueue in Java Collections?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "DelayQueue is an unbounded blocking queue of Delayed elements where an item can only be taken when its delay timer has expired.",
    properAnswer: "DelayQueue (java.util.concurrent) is an unbounded blocking queue holding elements extending java.util.concurrent.Delayed. The head of the queue is the element whose delay expired furthest in the past. If no delay has expired, queue.take() blocks until an item's delay timer reaches zero.",
    explanation: [
      "Delayed Interface: Elements must implement getDelay(TimeUnit unit) and compareTo().",
      "PriorityQueue Underneath: Internally uses PriorityQueue sorted by expiration timestamp.",
      "Use Cases: Cache eviction managers, scheduled background job runners, and retry backoff queues."
    ],
    interviewLines: [
      "DelayQueue keeps elements blocked until their getDelay() timer expires.",
      "Essential for building scheduled task executors and TTL cache expiry cleanup."
    ],
    keywords: [{ word: "DelayQueue" }, { word: "Delayed Interface" }, { word: "TTL Task Expiration" }]
  },

  {
    id: "col-q58",
    question: "58. What is SynchronousQueue, and where is it used in Java Concurrency?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "SynchronousQueue is a zero-capacity handoff queue where every put() must block until another thread calls take().",
    properAnswer: "SynchronousQueue is a specialized blocking queue with ZERO internal capacity (isEmpty() is always true). An insert operation put() blocks until another thread executes a corresponding take() to consume the item. It acts as a direct thread handoff point.",
    explanation: [
      "Zero Buffer: Does not hold elements; acts as a direct rendezvous pipeline between threads.",
      "CachedThreadPool Core: Used inside Executors.newCachedThreadPool() to pass new tasks directly to idle worker threads.",
      "Dual Modes: Supports Fair mode (FIFO queue using TransferQueue) and Unfair mode (LIFO stack using TransferStack)."
    ],
    interviewLines: [
      "SynchronousQueue has zero capacity and acts as a direct thread-to-thread handoff point.",
      "Used by Executors.newCachedThreadPool() to instantly dispatch tasks to worker threads."
    ],
    keywords: [{ word: "SynchronousQueue" }, { word: "Zero Capacity Queue" }, { word: "Thread Rendezvous" }]
  },

  {
    id: "col-q59",
    question: "59. What is ConcurrentSkipListMap, and how does it compare to TreeMap?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "ConcurrentSkipListMap is a thread-safe sorted Map backed by a probabilistic Skip List offering O(log N) lock-free concurrency.",
    properAnswer: "ConcurrentSkipListMap is a thread-safe sorted ConcurrentNavigableMap. Unlike TreeMap (which uses a Red-Black Tree requiring heavy rebalancing locks), ConcurrentSkipListMap is backed by a multi-level Skip List. It uses lock-free CAS operations to maintain O(log N) search and insert performance without thread contention.",
    explanation: [
      "Skip List Data Structure: Probabilistic multi-level linked list with express pointers for fast skips.",
      "CAS Lock-Free Nodes: Mutates pointers atomically via CAS without locking tree branches.",
      "Concurrent Sorted Order: Ideal choice when multiple threads require concurrent sorted map access."
    ],
    interviewLines: [
      "ConcurrentSkipListMap delivers thread-safe sorted map operations in O(log N) time using lock-free Skip Lists.",
      "The concurrent equivalent of TreeMap."
    ],
    keywords: [{ word: "ConcurrentSkipListMap" }, { word: "Skip List Architecture" }, { word: "Lock-Free Sorted Map" }]
  },

  {
    id: "col-q60",
    question: "60. What are Java 21 Sequenced Collections (SequencedCollection, SequencedSet, SequencedMap)?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "Java 21 introduced Sequenced Collections to standardize first/last element access (getFirst/getLast) and reverse views (reversed()) across JCF.",
    properAnswer: "Java 21 introduced Sequenced Collections to solve historical API gaps where accessing first/last elements differed across collections. It defines 3 main interfaces: SequencedCollection, SequencedSet, and SequencedMap. These interfaces declare uniform methods: getFirst(), getLast(), addFirst(), addLast(), removeFirst(), removeLast(), and reversed().",
    explanation: [
      "Uniform API: Replaces messy code like list.get(list.size()-1) with list.getLast().",
      "Reversed Views: reversed() returns a real-time reversed view of the collection in O(1) time.",
      "Interface Implementations: Implemented by List, Deque, LinkedHashSet, SortedSet, LinkedHashMap, and SortedMap."
    ],
    codeSnippet: `import java.util.*;

public class SequencedCollectionsJava21 {
    public static void main(String[] args) {
        // Java 21 Sequenced Collection API
        SequencedCollection<String> list = new ArrayList<>(List.of("A", "B", "C"));

        System.out.println("First Element: " + list.getFirst()); // "A"
        System.out.println("Last Element: " + list.getLast());   // "C"

        // O(1) Live Reversed View
        SequencedCollection<String> reversedList = list.reversed();
        System.out.println("Reversed View: " + reversedList);  // ["C", "B", "A"]
    }
}`,
    interviewLines: [
      "Java 21 Sequenced Collections standardize getFirst(), getLast(), and reversed() across List, Set, and Map.",
      "Provides zero-cost O(1) live reversed views."
    ],
    keywords: [{ word: "Java 21 Sequenced Collections" }, { word: "getFirst() & getLast()" }, { word: "reversed() View" }]
  },

  {
    id: "col-q61",
    question: "61. What is the difference between List.of() and Collections.unmodifiableList()?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "Collections.unmodifiableList() is a read-only wrapper view reflecting changes to its backing list. List.of() is a truly immutable snapshot rejecting nulls.",
    properAnswer: "Collections.unmodifiableList(existingList) creates an unmodifiable wrapper view; if the underlying backing existingList is modified, changes are visible in the wrapper. List.of(...) returns a truly immutable, compact snapshot detached from any source, disallowing null elements completely.",
    tableData: {
      headers: ["Feature", "Collections.unmodifiableList(list)", "List.of(...) (Java 9+)"],
      rows: [
        ["Nature", "Read-only wrapper view around a live backing list", "Truly immutable standalone object snapshot"],
        ["Mutability of Source", "Reflects mutations made to the underlying backing list", "Completely unbacked; cannot be mutated by any reference"],
        ["Null Support", "Allows null elements if backing list contains null", "Strictly disallows null elements (throws NullPointerException)"],
        ["Memory Footprint", "Wraps backing list with extra view object", "Highly optimized compact field objects for small sizes (no array allocations)"]
      ]
    },
    interviewLines: [
      "Collections.unmodifiableList() is a read-only view around a live backing list; List.of() is a truly immutable snapshot.",
      "List.of() rejects null elements and optimizes memory allocations."
    ],
    keywords: [{ word: "List.of() vs unmodifiableList()" }, { word: "Immutable Snapshot" }, { word: "Read-Only View" }]
  },

  {
    id: "col-q62",
    question: "62. How does TimSort work in Collections.sort() in Java?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Internal Working",
    summary: "TimSort is a hybrid stable sorting algorithm combining MergeSort and InsertionSort with O(N log N) worst-case and O(N) best-case time.",
    properAnswer: "Collections.sort() uses TimSort for object arrays. TimSort is an adaptive, stable hybrid algorithm that scans the input list to identify natural pre-sorted sub-sequences called 'runs'. Short runs are sorted using InsertionSort, and runs are merged together using an optimized MergeSort algorithm.",
    explanation: [
      "Adaptive Efficiency: Operates in O(N) best-case time for already sorted or partially sorted datasets.",
      "Stable Guarantee: Preserves relative order of equal elements (essential for multi-column UI sorting).",
      "Dual-Pivot Quicksort Comparison: Primitives use Dual-Pivot Quicksort (O(N log N), unstable); Objects use TimSort (stable)."
    ],
    interviewLines: [
      "Collections.sort() uses TimSort, an adaptive stable hybrid of MergeSort and InsertionSort.",
      "Guarantees O(N) best-case performance on partially sorted real-world data."
    ],
    keywords: [{ word: "TimSort Internals" }, { word: "Stable Sorting" }, { word: "Adaptive MergeSort" }]
  },

  {
    id: "col-q63",
    question: "63. What is the difference between Collections.synchronizedList() and CopyOnWriteArrayList?",
    topic: "Collections Framework",
    level: "Experienced",
    type: "Theory",
    summary: "synchronizedList uses a mutex lock on all methods (slow writes, explicit loop lock). CopyOnWriteArrayList clones array on writes (fast lock-free reads).",
    properAnswer: "Collections.synchronizedList(list) wraps methods with a global mutex lock, blocking reads during writes and requiring explicit external synchronization during iteration. CopyOnWriteArrayList clones the array on writes, allowing reading threads and iterators to run lock-free without ConcurrentModificationException.",
    explanation: [
      "Read Performance: CopyOnWriteArrayList offers lock-free reads; synchronizedList locks every read.",
      "Iteration Lock: synchronizedList requires explicit synchronized(list) block during loop; CopyOnWriteArrayList iterates snapshot without locks.",
      "Write Cost: synchronizedList is fast for writes; CopyOnWriteArrayList is expensive for frequent writes due to array copying."
    ],
    interviewLines: [
      "Choose CopyOnWriteArrayList for read-heavy workloads; choose synchronizedList when write operations are frequent.",
      "CopyOnWriteArrayList iterators never require external lock blocks."
    ],
    keywords: [{ word: "synchronizedList vs CopyOnWrite" }, { word: "Mutex Lock vs Array Copy" }, { word: "Snapshot Iteration" }]
  },

  {
    id: "col-q64",
    question: "64. What is the difference between Queue poll(), remove(), offer(), and add()?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Theory",
    summary: "add/remove throw exceptions on failure; offer/poll return special values (false/null) on failure.",
    properAnswer: "Queue methods are divided into two operational modes: Exception-throwing vs Special Value returning. When a bounded queue is full, add() throws IllegalStateException while offer() returns false. When a queue is empty, remove() throws NoSuchElementException while poll() returns null.",
    tableData: {
      headers: ["Operation Type", "Throws Exception (on failure)", "Returns Special Value (false / null)"],
      rows: [
        ["Insert (Enqueue)", "add(e) — throws IllegalStateException", "offer(e) — returns false"],
        ["Remove (Dequeue)", "remove() — throws NoSuchElementException", "poll() — returns null"],
        ["Examine (Peek Head)", "element() — throws NoSuchElementException", "peek() — returns null"]
      ]
    },
    interviewLines: [
      "Use offer() and poll() in production queues to handle full/empty states gracefully without exception overhead.",
      "add/remove throw exceptions; offer/poll return false/null."
    ],
    keywords: [{ word: "Queue Contract" }, { word: "offer() vs add()" }, { word: "poll() vs remove()" }]
  },

  {
    id: "col-q65",
    question: "65. How do you safely convert an Array to a Collection and vice versa in modern Java?",
    topic: "Collections Framework",
    level: "Basic",
    type: "Coding / Practical",
    summary: "Array to List: Arrays.asList() (fixed-size), List.of() (immutable), new ArrayList<>(Arrays.asList()) (mutable). List to Array: list.toArray(String[]::new).",
    properAnswer: "To convert an array to a List: Use List.of(arr) for immutable list, or new ArrayList<>(Arrays.asList(arr)) for a fully mutable list. To convert a List to an array in Java 11+: Use list.toArray(String[]::new) using generator constructor references.",
    codeSnippet: `import java.util.*;

public class ArrayCollectionConversion {
    public static void main(String[] args) {
        String[] arr = {"Apple", "Banana", "Cherry"};

        // 1. Array ➔ Modifiable List
        List<String> mutableList = new ArrayList<>(Arrays.asList(arr));
        mutableList.add("Dragonfruit");

        // 2. Array ➔ Immutable List (Java 9+)
        List<String> immutableList = List.of(arr);

        // 3. List ➔ Array (Java 11+ Constructor Reference)
        String[] newArray = mutableList.toArray(String[]::new);

        System.out.println("Converted Array Length: " + newArray.length);
    }
}`,
    interviewLines: [
      "Use List.of(array) for immutable list conversion and list.toArray(Type[]::new) in Java 11+.",
      "Arrays.asList() returns a fixed-size wrapper; wrap in new ArrayList<>() if adding/removing items."
    ],
    keywords: [{ word: "Array to List Conversion" }, { word: "Arrays.asList" }, { word: "list.toArray Generator" }]
  }
];

export const COLLECTION_LEVELS = ["All Levels", "Basic", "Intermediate", "Experienced", "Scenario-Based"];
export const COLLECTION_TYPES = ["All Types", "Theory", "Internal Working", "Coding / Practical", "Scenario"];

// ============================================================================
// MAIN COMPONENT: COLLECTION INTERVIEW Q&A
// ============================================================================
export const CollectionInterview = ({ onSelectRecallCard, searchTerm }) => {
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKeywordByQuestion, setActiveKeywordByQuestion] = useState({});

  const activeSearch = (searchTerm || searchQuery || "").toLowerCase();

  const toggleKeywordInQuestion = (questionId, word) => {
    setActiveKeywordByQuestion((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === word ? null : word
    }));
  };

  const filteredQuestions = COLLECTION_QUESTIONS.filter((q) => {
    const matchesLevel = selectedLevel === "All Levels" || q.level === selectedLevel;
    const matchesType = selectedType === "All Types" || q.type === selectedType;
    const matchesSearch =
      !activeSearch ||
      q.question.toLowerCase().includes(activeSearch) ||
      q.summary.toLowerCase().includes(activeSearch) ||
      (q.explanation || []).some((e) => typeof e === "string" && e.toLowerCase().includes(activeSearch)) ||
      (q.keywords || []).some((k) => k.word && k.word.toLowerCase().includes(activeSearch));

    return matchesLevel && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 font-sans max-w-7xl mx-auto overflow-x-hidden w-full pb-20">

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-4   ">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-800 text-xs font-mono dark:text-zinc-300">
              <Database className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
              <span>Java Collections Framework (JCF) Interview Q&amp;A Deck</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Java Collections Technical Interview Q&amp;A (49 Master Questions)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              Curated senior interview responses formatted for real-world engineering interviews. Every question includes <span className="font-bold text-slate-900 dark:text-white">HR Summaries</span>, <span className="font-bold text-slate-900 dark:text-white">Technical Explanations</span>, <span className="font-bold text-slate-900 dark:text-white">Code Examples</span>, <span className="font-bold text-slate-900 dark:text-white">Comparison Tables</span>, and <span className="font-bold text-slate-900 dark:text-white">Interactive Active Recall Flashcards</span>.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-100 border border-slate-200 text-center font-mono dark:bg-zinc-900 dark:border-zinc-800 shrink-0">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{filteredQuestions.length}</span>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">Questions Matched</p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-900 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search Collections questions or keywords (e.g. HashMap, LRU, Fail-Fast)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 text-xs text-slate-900 dark:bg-black dark:border-zinc-800 dark:text-white pl-9 pr-4 py-3 rounded-xl focus:outline-none focus:border-slate-500 dark:focus:border-zinc-500 transition"
            />
          </div>

          {/* Level Selector */}
          <CustomDropdown
            options={COLLECTION_LEVELS}
            value={selectedLevel}
            onChange={setSelectedLevel}
            placeholder="Select Level"
            icon={Layers}
          />

          {/* Type Selector */}
          <CustomDropdown
            options={COLLECTION_TYPES}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Select Type"
            icon={Filter}
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400 space-y-2">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-400 dark:text-zinc-600" />
            <p className="text-sm font-semibold">No Collections questions match your current search filters.</p>
            <button
              onClick={() => {
                setSelectedLevel("All Levels");
                setSelectedType("All Types");
                setSearchQuery("");
              }}
              className="text-xs text-slate-900 underline cursor-pointer hover:text-slate-700 dark:text-white dark:hover:text-zinc-300 font-mono"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 dark:bg-zinc-950 dark:border-zinc-800 space-y-6    hover:border-slate-300 dark:hover:border-zinc-700 transition"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 dark:border-zinc-900 pb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  {q.question}
                </h2>

                <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-300">
                    {q.topic}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-bold">
                    {q.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                    {q.type}
                  </span>
                </div>
              </div>

              {/* High-Impact Answer Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-zinc-900/70 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 font-bold">
                  ★ Key One-Line Answer (HR / Quick Review)
                </span>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {renderFormattedText(q.summary)}
                </div>
              </div>

              {/* Senior Human Spoken Answer */}
              {q.properAnswer && (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-300 dark:bg-zinc-900/90 dark:border-zinc-700/70 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-bold">
                    <span>Technical Interview Response (What to say)</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                    {renderFormattedText(q.properAnswer)}
                  </div>
                </div>
              )}

              {/* Detailed Interviewer Explanation */}
              {q.explanation && q.explanation.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-slate-900 dark:text-white" />
                    How to Explain to the Interviewer
                  </span>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans">
                    {q.explanation.map((item, idx) => (
                      <div key={idx} className="pl-1">
                        {renderFormattedText(item)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Example */}
              {q.codeSnippet && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Runnable Code Example
                  </span>
                  <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 dark:bg-black dark:border-zinc-800 text-[11px] sm:text-xs font-mono text-emerald-400 dark:text-emerald-300 overflow-x-auto leading-relaxed max-w-full">
                    <code>{q.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Quick Comparison Table */}
              {q.tableData && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    Quick Comparison Table
                  </span>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-white font-mono uppercase text-[10px] border-b border-slate-200 dark:border-zinc-800">
                        <tr>
                          {q.tableData.headers.map((h, i) => (
                            <th key={i} className="p-3 font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-zinc-800 text-slate-700 dark:text-zinc-300">
                        {q.tableData.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-slate-100 dark:hover:bg-zinc-900/60">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className={`p-3 ${cellIndex === 0 ? "font-bold text-slate-900 dark:text-white font-mono" : "font-sans"}`}>
                                {renderFormattedText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Key Interview Golden Lines */}
              {q.interviewLines && q.interviewLines.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                    <BadgeAlert className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    Powerful Interview Lines (Must Quote)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {q.interviewLines.map((line, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 text-white border border-slate-900 dark:bg-black dark:border-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clickable Active Recall Keywords -> In-Line Flashcard */}
              {q.keywords && q.keywords.length > 0 && (
                <div className="pt-3 border-t border-slate-200 dark:border-zinc-900 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-bold">
                      Active Recall Keywords:
                    </span>
                    {q.keywords.map((k, idx) => {
                      const isActive = activeKeywordByQuestion[q.id] === k.word;
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleKeywordInQuestion(q.id, k.word)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer inline-flex items-center gap-1.5 border ${isActive
                            ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white"
                            : "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800"
                            }`}
                          title={`Toggle in-line recall note for ${k.word}`}
                        >
                          <span className="font-extrabold">{k.word}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Embedded Flashcard Note directly inside Question Container */}
                  {activeKeywordByQuestion[q.id] && (() => {
                    const activeWord = activeKeywordByQuestion[q.id];
                    const keywordInfo = getKeywordDefinition(activeWord, q.topic, q.question);
                    return (
                      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 dark:bg-zinc-900/90 dark:border-zinc-700/80 space-y-2 relative overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">{keywordInfo.word}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-300 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400">
                              {keywordInfo.topic}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleKeywordInQuestion(q.id, activeWord)}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 hover:bg-slate-200 border border-slate-300 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:border-zinc-800 transition cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-zinc-400 font-bold block">
                            💡 Quick Keyword Recall:
                          </span>
                          <div className="text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                            {renderFormattedText(keywordInfo.definition)}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionInterview;
