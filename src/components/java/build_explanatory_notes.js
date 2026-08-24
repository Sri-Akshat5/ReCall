const fs = require('fs');
const path = require('path');

const javaRevisionNotesData = `// ============================================================================
// Master Java Concept & Architecture Textbook-Grade Revision Notes
// Designed for Beginners to Senior Engineers (Comprehensive Explanations)
// ============================================================================

export const JAVA_REVISION_CATEGORIES = [
  "All Topics",
  "1. Fundamentals & OOP",
  "2. Strings & Collections",
  "3. Exceptions & Generics",
  "4. Concurrency & JVM",
  "5. Modern Java (8 to 21+)",
  "6. Frameworks & Enterprise",
  "7. Senior Interview Bank"
];

export const JAVA_REVISION_SECTIONS = [
  // --------------------------------------------------------------------------
  // SECTION 01: JAVA FUNDAMENTALS
  // --------------------------------------------------------------------------
  {
    id: "java-fundamentals",
    number: "01",
    category: "1. Fundamentals & OOP",
    title: "1. Java Fundamentals & Runtime Architecture",
    subtitle: "Understanding What Java Is, How the JVM Executes Code, and Core Platform Building Blocks",
    summary: "From .java source files to platform-neutral bytecode execution on the JVM.",
    diagramType: "jvm-compilation-flow",
    detailedContent: {
      introduction: "Java is a high-level, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. The primary design goal of Java was portability across diverse hardware architectures, summarized by the famous motto: Write Once, Run Anywhere (WORA). Unlike traditional languages like C or C++ that compile directly into OS-specific machine instructions, Java compiles source code into intermediate representation called Bytecode (.class files). The Java Virtual Machine (JVM) interprets and optimizes this bytecode for the target operating system.",
      
      subsections: [
        {
          heading: "1. JVM vs JRE vs JDK (The Core Runtime Hierarchy)",
          content: "To understand Java, you must understand the distinction between JDK, JRE, and JVM:\\n\\n• JVM (Java Virtual Machine): An abstract computing machine that provides a runtime environment in which Java bytecode can be executed. It handles memory management (garbage collection), thread management, and instruction execution. JVM implementations exist for Windows, Linux, macOS, and embedded devices.\\n\\n• JRE (Java Runtime Environment): The runtime software bundle required to RUN Java applications. It contains the JVM along with the Java Class Library (rt.jar / java.base module) and support files. JRE does not contain development tools like compilers.\\n\\n• JDK (Java Development Kit): The full software development environment required to WRITE and BUILD Java applications. It contains the JRE plus development tools such as javac (Java Compiler), jdb (debugger), javadoc (documentation generator), jshell, and performance profiling tools.",
          code: `// Structure of a Basic Java Program
