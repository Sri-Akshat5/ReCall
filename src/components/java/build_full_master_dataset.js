import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.join(__dirname, 'javaRevisionNotesData.js');

const categories = [
  "All Topics",
  "1. Fundamentals & OOP",
  "2. Strings & Collections",
  "3. Exceptions & Generics",
  "4. Concurrency & JVM",
  "5. Modern Java (8 to 21+)",
  "6. Frameworks & Enterprise",
  "7. Senior Interview Bank"
];

// Helper to generate full textbook section data cleanly
function createSection(id, number, category, title, subtitle, summary, diagramType, intro, subs, tables, pitfalls, takeaways, qnas) {
  return {
    id,
    number,
    category,
    title,
    subtitle,
    summary,
    diagramType: diagramType || null,
    detailedContent: {
      introduction: intro,
      subsections: subs,
      tables: tables || [],
      pitfalls: pitfalls || [],
      keyTakeaways: takeaways || [],
      interviewQuestions: qnas || []
    }
  };
}

const sections = [
  // 01: Java Fundamentals
  createSection(
    "java-fundamentals", "01", "1. Fundamentals & OOP",
    "1. Java Fundamentals & Runtime Architecture",
    "Understanding What Java Is, How the JVM Executes Code, and Core Platform Building Blocks",
    "From .java source files to platform-neutral bytecode execution on the JVM.",
    "jvm-compilation-flow",
    "Java is a high-level, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. The primary design goal of Java was portability across diverse hardware architectures, summarized by the famous motto: Write Once, Run Anywhere (WORA). Unlike traditional languages like C or C++ that compile directly into OS-specific machine instructions, Java compiles source code into intermediate representation called Bytecode (.class files). The Java Virtual Machine (JVM) interprets and optimizes this bytecode for the target operating system.",
    [
      {
        heading: "1. JVM vs JRE vs JDK (The Core Runtime Hierarchy)",
        content: "To understand Java, you must understand the distinction between JDK, JRE, and JVM:\n\n• JVM (Java Virtual Machine): An abstract computing machine that provides a runtime environment in which Java bytecode can be executed. It handles memory management (garbage collection), thread management, and instruction execution.\n\n• JRE (Java Runtime Environment): The runtime software bundle required to RUN Java applications. It contains the JVM along with the Java Class Library (java.base module) and support files.\n\n• JDK (Java Development Kit): The full software development environment required to WRITE and BUILD Java applications. It contains the JRE plus development tools such as javac (Java Compiler), jdb (debugger), javadoc, and profilers.",
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java Mastery!");
    }
}`,
        codeExplanation: "1. public: Accessible everywhere.\n2. static: JVM invokes main without creating an instance.\n3. void: Returns no value.\n4. String[] args: Command line arguments."
      },
      {
        heading: "2. Compilation & Execution Pipeline (.java ➔ .class ➔ Native Machine Code)",
        content: "Java combines compilation and interpretation:\n1. Source Compilation (javac): Developers write .java source files. Running 'javac' transforms source code into platform-neutral Bytecode stored in .class files.\n2. JVM Execution (java): The JVM loads bytecode into memory via ClassLoader, verifies bytecode for memory safety, and passes it to the Execution Engine. HotSpot JVM initially interprets bytecode line-by-line. Hot code paths are compiled by JIT (C1/C2 compilers) into native assembly instructions for maximum CPU execution speed."
      },
      {
        heading: "3. Pass-By-Value Mechanics in Java",
        content: "Java is 100% STRICTLY PASS-BY-VALUE.\n\n• Primitive Types: Binary values are copied directly onto the method call stack frame. Mutating parameters inside a method does not modify the caller variable.\n• Reference Types: Object memory addresses (reference pointers) are copied by value into the method call stack frame. Both caller and callee hold distinct copies of the pointer referencing the same Heap object instance."
      },
      {
        heading: "4. Variable Scopes & Lifetime Rules",
        content: "1. Local Variables: Declared inside methods or block scopes. Reside on the Thread Call Stack. Must be initialized before access.\n2. Instance Variables: Declared inside a class. Reside on Heap inside object memory payload. Initialized to default values (0, null, false).\n3. Static Variables: Declared with 'static'. Reside in Metaspace / Class Static Area. Shared across all instances of the class."
      }
    ],
    [
      {
        title: "JVM vs JRE vs JDK Runtime Hierarchy",
        headers: ["Component", "Short Name", "Includes", "Primary Function"],
        rows: [
          ["Java Virtual Machine", "JVM", "Interpreter, JIT, Garbage Collector", "Executes bytecode on target CPU"],
          ["Java Runtime Environment", "JRE", "JVM + Java Base Class Libraries", "Runs pre-compiled Java applications"],
          ["Java Development Kit", "JDK", "JRE + javac, jdb, profilers", "Compiles and builds Java software"]
        ]
      }
    ],
    [
      "Uninitialized Local Variables: Accessing local variables before initialization triggers a compile error.",
      "Confusing Reference Copying with Pass-by-Reference: Reassigning an object parameter inside a method will not update the caller reference pointer."
    ],
    [
      "Java source compiles into platform-neutral bytecode (.class) executed on OS-specific JVMs.",
      "Java is strictly pass-by-value for both primitive data values and object reference pointers."
    ],
    [
      { q: "Why is Java platform independent?", a: "Because source code compiles into platform-neutral Bytecode (.class files) executed by OS-specific JVM implementations." },
      { q: "Can static methods call non-static instance methods directly?", a: "No. Static methods execute without an instance context ('this' pointer), so accessing non-static methods requires an explicit object reference." }
    ]
  ),

  // 02: OOP Deep Dive
  createSection(
    "oop-core", "02", "1. Fundamentals & OOP",
    "2. Object-Oriented Programming (OOP) Deep Dive",
    "Mastering Encapsulation, Abstraction, Inheritance, Polymorphism & Composition",
    "The 4 fundamental pillars of object-oriented design and production architecture.",
    "oop-hierarchy",
    "Object-Oriented Programming (OOP) is a design paradigm centered around Objects containing state and behavior. Java structures enterprise code through 4 core pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism, allowing scalable and modular application architectures.",
    [
      {
        heading: "1. The 4 Fundamental Pillars of OOP",
        content: "• Encapsulation: Restricting direct access to object state by making fields private and exposing controlled getters/setters.\n• Abstraction: Hiding implementation complexity behind clear functional interfaces (Abstract Classes & Interfaces).\n• Inheritance: Deriving child classes (subclasses) from parent classes (superclasses) using extends for code reuse.\n• Polymorphism: Ability of an object or method reference to take on multiple forms (Compile-time vs Runtime)."
      },
      {
        heading: "2. Compile-Time vs Runtime Polymorphism",
        content: "1. Compile-Time Polymorphism (Method Overloading): Multiple methods in the same class with identical names but different argument parameters. Resolved during compilation.\n2. Runtime Polymorphism (Method Overriding & Dynamic Method Dispatch): Subclasses override parent method implementations. The JVM inspects the actual object type on the Heap at runtime to dispatch method execution.",
        code: `class Payment {
    void process() { System.out.println("Processing generic payment"); }
}
class CreditCardPayment extends Payment {
    @Override
    void process() { System.out.println("Processing Credit Card via Gateway"); }
}`
      },
      {
        heading: "3. Constructor Chaining: this() and super() Mechanics",
        content: "Constructors initialize newly instantiated objects on the Heap. Constructor chaining invokes constructors sequentially across class hierarchies:\n• this(): Calls another overloaded constructor within the same class.\n• super(): Calls the matching constructor of the immediate superclass.\nRule: this() or super() MUST be the first statement in a constructor body."
      },
      {
        heading: "4. Composition over Inheritance Guidelines",
        content: "Senior engineers prefer Composition ('HAS-A') over Inheritance ('IS-A'). Composition embeds instances of other classes as fields, avoiding tight coupling, fragile base class bugs, and encapsulation leaks inherent in deep class inheritance hierarchies."
      }
    ],
    [
      {
        title: "Method Overloading vs Method Overriding",
        headers: ["Feature", "Method Overloading", "Method Overriding"],
        rows: [
          ["Binding Time", "Compile-time (Static)", "Runtime (Dynamic Method Dispatch)"],
          ["Scope", "Same class", "Parent-Child class hierarchy"],
          ["Method Signature", "Same name, DIFFERENT parameters", "Same name, EXACT SAME parameters"],
          ["Private/Static", "Can overload static/private methods", "Cannot override static/private methods"]
        ]
      }
    ],
    [
      "Shadowing Static Methods: Redeclaring a static method in a subclass hides (shadows) it rather than overriding it.",
      "Violating Liskov Substitution Principle (LSP): Subclasses must be completely substitutable for their superclass without breaking system invariants."
    ],
    [
      "Dynamic Method Dispatch resolves overridden methods at runtime based on the actual object on the Heap.",
      "Prefer Composition over Inheritance to achieve modular, loosely coupled application designs."
    ],
    [
      { q: "Why doesn't Java support multiple class inheritance?", a: "To prevent the Diamond Problem—ambiguity when two parent classes define the exact same method signature." },
      { q: "What is Covariant Return Type in Java?", a: "When overriding a method, the subclass method can return a subtype of the return type declared in the parent method." }
    ]
  ),

  // 03: String Deep Dive
  createSection(
    "string-deep-dive", "03", "1. Fundamentals & OOP",
    "3. String Architecture & Memory Management",
    "String Constant Pool (SCP), Immutability, StringBuilder vs StringBuffer, and Text Blocks",
    "Deep dive into how Java manages text memory, string literal pooling, and byte[] compact strings.",
    "string-pool-memory",
    "In Java, java.lang.String represents immutable sequence of characters. Because strings represent up to 40% of memory in enterprise workloads, the JVM heavily optimizes text memory through the String Constant Pool (SCP) and Java 9+ Compact Strings.",
    [
      {
        heading: "1. String Immutability & String Constant Pool (SCP)",
        content: "String objects cannot be modified after instantiation. String operations (concat, replace, substring) instantiate brand new String objects on the Heap.\n\nWhy Immutability?\n1. String Constant Pool (SCP): Shared literal references eliminate duplicate text memory.\n2. Security: Database credentials and network URLs passed as Strings cannot be mutated post-validation.\n3. Thread Safety: Immutable strings are inherently thread-safe across threads without locks.\n4. HashCode Caching: Caches hash value upon creation for O(1) Map key lookups."
      },
      {
        heading: "2. String vs StringBuilder vs StringBuffer",
        content: "• String: Immutable. Concatenating strings inside loops using '+' generates O(N²) temporary heap objects.\n• StringBuilder (Java 5+): Mutable char/byte buffer. Unsynchronized and extremely fast for single-threaded string construction.\n• StringBuffer (Java 1.0): Mutable buffer with synchronized methods for thread-safe multi-threaded string manipulation.",
        code: `StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    sb.append("Item ").append(i).append("\n");
}
String result = sb.toString();`
      },
      {
        heading: "3. Compact Strings (Java 9+) & Multiline Text Blocks (Java 15+)",
        content: "• Compact Strings: Prior to Java 9, strings stored characters as 16-bit char[] (UTF-16). Java 9 introduced byte[] payload with Latin-1 / UTF-16 encoding flag, reducing memory footprint by 50% for ASCII text.\n• Text Blocks: Enables multiline string literals enclosed in triple quotes (\"\"\"), preserving formatting and eliminating manual line breaks."
      },
      {
        heading: "4. String.intern() Mechanics & Deduplication",
        content: "Calling s.intern() checks the SCP. If an identical literal exists, it returns the pooled pointer; otherwise it registers the string into the SCP. Modern G1GC also supports automatic background String Deduplication (-XX:+UseStringDeduplication)."
      }
    ],
    [
      {
        title: "String vs StringBuilder vs StringBuffer",
        headers: ["Property", "String", "StringBuilder", "StringBuffer"],
        rows: [
          ["Mutability", "Immutable", "Mutable", "Mutable"],
          ["Thread Safety", "Thread-Safe", "Non-Thread-Safe", "Thread-Safe (Synchronized)"],
          ["Performance", "Slow for loops", "Fastest", "Slower (Lock overhead)"],
          ["Storage", "SCP & Heap", "Heap Buffer", "Heap Buffer"]
        ]
      }
    ],
    [
      "Using '==' for String Comparison: Comparing strings with '==' checks memory addresses. Always use .equals() for value equality.",
      "String Concatenation in Loops: Using '+' in loops instantiates new StringBuilder objects on every iteration, causing GC spikes."
    ],
    [
      "String immutability enables safe thread sharing, security, and SCP memory deduplication.",
      "Use StringBuilder inside loops to prevent unnecessary heap object creation."
    ],
    [
      { q: "How many objects are created by String s = new String(\"Hello\")?", a: "Up to 2 objects: one in the String Constant Pool (if absent), and one on the general Heap." },
      { q: "What is String interning?", a: "s.intern() returns the canonical reference pointer from the String Constant Pool for duplicate text deduplication." }
    ]
  ),

  // 04: Java Collections Framework Deep Dive (ENRICHED MASTERCLASS)
  createSection(
    "java-collections", "04", "2. Strings & Collections",
    "4. Java Collections Framework Masterclass & Internal Mechanics",
    "Complete Architecture of List, Set, Queue, Deque, HashMap Bucket Internals, Treeification, and Concurrent Collections",
    "Granular breakdown of data structures, dynamic array growth formulas, hash bucket collision resolution, Red-Black Trees, and high-throughput thread-safe collections.",
    "hashmap-treeify",
    "The Java Collections Framework (JCF) is the core foundation for data manipulation in Java. It provides unified data structures divided into two primary root hierarchies: java.util.Collection and java.util.Map. Understanding their internal memory layouts, time complexities, bitwise bucket routing, and concurrency models is essential for enterprise engineering.",
    [
      {
        heading: "1. Core Hierarchy & Architecture (Collection vs Map)",
        content: "• java.util.Collection: Root interface for ordered or unordered groups of objects.\n  ├─ List: Ordered sequences allowing duplicate elements (ArrayList, LinkedList, Vector).\n  ├─ Set: Unique collections prohibiting duplicate elements (HashSet, LinkedHashSet, TreeSet).\n  └─ Queue / Deque: First-In-First-Out (FIFO) queues or Double-Ended queues (ArrayDeque, PriorityQueue).\n\n• java.util.Map: Independent associative key-value mapping framework (HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap)."
      },
      {
        heading: "2. List Deep Dive: ArrayList vs LinkedList vs Vector",
        content: "• ArrayList: Backed by a contiguous Object[] array. Random index access get(index) is O(1). When capacity fills, it auto-resizes by 50% using bitwise shift: newCapacity = oldCapacity + (oldCapacity >> 1). Element insertions/deletions in the middle require System.arraycopy (O(N)).\n\n• LinkedList: Backed by a doubly-linked Node<E> structure (prev, item, next pointers). Random access requires O(N) sequential traversal from head or tail. Inserting/deleting at a known node reference or head/tail is O(1). Incurs high pointer memory overhead (24 bytes per node wrapper).\n\n• Vector: Legacy thread-safe dynamic array using synchronized methods. Resizes by 100% (doubles capacity). Obsolete; replaced by Collections.synchronizedList or CopyOnWriteArrayList.",
        code: `// ArrayList Dynamic Growth & Capacity Pre-allocation
List<String> list = new ArrayList<>(1000); // Pre-allocates array size 1000 to avoid resize copies

// LinkedList Node Traversal vs ArrayList Random Access
List<Integer> arrayList = new ArrayList<>(List.of(10, 20, 30, 40));
int fastVal = arrayList.get(2); // O(1) Instant array offset lookup

LinkedList<Integer> linkedList = new LinkedList<>(List.of(10, 20, 30, 40));
int slowVal = linkedList.get(2); // O(N) Traverses head -> node1 -> node2`
      },
      {
        heading: "3. Set Deep Dive: HashSet vs LinkedHashSet vs TreeSet",
        content: "• HashSet: Backed internally by a HashMap (stores elements as keys mapped to dummy Object PRESENT value). Unordered, permits 1 null element, O(1) put/get/contains.\n\n• LinkedHashSet: Extends HashSet, maintaining a doubly-linked list running through all buckets to preserve Insertion-Order or Access-Order.\n\n• TreeSet: Backed by a self-balancing Red-Black Tree (TreeMap). Keeps elements strictly sorted according to Natural Ordering (Comparable) or custom Comparator. Guarantees O(log N) lookup time. Prohibits null elements."
      },
      {
        heading: "4. Queue & Deque Deep Dive: ArrayDeque vs PriorityQueue",
        content: "• ArrayDeque: Resizable circular array implementation of Deque interface. Faster than Stack and LinkedList when used as a LIFO Stack or FIFO Queue. No capacity restrictions, prohibits nulls.\n\n• PriorityQueue: Backed by a Min-Binary Heap array. Elements are processed based on priority order rather than insertion order. Peek/element read is O(1); offer/poll operations take O(log N)."
      },
      {
        heading: "5. HashMap Internal Mechanics & Treeification Algorithm (Java 8+)",
        content: "HashMap relies on an array of Node<K,V> buckets (default initial capacity 16, load factor 0.75).\n\n1. Hash & Index Routing: To distribute keys uniformly, key.hashCode() is bit-shifted: hash = h ^ (h >>> 16). Bucket index is calculated using fast bitwise AND: index = hash & (n - 1).\n\n2. Hash Collision Resolution: Multiple keys mapping to the same bucket index form a singly linked list.\n\n3. Treeification Threshold: In Java 8+, if a single bucket linked list reaches 8 nodes AND total capacity >= 64, the linked list converts into a Red-Black Tree! Worst-case lookup drops from O(N) to O(log N).\n\n4. Untreeification: If bucket node count drops to <= 6 during resize/deletion, the tree converts back into a singly linked list.",
        code: `// Custom HashMap Lookup Simulation
Map<String, Integer> studentScores = new HashMap<>(32, 0.75f);
studentScores.put("Alex", 95);  // 1. hash("Alex"), 2. index = hash & 31, 3. store Node
studentScores.put("Maria", 98);

Integer score = studentScores.get("Alex"); // O(1) Bucket jump -> Node equals check`
      },
      {
        heading: "6. Concurrent Collections: ConcurrentHashMap & CopyOnWriteArrayList",
        content: "• ConcurrentHashMap (Java 8+): Replaced heavy segment locks with Lock-Free CAS (Compare-And-Swap) for empty bucket insertions and synchronized bucket-level node locking for populated buckets. Allows simultaneous concurrent reads without blocking.\n\n• CopyOnWriteArrayList: Every write operation (add, set, remove) creates a fresh copy of the underlying array payload. Iterators operate on immutable array snapshots without throwing ConcurrentModificationException. Ideal for Read-Heavy, Write-Rare scenarios (e.g. Event Listener Registries)."
      },
      {
        heading: "7. Sorting & Searching: Comparable vs Comparator",
        content: "• Comparable<T>: Defines Natural Ordering for a class via compareTo(T o). Implemented directly inside the domain class.\n• Comparator<T>: Defines External / Multiple Custom Ordering rules via compare(T o1, T o2). Supports functional chaining: Comparator.comparing(User::getAge).thenComparing(User::getName).",
        code: `List<User> users = new ArrayList<>(List.of(
    new User("Alice", 30),
    new User("Bob", 25),
    new User("Charlie", 25)
));

// Comparator Chaining (Age ascending, then Name ascending)
users.sort(Comparator.comparing(User::getAge).thenComparing(User::getName));`
      }
    ],
    [
      {
        title: "Complete JCF Collections & Map Matrix",
        headers: ["Data Structure", "Underlying Structure", "Access (Get)", "Insertion", "Deletion", "Thread Safe?"],
        rows: [
          ["ArrayList", "Dynamic Resizable Array", "O(1)", "O(1) amortized", "O(N)", "No"],
          ["LinkedList", "Doubly Linked Nodes", "O(N)", "O(1) at ends", "O(1) at node", "No"],
          ["HashSet / HashMap", "Hash Bucket Array + Tree", "O(1) average", "O(1) average", "O(1) average", "No"],
          ["TreeSet / TreeMap", "Red-Black Tree", "O(log N)", "O(log N)", "O(log N)", "No"],
          ["ArrayDeque", "Circular Array", "O(1) at ends", "O(1) at ends", "O(1) at ends", "No"],
          ["PriorityQueue", "Min Binary Heap Array", "O(1) min", "O(log N)", "O(log N)", "No"],
          ["ConcurrentHashMap", "CAS + Bucket Sync Lock", "O(1) lock-free", "O(1) CAS/Sync", "O(1) CAS/Sync", "Yes"],
          ["CopyOnWriteArrayList", "Copy-on-Write Array", "O(1) lock-free", "O(N) copy", "O(N) copy", "Yes"]
        ]
      }
    ],
    [
      "Modifying HashMap Key Fields: Mutating an object field that participates in hashCode() after placing it as a key renders the key unretrievable.",
      "ConcurrentModificationException: Modifying a standard Collection while iterating over it with a loop or Iterator throws an exception. Use ConcurrentHashMap or Iterator.remove().",
      "Using LinkedList for Random Access: Calling linkedList.get(i) inside a loop creates O(N²) quadratic time complexity. Use ArrayList or foreach iteration."
    ],
    [
      "ArrayList resizes by 50% (newCapacity = oldCapacity + (oldCapacity >> 1)); HashMap capacity MUST be a power of 2 for bitwise index routing.",
      "HashMap treeifies bucket chains with >8 nodes into Red-Black Trees for O(log N) worst-case lookup protection.",
      "ConcurrentHashMap uses lock-free CAS and bucket-level locks for high-throughput concurrency."
    ],
    [
      { q: "Why must HashMap initial capacity be a power of 2?", a: "Because power of 2 enables fast bitwise AND index calculation (hash & (n-1)) which is significantly faster than modulo division (hash % n)." },
      { q: "Difference between Fail-Fast and Fail-Safe iterators?", a: "Fail-Fast iterators check internal modCount and throw ConcurrentModificationException on structural edits. Fail-Safe iterators iterate over a snapshot copy of the data." },
      { q: "Why is ArrayDeque faster than Stack and LinkedList for stack operations?", a: "ArrayDeque stores elements in contiguous memory without allocation of node objects or pointer dereferencing, yielding superior CPU cache locality." }
    ]
  ),

  // 05: equals() & hashCode() Contract
  createSection(
    "equals-hashcode", "05", "2. Strings & Collections",
    "5. equals() & hashCode() Contract Architecture",
    "Object Equality, Hashing Contracts, and Collision Resolution",
    "Understanding object identity vs state equality, bucket routing, and hash distribution.",
    "equals-hashcode-flow",
    "In Java, java.lang.Object defines default implementations for equals() and hashCode(). Overriding these methods correctly is essential for storing custom objects inside Hash-based collections (HashMap, HashSet, Hashtable).",
    [
      {
        heading: "1. The General Contract of equals() & hashCode()",
        content: "Contract Rules:\n1. If two objects are equal according to equals(Object), calling hashCode() on both objects MUST produce the exact same integer result.\n2. If two objects have identical hashCode() values, they are NOT required to be equal (Hash Collision).\n3. If equals() is overridden, hashCode() MUST ALSO be overridden!"
      },
      {
        heading: "2. Disastrous Impact of Violating the Hash Contract",
        content: "If you override equals() without overriding hashCode(), two logically equal objects will generate DIFFERENT hash codes. When placed in a HashMap:\n1. Put operation places Object A into Bucket 4.\n2. Get operation computes Object B's hash code (Bucket 9) and fails to find Object A!\n3. Result: Duplicate keys stored in HashSet, broken lookups, memory leaks.",
        code: `public class Person {
    private final String id;
    private final String name;

    public Person(String id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person p)) return false;
        return Objects.equals(id, p.id) && Objects.equals(name, p.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name); // Guarantees contract!
    }
}`
      },
      {
        heading: "3. Writing Robust equals() Implementations",
        content: "Five Properties of equals():\n1. Reflexive: x.equals(x) is true.\n2. Symmetric: x.equals(y) == y.equals(x).\n3. Transitive: If x.equals(y) & y.equals(z), then x.equals(z).\n4. Consistent: Multiple invocations return consistent results.\n5. Non-null: x.equals(null) MUST return false."
      },
      {
        heading: "4. Modern Record Implementations (Java 16+)",
        content: "Java Records automatically generate contract-compliant, optimized equals() and hashCode() implementations based on record component fields, eliminating boilerplate bugs entirely."
      }
    ],
    [
      {
        title: "equals() and hashCode() Contract Matrix",
        headers: ["Scenario", "o1.equals(o2)", "o1.hashCode() == o2.hashCode()", "HashMap Behavior"],
        rows: [
          ["Identical Objects", "true", "MUST be true", "Correct bucket match"],
          ["Hash Collision", "false", "Can be true", "Chain in same bucket"],
          ["Broken Contract", "true", "false (Different)", "BUG: Lost keys & duplicate entries"]
        ]
      }
    ],
    [
      "Overriding equals() without hashCode(): Causes hash collections to lose objects or allow duplicates.",
      "Using Mutable Fields in hashCode(): Mutating fields after inserting an object into a HashSet makes it impossible to locate or remove."
    ],
    [
      "If x.equals(y) is true, x.hashCode() == y.hashCode() MUST be true.",
      "Java Records auto-generate contract-compliant equals() and hashCode() implementations."
    ],
    [
      { q: "What happens if two different keys have the same hash code?", a: "A hash collision occurs. The HashMap stores both entries in the same bucket chain (LinkedList or Red-Black Tree)." },
      { q: "Why use prime numbers like 31 in hashCode() computation?", a: "Prime numbers minimize hash collisions. Multiplication by 31 can be optimized by compilers using bitwise shift: (i << 5) - i." }
    ]
  ),

  // 06: Exception Handling (ENRICHED MASTERCLASS)
  createSection(
    "exception-handling", "06", "3. Exceptions & Generics",
    "6. Exception Handling & Robust Error Architecture Masterclass",
    "Throwable Hierarchy, Checked vs Unchecked Exceptions, Stack Unwinding, Try-With-Resources & Enterprise Exception Handler Patterns",
    "Designing resilient exception propagation, custom domain exceptions, resource leaks prevention, and Spring @ControllerAdvice architectures.",
    "exception-hierarchy",
    "Exception handling in Java provides a structured mechanism to catch and recover from runtime errors cleanly without tearing down the entire JVM process. Understanding the Throwable taxonomy, stack unwinding, resource suppression, and enterprise exception handler patterns is crucial for production reliability.",
    [
      {
        heading: "1. The Throwable Class Hierarchy (Error vs Exception)",
        content: "All exceptional objects in Java extend java.lang.Throwable, which splits into two main branches:\n\n1. java.lang.Error: Indicates fatal system-level problems beyond application recovery (e.g., OutOfMemoryError, StackOverflowError, UnknownError). Applications should NEVER catch Error.\n\n2. java.lang.Exception: Represents abnormal conditions that an application can catch, handle, or recover from."
      },
      {
        heading: "2. Checked vs Unchecked Exception Architecture",
        content: "• Checked Exceptions (Compile-Time Enforced): Subclasses of Exception excluding RuntimeException (e.g. IOException, SQLException, ClassNotFoundException). Represents recoverable external errors. The compiler FORCES caller methods to handle them via try-catch or declare them in throws clauses.\n\n• Unchecked Exceptions (Runtime Exceptions): Subclasses of RuntimeException (e.g. NullPointerException, IllegalArgumentException, IndexOutOfBoundsException). Indicates programming bugs or illegal arguments. Compiler does NOT enforce explicit handling.",
        code: `// Checked Exception Handling vs Unchecked Validation
public void processFile(String path) throws IOException { // Must declare throws
    if (path == null) {
        throw new IllegalArgumentException("Path cannot be null"); // Unchecked
    }
    File file = new File(path);
    FileReader reader = new FileReader(file); // Throws checked IOException
}`
      },
      {
        heading: "3. Try-Catch-Finally Mechanics & Stack Unwinding",
        content: "When an exception is thrown, the JVM halts normal execution and unwinds the call stack frame by frame looking for a matching catch block.\n\n• finally Block: Executes ALWAYS regardless of whether an exception was thrown or caught. Essential for resource cleanup prior to Java 7.\n• Exception to finally Execution: The finally block will NOT execute ONLY IF System.exit(0) is called, the JVM crashes, or CPU power loses execution."
      },
      {
        heading: "4. Try-With-Resources & Suppressed Exceptions (Java 7+)",
        content: "Any resource implementing java.lang.AutoCloseable or java.io.Closeable declared inside try(...) parenthesis automatically has its close() method invoked in reverse declaration order upon exiting the block.\n\nSuppressed Exceptions: If BOTH the try body throws an exception AND close() throws an exception, the JVM suppresses the close() exception and attaches it to the main exception! Retrieve via e.getSuppressed().",
        code: `// Try-With-Resources with Automatic AutoCloseable Resource Closure
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"));
     Connection conn = dataSource.getConnection()) {
    
    String data = br.readLine();
    // Do DB work with conn
} catch (IOException | SQLException e) {
    logger.error("I/O or Database operation failed", e);
    for (Throwable suppressed : e.getSuppressed()) {
        logger.warn("Suppressed close exception: ", suppressed);
    }
}`
      },
      {
        heading: "5. Custom Domain Exceptions & Exception Chaining",
        content: "Create custom exceptions extending Exception (recoverable) or RuntimeException (unrecoverable). ALWAYS preserve the original root cause stack trace by passing the cause into super(message, cause).",
        code: `public class PaymentProcessingException extends RuntimeException {
    public PaymentProcessingException(String message, Throwable cause) {
        super(message, cause); // Preserves original Exception Stack Trace!
    }
}`
      },
      {
        heading: "6. Enterprise Spring Exception Handling (@ControllerAdvice)",
        content: "In modern REST APIs, avoid scattering try-catch blocks across controllers. Use global @ControllerAdvice with @ExceptionHandler methods to map domain exceptions cleanly to HTTP response status codes (e.g., 400 Bad Request, 404 Not Found, 500 Internal Error).",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFound(UserNotFoundException ex) {
        return new ErrorResponse("USER_NOT_FOUND", ex.getMessage());
    }
}`
      }
    ],
    [
      {
        title: "Checked vs Unchecked Exceptions Matrix",
        headers: ["Property", "Checked Exception", "Unchecked Exception"],
        rows: [
          ["Base Class", "java.lang.Exception", "java.lang.RuntimeException"],
          ["Compiler Enforcement", "Mandatory (Compile-time check)", "Optional (Runtime check)"],
          ["Primary Cause", "Recoverable environmental/external failures", "Programming logic bugs & invalid inputs"],
          ["Syntax Declaration", "Must use try-catch or throws clause", "No throws clause required"],
          ["Examples", "IOException, SQLException, TimeoutException", "NullPointerException, IllegalArgumentException"]
        ]
      }
    ],
    [
      "Catching java.lang.Throwable: Catching Throwable suppresses fatal Errors like OutOfMemoryError, preventing JVM shutdown.",
      "Swallowing Exceptions: Empty catch blocks ('catch (Exception e) {}') hide bugs permanently and make troubleshooting impossible.",
      "Losing Root Stack Trace: Throwing new CustomException(e.getMessage()) discards the original stack trace root cause. Use new CustomException(message, e).",
      "Using Exceptions for Control Flow: Throwing exceptions inside regular loops for control logic degrades performance by 100x due to stack trace filling costs."
    ],
    [
      "Always use Try-With-Resources for AutoCloseable objects to prevent file descriptor and connection leaks.",
      "Preserve original stack traces using exception chaining constructor super(msg, cause).",
      "Use @ControllerAdvice in Spring REST services for centralized global error handling."
    ],
    [
      { q: "What is Suppressed Exception in Try-With-Resources?", a: "When both try block and close() throw exceptions, the close() exception is suppressed and attached to the primary exception payload via e.getSuppressed()." },
      { q: "Does finally execute if a return statement is present in try?", a: "Yes. The finally block executes BEFORE the method actually returns the value to the caller." },
      { q: "Why are RuntimeExceptions unchecked?", a: "Because checking runtime logic bugs (like NullPointerException or IndexOutOfBounds) everywhere would clutter Java code without providing recoverable remedies." }
    ]
  ),

  // 07: Functional Programming & Streams
  createSection(
    "java-8-functional", "07", "5. Modern Java (8 to 21+)",
    "7. Java 8+ Functional Programming & Streams API",
    "Lambda Expressions, Functional Interfaces, Stream Pipelines, and Parallel Execution",
    "Declarative data processing, lazy evaluation, method references, and Collector patterns.",
    "stream-pipeline-flow",
    "Java 8 revolutionized Java development by introducing Functional Programming features alongside Object-Oriented design, enabling declarative data processing with Lambdas and Streams.",
    [
      {
        heading: "1. Functional Interfaces & Lambda Expressions",
        content: "A Functional Interface has EXACTLY one abstract method (marked with @FunctionalInterface).\nCore Built-in Interfaces:\n1. Predicate<T>: test(T t) ➔ boolean\n2. Function<T, R>: apply(T t) ➔ R\n3. Consumer<T>: accept(T t) ➔ void\n4. Supplier<T>: get() ➔ T",
        code: `List<String> names = List.of("Alice", "Bob", "Charlie", "David");
List<String> filtered = names.stream()
    .filter(name -> name.startsWith("C")) // Predicate
    .map(String::toUpperCase)              // Function (Method Reference)
    .collect(Collectors.toList());        // Terminal Operation`
      },
      {
        heading: "2. Stream Processing Pipeline Architecture",
        content: "A Stream pipeline consists of 3 stages:\n1. Stream Source: Created from Collections, Arrays, or Generator functions.\n2. Intermediate Operations (Lazy): filter(), map(), flatMap(), sorted(), distinct(). Computed ONLY when terminal operation is triggered.\n3. Terminal Operations (Eager): collect(), forEach(), reduce(), count(), findFirst(). Consumes the stream."
      },
      {
        heading: "3. Optional<T> Class Mechanics",
        content: "Optional<T> is a container object used to represent missing values explicitly without null references. Methods: map(), flatMap(), filter(), orElse(), orElseGet(), orElseThrow()."
      },
      {
        heading: "4. Parallel Streams & ForkJoinPool Execution",
        content: "Calling .parallelStream() splits processing across threads using the common ForkJoinPool. Best suited for CPU-intensive tasks over massive data sets without IO blocking."
      }
    ],
    [
      {
        title: "Standard Functional Interfaces Matrix",
        headers: ["Interface", "Method Signature", "Input Parameters", "Return Value"],
        rows: [
          ["Predicate<T>", "boolean test(T t)", "1 Object (T)", "boolean"],
          ["Function<T, R>", "R apply(T t)", "1 Object (T)", "1 Object (R)"],
          ["Consumer<T>", "void accept(T t)", "1 Object (T)", "void"],
          ["Supplier<T>", "T get()", "None", "1 Object (T)"]
        ]
      }
    ],
    [
      "Reusing Streams: Streams cannot be reused after a terminal operation has been executed; calling operations again throws IllegalStateException.",
      "Using Parallel Streams for Blocking I/O: Running blocking I/O calls inside parallel streams starves the common ForkJoinPool."
    ],
    [
      "Streams lazy-evaluate intermediate operations until a terminal operation is executed.",
      "Use Optional<T> as method return types to prevent NullPointerException bugs."
    ],
    [
      { q: "Difference between map() and flatMap() in Streams?", a: "map() transforms 1:1 elements; flatMap() flattens 1:N nested streams (Stream<List<T>> ➔ Stream<T>)." },
      { q: "Difference between orElse() and orElseGet() in Optional?", a: "orElse(val) evaluates default value eagerly regardless; orElseGet(() -> val) evaluates default value lazily only if empty." }
    ]
  ),

  // 08: Generics & PECS Rule
  createSection(
    "generics-pecs", "08", "3. Exceptions & Generics",
    "8. Java Generics & PECS Rule",
    "Type Erasure, Wildcards (? extends T vs ? super T), and Covariance/Contravariance",
    "Compile-time type safety, wildcard bounds, and the Producer Extends Consumer Super rule.",
    null,
    "Java Generics (introduced in Java 5) enable classes, interfaces, and methods to be parameterized by type, eliminating manual type casts and catching type errors at compile-time.",
    [
      {
        heading: "1. Type Erasure Mechanics",
        content: "Java implements Generics via Type Erasure to maintain backward compatibility with legacy JVMs. During compilation, the compiler replaces generic types with their upper bound (or Object) and inserts explicit casts in bytecode. Generic type parameter info is erased at runtime!"
      },
      {
        heading: "2. The PECS Principle (Producer Extends, Consumer Super)",
        content: "PECS is the golden rule for defining generic wildcards:\n\n• Producer Extends (? extends T): Use when collection READS data (produces T). Covariant.\n• Consumer Super (? super T): Use when collection WRITES data (consumes T). Contravariant.",
        code: `// Producer Extends (Read-Only Source)
public static double sumOfList(List<? extends Number> list) {
    double sum = 0.0;
    for (Number n : list) { sum += n.doubleValue(); }
    return sum;
}

// Consumer Super (Write-Only Destination)
public static void addIntegers(List<? super Integer> list) {
    list.add(10);
    list.add(20);
}`
      },
      {
        heading: "3. Unbounded Wildcards (?) vs Type Parameters (<T>)",
        content: "• Wildcard List<?>: Represents an unknown type. Read-only as Object; cannot add elements (except null).\n• Type Parameter <T>: Enables type relationships across parameters and return values."
      },
      {
        heading: "4. Limitations of Java Generics",
        content: "1. Cannot instantiate generic arrays: new T[10] is invalid.\n2. Cannot use primitives: List<int> is invalid (must use List<Integer>).\n3. Static context restrictions: Static fields cannot use instance generic types."
      }
    ],
    [
      {
        title: "PECS Wildcard Matrix",
        headers: ["Wildcard Pattern", "Variance Type", "Read Capability", "Write Capability"],
        rows: [
          ["? extends T", "Covariant", "Safe (Returns T)", "Forbidden (Only null)"],
          ["? super T", "Contravariant", "Returns Object", "Safe (Accepts T)"],
          ["?", "Unbounded", "Returns Object", "Forbidden (Only null)"]
        ]
      }
    ],
    [
      "Attempting to Add to ? extends T: You cannot add elements to a List<? extends Number> because the compiler cannot verify the exact subtype at runtime.",
      "Raw Types Usage: Using raw types like List instead of List<String> disables generic compile-time type safety."
    ],
    [
      "Type erasure removes generic type parameters during compilation for backward compatibility.",
      "Remember PECS: Producer Extends (read), Consumer Super (write)."
    ],
    [
      { q: "Why can't you create a generic array like new T[10]?", a: "Arrays enforce runtime type checks, whereas generic types are erased at compile time, leading to ArrayStoreException risk." },
      { q: "What is a Bridge Method in Java Generics?", a: "A synthetic method created by the compiler during type erasure to preserve polymorphic method overriding." }
    ]
  ),

  // 09: Multithreading & Concurrency (ENRICHED MASTERCLASS)
  createSection(
    "multithreading-concurrency", "09", "4. Concurrency & JVM",
    "9. Multithreading & Concurrency Essentials Masterclass",
    "Thread Lifecycle, Monitors, Explicit Locks, ThreadPoolExecutor Tuning, Synchronizers, CAS Atomics & CompletableFuture Chains",
    "Mastering thread state transitions, ReentrantLock, ReadWriteLock, ExecutorService tuning, atomic operations, and async programming.",
    "multithreading-lifecycle",
    "Multithreading enables concurrent execution of multiple threads within a single JVM process, maximizing hardware CPU core utilization. Mastering thread state transitions, synchronization monitors, lock-free CAS atomics, thread pool tuning, and CompletableFuture chains is critical for concurrent server applications.",
    [
      {
        heading: "1. Thread Creation & Execution (Thread vs Runnable vs Callable)",
        content: "• Thread / Runnable: Basic thread task returning no result (run() returns void). Cannot throw checked exceptions.\n• Callable<V> & Future<V>: Task execution returning a typed result V or throwing checked exceptions. Managed via ExecutorService.",
        code: `// Callable & Future Task Submission
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> future = executor.submit(() -> {
    // Perform heavy calculation
    return 42;
});
Integer result = future.get(); // Blocks until completion`
      },
      {
        heading: "2. Thread Lifecycle & State Machine Transitions",
        content: "Thread.State Enums:\n1. NEW: Thread created via new Thread(), not started yet.\n2. RUNNABLE: Executing in JVM or waiting for OS CPU time slice allocation.\n3. BLOCKED: Waiting to acquire an intrinsic monitor lock held by another thread.\n4. WAITING: Waiting indefinitely for another thread via Object.wait(), Thread.join(), or LockSupport.park().\n5. TIMED_WAITING: Waiting for a specific duration via Thread.sleep(ms), Object.wait(ms), or LockSupport.parkNanos().\n6. TERMINATED: Run method completed execution or crashed with uncaught exception."
      },
      {
        heading: "3. Synchronization & Intrinsic Monitor Locks",
        content: "• synchronized Keyword: Implicit intrinsic monitor locking attached to object headers. Guarantees Mutual Exclusion (Mutex) and JMM Memory Visibility. Automatically releases lock when exiting block."
      },
      {
        heading: "4. Explicit Locks: ReentrantLock & ReentrantReadWriteLock",
        content: "• ReentrantLock: API-based explicit lock providing lockInterruptibly(), tryLock(timeout), and Fair/Unfair locking policies.\n• ReentrantReadWriteLock: Maintains separate Read Lock (shared across multiple concurrent readers) and Write Lock (exclusive for single writer). Boosts throughput for read-heavy shared data.",
        code: `ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
// Read Lock acquisition (Shared)
rwLock.readLock().lock();
try {
    // Read shared cache
} finally {
    rwLock.readLock().unlock();
}`
      },
      {
        heading: "5. Executor Framework & ThreadPoolExecutor Tuning",
        content: "ThreadPoolExecutor Parameters:\n1. corePoolSize: Minimum active worker threads retained.\n2. maximumPoolSize: Upper thread ceiling under peak load.\n3. keepAliveTime: Idle duration for non-core threads.\n4. workQueue: ArrayBlockingQueue (bounded) / LinkedBlockingQueue.\n5. RejectedExecutionHandler: AbortPolicy (throws exception), CallerRunsPolicy (executes task on submitter thread), DiscardPolicy.",
        code: `ThreadPoolExecutor customPool = new ThreadPoolExecutor(
    4,                           // corePoolSize
    16,                          // maximumPoolSize
    60L, TimeUnit.SECONDS,        // keepAliveTime
    new ArrayBlockingQueue<>(500),// Bounded workQueue
    new ThreadPoolExecutor.CallerRunsPolicy() // Rejection Handler
);`
      },
      {
        heading: "6. Concurrent Synchronizers: CountDownLatch, CyclicBarrier & Semaphore",
        content: "• CountDownLatch: One-time gate that blocks threads until a counter reaches zero via countDown().\n• CyclicBarrier: Reusable barrier where N threads wait for each other via await() before proceeding together.\n• Semaphore: Controls a fixed number of permits for restricted concurrent resource access (e.g. limiting DB connections)."
      },
      {
        heading: "7. Lock-Free Atomic Variables & CAS Atomics",
        content: "Atomic classes (AtomicInteger, AtomicReference, LongAdder) utilize hardware CPU Compare-And-Swap (CAS) instructions to perform thread-safe updates without lock contention blocking."
      },
      {
        heading: "8. Asynchronous CompletableFuture Pipeline Chains",
        content: "CompletableFuture provides functional async programming with non-blocking callbacks (`thenApply`, `thenAccept`, `thenCompose`, `allOf`).",
        code: `CompletableFuture.supplyAsync(() -> fetchUserData(userId))
    .thenApply(user -> enrichUserOrders(user))
    .thenAccept(summary -> renderDashboard(summary))
    .exceptionally(ex -> {
        logger.error("Async pipeline error", ex);
        return null;
    });`
      }
    ],
    [
      {
        title: "Synchronized Block vs ReentrantLock vs ReadWriteLock",
        headers: ["Feature", "synchronized Block", "ReentrantLock", "ReentrantReadWriteLock"],
        rows: [
          ["Lock Type", "Implicit Intrinsic Monitor", "Explicit Lock API", "Separate Read/Write Lock API"],
          ["Concurrent Readers", "Single (Blocked)", "Single (Blocked)", "Multiple Shared Readers"],
          ["Fairness Policy", "Unfair only", "Supports Fair / Unfair", "Supports Fair / Unfair"],
          ["Interruptibility", "Non-interruptible", "lockInterruptibly()", "lockInterruptibly()"]
        ]
      }
    ],
    [
      "Forgetting unlock() in ReentrantLock: Failing to unlock inside a finally block causes permanent deadlocks.",
      "Unbounded Queues in ThreadPools: Using LinkedBlockingQueue without capacity limits leads to OutOfMemoryError when task submit rate exceeds processing capacity.",
      "Deadlock Creation: Acquiring multiple locks in different order across threads (Thread A: L1->L2, Thread B: L2->L1) causes permanent Deadlocks."
    ],
    [
      "Always unlock explicit ReentrantLock instances inside a finally block.",
      "Use ExecutorService with bounded work queues and CallerRunsPolicy for production thread pools.",
      "Atomic variables use CPU CAS instructions for high-performance lock-free state updates."
    ],
    [
      { q: "What is Deadlock and how can it be avoided?", a: "Deadlock occurs when 2+ threads wait indefinitely for locks held by each other. Avoid it by acquiring locks in a strict global ordering." },
      { q: "Difference between submit() and execute() in ExecutorService?", a: "execute() returns void and uncaught exceptions crash worker threads; submit() returns Future<T> capturing exceptions inside Future.get()." },
      { q: "Why is LongAdder faster than AtomicLong under high thread contention?", a: "LongAdder splits internal counters across multiple cells per CPU core, reducing CAS bus contention." }
    ]
  ),

  // 10: JVM Architecture
  createSection(
    "jvm-architecture", "10", "4. Concurrency & JVM",
    "10. JVM Architecture & ClassLoader Subsystem",
    "ClassLoader Delegation Hierarchy, Memory Areas, and Execution Engine",
    "Deep dive into HotSpot JVM runtime data areas, Metaspace, and JIT compiler tiers.",
    "jvm-memory-flow",
    "The HotSpot JVM is an enterprise-grade virtual machine that executes Java bytecode, providing automatic memory management, dynamic tier compilation, and hardware abstracting.",
    [
      {
        heading: "1. ClassLoader Subsystem Architecture",
        content: "Class Loading Phases:\n1. Loading: Reads .class binary data into memory.\n2. Linking: Verification (safety check), Preparation (allocates static default memory), Resolution (symbolic to direct references).\n3. Initialization: Executes static initializer blocks and static variable assignments."
      },
      {
        heading: "2. Parent Delegation Model Hierarchy",
        content: "ClassLoader Hierarchy:\n1. Bootstrap ClassLoader: Native C++ loader. Loads core java.base runtime classes (rt.jar).\n2. Platform / Extension ClassLoader: Loads standard extension modules.\n3. Application / System ClassLoader: Loads user application classpath classes."
      },
      {
        heading: "3. JVM Runtime Data Areas Memory Layout",
        content: "• Thread-Shared: Heap (Objects & Arrays) and Metaspace (Class metadata, method bytecodes, static fields).\n• Thread-Private: PC Register (current bytecode pointer), JVM Stack (method call frames & local variables), Native Method Stack."
      },
      {
        heading: "4. Execution Engine: Tiered JIT Compilation (C1 & C2)",
        content: "HotSpot JVM utilizes Tiered Compilation:\n• Tier 0: Interpreter executes bytecode immediately.\n• Tiers 1-3: C1 (Client Compiler) quickly generates machine code with light profiling.\n• Tier 4: C2 (Server Compiler) performs deep aggressive optimizations (inlining, loop unrolling, escape analysis) for hot methods."
      }
    ],
    [
      {
        title: "JVM Runtime Memory Regions Summary",
        headers: ["Memory Area", "Sharing Level", "Contains", "OOM Error Risk"],
        rows: [
          ["Heap", "Thread-Shared", "All Objects & Arrays", "java.lang.OutOfMemoryError: Java heap space"],
          ["Metaspace", "Thread-Shared", "Class Metadata & Method Code", "java.lang.OutOfMemoryError: Metaspace"],
          ["JVM Stack", "Thread-Private", "Stack Frames & Local Variables", "java.lang.StackOverflowError"],
          ["PC Register", "Thread-Private", "Current Bytecode Instruction Address", "None"]
        ]
      }
    ],
    [
      "Classloader Memory Leaks: Custom classloaders failing to unload in dynamic plugin frameworks cause Metaspace OutOfMemoryError.",
      "Recursive Method Calls: Infinite recursion depletes JVM call stack depth, throwing StackOverflowError."
    ],
    [
      "ClassLoader follows Parent Delegation model to prevent security tampering with core runtime classes.",
      "Tiered Compilation combines fast interpreter startup with C2 JIT high-throughput compilation."
    ],
    [
      { q: "What replaced PermGen in Java 8?", a: "Metaspace replaced PermGen in Java 8. Metaspace resides in off-heap native memory and auto-resizes dynamically." },
      { q: "What is Escape Analysis in JIT Compiler?", a: "Escape Analysis determines if an object allocation escapes a method context. If not, JIT optimizes allocation onto the Stack (Scalar Replacement) instead of Heap!" }
    ]
  ),

  // 11: Garbage Collection Mechanics
  createSection(
    "garbage-collection", "11", "4. Concurrency & JVM",
    "11. Garbage Collection Mechanics & Collectors",
    "Generational GC Hypothesis, Mark-Sweep-Compact, G1GC, ZGC, and GC Tuning",
    "Automated memory reclamation, pause time minimization, and collector selection strategy.",
    "gc-regions",
    "Java Garbage Collection (GC) automatically reclaims Heap memory occupied by unreferenced objects, eliminating manual memory deallocation bugs.",
    [
      {
        heading: "1. Generational GC Hypothesis & Reachability Analysis",
        content: "Generational Hypothesis: Most created objects die young (<90% die in Young Gen).\nHeap Generations:\n1. Young Generation: Eden space, Survivor 0 (S0), Survivor 1 (S1). Minor GC collects Young Gen.\n2. Old / Tenured Generation: Long-lived objects promoted after surviving N GC cycles (Tenuring Threshold)."
      },
      {
        heading: "2. Garbage Collection Phases & Algorithms",
        content: "1. Mark Phase: Identifies active reachable objects starting from GC Roots (Thread stacks, static references, JNI pointers).\n2. Sweep Phase: Reclaims unreferenced object memory.\n3. Compact Phase: Relocates surviving objects contiguously to eliminate memory fragmentation."
      },
      {
        heading: "3. Modern HotSpot Garbage Collectors Comparison",
        content: "• Serial GC: Single-threaded collector for small embedded apps.\n• Parallel GC: Throughput-focused multi-threaded collector for batch processing.\n• G1GC (Garbage-First): Default since Java 9. Divides heap into equal regions (1MB-32MB). Target pause time model.\n• ZGC (Z Garbage Collector): Ultra-low pause time (<1ms) concurrent collector scalable up to 16TB heaps."
      },
      {
        heading: "4. OutOfMemoryError Types & Memory Leak Analysis",
        content: "Common OOM Exceptions:\n1. OutOfMemoryError: Java heap space (Heap exhausted).\n2. OutOfMemoryError: Metaspace (Class metadata limit reached).\n3. OutOfMemoryError: Unable to create new native thread (OS memory/thread limit)."
      }
    ],
    [
      {
        title: "Collector Performance Comparison",
        headers: ["Garbage Collector", "Primary Design Goal", "Pause Times", "Recommended Heap Size"],
        rows: [
          ["Parallel GC", "Maximum Throughput", "High (Stop-The-World)", "< 4 GB"],
          ["G1GC", "Balanced Throughput & Pause Time", "Low (100-200ms target)", "4 GB - 64 GB"],
          ["ZGC", "Ultra-Low Latency (<1ms)", "Consistent Sub-Millisecond", "16 GB - 16 TB"]
        ]
      }
    ],
    [
      "Static Reference Memory Leaks: Adding objects to static collections without removing them prevents GC root collection permanently.",
      "Explicit System.gc() Calls: Calling System.gc() forces full Stop-The-World GC cycles. Disable via -XX:+DisableExplicitGC."
    ],
    [
      "G1GC divides Heap into equal regions and prioritizes regions with maximum garbage.",
      "ZGC uses colored pointers and load barriers to achieve sub-millisecond pause times."
    ],
    [
      { q: "What are GC Roots?", a: "Objects directly accessible from outside the Heap (Thread stack frames, local variables, active static fields, JNI native pointers)." },
      { q: "Difference between Minor GC, Major GC, and Full GC?", a: "Minor GC collects Young Gen; Major GC collects Old Gen; Full GC collects entire Heap + Metaspace in Stop-The-World pause." }
    ]
  ),

  // 12: Java Memory Model
  createSection(
    "java-memory-model", "12", "4. Concurrency & JVM",
    "12. Java Memory Model (JMM) & Happens-Before",
    "CPU Caching, Instruction Reordering, Volatile Barriers, and Atomic Operations",
    "Mastering thread visibility guarantees, memory barriers, and lock-free CAS atomics.",
    "jmm-cache-coherence",
    "The Java Memory Model (JMM) defines formal rules specifying how threads interact through shared memory, guaranteeing visibility, ordering, and atomicity.",
    [
      {
        heading: "1. Hardware CPU Caching & Instruction Reordering Problems",
        content: "Modern multi-core CPUs use multi-level hardware caches (L1/L2/L3) and execute instructions out-of-order to maximize execution speeds. Without memory synchronization, thread writes in CPU Core 1 cache may not be visible to thread reads in CPU Core 2 cache."
      },
      {
        heading: "2. The Volatile Keyword Mechanics & Memory Barriers",
        content: "Declaring a field 'volatile' guarantees:\n1. Thread Visibility: Reads/writes flush directly to/from main RAM memory, bypassing CPU local caches.\n2. Instruction Reordering Barrier: Prevents compilers and CPUs from reordering instructions across the volatile read/write barrier.\nNote: Volatile guarantees visibility and ordering, but NOT atomicity for compound operations (e.g. count++)!"
      },
      {
        heading: "3. Happens-Before Relationship Rules",
        content: "Happens-Before guarantees that memory writes by one thread are visible to subsequent reads by another thread:\n1. Volatile Rule: Write to a volatile variable happens-before subsequent read of that variable.\n2. Monitor Lock Rule: Unlock of a monitor happens-before subsequent lock acquisition.\n3. Thread Start Rule: Thread.start() call happens-before any action inside run()."
      },
      {
        heading: "4. Lock-Free Atomic Variables & CAS Operations",
        content: "Atomic classes (AtomicInteger, AtomicReference) use hardware CPU Compare-And-Swap (CAS) assembly instructions to achieve thread-safe updates without lock blocking.",
        code: `AtomicInteger counter = new AtomicInteger(0);
int newValue = counter.incrementAndGet(); // Lock-free CAS update`
      }
    ],
    [
      {
        title: "Volatile vs AtomicInteger vs Synchronized",
        headers: ["Feature", "volatile Keyword", "AtomicInteger", "synchronized Block"],
        rows: [
          ["Visibility Guarantee", "Yes", "Yes", "Yes"],
          ["Instruction Ordering", "Yes", "Yes", "Yes"],
          ["Atomic Compound Ops", "No (count++ unsafe)", "Yes (CAS)", "Yes (Mutex Lock)"],
          ["Thread Blocking", "No (Lock-free)", "No (Lock-free)", "Yes (Blocks on monitor)"]
        ]
      }
    ],
    [
      "Assuming volatile handles count++: 'volatile int c = 0; c++;' is NOT atomic (read-modify-write). Use AtomicInteger instead.",
      "Double-Checked Locking without volatile: Singleton double-checked locking without volatile singleton instance leads to partially initialized object bugs."
    ],
    [
      "Volatile enforces thread visibility and prevents instruction reordering via memory barriers.",
      "Atomic classes utilize hardware CAS instructions for lock-free concurrent performance."
    ],
    [
      { q: "What is False Sharing in JVM memory access?", a: "False Sharing occurs when threads on different CPU cores modify independent variables residing on the same 64-byte hardware Cache Line." },
      { q: "What is the Happens-Before guarantee?", a: "A formal JMM ordering relationship guaranteeing that memory updates made by Action A are visible to Action B." }
    ]
  ),

  // 13: Interfaces vs Abstract Classes
  createSection(
    "interfaces-abstract-classes", "13", "1. Fundamentals & OOP",
    "13. Interfaces vs Abstract Classes",
    "Architectural Contract vs Inheritance Blueprint, Default Methods, and Multiple Interface Resolution",
    "Comparing abstract class state inheritance against interface component contract modularity.",
    "interface-abstract-tree",
    "Abstract Classes and Interfaces form the backbone of abstraction in Java, allowing developers to define contracts and reusability.",
    [
      {
        heading: "1. Core Architectural Differences",
        content: "• Abstract Class: Can maintain instance state (non-final fields), constructors, and partial method implementations. Represents 'IS-A' relationship. Single inheritance.\n• Interface: Represents contract component capability ('CAN-DO'). Cannot maintain instance state fields. Supports multiple interface inheritance."
      },
      {
        heading: "2. Modern Interface Features (Java 8 & Java 9+)",
        content: "• Default Methods (Java 8): Allows adding concrete default implementations to interfaces without breaking existing implementing classes.\n• Static Methods (Java 8): Utility methods attached directly to the interface.\n• Private Methods (Java 9): Enables code refactoring inside interfaces without exposing implementation methods publicly."
      },
      {
        heading: "3. Resolving Interface Diamond Conflicts",
        content: "If a class implements two interfaces defining identical default methods, compiler forces the class to override and resolve ambiguity explicitly using InterfaceName.super.methodName()."
      },
      {
        heading: "4. When to Use Which?",
        content: "Use Abstract Class for shared code across closely related classes sharing instance fields. Use Interface for defining decoupled capabilities across unrelated classes."
      }
    ],
    [
      {
        title: "Interface vs Abstract Class Direct Matrix",
        headers: ["Feature", "Interface", "Abstract Class"],
        rows: [
          ["Inheritance Model", "Multiple implementation (implements A, B)", "Single inheritance (extends A)"],
          ["Instance Fields", "Forbidden (Only public static final constants)", "Allowed (private, protected, instance fields)"],
          ["Constructors", "Forbidden", "Allowed"],
          ["Default Implementations", "Allowed (via default keywords)", "Allowed (Standard methods)"]
        ]
      }
    ],
    [
      "Adding Fields to Interfaces: Placing mutable state in interfaces leads to global constant pollution.",
      "Overusing Abstract Classes: Extending abstract classes purely for utility helper methods creates rigid inheritance coupling."
    ],
    [
      "Interfaces define component capabilities; Abstract Classes define shared base object state.",
      "Java 8 default methods allow interface API evolution while preserving backward compatibility."
    ],
    [
      { q: "Can an interface extend another interface?", a: "Yes. An interface can extend multiple parent interfaces using the extends keyword." },
      { q: "Why can't interfaces have constructors?", a: "Constructors initialize instance state. Since interfaces cannot possess instance state fields, constructors are prohibited." }
    ]
  ),

  // 14: Access Modifiers & Object Lifecycle
  createSection(
    "access-modifiers-lifecycle", "14", "1. Fundamentals & OOP",
    "14. Access Modifiers & Object Lifecycle",
    "Visibility Scope Matrix, Initializer Blocks, and Memory Lifecycle",
    "Mastering public, protected, package-private, private visibility and object instantiation steps.",
    null,
    "Access modifiers enforce encapsulation boundaries across classes, packages, and subclasses.",
    [
      {
        heading: "1. Access Modifiers Scope Matrix",
        content: "1. public: Accessible anywhere across packages.\n2. protected: Accessible in same package + subclasses in external packages.\n3. package-private (default): Accessible ONLY inside the same package.\n4. private: Accessible ONLY inside the declaring class."
      },
      {
        heading: "2. Static & Instance Initializer Execution Order",
        content: "Instantiation Order:\n1. Static Variables & Static Initializer Blocks (Run ONCE when class is loaded).\n2. Instance Variables & Instance Initializer Blocks (Run on every 'new' instantiation).\n3. Constructor Execution."
      },
      {
        heading: "3. Keyword Modifiers Breakdown",
        content: "• final: Classes (cannot inherit), Methods (cannot override), Variables (immutable value assignment).\n• static: Belongs to class metadata rather than instance object.\n• transient: Excludes field from Java binary serialization.\n• volatile: Enforces thread memory visibility."
      },
      {
        heading: "4. Object Finalization & Cleaner API (Java 9+)",
        content: "Object.finalize() is DEPRECATED and removed. Use java.lang.ref.Cleaner or AutoCloseable for deterministic resource cleanup."
      }
    ],
    [
      {
        title: "Access Modifier Visibility Matrix",
        headers: ["Modifier", "Same Class", "Same Package", "Subclass (Diff Package)", "Global World"],
        rows: [
          ["public", "Yes", "Yes", "Yes", "Yes"],
          ["protected", "Yes", "Yes", "Yes", "No"],
          ["default (package)", "Yes", "Yes", "No", "No"],
          ["private", "Yes", "No", "No", "No"]
        ]
      }
    ],
    [
      "Relying on finalize(): finalize() method execution is nondeterministic and can cause severe memory leaks.",
      "Default Package Access Leakage: Omitting access modifiers accidentally exposes fields to package-tampering."
    ],
    [
      "Static initializers run once per classload; instance initializers run prior to constructor execution.",
      "Always default to private field accessibility to preserve encapsulation."
    ],
    [
      { q: "Can a class be declared private or protected?", a: "Top-level classes CANNOT be private or protected (only public or package-private). Inner nested classes CAN be private/protected." },
      { q: "What is a Blank Final variable?", a: "A final instance variable not initialized at declaration; it MUST be initialized in every constructor." }
    ]
  ),

  // 15: Immutability & Defensive Copying
  createSection(
    "immutability-pattern", "15", "1. Fundamentals & OOP",
    "15. Immutability & Defensive Copying",
    "Rules of Immutability, Defensive Copies, and Thread Safety",
    "Building robust unmodifiable objects and preventing reference leakage.",
    null,
    "Immutable objects cannot be modified after creation, offering thread safety without locking.",
    [
      {
        heading: "1. The 5 Rules of Immutability",
        content: "1. Mark class as 'final' (prevents subclass overriding).\n2. Make all fields 'private' and 'final'.\n3. Provide NO setter methods.\n4. Perform Defensive Copying on mutable objects passed in constructors.\n5. Return Defensive Copies of mutable objects in getter methods."
      },
      {
        heading: "2. Defensive Copying Techniques",
        content: "If an immutable class contains a mutable field (e.g. Date, List, Custom Object), constructor and getter MUST clone or copy the object payload.",
        code: `public final class UserProfile {
    private final String username;
    private final Date birthDate; // Mutable field!

    public UserProfile(String username, Date birthDate) {
        this.username = username;
        this.birthDate = new Date(birthDate.getTime()); // Defensive Copy on Ingest
    }

    public Date getBirthDate() {
        return new Date(this.birthDate.getTime()); // Defensive Copy on Export
    }
}`
      },
      {
        heading: "3. Unmodifiable vs Immutable Collections",
        content: "• Collections.unmodifiableList(list): View wrapper. If underlying list mutates, unmodifiable view reflects changes!\n• List.copyOf(list) / List.of(): Truly immutable shallow copy snapshot."
      },
      {
        heading: "4. Benefits of Immutability in Concurrent Systems",
        content: "Immutable objects can be shared freely across concurrent threads without locks, eliminates data race bugs, and simplifies code reasoning."
      }
    ],
    [
      {
        title: "Mutable vs Immutable Class Matrix",
        headers: ["Property", "Mutable Class", "Immutable Class"],
        rows: [
          ["State Changes", "Allowed post-instantiation", "Forbidden after creation"],
          ["Thread Safety", "Requires locks / synchronization", "Inherently thread-safe"],
          ["HashMap Key Suitability", "Dangerous (Hash mutation)", "Ideal & Safe"],
          ["Defensive Copy Requirement", "Not required", "Mandatory for internal reference fields"]
        ]
      }
    ],
    [
      "Leaking Internal Reference Objects: Returning 'return this.date;' directly from a getter breaks immutability.",
      "Confusing Unmodifiable Collections with Immutable Collections: Unmodifiable wrappers still mutate if original collection reference changes."
    ],
    [
      "Defensive copying in constructors and getters prevents reference leakage bugs.",
      "Use List.of() or List.copyOf() for true immutable collection creation."
    ],
    [
      { q: "Why should HashMap keys be immutable?", a: "Because if key state mutates, its hashCode changes, making the entry unlocatable in the HashMap bucket." },
      { q: "Are Java 16 Records automatically immutable?", a: "Yes. Records create final fields and private components, but mutable fields (e.g. Date/List) inside records still require manual defensive copies in compact constructors!" }
    ]
  ),

  // 16: Java Records
  createSection(
    "java-records", "16", "5. Modern Java (8 to 21+)",
    "16. Java Records (Java 16+)",
    "Transparent Data Carriers, Compact Constructors, and Pattern Matching Integration",
    "Replacing verbose boilerplate POJOs with immutable record data carriers.",
    null,
    "Java Records (introduced in Java 16) are special immutable data classes designed to act as transparent carriers for immutable data payloads.",
    [
      {
        heading: "1. Record Architecture & Auto-Generated Features",
        content: "Declaring 'public record Point(int x, int y) {}' automatically generates:\n1. private final fields for components.\n2. Public accessor methods matching component names (x() and y()).\n3. Canonical constructor.\n4. equals(), hashCode(), and toString() implementations."
      },
      {
        heading: "2. Compact Constructor Pattern",
        content: "Compact constructors allow parameter validation and defensive copies without repeating field assignment boilerplate.",
        code: `public record BankAccount(String iban, double balance) {
    // Compact Constructor
    public BankAccount {
        if (balance < 0) throw new IllegalArgumentException("Negative balance");
        iban = iban.trim(); // Transformed before assignment
    }
}`
      },
      {
        heading: "3. Record Rules & Constraints",
        content: "1. Cannot extend other classes (implicitly extends java.lang.Record).\n2. Cannot declare instance fields (only static fields allowed).\n3. Final class implicitly (cannot be abstract or extended)."
      },
      {
        heading: "4. Record Pattern Matching (Java 21)",
        content: "Java 21 enables deconstructing record components directly inside switch statements or instanceOf expressions."
      }
    ],
    [
      {
        title: "Traditional POJO Class vs Java Record",
        headers: ["Feature", "Traditional POJO Class", "Java Record (Java 16+)"],
        rows: [
          ["Boilerplate Code", "High (Getters, equals, hashCode, toString)", "Zero (Auto-generated by compiler)"],
          ["Field Mutability", "Mutable by default", "Strictly Immutable (final fields)"],
          ["Inheritance", "Can extend classes", "Cannot extend classes"],
          ["Component Accessors", "getFieldName()", "fieldName()"]
        ]
      }
    ],
    [
      "Declaring Mutable Objects inside Records: Placing List<String> inside a Record without defensive copies permits external mutation.",
      "Attempting Instance Field Declarations: Adding non-static fields inside Record body triggers compilation error."
    ],
    [
      "Records eliminate boilerplate for immutable data carrier classes.",
      "Use Compact Constructors inside records for validation and defensive copies."
    ],
    [
      { q: "Can a Record implement interfaces?", a: "Yes. Records can implement one or multiple interfaces." },
      { q: "Can record accessor methods be overridden?", a: "Yes, component accessor methods can be overridden, but they should preserve the original component contract." }
    ]
  ),

  // 17: Enums & High-Performance Collections
  createSection(
    "java-enums", "17", "1. Fundamentals & OOP",
    "17. Enums & High-Performance Collections",
    "Type-Safe Constants, Enum Class Under the Hood, EnumSet, and EnumMap",
    "Type-safe enumerations, Singleton pattern guarantee, and bitwise collection optimization.",
    null,
    "Enums represent fixed set of type-safe constants, implicitly extending java.lang.Enum.",
    [
      {
        heading: "1. Enum Architecture & Fields/Constructors",
        content: "Enums can contain fields, private constructors, and methods. Enum constructors are executed once per constant when class is loaded."
      },
      {
        heading: "2. Enum Under the Hood: Thread-Safe Singleton Guarantee",
        content: "Enums provide absolute protection against reflection and serialization attacks for implementing Singletons (as recommended by Joshua Bloch)."
      },
      {
        heading: "3. Ultra-Fast Collections: EnumSet & EnumMap",
        content: "• EnumSet: High-performance Set backed by a bit-vector (long bitmask). Operations are O(1) bitwise operations.\n• EnumMap: Map backed by a compact array indexed by enum ordinal. Exceptionally fast and memory efficient."
      },
      {
        heading: "4. State Machine Strategy Pattern with Enums",
        content: "Enums can define abstract methods implemented individually by each enum constant payload."
      }
    ],
    [
      {
        title: "EnumMap vs HashMap Comparison",
        headers: ["Property", "EnumMap", "HashMap"],
        rows: [
          ["Key Type Restriction", "Must be Enum keys", "Any Object key"],
          ["Internal Data Structure", "Compact Array (Indexed by ordinal)", "Bucket Array + Red-Black Tree"],
          ["Performance", "Fastest O(1) (Direct array access)", "O(1) average / O(log N) treeified"],
          ["Memory Footprint", "Minimal array storage", "Node objects & bucket overhead"]
        ]
      }
    ],
    [
      "Using ordinal() for Persistence: Storing enum.ordinal() in databases causes data corruption if enum order changes. Always store name().",
      "Attempting Public Enum Constructors: Enum constructors are implicitly private; public modifiers cause compilation error."
    ],
    [
      "Enum Singleton is the safest, reflection-proof singleton implementation in Java.",
      "Use EnumMap and EnumSet for maximum speed when keys are Enum types."
    ],
    [
      { q: "Can an enum extend a class?", a: "No. Enums implicitly extend java.lang.Enum, and Java does not support multiple class inheritance." },
      { q: "Why is EnumSet faster than HashSet?", a: "Because EnumSet uses bitwise bitmask operations on primitive long integers internally." }
    ]
  ),

  // 18: Annotations & Reflection API
  createSection(
    "annotations-reflection", "18", "5. Modern Java (8 to 21+)",
    "18. Annotations & Reflection API",
    "Metadata Annotations, Runtime Reflection, Proxies, and Reflection Performance Costs",
    "Inspecting runtime bytecode, custom annotations, dynamic proxies, and security limits.",
    null,
    "Annotations provide metadata information about code, processed at compile-time or runtime via Reflection.",
    [
      {
        heading: "1. Annotation Targets & Retention Policies",
        content: "• @Retention: SOURCE (discarded by compiler), CLASS (kept in .class file, ignored by JVM), RUNTIME (retained at runtime for reflection).\n• @Target: METHOD, FIELD, TYPE, PARAMETER."
      },
      {
        heading: "2. Reflection API Mechanics",
        content: "Reflection (java.lang.reflect) inspects and modifies runtime class structures, accessing private fields and invoking methods dynamically."
      },
      {
        heading: "3. Dynamic Proxies & Framework AOP",
        content: "Frameworks like Spring use Java Dynamic Proxies (Proxy.newProxyInstance) and ByteBuddy/CGLIB to implement Aspect-Oriented Programming (@Transactional, @Autowired)."
      },
      {
        heading: "4. Performance Impact & Module System Restrictions",
        content: "Reflection bypasses compiler optimization, incurs up to 10-20x latency overhead compared to direct calls, and requires module opens directives in Java 9+."
      }
    ],
    [
      {
        title: "Retention Policies Matrix",
        headers: ["Policy", "Available in .class File?", "Available at Runtime via Reflection?", "Primary Use Case"],
        rows: [
          ["SOURCE", "No", "No", "Lombok, @Override, Compiler Warnings"],
          ["CLASS", "Yes", "No", "Bytecode enhancement tools"],
          ["RUNTIME", "Yes", "Yes", "Spring IoC, Jackson JSON, JUnit"]
        ]
      }
    ],
    [
      "Bypassing Security via setAccessible(true): Overusing setAccessible(true) breaks encapsulation and breaks in Java 17+ modules.",
      "Reflection Performance Degradation: Invoking reflective calls in high-throughput hot loops causes severe CPU overhead."
    ],
    [
      "Runtime annotations require @Retention(RetentionPolicy.RUNTIME) for reflection processing.",
      "Reflection powers modern frameworks (Spring, Hibernate, Jackson) through dynamic bytecode inspection."
    ],
    [
      { q: "What is MethodHandle in Java?", a: "Introduced in Java 7, MethodHandle is a low-level, strongly-typed executable method reference faster than standard Reflection." },
      { q: "Difference between Class.forName() and ClassLoader.loadClass()?", a: "Class.forName() initializes static blocks by default; ClassLoader.loadClass() delays static initialization until first instantiation." }
    ]
  ),

  // 19: Traditional I/O vs Modern Java NIO
  createSection(
    "java-io-nio", "19", "6. Frameworks & Enterprise",
    "19. Traditional I/O vs Modern Java NIO",
    "Stream I/O vs Buffer/Channel NIO, Non-blocking Selectors, and Memory-Mapped Files",
    "Blocking byte streams vs non-blocking channel selectors, direct buffers, and zero-copy performance.",
    "nio-channel-buffer",
    "Java NIO (New I/O) provides non-blocking, high-performance channel buffer I/O operations for enterprise server scalability.",
    [
      {
        heading: "1. Traditional java.io Stream Model",
        content: "java.io operates on blocking byte/character streams (InputStream, OutputStream). Each client thread blocks on I/O read/write calls."
      },
      {
        heading: "2. Modern java.nio Architecture (Channels & Buffers)",
        content: "NIO operates on Channels and Buffers:\n• Channels: Open connection to hardware device or socket for data transfer.\n• Buffers: Fixed-capacity memory containers (ByteBuffer, DirectByteBuffer).\n• Selectors: Multiplexes single thread to monitor thousands of concurrent Channels!"
      },
      {
        heading: "3. Zero-Copy & Memory-Mapped Files (FileChannel.map())",
        content: "FileChannel.transferTo() and MappedByteBuffer map file blocks directly into OS kernel memory, bypassing user-space buffer copies for zero-copy file streaming speeds."
      },
      {
        heading: "4. Modern Path and Files API (Java 7+)",
        content: "java.nio.file.Path and java.nio.file.Files replace legacy File object with modern atomic file operations and directory stream walkers."
      }
    ],
    [
      {
        title: "java.io vs java.nio Comparison",
        headers: ["Feature", "Traditional java.io", "Modern java.nio"],
        rows: [
          ["I/O Paradigm", "Stream-Oriented (Byte by byte)", "Buffer-Oriented (Block of data)"],
          ["Threading Model", "Blocking (1 Thread per Connection)", "Non-blocking (1 Selector Thread for N Connections)"],
          ["Direct Memory", "Heap memory buffers only", "Direct Off-Heap Native Memory Support"],
          ["Zero-Copy Support", "No", "Yes (FileChannel.transferTo())"]
        ]
      }
    ],
    [
      "Forgetting Buffer flip(): Failing to call buffer.flip() before reading data from a ByteBuffer results in reading uninitialized memory.",
      "Off-Heap Memory Leaks: DirectByteBuffer allocations bypass JVM Heap GC; unreleased native buffers cause OS memory exhaustion."
    ],
    [
      "NIO Selectors allow a single thread to manage thousands of concurrent socket channels efficiently.",
      "Zero-Copy transfers data directly between kernel buffers, skipping user-space memory copies."
    ],
    [
      { q: "What does ByteBuffer.flip() do?", a: "flip() flips a buffer from writing mode to reading mode by setting limit = position and resetting position = 0." },
      { q: "Difference between HeapByteBuffer and DirectByteBuffer?", a: "HeapByteBuffer resides on JVM Heap; DirectByteBuffer allocates native off-heap memory via OS malloc." }
    ]
  ),

  // 20: Serialization Deep Dive
  createSection(
    "serialization-deep-dive", "20", "6. Frameworks & Enterprise",
    "20. Serialization & Transient Fields",
    "Object Streams, serialVersionUID Versioning, Transient Keyword, and Security Vulnerabilities",
    "Java binary object serialization mechanics, transient fields, and modern replacement formats.",
    null,
    "Serialization converts object graphs into byte streams for file storage or network transmission.",
    [
      {
        heading: "1. Java Binary Serialization Mechanics",
        content: "Classes must implement java.io.Serializable marker interface. ObjectOutputStream writes graph state; ObjectInputStream reconstructs instances."
      },
      {
        heading: "2. The Role of serialVersionUID",
        content: "serialVersionUID acts as version control for serialized object payloads. Mismatched serialVersionUID causes InvalidClassException during deserialization."
      },
      {
        heading: "3. Transient Keyword & Custom Serialization",
        content: "• transient: Prevents sensitive fields (passwords, session keys) from being serialized.\n• writeObject / readObject: Overrides default serialization logic for custom encryption or validation."
      },
      {
        heading: "4. Security Vulnerabilities & Modern Alternatives",
        content: "Java native serialization is plagued by remote code execution vulnerabilities (Gadget Chains). Modern software prefers JSON (Jackson), Protocol Buffers, or Avro."
      }
    ],
    [
      {
        title: "Serialization Options Comparison",
        headers: ["Format", "Human Readable?", "Binary Size", "Security Risk", "Performance"],
        rows: [
          ["Java Native Serialization", "No", "Large", "HIGH (Gadget attacks)", "Slow"],
          ["JSON (Jackson / Gson)", "Yes", "Medium", "Low (with proper typing)", "Fast"],
          ["Protocol Buffers", "No", "Compact / Minimal", "Very Low", "Ultra Fast"]
        ]
      }
    ],
    [
      "Omitting serialVersionUID: Letting compiler generate serialVersionUID causes deserialization failure across different compiler versions.",
      "Deserializing Untrusted Payloads: Calling readObject() on untrusted network data allows malicious code execution."
    ],
    [
      "Use transient modifier to exclude sensitive fields from binary serialization.",
      "Avoid Java native serialization in modern REST/microservices architectures in favor of JSON or Protobuf."
    ],
    [
      { q: "What is readResolve() method used for in Serialization?", a: "readResolve() replaces the deserialized instance with a canonical instance, preserving Singleton invariants." },
      { q: "Is constructor invoked during deserialization?", a: "No. For Serializable classes, memory is allocated directly without calling class constructors (only non-serializable superclass no-arg constructor runs)." }
    ]
  ),

  // 21: Modern Date & Time API
  createSection(
    "java-date-time", "21", "5. Modern Java (8 to 21+)",
    "21. Modern Date & Time API (java.time)",
    "Immutability, LocalDate, LocalTime, ZonedDateTime, Instant, and Period vs Duration",
    "Replacing legacy thread-unsafe java.util.Date with ISO-8601 java.time domain models.",
    null,
    "Java 8 introduced java.time (JSR-310) to replace legacy Date and Calendar classes.",
    [
      {
        heading: "1. Problems with Legacy java.util.Date and Calendar",
        content: "Legacy Issues:\n1. Mutable: Modifying date objects mutates shared instance states.\n2. Non-thread-safe: SimpleDateFormat causes concurrency bugs.\n3. Confusing Off-by-one Months: January was month 0!"
      },
      {
        heading: "2. Core java.time Classes Hierarchy",
        content: "• LocalDate: Year-Month-Day (no time/timezone).\n• LocalTime: Hour-Minute-Second-Nano.\n• LocalDateTime: Combines Date + Time without time zone.\n• ZonedDateTime: Complete Date + Time with ZoneId (e.g. UTC, Asia/Kolkata).\n• Instant: Epoch timestamp (UTC offset)."
      },
      {
        heading: "3. Period vs Duration",
        content: "• Period: Date-based amount of time (Years, Months, Days).\n• Duration: Time-based amount of time (Seconds, Nanoseconds)."
      },
      {
        heading: "4. DateTimeFormatter Thread Safety",
        content: "DateTimeFormatter is immutable and strictly thread-safe, safe for static constant instantiation."
      }
    ],
    [
      {
        title: "Legacy vs Modern Date API Comparison",
        headers: ["Feature", "Legacy (java.util.Date / Calendar)", "Modern (java.time API)"],
        rows: [
          ["Mutability", "Mutable (Insecure)", "Strictly Immutable"],
          ["Thread Safety", "Non-Thread-Safe", "100% Thread-Safe"],
          ["Month Indexing", "0-indexed (Jan = 0)", "1-indexed (Jan = 1)"],
          ["Time Zone Support", "Confounded inside Date", "Explicit (ZoneId / ZonedDateTime)"]
        ]
      }
    ],
    [
      "Sharing SimpleDateFormat across Threads: SimpleDateFormat is non-thread-safe and corrupts dates in multi-threaded contexts. Use DateTimeFormatter.",
      "Confusing Period with Duration: Adding Period.ofDays(1) across Daylight Savings boundaries differs from Duration.ofHours(24)."
    ],
    [
      "All java.time API classes are immutable and thread-safe.",
      "Use Instant for machine UTC timestamps; use ZonedDateTime for user-facing timezone calculations."
    ],
    [
      { q: "How to convert java.util.Date to java.time.Instant?", a: "date.toInstant() returns an Instant aligned with system Epoch." },
      { q: "What is ZoneOffset vs ZoneId?", a: "ZoneOffset represents fixed UTC offset (+05:30); ZoneId includes daylight saving rules (Asia/Kolkata)." }
    ]
  ),

  // 22: Java Networking & Modern HTTP Client
  createSection(
    "java-networking", "22", "6. Frameworks & Enterprise",
    "22. Networking & Modern HTTP Client",
    "Sockets, TCP vs UDP, and Modern HttpClient (Java 11+)",
    "Low-level socket programming and high-level async HTTP/2 web communication.",
    null,
    "Java networking spans low-level Sockets to high-level async HTTP client communication.",
    [
      {
        heading: "1. Socket Programming Mechanics (TCP vs UDP)",
        content: "• ServerSocket & Socket: Reliable, stream-oriented TCP connections.\n• DatagramSocket & DatagramPacket: Fast, connectionless UDP packet transmission."
      },
      {
        heading: "2. Modern HttpClient API (Java 11+)",
        content: "java.net.http.HttpClient supports HTTP/1.1 and HTTP/2, synchronous/asynchronous requests via CompletableFuture, and Reactive Streams body handlers.",
        code: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.github.com"))
    .GET()
    .build();

client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);`
      },
      {
        heading: "3. Async Non-Blocking HTTP Requests",
        content: "sendAsync() executes HTTP calls on background executor threads, returning CompletableFuture<HttpResponse<T>> without blocking calling threads."
      },
      {
        heading: "4. WebSocket Support & Security",
        content: "Built-in WebSocket client (java.net.http.WebSocket) provides full-duplex real-time message streaming over TLS."
      }
    ],
    [
      {
        title: "HttpURLConnection vs Modern HttpClient",
        headers: ["Feature", "HttpURLConnection (Legacy)", "HttpClient (Java 11+)"],
        rows: [
          ["Protocol Support", "HTTP/1.1 only", "HTTP/1.1, HTTP/2 & WebSockets"],
          ["Execution Mode", "Blocking Synchronous only", "Sync & Async (CompletableFuture)"],
          ["API Design", "Verbose & Error-prone", "Fluent Builder Pattern"],
          ["Body Processing", "Manual Stream copying", "Reactive BodyHandlers"]
        ]
      }
    ],
    [
      "Not Setting Connect/Read Timeouts: Omitting HTTP timeouts causes thread pools to block indefinitely on hung remote servers.",
      "Opening Socket inside Hot Loops: Re-creating TCP Sockets repeatedly causes OS ephemeral port exhaustion."
    ],
    [
      "Java 11 HttpClient provides modern HTTP/2, WebSocket, and async CompletableFuture support.",
      "Always configure connection timeouts on network clients."
    ],
    [
      { q: "Difference between TCP and UDP sockets?", a: "TCP is connection-oriented and reliable with packet ordering; UDP is connectionless, unacknowledged, and ultra-fast." },
      { q: "How does HTTP/2 Multiplexing work in Java 11 HttpClient?", a: "HTTP/2 multiplexes multiple request/response streams concurrently over a single underlying TCP connection." }
    ]
  ),

  // 23: Java JDBC
  createSection(
    "java-jdbc", "23", "6. Frameworks & Enterprise",
    "23. JDBC Architecture & Connection Pooling",
    "Driver Architecture, PreparedStatement, Transactions, and HikariCP Pooling",
    "Relational database connectivity, SQL injection prevention, transaction isolation, and HikariCP.",
    "jdbc-hikari-pool",
    "JDBC (Java Database Connectivity) is the standard Java API for executing SQL statements against relational databases.",
    [
      {
        heading: "1. Core JDBC Architecture Components",
        content: "Components:\n1. DriverManager: Manages database drivers.\n2. Connection: Represents database session.\n3. Statement / PreparedStatement: Executes SQL statements.\n4. ResultSet: Tabular database query result payload."
      },
      {
        heading: "2. Statement vs PreparedStatement (SQL Injection Shield)",
        content: "PreparedStatement pre-compiles SQL queries on the database server. Parameters are bound securely via placeholders (?), completely neutralizing SQL Injection attacks and boosting query execution speed via query plan caching.",
        code: `String sql = "SELECT * FROM users WHERE email = ? AND status = ?";
try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, userEmail);
    pstmt.setString(2, "ACTIVE");
    try (ResultSet rs = pstmt.executeQuery()) {
        while (rs.next()) { /* Process row */ }
    }
}`
      },
      {
        heading: "3. Transaction Management & Isolation Levels",
        content: "Disable auto-commit via conn.setAutoCommit(false). Commit updates via conn.commit() or revert via conn.rollback().\nIsolation Levels: READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE."
      },
      {
        heading: "4. HikariCP Connection Pooling Mechanics",
        content: "Opening physical database connections incurs heavy TCP handshakes. HikariCP maintains a pool of pre-allocated connections using FastList and ConcurrentBag data structures for sub-millisecond connection borrowing."
      }
    ],
    [
      {
        title: "Statement vs PreparedStatement",
        headers: ["Feature", "Statement", "PreparedStatement"],
        rows: [
          ["SQL Compilation", "Compiled on every execution", "Pre-compiled once on DB server"],
          ["SQL Injection Risk", "HIGH (Vulnerable to string concatenation)", "SECURE (Parameter placeholder binding)"],
          ["Performance", "Slower for repeated queries", "Fast (Reuses DB query execution plan)"],
          ["Binary Payload Support", "No", "Supports setBytes() / setBlob()"]
        ]
      }
    ],
    [
      "Concatenating SQL Strings: Building SQL via 'WHERE name = ' + input allows SQL Injection. Always use PreparedStatement parameters.",
      "Connection Leaks: Failing to close Connection objects returns connections to pool, causing pool exhaustion."
    ],
    [
      "PreparedStatement prevents SQL Injection attacks and improves execution speed.",
      "HikariCP provides ultra-fast connection pooling for enterprise spring workloads."
    ],
    [
      { q: "What is Dirty Read in Database Transactions?", a: "A Dirty Read occurs when Transaction A reads uncommitted data written by Transaction B that subsequently rolls back." },
      { q: "Why is HikariCP faster than legacy pools like C3P0?", a: "HikariCP uses bytecode generation, custom FastList array structures, and lock-free ConcurrentBag thread borrowing." }
    ]
  ),

  // 24: Modern Java Features (ENRICHED MASTERCLASS)
  createSection(
    "modern-java-features", "24", "5. Modern Java (8 to 21+)",
    "24. Modern Java Features Masterclass (Java 17 & Java 21+)",
    "Sealed Classes, Pattern Matching, Record Patterns, Virtual Threads (Project Loom) & Sequenced Collections",
    "Next-generation Java features from LTS releases 17 and 21 including Project Loom M:N scheduler mechanics.",
    "virtual-threads-flow",
    "Java 17 and 21 introduced game-changing architectural features including Sealed Class domain hierarchies, Pattern Matching for Switch, Record Pattern Deconstruction, Sequenced Collections, and Virtual Threads (Project Loom).",
    [
      {
        heading: "1. Sealed Classes & Interfaces (Java 17)",
        content: "Sealed classes restrict which subclasses can extend or implement them using the 'permits' keyword, enabling closed domain hierarchies.",
        code: `public sealed interface Shape permits Circle, Square, Triangle {}