public class HelloWorld {
    // The main method is the entry point for the JVM
    public static void main(String[] args) {
        System.out.println("Hello, Java Mastery!");
    }
}`,
          codeExplanation: "1. `public`: Accessible from anywhere in the application.\\n2. `class HelloWorld`: Defines a class named HelloWorld matching the filename HelloWorld.java.\\n3. `static`: Allows JVM to execute main() without instantiating an object of HelloWorld class.\\n4. `void`: Return type indicating main() produces no output value.\\n5. `String[] args`: Array of command-line string arguments passed to the program."
        },
        {
          heading: "2. The Java Compilation & Execution Lifecycle",
          content: "When you run a Java application, it undergoes a two-step translation process combining compilation and interpretation:\\n\\nStep 1: Source Compilation (javac)\\nDeveloper writes code in a .java file. Running `javac HelloWorld.java` parses the human-readable Java syntax and transforms it into platform-neutral Bytecode stored in a `HelloWorld.class` binary file.\\n\\nStep 2: JVM Execution (java)\\nRunning `java HelloWorld` launches the JVM. The ClassLoader loads the `.class` file into memory. The JVM's Bytecode Verifier checks for safety violations (e.g., stack underflow, invalid memory access). Finally, the Execution Engine reads bytecode. Initially, the Interpreter executes bytecode line-by-line. As execution continues, the Just-In-Time (JIT) Compiler identifies 'hot spots' (frequently called methods or loops) and compiles that bytecode directly into native machine code for maximum hardware performance.",
        },
        {
          heading: "3. Pass-By-Value Mechanics in Java",
          content: "A common point of confusion for developers coming from languages like C++ is whether Java supports pass-by-reference. Java is STRICTLY 100% PASS-BY-VALUE.\\n\\n• Primitive Types (int, double, boolean, etc.): When passing a primitive variable into a method, a copy of the actual binary value is pushed onto the method's stack frame. Modifying the parameter inside the method has zero effect on the caller's variable.\\n\\n• Reference Types (Objects, Arrays): When passing an object into a method, what is copied is the REFERENCE (the memory address pointer pointing to the heap object). Both caller and callee possess separate copies of the address pointer pointing to the exact same underlying heap object. Mutating the object's internal fields inside the method affects the caller, but reassigning the reference variable itself to a `new` object does NOT change the caller's reference!",
          code: `public class PassByValueDemo {
    public static void main(String[] args) {
        Point p = new Point(10, 20);
        modifyPoint(p);
        System.out.println(p.x); // Outputs: 99 (Internal object field mutated!)
        
        reassignPoint(p);
        System.out.println(p.x); // Outputs: 99 (Caller pointer remains unchanged!)
    }

    public static void modifyPoint(Point pt) {
        pt.x = 99; // Mutates object on heap
    }

    public static void reassignPoint(Point pt) {
        pt = new Point(500, 500); // Reassigns LOCAL copy of reference only!
    }
}`
        },
        {
          heading: "4. Variable Scopes & Memory Allocation",
          content: "Java variables fall into three distinct categories based on where they are declared:\\n\\n1. Local Variables: Declared inside a method, block, or constructor. They are created when entering the method and destroyed upon exit. Stored on the Thread Call Stack. They are NOT given default values and MUST be initialized before use.\\n\\n2. Instance Variables: Declared inside a class but outside methods (without `static`). They belong to individual object instances. Stored on the Heap inside the object memory allocation. Automatically initialized to default values (0, null, false).\\n\\n3. Static Variables: Declared with the `static` keyword inside a class. Shared across ALL instances of the class. Stored in Metaspace / Class Static Area. Loaded once when the JVM loads the class."
        }
      ],

      tables: [
        {
          title: "Comparative Summary: JVM vs JRE vs JDK",
          headers: ["Component", "Short Name", "Contains", "Primary Purpose"],
          rows: [
            ["Java Virtual Machine", "JVM", "Execution engine, JIT compiler, GC", "Executes bytecode on host OS"],
            ["Java Runtime Environment", "JRE", "JVM + Core Standard Libraries", "Runs pre-compiled Java apps"],
            ["Java Development Kit", "JDK", "JRE + javac, debugger, profilers", "Builds & compiles Java apps"]
          ]
        }
      ],

      pitfalls: [
        "Uninitialized Local Variables: Accessing an uninitialized local variable results in a compile-time error (`variable x might not have been initialized`).",
        "Confusing Reference Copying with Pass-by-Reference: Reassigning an object reference inside a method parameter will not update the caller's reference variable."
      ],

      keyTakeaways: [
        "Java achieves platform independence through intermediate Bytecode (.class) executed on OS-specific JVMs.",
        "Java is strictly pass-by-value; object references are copied when passed into methods.",
        "Static variables reside in class metadata (Metaspace), whereas instance variables reside inside individual Heap objects."
      ],

      interviewQuestions: [
        {
          q: "Why is Java called platform independent?",
          a: "Because Java source code compiles into platform-neutral Bytecode (.class file) rather than native OS machine code. Any computer with an OS-specific JVM installed can execute this identical Bytecode."
        },
        {
          q: "Can a static method access non-static instance fields directly?",
          a: "No. Static methods belong to the class and execute without any specific instance context. They lack a `this` reference pointer, so accessing instance fields requires an explicit object reference."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 02: OOP
  // --------------------------------------------------------------------------
  {
    id: "oop-core",
    number: "02",
    category: "1. Fundamentals & OOP",
    title: "2. Object-Oriented Programming (OOP) Deep Dive",
    subtitle: "Mastering Encapsulation, Abstraction, Inheritance, Polymorphism & Composition",
    summary: "The 4 fundamental pillars of object-oriented design and production architecture.",
    content: {
      highlights: [
        "4 Core Pillars: Encapsulation (data hiding), Abstraction (hiding implementation details), Inheritance (is-a relationship), Polymorphism (many forms).",
        "Polymorphism Types: Compile-time (Method Overloading) vs Runtime (Method Overriding via Dynamic Method Dispatch).",
        "Constructor Chaining: Initiated using `this()` for same-class constructors or `super()` for parent class constructors (must be the 1st line in constructor).",
        "Covariant Return Types: Overriding method can return a subtype of the return type declared in the parent method."
      ],
      detailedContent: {
        introduction: "Object-Oriented Programming (OOP) is a programming paradigm centered around data objects rather than functions and logic. In Java, everything revolves around Classes (blueprints defining state and behavior) and Objects (instantiated instances residing on the Heap). OOP enables modularity, reusability, maintainability, and enterprise scalability.",

        subsections: [
          {
            heading: "1. The 4 Fundamental Pillars of OOP",
            content: "• Encapsulation: Bundling data (fields) and methods that operate on that data into a single unit (Class), while restricting direct external access to internal state using `private` access modifiers and public getters/setters. Benefits: Data validation, security, and controlled state mutation.\\n\\n• Abstraction: Hiding internal complex implementation details and exposing only essential functional interfaces to the user. Achieved in Java via Abstract Classes and Interfaces.\\n\\n• Inheritance: Mechanism where a child class (subclass) inherits properties and behaviors (fields and methods) from a parent class (superclass) using the `extends` keyword. Enables code reuse and hierarchical categorization ('IS-A' relationship).\\n\\n• Polymorphism: Ability of an object or method to take on multiple forms. It allows a single interface to represent different underlying forms (e.g. `Shape s = new Circle()`)."
          },
          {
            heading: "2. Compile-Time vs Runtime Polymorphism",
            content: "Polymorphism manifests in two distinct forms in Java:\\n\\n1. Compile-Time Polymorphism (Method Overloading): Defining multiple methods within the same class with identical names but DIFFERENT parameter lists (different number, types, or order of parameters). The compiler resolves which method to invoke during compilation based on arguments passed.\\n\\n2. Runtime Polymorphism (Method Overriding & Dynamic Method Dispatch): A subclass provides a specific implementation of a method already declared in its superclass. Overridden methods MUST have identical name, parameters, and compatible return types. At runtime, the JVM determines which implementation to execute based on the actual object type on the Heap, not the reference variable type!",
            code: `class Animal {
    void makeSound() { System.out.println("Animal makes a sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Dog barks!"); } // Method Overriding
}

public class Main {
    public static void main(String[] args) {
        Animal myPet = new Dog(); // Polymorphic reference
        myPet.makeSound(); // Outputs: "Dog barks!" (Dynamic Method Dispatch at Runtime)
    }
}`
          },
          {
            heading: "3. Constructor Chaining: this() and super()",
            content: "Constructors are special methods invoked automatically when instantiating an object using `new`. Constructor chaining is the process of calling one constructor from another constructor within the same class hierarchy.\\n\\n• `this()`: Calls another overloaded constructor within the SAME class.\\n• `super()`: Calls the matching constructor of the SUPERCLASS.\\n\\nCRITICAL RULE: `this()` or `super()` MUST be the absolute first line of executable statement in a constructor body. You cannot call both inside a single constructor."
          },
          {
            heading: "4. Composition over Inheritance (HAS-A vs IS-A)",
            content: "While inheritance allows creating child classes (`extends`), senior Java software architects prefer Composition ('HAS-A' relationship).\\n\\nWhy Composition is Superior:\\n1. Avoids Fragile Base Class Problem: Changes to superclass implementations can silently break child class invariants.\\n2. Encapsulation Preservation: Inheritance exposes parent internal details to child classes.\\n3. Runtime Dynamic Flexibility: Composition allows swapping component implementations dynamically at runtime (e.g. Dependency Injection)."
          }
        ],

        tables: [
          {
            title: "Method Overloading vs Method Overriding",
            headers: ["Property", "Method Overloading", "Method Overriding"],
            rows: [
              ["Definition", "Same method name, different parameters", "Same method name and identical signature"],
              ["Binding Time", "Compile-time (Static binding)", "Runtime (Dynamic method dispatch)"],
              ["Class Context", "Occurs within the same class", "Occurs across Parent-Child class relationship"],
              ["Private / Static", "Static/Private methods CAN be overloaded", "Static/Private methods CANNOT be overridden"]
            ]
          }
        ],

        pitfalls: [
          "Attempting to Override Static Methods: Defining a static method with the same signature in a child class does NOT override it; it SHADOWS (hides) it.",
          "Missing `super()` in Constructor: If parent class lacks a no-arg constructor, the child class constructor MUST explicitly call `super(args)`."
        ],

        keyTakeaways: [
          "Dynamic Method Dispatch evaluates the method to execute at runtime based on the actual object on the Heap.",
          "Always prefer Composition ('HAS-A') over Inheritance ('IS-A') to build loosely coupled systems."
        ],

        interviewQuestions: [
          {
            q: "Why doesn't Java support multiple inheritance with classes?",
            a: "To prevent the Diamond Problem—an ambiguity that arises when a child class inherits from two parent classes that define the exact same method signature, making it impossible for the JVM to know which parent method to invoke."
          },
          {
            q: "Can private or static methods be overridden in Java?",
            a: "No. Private methods are not visible to subclasses, so they cannot be overridden. Static methods belong to the class metadata rather than instance runtime tables; redeclaring a static method in a child class hides (shadows) it rather than overriding it."
          }
        ]
      }
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 03: STRING
  // --------------------------------------------------------------------------
  {
    id: "string-deep-dive",
    number: "03",
    category: "1. Fundamentals & OOP",
    title: "3. String Architecture & Memory Management",
    subtitle: "Deep Dive into String Immutability, String Constant Pool, StringBuilder, and Text Blocks",
    summary: "Why Strings are immutable, String Pool deduplication, interning, and thread safety.",
    content: {
      highlights: [
        "String Immutability: String objects cannot be altered once instantiated on the Heap.",
        "String Constant Pool (SCP): Dedicated memory region inside Heap that deduplicates literal strings.",
        "new String(\"Java\"): Creates TWO objects (one in SCP if missing, and one on general Heap).",
        "StringBuilder vs StringBuffer: StringBuilder is unsynchronized (fast); StringBuffer is synchronized (thread-safe)."
      ],
      detailedContent: {
        introduction: "In Java, String is an object that represents a sequence of char values. Unlike primitive types, String is a reference type defined in `java.lang.String`. Strings are arguably the most heavily used object type in Java applications, which is why the JVM treats them specially through immutability and memory pool deduplication.",

        subsections: [
          {
            heading: "1. String Immutability: Why Strings Cannot Be Modified",
            content: "Once a `java.lang.String` object is created on the Heap, its internal byte/char array payload CANNOT be changed. Any method that appears to modify a String (e.g. `concat()`, `replace()`, `substring()`) actually instantiates and returns a brand new String object on the Heap!\\n\\nWhy Did Java Designers Make String Immutable?\\n1. String Constant Pool (SCP) Optimization: Multiple reference variables can safely point to the exact same String literal in memory. If Strings were mutable, changing 'Java' via reference A would corrupt reference B!\\n2. Thread Safety: Immutable objects are inherently thread-safe. Multiple threads can read String objects concurrently without synchronization locks.\\n3. Security: Strings are used for sensitive system parameters (database URLs, usernames, passwords, socket connections). Immutability prevents malicious code from mutating parameters after validation.\\n4. HashCode Caching: The hash code of a String is computed once during creation and cached (`hash` field). This makes String lookups in HashMaps lighting fast."
          },
          {
            heading: "2. The String Constant Pool (SCP) Mechanics",
            content: "The String Constant Pool is a special memory region inside the Heap managed by the JVM.\\n\\n• Literal Creation (`String s1 = \"Java\";`): The JVM checks the SCP. If 'Java' already exists in the pool, `s1` is assigned the existing reference. If not present, a new 'Java' String is created in the SCP.\\n\\n• Explicit Instantiation (`String s2 = new String(\"Java\");`): Forces the creation of a NEW String object on the general Heap, regardless of whether 'Java' exists in the SCP! This leads to unnecessary memory overhead.\\n\\n• String Interning (`s2.intern()`): Calling `.intern()` searches the SCP for a matching literal. If found, it returns the SCP reference pointer, allowing memory deduplication.",
            code: `String s1 = "Java";               // SCP literal
String s2 = "Java";               // Points to same SCP instance
String s3 = new String("Java");   // New instance on Heap

System.out.println(s1 == s2);        // true (Identical SCP reference)
System.out.println(s1 == s3);        // false (SCP ref vs Heap ref)
System.out.println(s1 == s3.intern()); // true (intern() returns SCP ref)`
          },
          {
            heading: "3. String vs StringBuilder vs StringBuffer",
            content: "Because Strings are immutable, concatenating strings inside loops using the `+` operator generates thousands of temporary discarded String objects, creating severe GC pressure!\\n\\nTo solve this, Java provides mutable string buffer classes:\\n\\n1. `StringBuilder` (Java 5+): Mutable char array payload. Methods like `append()` modify the array buffer in place without creating new objects. It is NOT synchronized (non-thread-safe), making it the fastest option for single-threaded code.\\n\\n2. `StringBuffer` (Java 1.0): Mutable buffer similar to StringBuilder, but all public methods are marked `synchronized`. Safe for multi-threaded access, but carries locking performance overhead."
          }
        ],

        tables: [
          {
            title: "Comparison: String vs StringBuilder vs StringBuffer",
            headers: ["Feature", "String", "StringBuilder", "StringBuffer"],
            rows: [
              ["Mutability", "Immutable (Fixed payload)", "Mutable (In-place payload)", "Mutable (In-place payload)"],
              ["Thread Safety", "Thread-Safe (Immutable)", "Non-Thread-Safe", "Thread-Safe (Synchronized)"],
              ["Performance", "Slow for concatenation", "Fastest for loops/concatenation", "Slower due to lock overhead"],
              ["Memory Area", "Heap / SCP", "Heap buffer", "Heap buffer"]
            ]
          }
        ],

        pitfalls: [
          "Using `==` to Compare String Values: `==` compares reference pointers, not text content. Always use `.equals()` to compare string characters!",
          "String Concatenation in Loops: Using `+` inside a `for` loop instantiates a new `StringBuilder` on every iteration. Use a single `StringBuilder` outside the loop instead."
        ],

        keyTakeaways: [
          "Strings are immutable for security, thread safety, hash code caching, and String Constant Pool deduplication.",
          "Use `StringBuilder` for heavy string manipulation inside single-threaded loops.",
          "`new String(\"literal\")` creates two objects if the literal is not already in the SCP."
        ],

        interviewQuestions: [
          {
            q: "How many objects are created by `String s = new String(\"Java\");`?",
            a: "Up to 2 objects: One object created in the String Constant Pool (if 'Java' was not previously present), and a second object created explicitly on the general Heap."
          },
          {
            q: "Why is String declared as a final class in Java?",
            a: "To prevent developers from extending String and overriding methods (like `equals()` or `hashCode()`) which would break immutability and security guarantees."
          }
        ]
      }
    }
  }
];
`;

fs.writeFileSync(path.join(__dirname, 'javaRevisionNotesDataExplanatory.js'), javaRevisionNotesData);
console.log("Explanatory template generated successfully!");
`;

fs.writeFileSync(path.join(__dirname, '..', '..', 'brain', '6708829f-ddcb-40bf-b1d7-d2fd2cc61679', 'scratch', 'build_explanatory_notes.js'), javaRevisionNotesData);
console.log("Build script generated.");