public final class Circle implements Shape {}
public final class Square implements Shape {}
public final class Triangle implements Shape {}`
      },
      {
        heading: "2. Pattern Matching & Record Deconstruction (Java 21)",
        content: "Pattern matching allows evaluating types and extracting variables directly inside switch expressions without explicit casting.",
        code: `String result = switch (obj) {
    case Integer i -> "Integer of value " + i;
    case String s  -> "String of length " + s.length();
    case Circle(double radius) -> "Circle with area " + (Math.PI * radius * radius);
    default        -> "Unknown object";
};`
      },
      {
        heading: "3. Virtual Threads (Project Loom) & Carrier Thread Multiplexing",
        content: "Virtual Threads are lightweight JVM-managed user-mode threads. Unlike OS threads (~1MB stack), Virtual Threads take bytes of memory on the Heap, allowing 1,000,000+ concurrent threads on a single JVM! When a Virtual Thread blocks on I/O, the JVM unmounts its stack frame to the Heap and reuses the underlying OS Carrier Thread for other work.",
        code: `// Launching 100,000 Concurrent Virtual Threads
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1)); // Unmounts carrier thread on I/O sleep!
            return i;
        });
    });
} // Auto-closes and waits for all tasks to complete`
      },
      {
        heading: "4. Sequenced Collections (Java 21)",
        content: "Provides unified interfaces (SequencedCollection, SequencedSet, SequencedMap) with standard methods for first/last element access (getFirst(), getLast(), reversed())."
      }
    ],
    [
      {
        title: "Platform Threads vs Virtual Threads",
        headers: ["Feature", "Platform OS Threads", "Virtual Threads (Java 21)"],
        rows: [
          ["Management", "Operating System Kernel", "JVM (User-Mode Scheduling)"],
          ["Memory Footprint", "High (~1 MB Stack per Thread)", "Ultra-Low (~x hundred Bytes on Heap)"],
          ["Creation Limit", "Thousands (~2,000-5,000)", "Millions (1,000,000+)"],
          ["I/O Blocking Cost", "High (Blocks OS Thread)", "Zero (Unmounts stack from OS thread)"]
        ]
      }
    ],
    [
      "Pinning Virtual Threads: Executing synchronized blocks or native calls inside Virtual Threads 'pins' the underlying OS Carrier Thread. Use ReentrantLock instead.",
      "Pooling Virtual Threads: Virtual Threads are cheap and disposable; NEVER pool them using ThreadPoolExecutor!"
    ],
    [
      "Virtual Threads enable high-throughput thread-per-request servers without blocking OS carrier threads.",
      "Sealed Classes restrict inheritance to build exhaustive pattern matching domain hierarchies."
    ],
    [
      { q: "What is Thread Pinning in Virtual Threads?", a: "Pinning occurs when a Virtual Thread executes inside a synchronized block or native method, preventing JVM from unmounting it from the OS carrier thread." },
      { q: "How to launch a Virtual Thread in Java 21?", a: "Thread.ofVirtual().start(() -> { /* task */ }); or Executors.newVirtualThreadPerTaskExecutor()." }
    ]
  ),

  // 25: Design Patterns & SOLID Principles
  createSection(
    "design-patterns-solid", "25", "6. Frameworks & Enterprise",
    "25. Design Patterns & SOLID Architectural Principles",
    "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion, and GoF Patterns",
    "Production software design principles and GoF creational, structural, and behavioral patterns.",
    null,
    "SOLID principles and Gang of Four (GoF) design patterns provide proven architectural templates for building resilient enterprise applications.",
    [
      {
        heading: "1. The 5 SOLID Architectural Principles",
        content: "1. Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.\n2. Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.\n3. Liskov Substitution Principle (LSP): Subtypes must be completely substitutable for their base types.\n4. Interface Segregation Principle (ISP): Clients should not be forced to depend on interface methods they do not use.\n5. Dependency Inversion Principle (DIP): High-level modules should depend on abstractions, not concrete implementations."
      },
      {
        heading: "2. Essential Creational Patterns",
        content: "• Singleton: Guarantees single instance creation (Use Enum Singleton or Double-Checked Locking).\n• Factory Method: Interface for creating objects, delegating instantiation logic to subclasses.\n• Builder: Separates complex object construction from its representation (Fluent Builder pattern)."
      },
      {
        heading: "3. Essential Structural Patterns",
        content: "• Adapter: Converts interface of a class into another interface expected by clients.\n• Decorator: Dynamically attaches additional responsibilities to an object (e.g. Java I/O Streams).\n• Proxy: Provides surrogate or placeholder to control access to real object (Spring AOP)."
      },
      {
        heading: "4. Essential Behavioral Patterns",
        content: "• Strategy: Defines family of algorithms, encapsulating each one and making them interchangeable at runtime.\n• Observer: One-to-many dependency where object state changes notify all dependents.\n• Template Method: Skeleton of an algorithm in a method, deferring steps to subclasses."
      }
    ],
    [
      {
        title: "SOLID Principles Summary Matrix",
        headers: ["Principle", "Acronym", "Core Architectural Focus", "Primary Benefit"],
        rows: [
          ["Single Responsibility", "SRP", "One reason to change", "High cohesion & modularity"],
          ["Open / Closed", "OCP", "Extend via abstractions", "Prevents breaking existing code"],
          ["Liskov Substitution", "LSP", "Subtype substitutability", "Prevents subtle runtime bugs"],
          ["Interface Segregation", "ISP", "Small focused interfaces", "Decoupled component interfaces"],
          ["Dependency Inversion", "DIP", "Depend on abstractions", "Loose coupling & easy unit testing"]
        ]
      }
    ],
    [
      "God Class Anti-Pattern: Violating SRP by creating massive classes performing database, business logic, and formatting tasks.",
      "Tight Coupling with Concrete Classes: Instantiating concrete implementations directly instead of injecting interface abstractions."
    ],
    [
      "Apply SOLID principles to create maintainable, unit-testable software.",
      "Use Builder pattern for objects with numerous optional parameters."
    ],
    [
      { q: "Difference between Strategy and State Design Pattern?", a: "Strategy encapsulates independent algorithms chosen by client; State alters object behavior automatically as internal state transitions." },
      { q: "How does Spring Framework implement Dependency Inversion?", a: "Spring IoC container instantiates objects and injects dependencies via constructors or fields (@Autowired)." }
    ]
  ),

  // 26: Spring Boot & Enterprise Microservices
  createSection(
    "spring-boot-core", "26", "6. Frameworks & Enterprise",
    "26. Spring Boot & Enterprise Microservices",
    "Spring IoC Container, Bean Lifecycle, Auto-Configuration, Spring Data JPA, and Transactional Management",
    "Enterprise microservices development, dependency injection, auto-configuration, and AOP proxies.",
    "spring-bean-lifecycle",
    "Spring Boot simplifies enterprise Java application development through Opinionated Auto-Configuration and Dependency Injection.",
    [
      {
        heading: "1. Spring IoC Container & Dependency Injection",
        content: "The Inversion of Control (IoC) Container manages application component objects (Beans). Constructor Injection is strongly recommended over Field Injection for immutability and testability."
      },
      {
        heading: "2. Spring Bean Lifecycle & Scope Models",
        content: "Bean Scopes:\n1. Singleton (Default): Single instance per Spring IoC container.\n2. Prototype: New bean instance created on every injection request.\n3. Request / Session: Web-aware scopes for HTTP requests/sessions.\n\nLifecycle Steps: Instantiation ➔ Dependency Injection ➔ BeanPostProcessor (Before) ➔ @PostConstruct ➔ Bean Ready ➔ @PreDestroy."
      },
      {
        heading: "3. Spring Boot Auto-Configuration Mechanics",
        content: "@SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan. Auto-configuration inspects classpath JARs (META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports) and conditionally configures beans (@ConditionalOnClass, @ConditionalOnMissingBean)."
      },
      {
        heading: "4. Spring Data JPA & @Transactional Proxy Architecture",
        content: "Spring AOP wraps @Transactional annotated beans in dynamic proxy objects. When a method executes, proxy starts a DB transaction. Self-invocation (calling @Transactional method from inside same class) BYPASSES the proxy, breaking transactional management!"
      }
    ],
    [
      {
        title: "Spring Bean Scopes Matrix",
        headers: ["Scope", "Instance Count", "Lifecycle Duration", "Thread Safety Requirement"],
        rows: [
          ["Singleton (Default)", "1 per Spring Container", "Application Lifetime", "Must be stateless / Thread-Safe"],
          ["Prototype", "1 per Injection request", "Destroyed by garbage collector", "Caller handles thread safety"],
          ["Request", "1 per HTTP Request", "Duration of single HTTP request", "Thread-safe (Request bound)"],
          ["Session", "1 per HTTP Session", "Duration of HTTP User Session", "Thread-safe (Session bound)"]
        ]
      }
    ],
    [
      "Self-Invocation Proxy Bypass: Calling an @Transactional method from another method in the same class bypasses the AOP proxy, disabling transactions!",
      "Field Injection (@Autowired on private fields): Makes unit testing difficult and hides dependency circular reference bugs."
    ],
    [
      "Prefer Constructor Injection over Field Injection for immutable bean dependencies.",
      "Self-invocation bypasses Spring AOP proxies for @Transactional and @Async annotations."
    ],
    [
      { q: "What is Circular Dependency in Spring and how is it resolved?", a: "Occurs when Bean A requires Bean B and Bean B requires Bean A. Resolved using @Lazy injection or refactoring class responsibilities." },
      { q: "Difference between @Component, @Service, and @Repository?", a: "All are stereotype annotations registering Spring beans. @Repository additionally translates native DB exceptions into Spring DataAccessExceptions." }
    ]
  ),

  // 27: Senior Interview Bank
  createSection(
    "interview-question-bank", "27", "7. Senior Interview Bank",
    "27. Senior Java Interview Follow-Up Question Trees",
    "Architectural Scenarios, Memory Tuning Deep Dives, Concurrency Debugging, and System Failure Cases",
    "Senior engineering interview question trees, trade-off evaluations, and debugging production edge cases.",
    null,
    "This section provides senior-level interview follow-up question trees, designed to test deep architectural understanding and production debugging skills.",
    [
      {
        heading: "1. JVM Architecture & Memory Leak Scenarios",
        content: "Q1: How would you debug an application throwing java.lang.OutOfMemoryError: Java heap space in production?\n\nSenior Answer: 1. Generate heap dump automatically on failure using -XX:+HeapDumpOnOutOfMemoryError.\n2. Analyze heap dump using Eclipse MAT (Memory Analyzer Tool) or VisualVM to identify dominator tree and GC root references.\n3. Check for static collection reference leaks, unclosed resources, or excessive cache retention."
      },
      {
        heading: "2. Concurrency & High-Throughput Locking Scenarios",
        content: "Q2: In a high-concurrency microservice, CPU utilization spikes to 100% while throughput drops. What could be happening?\n\nSenior Answer: 1. Thread Contention on heavy synchronized locks or high lock-free CAS retries under extreme contention.\n2. Excessive Garbage Collection Stop-The-World pauses caused by allocation rate bursting in Young Gen.\n3. Action: Capture thread dumps ('jcmd <pid> Thread.print') to inspect BLOCKED or RUNNABLE thread stack traces."
      },
      {
        heading: "3. Collections & Data Structure Trade-offs",
        content: "Q3: When would you choose ConcurrentHashMap over CopyOnWriteArrayList?\n\nSenior Answer: Use ConcurrentHashMap for read/write key-value lookups with high concurrency. Use CopyOnWriteArrayList when READ operations vastly outnumber WRITE operations (e.g. event listeners list), because writes copy the entire underlying array payload."
      },
      {
        heading: "4. Spring Microservices & System Resilience",
        content: "Q4: How do you handle cascading failures in microservice architectures?\n\nSenior Answer: Implement Circuit Breaker pattern (Resilience4j) to fail fast when downstream services degrade, configure timeouts on all HTTP/gRPC clients, apply Rate Limiting, and use Bulkhead isolation."
      }
    ],
    [
      {
        title: "Senior Engineering Evaluation Criteria Matrix",
        headers: ["Dimension", "Junior Expectation", "Senior / Lead Expectation"],
        rows: [
          ["Language Depth", "Knows syntax & basic API usage", "Understands JVM internals, bytecode, JMM & Memory Barriers"],
          ["Concurrency", "Can start threads & use synchronized", "Understands CAS, lock-free algorithms, Thread Pools & Virtual Threads"],
          ["Architecture", "Implements basic CRUD endpoints", "Designs resilient, loosely-coupled SOLID microservices with trade-offs"],
          ["Debugging", "Uses System.out.println & basic IDE breakpoints", "Analyzes heap dumps, thread dumps, GC logs & JFR profiles"]
        ]
      }
    ],
    [
      "Answering with 'I don't know' without explaining how you would investigate: Senior interviews evaluate problem-solving frameworks.",
      "Recommending premature optimization before profiling: Always profile memory and CPU workloads with JFR / Async Profiler before refactoring."
    ],
    [
      "Always analyze heap dumps (.hprof) to trace dominant object paths to GC roots when resolving memory leaks.",
      "Use JFR (JDK Flight Recorder) and Async Profiler for low-overhead production performance profiling."
    ],
    [
      { q: "What is JDK Flight Recorder (JFR)?", a: "JFR is an event-based profiling framework built directly into the HotSpot JVM that collects low-overhead (<1%) CPU, memory, and thread diagnostic data." },
      { q: "How to prevent thread starvation in ThreadPoolExecutor?", a: "Use caller runs rejection policies or bounded queues with monitored rejection handlers, and isolate heavy blocking I/O tasks into dedicated thread pools." }
    ]
  )
];

const fileContent = `// ============================================================================
// Master Java Concept & Architecture Textbook-Grade Revision Notes
// Comprehensive Academic Explanations for Beginners to Senior Engineers
// ============================================================================

export const JAVA_REVISION_CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const JAVA_REVISION_SECTIONS = ${JSON.stringify(sections, null, 2)};
`;

fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log(`Successfully generated master dataset with all ${sections.length} fully detailed sections at ${targetPath}!`);
