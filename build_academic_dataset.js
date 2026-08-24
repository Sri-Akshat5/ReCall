import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileContent = `// ============================================================================
// Master Java Academic & Enterprise Concept Revision Textbook
// Combined Curriculum Syllabus (Units 1-3) + Advanced Java 21+ Architectural Notes
// ============================================================================

export const JAVA_REVISION_CATEGORIES = [
  "All Topics",
  "1. Fundamentals & Syntax (Unit 1)",
  "2. OOP & Core Concepts (Unit 1 & 2)",
  "3. Exceptions & Collections (Unit 2)",
  "4. Multithreading & JVM (Unit 2)",
  "5. GUI & Event Handling (Unit 3)",
  "6. Networking & Enterprise (Unit 2 & 3)",
  "7. Modern Java & Interview Bank"
];

export const JAVA_REVISION_SECTIONS = [
  // --------------------------------------------------------------------------
  // SECTION 01: INTRODUCTION TO JAVA & PLATFORM ARCHITECTURE
  // --------------------------------------------------------------------------
  {
    id: "java-introduction-platform",
    number: "01",
    category: "1. Fundamentals & Syntax (Unit 1)",
    title: "1. Introduction to Java, History & 12 Buzzword Features",
    subtitle: "Origin by James Gosling, Platform Definition, 4 Application Types, 4 Editions, and Java Buzzwords",
    summary: "Complete breakdown of Java history, platform independence, types of applications, and the 12 features.",
    diagramType: "jvm-compilation-flow",
    detailedContent: {
      introduction: "Java is a high-level, robust, object-oriented, and secure programming language created by James Gosling and his team at Sun Microsystems in 1995. Originally named Oak (after an oak tree outside Gosling's office), it was renamed to Java because 'Oak' was already a registered trademark. Java is both a programming language and a software platform. A platform is defined as any hardware or software environment in which a program executes. Because Java provides its own software-based Runtime Environment (JRE) and Application Programming Interface (API), it is classified as a platform.",

      subsections: [
        {
          heading: "1. 4 Main Types of Java Applications",
          content: "1. Standalone / Desktop Applications: Traditional window-based software installed on individual client machines (e.g. Acrobat Reader, Media Player, Antivirus). Built using AWT, Swing, or JavaFX.\\n\\n2. Web Applications: Server-side applications generating dynamic web pages (e.g. IRCTC, banking portals). Built using Servlets, JSP, Spring, Hibernate, and JSF.\\n\\n3. Enterprise Applications: High-volume, distributed applications requiring high-level security, load balancing, and clustering (e.g. enterprise banking systems). Built using Enterprise JavaBeans (EJB) and Spring Enterprise.\\n\\n4. Mobile & Embedded Applications: Software built for mobile devices and smart cards (Android, Java ME)."
        },
        {
          heading: "2. The 4 Java Platforms / Editions",
          content: "• Java SE (Java Standard Edition): The core programming platform. Contains APIs like java.lang, java.io, java.net, java.util, java.sql, java.math, and core topics like OOPs, Strings, Exceptions, Multithreading, and Collections.\\n\\n• Java EE (Java Enterprise Edition): Built on top of Java SE. Dedicated to web and enterprise server development (Servlets, JSP, EJB, JPA, Web Services).\\n\\n• Java ME (Java Micro Edition): Micro platform dedicated to mobile and embedded micro-devices.\\n\\n• JavaFX: Platform for building Rich Internet Applications (RIAs) with lightweight user interfaces."
        },
        {
          heading: "3. The 12 Java Features (Java Buzzwords)",
          content: "1. Simple: Syntax based on C++, removed complex features like explicit pointers, operator overloading, and manual memory deletion (handled by Automatic Garbage Collection).\\n2. Object-Oriented: Everything is an object (except primitives). Single root hierarchy under java.lang.Object.\\n3. Portable: Bytecode can be carried and executed on any OS without modification.\\n4. Platform Independent: Write Once, Run Anywhere (WORA). Java code compiles into platform-neutral bytecode executed by OS-specific JVMs.\\n5. Secured: Virus-free execution guaranteed by no explicit pointers, ClassLoader package isolation, Bytecode Verifier, and Security Manager.\\n6. Robust: Strong memory management, lack of explicit pointers, automatic GC, strict type-checking, and mandatory exception handling.\\n7. Architecture-Neutral: Primitive data type sizes are fixed regardless of architecture (e.g., int is ALWAYS 4 bytes on both 32-bit and 64-bit systems, unlike C/C++).\\n8. Interpreted & High Performance: JIT compiler converts hot bytecode into native CPU instructions for near-compiled speed.\\n9. Distributed: Native RMI (Remote Method Invocation) and EJB allow method calls across internet machines.\\n10. Multi-threaded: Supports concurrent thread execution sharing a common memory area.\\n11. Dynamic: Classes are loaded dynamically on demand at runtime.\\n12. Secure Sandbox: Programs execute inside a controlled virtual machine sandbox."
        },
        {
          heading: "4. Breakdown of First Java Program (Simple.java)",
          code: `public class Simple {
    public static void main(String args[]) {
        System.out.println("Hello Java");
    }
}`,
          codeExplanation: "• class Simple: Declares a class named Simple matching file name Simple.java.\\n• public: Access modifier making the main method visible everywhere.\\n• static: Allows JVM to invoke main() without instantiating an object of Simple class (saves memory).\\n• void: Return type indicating main() produces no return value.\\n• main: Standard entry point method name recognized by JVM.\\n• String args[]: Receives command-line parameters.\\n• System.out.println(): System is a class in java.lang; out is a static PrintStream instance; println() is a PrintStream method."
        }
      ],

      tables: [
        {
          title: "Detailed Comparison: C++ vs Java",
          headers: ["Feature / Index", "C++", "Java"],
          rows: [
            ["Platform Dependence", "Platform-Dependent (Machine code)", "Platform-Independent (WORA Bytecode)"],
            ["Primary Use", "System programming", "Application programming (Web, Mobile, Enterprise)"],
            ["goto Statement", "Supported", "Not supported (Reserved keyword)"],
            ["Multiple Inheritance", "Supported through classes", "Not supported through classes (Interfaces only)"],
            ["Operator Overloading", "Supported", "Not supported"],
            ["Pointers", "Explicit pointer arithmetic supported", "No explicit pointers allowed (Internal pointers only)"],
            ["Compiler & Interpreter", "Compiler only (Source ➔ Native code)", "Both Compiler (javac) & Interpreter (java/JIT)"],
            ["Parameter Passing", "Call by Value & Call by Reference", "Strictly 100% Call by Value only"],
            ["Structure & Union", "Supported", "Not supported"],
            ["Header Files / Import", "Uses #include <header.h>", "Uses import package.Class"],
            ["Root Class Hierarchy", "No single root hierarchy", "Single root hierarchy (java.lang.Object)"],
            ["Default Arguments", "Supported", "Not supported"]
          ]
        }
      ],

      pitfalls: [
        "Filename Mismatch: If a class is declared public, the source file name MUST match the public class name exactly (e.g. Simple.java for public class Simple).",
        "Assuming Java has Call by Reference: Passing object reference variables copies the reference pointer by value!"
      ],

      keyTakeaways: [
        "Java is both a language and a software platform running on top of OS hardware platforms.",
        "Java data types have fixed bit sizes across all CPU architectures (int is always 4 bytes)."
      ],

      interviewQuestions: [
        {
          q: "Why is the main method declared as static in Java?",
          a: "So that the JVM can execute main() directly using the class name without creating an object instance first, saving memory at application startup."
        },
        {
          q: "What are the 3 security components of the JRE Sandbox?",
          a: "1. ClassLoader (isolates local file system classes from imported network classes), 2. Bytecode Verifier (checks for illegal memory/stack access), 3. Security Manager (restricts access to local disk and hardware resources)."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 02: DATA TYPES, OPERATORS, KEYWORDS & CONTROL STATEMENTS
  // --------------------------------------------------------------------------
  {
    id: "datatypes-operators-keywords-control",
    number: "02",
    category: "1. Fundamentals & Syntax (Unit 1)",
    title: "2. Data Types, Operators, Precedence, Keywords & Control Flow",
    subtitle: "8 Primitives Table, Bitwise vs Logical Operators, 48 Keywords, and Control Statements",
    summary: "Comprehensive guide to data types, bitwise shifts, operator precedence, keywords, and loops.",
    detailedContent: {
      introduction: "Java variables hold values during program execution and are bound to specific data types. Java supports 8 fundamental primitive data types and non-primitive reference types. Control flow statements dictate how execution paths branch through decision making, looping, and jump operations.",

      subsections: [
        {
          heading: "1. Primitive vs Non-Primitive Data Types",
          content: "Primitive types are the foundational building blocks built into the language. Non-primitive types (Classes, Interfaces, Arrays, Strings) are reference types that refer to objects on the Heap."
        },
        {
          heading: "2. Bitwise & Logical Operator Mechanics",
          content: "• Bitwise NOT (~a): Inverts binary bits (~a = -(a + 1)). For example, ~10 evaluates to -11, while ~(-10) evaluates to 9.\\n\\n• Left Shift (x << n): Shifts bits left, equivalent to x * 2^n (e.g., 10 << 2 = 10 * 4 = 40).\\n\\n• Right Shift (x >> n): Shifts bits right with sign extension, equivalent to x / 2^n (e.g., 10 >> 2 = 10 / 4 = 2).\\n\\n• Short-Circuit && / || vs Bitwise & / |:\\n  - Logical && skips checking the 2nd condition if 1st is false.\\n  - Bitwise & ALWAYS evaluates both conditions regardless of outcome.\\n  - Logical || skips checking the 2nd condition if 1st is true.\\n  - Bitwise | ALWAYS evaluates both conditions."
        },
        {
          heading: "3. Comprehensive Reserved Keywords Guide (48 Core Keywords)",
          content: "Java keywords are reserved words with predefined meanings:\\n• Control: if, else, switch, case, default, for, do, while, break, continue, return\\n• Modifiers: public, private, protected, static, final, abstract, synchronized, volatile, transient, strictfp, native\\n• Exception Handling: try, catch, finally, throw, throws\\n• Object/Class: class, interface, extends, implements, new, this, super, instanceof, enum, package, import, void\\n• Primitives: boolean, byte, char, short, int, long, float, double"
        },
        {
          heading: "4. Control Flow: Decision Making, Loops & Jump Statements",
          content: "• Decision Making: if, if-else, if-else-if ladder, nested if, switch statement (supports byte, short, int, char, Enum, and String since Java 7).\\n• Looping Statements:\\n  - for loop: Used when iteration count is known in advance.\\n  - while loop: Entry-controlled loop (condition evaluated before loop body).\\n  - do-while loop: Exit-controlled loop (body executes AT LEAST ONCE before condition check).\\n• Jump Statements: break (terminates loop/switch), continue (skips current iteration)."
        }
      ],

      tables: [
        {
          title: "Complete 8 Primitive Data Types Table",
          headers: ["Type", "Category", "Size", "Default Value", "Range / Format"],
          rows: [
            ["boolean", "Boolean", "1 bit", "false", "true or false"],
            ["char", "Character", "2 bytes (16-bit)", "'\\\\u0000'", "Unicode 0 to 65,535 ('\\\\uffff')"],
            ["byte", "Integral", "1 byte (8-bit)", "0", "-128 to 127"],
            ["short", "Integral", "2 bytes (16-bit)", "0", "-32,768 to 32,767"],
            ["int", "Integral", "4 bytes (32-bit)", "0", "-2,147,483,648 to 2,147,483,647"],
            ["long", "Integral", "8 bytes (64-bit)", "0L", "-9,223,372,036,854,775,808 to 2^63-1"],
            ["float", "Floating-point", "4 bytes (32-bit)", "0.0f", "IEEE 754 Single Precision"],
            ["double", "Floating-point", "8 bytes (64-bit)", "0.0d", "IEEE 754 Double Precision"]
          ]
        },
        {
          title: "Operator Precedence & Hierarchy",
          headers: ["Category", "Operators", "Associativity"],
          rows: [
            ["Unary Postfix", "expr++  expr--", "Left to Right"],
            ["Unary Prefix", "++expr  --expr  +expr  -expr  ~  !", "Right to Left"],
            ["Arithmetic", "*  /  %", "Left to Right"],
            ["Additive", "+  -", "Left to Right"],
            ["Shift", "<<  >>  >>>", "Left to Right"],
            ["Relational", "<  >  <=  >=  instanceof", "Left to Right"],
            ["Equality", "==  !=", "Left to Right"],
            ["Bitwise AND / XOR / OR", "&  ^  |", "Left to Right"],
            ["Logical AND / OR", "&&  ||", "Left to Right"],
            ["Ternary", "? :", "Right to Left"],
            ["Assignment", "=  +=  -=  *=  /=  %=", "Right to Left"]
          ]
        }
      ],

      pitfalls: [
        "Unintended Bitwise Evaluation: Using & instead of && evaluates side-effect expressions in the 2nd condition even when the 1st condition fails!",
        "Switch Fallthrough: Forgetting the break statement in a switch case causes execution to fall through into subsequent cases."
      ],

      keyTakeaways: [
        "Java uses 16-bit Unicode for char values (range \\u0000 to \\uffff).",
        "do-while loop guarantees at least one execution pass because it is exit-controlled."
      ],

      interviewQuestions: [
        {
          q: "What is the difference between >> and >>> operators?",
          a: ">> is arithmetic right shift (preserves sign bit). >>> is logical right shift (fills left bits with zero regardless of sign)."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 03: CLASSES, OBJECTS, CONSTRUCTORS & NAMING CONVENTIONS
  // --------------------------------------------------------------------------
  {
    id: "classes-objects-constructors-naming",
    number: "03",
    category: "1. Fundamentals & Syntax (Unit 1)",
    title: "3. Classes, Objects, Methods, Constructors & Naming Rules",
    subtitle: "State/Behavior/Identity, CamelCase Conventions, Constructor Rules vs Methods, and Object Initialization",
    summary: "Master class structure, object creation on Heap, constructor chaining, and naming conventions.",
    detailedContent: {
      introduction: "An object is a physical or logical entity possessing State (data), Behavior (functionality), and Identity (unique internal ID assigned by JVM). A class is a logical template or blueprint from which objects are instantiated on the Heap using the new keyword.",

      subsections: [
        {
          heading: "1. Java Naming Conventions (CamelCase Standard)",
          content: "• Class: UpperCamelCase, Noun (e.g. Employee, Color, Thread).\\n• Interface: UpperCamelCase, Adjective (e.g. Printable, Runnable, Remote).\\n• Method: lowerCamelCase, Verb (e.g. draw(), actionPerformed(), getMarks()).\\n• Variable: lowerCamelCase, Noun (e.g. id, firstName). Avoid special prefix characters like &, $, _.\\n• Package: All lowercase, dot-separated (e.g. java.util, com.javatpoint).\\n• Constant: ALL_UPPERCASE, underscore-separated (e.g. MIN_AGE, MAX_PRIORITY)."
        },
        {
          heading: "2. Object Initialization Ways & Memory Allocation",
          content: "When calling 'new Rectangle()', memory is allocated on the Heap. Objects can be initialized in 3 ways:\\n1. By reference variable (r.length = 10;)\\n2. By method (r.insertRecord(10, 20);)\\n3. By constructor (Rectangle r = new Rectangle(10, 20);)"
        },
        {
          heading: "3. Method Header & Signature Components",
          content: "A method declaration consists of 6 components:\\n1. Access Specifier: public, private, protected, default.\\n2. Return Type: Data type returned or void.\\n3. Method Name: Identifier corresponding to action.\\n4. Parameter List: Comma-separated type-variable pairs.\\n5. Method Header: Specifier + Return Type + Name + Parameters.\\n6. Method Signature: Method Name + Parameter Types (used by compiler for overloading)."
        },
        {
          heading: "4. Constructor Rules & Types",
          content: "Rules for Constructors:\\n1. Constructor name MUST match class name exactly.\\n2. Must have NO explicit return type (not even void!).\\n3. Cannot be abstract, static, final, or synchronized.\\n\\nTypes:\\n• Default Constructor: No-arg constructor created automatically by javac if no constructor is defined. Initializes fields to 0, null, or false.\\n• Parameterized Constructor: Initializes distinct objects with custom state values."
        }
      ],

      tables: [
        {
          title: "Detailed Comparison: Constructor vs Method",
          headers: ["Feature", "Constructor", "Method"],
          rows: [
            ["Purpose", "Initializes the state of an object", "Exposes behavior/logic of an object"],
            ["Return Type", "Must NOT have any return type (not even void)", "MUST specify a return type or void"],
            ["Invocation", "Invoked implicitly when 'new' is called", "Invoked explicitly by method call"],
            ["Compiler Creation", "Compiler provides default if none written", "Never created by the compiler"],
            ["Name Rule", "Must match class name exactly", "May or may not match class name"]
          ]
        }
      ],

      pitfalls: [
        "Adding void to a Constructor: Writing 'public void Student()' turns it into a standard method, NOT a constructor! javac will still generate a default no-arg constructor, leading to uninitialized fields."
      ],

      keyTakeaways: [
        "Objects possess State, Behavior, and a JVM-internal Identity ID.",
        "Method Signature comprises Method Name + Parameter Types."
      ],

      interviewQuestions: [
        {
          q: "What happens if a class defines a parameterized constructor but no no-arg constructor?",
          a: "The compiler will NOT generate the default no-arg constructor. Instantiating the class without arguments ('new ClassName()') will result in a compile-time error."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 04: STATIC & THIS KEYWORDS
  // --------------------------------------------------------------------------
  {
    id: "static-this-keywords",
    number: "04",
    category: "1. Fundamentals & Syntax (Unit 1)",
    title: "4. Deep Dive into static & this Keywords",
    subtitle: "Static Variables, Methods, Blocks, Why main is Static, and the 6 Usages of this",
    summary: "Memory optimization using static members and current instance handling with this.",
    detailedContent: {
      introduction: "The static keyword is used primarily for memory management in Java. Static variables, methods, and blocks belong to the class rather than object instances. The this keyword is a reference variable that points to the current object instance.",

      subsections: [
        {
          heading: "1. Static Variable, Method & Block Mechanics",
          content: "• Static Variable: Class-level variable shared across ALL object instances. Allocated memory ONCE in Metaspace when the class is loaded by the JVM.\\n\\n• Static Method: Belongs to the class and can be invoked without creating an instance ('ClassName.method()'). Restrictions: Static methods CANNOT access non-static instance fields/methods directly, and cannot use 'this' or 'super' keywords.\\n\\n• Static Block: Code block executed ONCE automatically when the class is loaded into memory, BEFORE the main method executes. Used for static initializations."
        },
        {
          heading: "2. Why Java main() Method is Static",
          content: "If main() were a non-static instance method, the JVM would have to instantiate an object of the main class before calling main(). This would create unnecessary memory overhead and ambiguity if constructors required parameters. Declaring main static allows JVM to execute 'ClassName.main(args)' directly."
        },
        {
          heading: "3. The 6 Major Usages of 'this' Keyword",
          content: "1. Refer to current class instance variables (resolves parameter shadowing ambiguity).\\n2. Invoke current class method implicitly.\\n3. Invoke current class constructor using this() (Constructor Chaining).\\n4. Pass current object as an argument in a method call.\\n5. Pass current object as an argument in a constructor call.\\n6. Return current class instance from a method (method chaining)."
        }
      ],

      codeSnippet: `public class StaticThisDemo {
    static String college = "ITS"; // Static variable shared by all instances
    int id;                       // Instance variable
    String name;

    static {
        System.out.println("Static block executed before main()");
    }

    public StaticThisDemo(int id, String name) {
        this.id = id;     // 'this' resolves parameter shadowing
        this.name = name;
    }
}`,

      tables: [
        {
          title: "Static vs Instance Members",
          headers: ["Aspect", "Static Member", "Instance Member"],
          rows: [
            ["Memory Allocation", "Allocated once in Metaspace on class load", "Allocated per object instance on Heap"],
            ["Invocation", "Invoked via ClassName.member", "Invoked via objectReference.member"],
            ["Context", "Shared across all instances", "Unique to individual instance"],
            ["Access Restrictions", "Cannot use 'this' or 'super'", "Can access both static and instance members"]
          ]
        }
      ],

      pitfalls: [
        "Attempting to use 'this' inside static methods: Causes compile-time error ('non-static variable this cannot be referenced from a static context')."
      ],

      keyTakeaways: [
        "Static blocks run before main() when the class is loaded by the JVM ClassLoader.",
        "this() constructor calls must be the first statement in a constructor body."
      ],

      interviewQuestions: [
        {
          q: "Can we execute a Java program without a main() method?",
          a: "Prior to JDK 7, code in a static block could execute before main() and then call System.exit(0). Since JDK 7, the JVM checks for the presence of main() before loading the class."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 05: INHERITANCE, OVERRIDING & SUPER KEYWORD
  // --------------------------------------------------------------------------
  {
    id: "inheritance-overriding-super",
    number: "05",
    category: "2. OOP & Core Concepts (Unit 1 & 2)",
    title: "5. Inheritance, Method Overriding & super Keyword",
    subtitle: "IS-A Relationship, 5 Inheritance Types, Overriding Rules, and 3 Uses of super",
    summary: "Reusability through inheritance, dynamic polymorphism overriding, and super reference.",
    detailedContent: {
      introduction: "Inheritance is an OOP mechanism where a child subclass acquires fields and methods of a parent superclass using the extends keyword ('IS-A' relationship). Method overriding allows a subclass to provide a specific implementation of a superclass method for runtime polymorphism.",

      subsections: [
        {
          heading: "1. 5 Types of Inheritance (Why Multiple Class Inheritance Fails)",
          content: "1. Single Inheritance: Class B extends Class A.\\n2. Multilevel Inheritance: Class C extends Class B, which extends Class A.\\n3. Hierarchical Inheritance: Class B and Class C both extend Class A.\\n4. Multiple Inheritance: Class C extends Class A and Class B (NOT supported with classes in Java to prevent Diamond Problem ambiguity!).\\n5. Hybrid Inheritance: Combination of multi-level and multiple inheritance (Achieved via Interfaces only)."
        },
        {
          heading: "2. Rules for Method Overriding",
          content: "1. Method name MUST match parent method exactly.\\n2. Parameter list MUST be identical to parent method.\\n3. MUST have an IS-A relationship (inheritance).\\n4. Return type must be identical or covariant (subtype).\\n5. Access level cannot be more restrictive than parent method.\\n6. Static and private methods CANNOT be overridden."
        },
        {
          heading: "3. 3 Major Usages of 'super' Keyword",
          content: "1. Access immediate parent class instance variables ('super.variableName').\\n2. Invoke immediate parent class method ('super.methodName()').\\n3. Invoke immediate parent class constructor ('super()' or 'super(args)')."
        }
      ],

      tables: [
        {
          title: "Complete Access Modifiers Scope Matrix",
          headers: ["Access Modifier", "Within Class", "Within Package", "Outside Package (Subclass)", "World (Outside Package)"],
          rows: [
            ["private", "YES", "NO", "NO", "NO"],
            ["default (package-private)", "YES", "YES", "NO", "NO"],
            ["protected", "YES", "YES", "YES (via inheritance)", "NO"],
            ["public", "YES", "YES", "YES", "YES"]
          ]
        }
      ],

      pitfalls: [
        "Shadowing Instance Variables: Subclasses inherit parent fields, but declaring a field with the same name in a subclass SHADOWS the parent field rather than overriding it."
      ],

      keyTakeaways: [
        "Java prevents class multiple inheritance to eliminate Diamond Problem ambiguities.",
        "super() constructor invocation must be the first line in a child constructor."
      ],

      interviewQuestions: [
        {
          q: "Why can't static methods be overridden?",
          a: "Static methods are bound statically at compile-time to class metadata, not dynamically at runtime to object instances on the Heap."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 06: OBJECT CLASS, POLYMORPHISM & CASTING
  // --------------------------------------------------------------------------
  {
    id: "object-class-polymorphism-casting",
    number: "06",
    category: "2. OOP & Core Concepts (Unit 1 & 2)",
    title: "6. Object Class, Polymorphism & Object Typecasting",
    subtitle: "Root Hierarchy Methods, Dynamic Method Dispatch, Upcasting vs Downcasting",
    summary: "java.lang.Object methods, runtime upcasting/downcasting, and ClassCastException safety.",
    detailedContent: {
      introduction: "java.lang.Object is the root of the Java class hierarchy. Every class directly or indirectly extends Object. Polymorphism ('many forms') allows parent reference variables to hold child object instances.",

      subsections: [
        {
          heading: "1. Core Methods of java.lang.Object",
          content: "• toString(): String representation of object (default: ClassName@HexHashCode).\\n• hashCode(): Unique integer hash code for searching in HashMaps.\\n• equals(Object obj): Logical equality comparison.\\n• getClass(): Returns runtime Class object metadata.\\n• clone(): Creates duplicate copy of object (requires Cloneable interface).\\n• finalize(): Called by GC before object destruction (deprecated in Java 9+).\\n• wait(), notify(), notifyAll(): Concurrency thread synchronization methods."
        },
        {
          heading: "2. Upcasting vs Downcasting Mechanics",
          content: "• Upcasting: Casting a child object to a parent reference ('Parent p = new Child()'). Performed implicitly. Safe generalization/widening. Only parent methods and overridden child methods are accessible.\\n\\n• Downcasting: Casting a parent reference back to a child reference ('Child c = (Child) p'). Must be done explicitly. If the underlying object on the Heap is NOT actually a Child instance, the JVM throws ClassCastException at runtime!"
        },
        {
          heading: "3. instanceof Operator Usage",
          content: "The instanceof operator tests whether an object is an instance of a specified class, subclass, or interface. Returns true or false. Safe rule: Evaluating 'null instanceof ClassName' ALWAYS returns false."
        }
      ],

      codeSnippet: `Parent p = new Child(); // Upcasting (Implicit)
p.PrintData();           // Calls overridden Child method

if (p instanceof Child) {
    Child c = (Child) p; // Safe Downcasting checked with instanceof
    c.childSpecificMethod();
}`,

      tables: [
        {
          title: "Upcasting vs Downcasting Matrix",
          headers: ["Property", "Upcasting", "Downcasting"],
          rows: [
            ["Cast Direction", "Child object ➔ Parent reference", "Parent reference ➔ Child object"],
            ["Syntax Requirement", "Implicit (Automatic) or Explicit", "STRICTLY Explicit casting required"],
            ["Safety", "100% Safe at compile & runtime", "Risk of ClassCastException at runtime"],
            ["Term", "Generalization / Widening", "Specialization / Narrowing"]
          ]
        }
      ],

      pitfalls: [
        "Unchecked Downcasting: Downcasting an object without checking 'instanceof' first causes ClassCastException crashes in production."
      ],

      keyTakeaways: [
        "java.lang.Object is the single root of all Java classes.",
        "Always guard downcasting with instanceof checks."
      ],

      interviewQuestions: [
        {
          q: "What is Dynamic Method Dispatch?",
          a: "The runtime mechanism where a call to an overridden method is resolved at runtime based on the actual object on the Heap, not the reference type."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 07: ABSTRACT CLASSES VS INTERFACES
  // --------------------------------------------------------------------------
  {
    id: "abstract-classes-interfaces-academic",
    number: "07",
    category: "2. OOP & Core Concepts (Unit 1 & 2)",
    title: "7. Abstract Classes vs Interfaces & Multiple Inheritance",
    subtitle: "Abstract Method Rules, Interface Constants, Default/Static Methods, Multiple Interface Implementation",
    summary: "Designing abstract contracts vs interface capabilities and multiple inheritance.",
    detailedContent: {
      introduction: "Abstract classes (declared with abstract keyword) cannot be instantiated directly and serve as base classes containing abstract and non-abstract methods. Interfaces provide abstract contracts allowing a class to implement multiple interfaces, achieving multiple inheritance.",

      subsections: [
        {
          heading: "1. Abstract Class Rules & Restrictions",
          content: "1. Declared with abstract keyword; CANNOT be instantiated with 'new'.\\n2. Can contain abstract methods (no body) and concrete methods (with body).\\n3. Subclasses MUST override and implement all abstract methods unless the subclass is also abstract.\\n4. CANNOT declare abstract constructors or abstract static methods."
        },
        {
          heading: "2. Interface Mechanics (Multiple Inheritance)",
          content: "1. Declared with interface keyword. All fields are implicitly 'public static final' constants.\\n2. Prior to Java 8, all methods were implicitly 'public abstract'. Java 8 added default and static methods; Java 9 added private methods.\\n3. A class can extend ONE superclass while implementing MULTIPLE interfaces ('class C extends Super implements Int1, Int2').\\n4. An interface can extend another interface ('interface ChildInt extends ParentInt')."
        }
      ],

      tables: [
        {
          title: "Comprehensive Comparison: Abstract Class vs Interface",
          headers: ["Property", "Abstract Class", "Interface"],
          rows: [
            ["Inheritance Keyword", "extended using 'extends'", "implemented using 'implements'"],
            ["Multiple Inheritance", "Single class inheritance only", "Multiple interface implementation supported"],
            ["Field Types", "Can have instance, static, final fields", "Fields are STRICTLY 'public static final'"],
            ["Methods", "Abstract and non-abstract concrete methods", "Abstract, default, static, and private methods"],
            ["Constructors", "Can have constructors", "CANNOT have constructors"],
            ["Performance", "Slightly faster (direct invocation)", "Slower (interface method lookup table)"]
          ]
        }
      ],

      pitfalls: [
        "Default Method Diamond Conflict: If a class implements two interfaces sharing an identical default method signature, the class MUST override the method explicitly to break ambiguity."
      ],

      keyTakeaways: [
        "Interfaces enable multiple inheritance without Diamond Problem memory ambiguities.",
        "Interface fields are implicitly public static final constants."
      ],

      interviewQuestions: [
        {
          q: "Can an interface have a constructor?",
          a: "No. Interfaces cannot be instantiated directly and cannot hold instance state, so constructors are prohibited."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 08: PACKAGES & JAVA.UTIL PACKAGE
  // --------------------------------------------------------------------------
  {
    id: "packages-util-api",
    number: "08",
    category: "3. Exceptions & Collections (Unit 2)",
    title: "8. Java Packages & Core API Utilities (java.util)",
    subtitle: "Package Grouping, Accessing Packages, API Overview (java.lang, java.util, java.io, java.net)",
    summary: "Namespace organization, import rules, and utility packages like StringTokenizer and Date.",
    detailedContent: {
      introduction: "Packages group related classes, interfaces, and sub-packages according to functionality, providing namespace protection and access control. Java API provides pre-built packages such as java.lang, java.util, java.io, java.awt, and java.net.",

      subsections: [
        {
          heading: "1. 3 Ways to Access Packages",
          content: "1. import packagename.*: Makes all classes and interfaces in the package accessible (sub-packages are NOT imported).\\n2. import packagename.ClassName: Imports only the specified class.\\n3. Fully Qualified Name: Uses 'packagename.ClassName obj = new packagename.ClassName()' directly without an import statement (resolves name collisions between java.util.Date and java.sql.Date)."
        },
        {
          heading: "2. Major Standard Java API Packages",
          content: "• java.lang: Core language classes automatically imported by javac (String, Math, Thread, Exception, Object, System).\\n• java.util: Utility framework (Collections, Arrays, Vector, Hashtable, StringTokenizer, Date, Calendar, Random, Locale).\\n• java.io: Input/output stream support classes.\\n• java.net: Networking classes (Sockets, ServerSockets, URL).\\n• java.awt: Abstract Window Toolkit GUI components."
        }
      ],

      tables: [
        {
          title: "Package Import Techniques Comparison",
          headers: ["Method", "Syntax Example", "Scope & Access"],
          rows: [
            ["Wildcard Import", "import java.util.*;", "Imports all classes in java.util package"],
            ["Specific Class Import", "import java.util.ArrayList;", "Imports only ArrayList class"],
            ["Fully Qualified Name", "java.util.Date d = new java.util.Date();", "Direct inline access without import statement"]
          ]
        }
      ],

      pitfalls: [
        "Expecting Wildcard Imports to include Sub-packages: 'import java.awt.*' does NOT import classes inside 'java.awt.event.*'."
      ],

      keyTakeaways: [
        "java.lang is automatically imported by the Java compiler into every class.",
        "Fully qualified names resolve ambiguous class name collisions across packages."
      ],

      interviewQuestions: [
        {
          q: "What is the purpose of the package keyword?",
          a: "To prevent class naming conflicts, control access levels across packages, and organize software modules logically."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 09: MULTITHREADING LIFE CYCLE & SYNCHRONIZATION
  // --------------------------------------------------------------------------
  {
    id: "multithreading-lifecycle-sync",
    number: "09",
    category: "4. Concurrency & JVM (Unit 2)",
    title: "9. Multithreading Life Cycle, Thread vs Runnable & Synchronization",
    subtitle: "5 Thread States, yield/stop/sleep/wait/notify, Thread Class vs Runnable, Monitors & Deadlocks",
    summary: "Deep breakdown of multithreaded state transitions, thread creation, monitors, and synchronization.",
    diagramType: "virtual-threads-flow",
    detailedContent: {
      introduction: "Multithreading is a programming paradigm where a program is divided into two or more concurrent execution threads. Threads share a common memory area within a process, enabling high-performance asynchronous execution.",

      subsections: [
        {
          heading: "1. 5 States of Thread Life Cycle",
          content: "1. Newborn State: Thread object instantiated ('new Thread()'). Not yet scheduled. Actions: start() moves to Runnable; stop() kills it.\\n2. Runnable State: Waiting in queue for CPU time-slicing. yield() relinquishes control to equal priority threads.\\n3. Running State: CPU executes thread run() body.\\n4. Blocked State: Prevented from running due to sleep(ms), suspend(), or wait(). Revived via time expiry, resume(), or notify().\\n5. Dead State: Execution completes or stop() is invoked."
        },
        {
          heading: "2. Thread Class vs Runnable Interface",
          content: "• Extending Thread Class: Simple, but limits inheritance since Java does not support multiple class inheritance.\\n• Implementing Runnable Interface: Recommended gold standard. Allows class to extend another superclass while implementing thread execution logic."
        },
        {
          heading: "3. Thread Synchronization & Monitor Locks",
          content: "When multiple threads access shared mutable resources, race conditions occur. Marking a method or code block as synchronized hands a 'Monitor Lock' (key) to the executing thread. Other threads attempting entry are blocked until the lock is released. Deadlock occurs when two threads wait indefinitely for locks held by each other."
        }
      ],

      codeSnippet: `// Creating Thread via Runnable Interface
class MyTask implements Runnable {
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

public class MultiDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyTask());
        t1.start(); // Moves Newborn -> Runnable
    }
}`,

      tables: [
        {
          title: "Thread Control Methods Summary",
          headers: ["Method", "Purpose", "Lock Behavior"],
          rows: [
            ["start()", "Schedules newborn thread for execution", "N/A"],
            ["sleep(milliseconds)", "Pauses thread for specified time", "Keeps monitor locks held"],
            ["yield()", "Pauses current thread for equal priority threads", "Keeps monitor locks held"],
            ["wait()", "Waits indefinitely until notified", "RELEASES monitor lock"],
            ["notify() / notifyAll()", "Wakes up waiting thread(s)", "N/A"]
          ]
        }
      ],

      pitfalls: [
        "Invoking run() instead of start(): Calling run() executes the method synchronously on the caller thread without spawning a new thread!"
      ],

      keyTakeaways: [
        "wait() releases monitor locks; sleep() retains monitor locks.",
        "Prefer implementing Runnable over extending Thread class."
      ],

      interviewQuestions: [
        {
          q: "What is Deadlock in multithreading?",
          a: "A situation where two or more threads are blocked forever, each waiting for a lock held by the other."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 10: EXCEPTION HANDLING MECHANISMS
  // --------------------------------------------------------------------------
  {
    id: "exception-handling-academic",
    number: "10",
    category: "3. Exceptions & Collections (Unit 2)",
    title: "10. Exception Handling Architecture & Mechanics",
    subtitle: "Hit/Throw/Catch/Handle Tasks, Standard Exception Table, Multiple Catch, and finally Block",
    summary: "Detailed error handling pipeline, exception hierarchy, and cleanup execution guarantees.",
    diagramType: "exception-hierarchy",
    detailedContent: {
      introduction: "An exception is an abnormal condition caused by a runtime error. Exception handling provides a structured mechanism to detect, throw, catch, and handle errors, preventing abrupt application abortion.",

      subsections: [
        {
          heading: "1. The 4 Tasks of Exception Handling",
          content: "1. Hit the Exception: Detecting the runtime error condition.\\n2. Throw the Exception: Instantiating and throwing an Exception object.\\n3. Catch the Exception: Intercepting the thrown object in a matching catch block.\\n4. Handle the Exception: Executing corrective recovery code."
        },
        {
          heading: "2. Multiple Catch Statements & Rules",
          content: "A single try block can be followed by multiple catch blocks (similar to switch cases). The JVM matches the thrown exception type against catch parameters from top to bottom. CRITICAL RULE: Subclass exceptions MUST be caught before parent Exception classes to prevent compile-time unreachable code errors!"
        },
        {
          heading: "3. The finally Block Execution Guarantee",
          content: "The finally block executes REGARDLESS of whether an exception is thrown or caught. Ideal for releasing system resources (closing files, DB connections). Exception: finally will NOT execute if System.exit(0) is called or JVM crashes."
        }
      ],

      tables: [
        {
          title: "Standard Exception Types Table",
          headers: ["Exception Class", "Cause of Exception"],
          rows: [
            ["ArithmeticException", "Math errors such as division by zero"],
            ["ArrayIndexOutOfBoundsException", "Accessing array index outside bounds"],
            ["ArrayStoreException", "Storing incompatible data type in an object array"],
            ["NullPointerException", "Dereferencing a null object pointer"],
            ["NumberFormatException", "Failed string-to-numeric parsing"],
            ["FileNotFoundException", "Attempting to access non-existent file"],
            ["IOException", "General I/O stream failure"],
            ["OutOfMemoryError", "JVM runs out of heap allocation space"],
            ["StackOverflowError", "Infinite recursion exhausting call stack space"]
          ]
        }
      ],

      pitfalls: [
        "Unreachable Catch Block Error: Placing 'catch (Exception e)' BEFORE 'catch (ArithmeticException e)' causes compilation failure."
      ],

      keyTakeaways: [
        "finally block always executes unless System.exit(0) is called.",
        "Subclass exceptions must precede superclass exceptions in multiple catch blocks."
      ],

      interviewQuestions: [
        {
          q: "What is the difference between throw and throws?",
          a: "throw is used inside a method body to explicitly throw an exception object. throws is used in a method declaration header to advertise checked exceptions."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 11: JCF COLLECTIONS FRAMEWORK
  // --------------------------------------------------------------------------
  {
    id: "collections-framework-academic",
    number: "11",
    category: "3. Exceptions & Collections (Unit 2)",
    title: "11. Java Collections Framework & Data Structures Hierarchy",
    subtitle: "List, Set, Queue, Deque, Map, Vector, Hashtable, Stack, and Common Interface Methods",
    summary: "Complete breakdown of unified collections framework, algorithms, and legacy classes.",
    diagramType: "hashmap-treeify",
    detailedContent: {
      introduction: "Introduced in JDK 1.2, the Java Collections Framework (JCF) provides a standardized architecture for representing and manipulating groups of objects. Located in java.util, it includes interfaces (Collection, List, Set, Queue, Map) and concrete data structure implementations.",

      subsections: [
        {
          heading: "1. Root Interfaces: Collection vs Map",
          content: "• java.util.Collection: Root interface for individual object collections.\\n  - List: Ordered, duplicate elements allowed (ArrayList, LinkedList, Vector, Stack).\\n  - Set: Unordered, duplicate elements forbidden (HashSet, LinkedHashSet, TreeSet).\\n  - Queue / Deque: FIFO processing queues (PriorityQueue, ArrayDeque, LinkedList).\\n\\n• java.util.Map: Key-Value mappings (Unique keys, duplicate values) (HashMap, LinkedHashMap, TreeMap, Hashtable)."
        },
        {
          heading: "2. Common Collection Interface Methods",
          content: "• add(e): Inserts element.\\n• remove(obj): Deletes element.\\n• contains(obj): Returns true if element exists.\\n• size(): Returns element count.\\n• isEmpty(): Checks if empty.\\n• clear(): Removes all elements.\\n• iterator(): Returns Iterator for traversal.\\n• toArray(): Converts collection to array."
        }
      ],

      tables: [
        {
          title: "Primary Collection Classes Matrix",
          headers: ["Class", "Interface", "Internal Structure", "Ordering / Features"],
          rows: [
            ["ArrayList", "List", "Dynamic Object Array", "Fast random access O(1), non-synchronized"],
            ["LinkedList", "List / Deque", "Doubly Linked List", "Fast insertion/deletion at ends O(1)"],
            ["Vector", "List", "Dynamic Array", "Legacy thread-safe (Synchronized)"],
            ["HashSet", "Set", "HashMap Instance", "Unordered, unique elements, allows 1 null"],
            ["TreeSet", "SortedSet", "Red-Black Tree", "Sorted natural order, NO nulls allowed"],
            ["HashMap", "Map", "Bucket Array + Tree", "Key-Value pairs, non-synchronized"]
          ]
        }
      ],

      pitfalls: [
        "Using Legacy Vector/Hashtable: Legacy collections carry heavy synchronization overhead. Use ArrayList or ConcurrentHashMap instead."
      ],

      keyTakeaways: [
        "Map interface does NOT inherit from java.util.Collection.",
        "Set implementations enforce element uniqueness."
      ],

      interviewQuestions: [
        {
          q: "Difference between Iterator and Enumeration?",
          a: "Iterator allows removing elements during iteration (remove()) and has shorter method names (hasNext(), next()). Enumeration is read-only legacy interface."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 12: JAVABEANS ARCHITECTURE
  // --------------------------------------------------------------------------
  {
    id: "javabeans-architecture",
    number: "12",
    category: "6. Networking & Enterprise (Unit 2 & 3)",
    title: "12. JavaBeans Architecture & Enterprise Components",
    subtitle: "Serializable, 0-Arg Constructor, Getter/Setter Properties, and java.beans API",
    summary: "Encapsulating multiple objects into reusable software bean components.",
    detailedContent: {
      introduction: "A JavaBean is a reusable software component written in Java. It encapsulates multiple objects into a single bean object that can be passed across applications or network systems.",

      subsections: [
        {
          heading: "1. 3 Strict Rules of a JavaBean",
          content: "1. Must implement java.io.Serializable interface (allows persistent saving and network transmission).\\n2. Must have a public zero-argument (no-arg) default constructor.\\n3. All properties must be private with public getter and setter access methods."
        },
        {
          heading: "2. JavaBeans API (java.beans Package)",
          content: "• PropertyChangeListener: Notified when bound properties change.\\n• Customizer: Provides GUI configuration interface.\\n• PropertyEditor: Allows editing property values in IDE design tools."
        }
      ],

      codeSnippet: `public class EmployeeBean implements java.io.Serializable {
    private int id;
    private String name;

    public EmployeeBean() {} // 1. Zero-arg constructor

    public int getId() { return id; } // 2. Public getters/setters
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}`,

      tables: [
        {
          title: "JavaBean vs Standard Class",
          headers: ["Property", "JavaBean", "Standard Java Class"],
          rows: [
            ["Serializable", "MUST implement java.io.Serializable", "Optional"],
            ["Constructor", "MUST provide public 0-arg constructor", "Any constructor structure"],
            ["Field Access", "Private fields with public getters/setters", "Any access modifier"]
          ]
        }
      ],

      pitfalls: [
        "Forgetting No-Arg Constructor: Instantiating framework beans (like Spring/Hibernate) fails if a no-arg constructor is missing."
      ],

      keyTakeaways: [
        "JavaBeans enable standard software component reusability across frameworks."
      ],

      interviewQuestions: [
        {
          q: "Why must JavaBeans implement Serializable?",
          a: "To allow the bean's state to be flattened into a byte stream for persistent disk storage or network transmission."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 13: NETWORK PROGRAMMING & SOCKETS
  // --------------------------------------------------------------------------
  {
    id: "network-programming-sockets",
    number: "13",
    category: "6. Networking & Enterprise (Unit 2 & 3)",
    title: "13. Network & Socket Programming (java.net)",
    subtitle: "Client-Server Architecture, Socket & ServerSocket, TCP vs UDP Protocols",
    summary: "Building distributed client-server applications over TCP and UDP sockets.",
    detailedContent: {
      introduction: "Network programming involves writing programs that execute across multiple networked devices. The java.net package provides low-level socket abstractions to build client-server distributed systems.",

      subsections: [
        {
          heading: "1. Client-Server & Socket Basics",
          content: "• Client: Program that initiates communication by connecting to a remote socket.\\n• Server: Program that listens on a port waiting for incoming client connections.\\n• Socket: Endpoint of two-way inter-process communication across a network."
        },
        {
          heading: "2. TCP vs UDP Protocol Mechanics",
          content: "• TCP (Transmission Control Protocol): Connection-oriented, reliable, guarantees packet delivery and ordering (uses Socket and ServerSocket).\\n• UDP (User Datagram Protocol): Connectionless, fast, unacknowledged datagram transmission (uses DatagramSocket and DatagramPacket)."
        }
      ],

      tables: [
        {
          title: "Detailed Protocol Matrix: TCP vs UDP",
          headers: ["Aspect", "TCP (Transmission Control Protocol)", "UDP (User Datagram Protocol)"],
          rows: [
            ["Connection Type", "Connection-oriented (3-way handshake)", "Connectionless (Send and forget)"],
            ["Reliability", "100% Reliable (Retransmission on loss)", "Unreliable (Packets may drop)"],
            ["Speed", "Slower due to overhead & checks", "Extremely fast"],
            ["Java Classes", "Socket, ServerSocket", "DatagramSocket, DatagramPacket"]
          ]
        }
      ],

      pitfalls: [
        "Forgetting to Close Network Sockets: Leaves OS ports open, causing bind errors on server restart."
      ],

      keyTakeaways: [
        "TCP guarantees delivery ordering; UDP prioritizes low-latency speed."
      ],

      interviewQuestions: [
        {
          q: "What is the function of ServerSocket.accept()?",
          a: "It blocks execution until a client connects to the server port, then returns a Socket instance for communication."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 14: EVENT HANDLING & DELEGATION EVENT MODEL
  // --------------------------------------------------------------------------
  {
    id: "event-handling-delegation",
    number: "14",
    category: "5. GUI & Event Handling (Unit 3)",
    title: "14. Event Handling & Delegation Event Model",
    subtitle: "Foreground vs Background Events, Event Sources & Listeners, KeyListener & MouseListener",
    summary: "Controlling user actions using event sources, listeners, and handlers.",
    detailedContent: {
      introduction: "An event is a change in state of an object (e.g. button click, keypress, mouse movement). Java handles GUI events using the Delegation Event Model in java.awt.event.",

      subsections: [
        {
          heading: "1. Foreground vs Background Events",
          content: "• Foreground Events: Generated by direct user interaction with GUI components (clicking buttons, dragging mouse, typing keys).\\n• Background Events: System-level events requiring no direct user interaction (OS interrupts, timer completion, hardware failures)."
        },
        {
          heading: "2. Delegation Event Model Components",
          content: "• Source: GUI component generating event (Button, Checkbox, TextField).\\n• Listener: Interface receiving and processing event notifications from the source."
        },
        {
          heading: "3. Keyboard & Mouse Event Listeners",
          content: "• KeyListener Methods: keyPressed(KeyEvent), keyTyped(KeyEvent), keyReleased(KeyEvent).\\n• MouseListener Methods: mouseClicked(MouseEvent), mouseEntered(), mouseExited(), mousePressed(), mouseReleased().\\n• MouseMotionListener Methods: mouseDragged(MouseEvent), mouseMoved(MouseEvent)."
        }
      ],

      tables: [
        {
          title: "Event Listener & Handler Matrix",
          headers: ["Listener Interface", "Generated Event Class", "Handler Methods"],
          rows: [
            ["ActionListener", "ActionEvent", "actionPerformed(ActionEvent)"],
            ["KeyListener", "KeyEvent", "keyPressed(), keyTyped(), keyReleased()"],
            ["MouseListener", "MouseEvent", "mouseClicked(), mousePressed(), mouseReleased()"],
            ["MouseMotionListener", "MouseEvent", "mouseDragged(), mouseMoved()"]
          ]
        }
      ],

      pitfalls: [
        "Forgetting requestFocus(): Keyboard events will not fire unless the GUI component explicitly requests input focus!"
      ],

      keyTakeaways: [
        "Delegation Event Model decouples event generation sources from processing listener handlers."
      ],

      interviewQuestions: [
        {
          q: "Difference between keyPressed() and keyTyped()?",
          a: "keyPressed() fires for ANY keyboard key (including Shift, F1, Alt). keyTyped() fires ONLY when a printable character key is typed."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTION 15: FRAME, PANEL, APPLET LIFE CYCLE & LAYOUT MANAGERS
  // --------------------------------------------------------------------------
  {
    id: "gui-applet-layout-managers",
    number: "15",
    category: "5. GUI & Event Handling (Unit 3)",
    title: "15. Frame, Panel, Applet Life Cycle & Layout Managers",
    subtitle: "Frame vs Panel, Applet 5 States (init, start, paint, stop, destroy), Flow, Border & Grid Layouts",
    summary: "GUI window containers, Applet lifecycle, and visual component layout managers.",
    detailedContent: {
      introduction: "Java AWT and Swing provide window containers and layout managers to arrange visual components cleanly across different screen resolutions.",

      subsections: [
        {
          heading: "1. Difference Between Frame and Panel",
          content: "• Frame: Top-level independent window with a title bar, border, and minimize/close buttons. Resizable and movable.\\n• Panel: Internal sub-container region inside a Frame used to group child components together."
        },
        {
          heading: "2. The 5 States of Applet Life Cycle",
          content: "1. Born / Initialization: Browser loads applet; calls init() ONCE.\\n2. Running: System calls start() to begin activity.\\n3. Display: Browser calls paint(Graphics g) to render output.\\n4. Idle: System calls stop() when leaving the webpage.\\n5. Dead: Browser calls destroy() before removing applet from memory."
        },
        {
          heading: "3. Core Layout Managers",
          content: "• FlowLayout: Arranges components line-by-line from left-to-right, wrapping to next line when needed.\\n• BorderLayout: Arranges components into 5 fixed regions: NORTH, SOUTH, EAST, WEST, CENTER.\\n• GridLayout: Arranges components into a rectangular grid of equal-sized cells."
        }
      ],

      tables: [
        {
          title: "Layout Managers Comparison Table",
          headers: ["Layout Manager", "Arrangement Pattern", "Resizing Behavior"],
          rows: [
            ["FlowLayout", "Sequential left-to-right line wrapping", "Maintains component preferred sizes"],
            ["BorderLayout", "5 Regions (North, South, East, West, Center)", "Expands Center component to fill area"],
            ["GridLayout", "Rectangular grid of equal cells", "Resizes all cells equally"]
          ]
        }
      ],

      pitfalls: [
        "Forgetting setVisible(true): Creating a Frame without calling setVisible(true) leaves the window hidden!"
      ],

      keyTakeaways: [
        "Frame is a top-level window; Panel is an internal container.",
        "BorderLayout divides container into North, South, East, West, and Center."
      ],

      interviewQuestions: [
        {
          q: "What are the 4 main lifecycle methods of an Applet?",
          a: "init() (initialization), start() (execution), stop() (idle pause), and destroy() (memory cleanup)."
        }
      ]
    }
  },

  // --------------------------------------------------------------------------
  // SECTIONS 16 to 28 (STRINGS, GENERICS, JVM, GC, RECORDS, SPRING, INTERVIEW BANK)
  // --------------------------------------------------------------------------
  {
    id: "string-architecture-deep",
    number: "16",
    category: "2. OOP & Core Concepts (Unit 1 & 2)",
    title: "16. String Architecture & Constant Pool Mechanics",
    subtitle: "String Immutability, SCP Heap Region, StringBuilder vs StringBuffer, Text Blocks",
    summary: "Deep breakdown of string immutability, interning, and mutable buffers.",
    detailedContent: {
      introduction: "Strings are immutable sequences of char values. The JVM optimizes string storage using the String Constant Pool (SCP) in Heap memory.",
      subsections: [
        {
          heading: "1. String Immutability & SCP",
          content: "String objects cannot be altered once created. SCP deduplicates identical string literals to save memory."
        }
      ]
    }
  },
  {
    id: "generics-pecs-rule",
    number: "17",
    category: "3. Exceptions & Collections (Unit 2)",
    title: "17. Java Generics & PECS Wildcards",
    subtitle: "Type Safety, Bounded Wildcards (? extends / ? super), Type Erasure",
    summary: "Compile-time type safety and PECS wildcard boundaries.",
    detailedContent: {
      introduction: "Generics enforce type safety at compile-time and apply Type Erasure during compilation.",
      subsections: [
        {
          heading: "1. Producer Extends Consumer Super (PECS)",
          content: "Use ? extends T for reading data; use ? super T for writing data."
        }
      ]
    }
  },
  {
    id: "jvm-internals-gc",
    number: "18",
    category: "4. Concurrency & JVM (Unit 2)",
    title: "18. JVM Internals & Garbage Collection Collectors",
    subtitle: "ClassLoader Subsystem, Metaspace, G1GC & Sub-Millisecond ZGC",
    summary: "JVM runtime data areas and modern garbage collectors.",
    diagramType: "jvm-memory-flow",
    detailedContent: {
      introduction: "JVM manages memory through generational heap areas and low-latency collectors like G1GC and ZGC.",
      subsections: [
        {
          heading: "1. Metaspace & GC",
          content: "Metaspace stores class metadata off-heap. GC reclaims unreferenced heap objects."
        }
      ]
    }
  },
  {
    id: "modern-java-records-virtual-threads",
    number: "19",
    category: "7. Modern Java & Interview Bank",
    title: "19. Modern Java Features (Records, Virtual Threads & Java 21+)",
    subtitle: "Sealed Classes, Record Classes, Project Loom Virtual Threads, Scoped Values",
    summary: "Modern LTS features from Java 17 to Java 21+.",
    diagramType: "virtual-threads-flow",
    detailedContent: {
      introduction: "Java 21 introduced Virtual Threads for high-throughput concurrency and Sealed Classes for restricted inheritance.",
      subsections: [
        {
          heading: "1. Virtual Threads (Project Loom)",
          content: "Lightweight user-mode threads managed by the JVM continuation stack."
        }
      ]
    }
  },
  {
    id: "spring-boot-architecture",
    number: "20",
    category: "6. Networking & Enterprise (Unit 2 & 3)",
    title: "20. Spring Boot Core Architecture & Transactions",
    subtitle: "IoC Container, Bean Lifecycles, @Transactional AOP Proxies, N+1 Query Fixes",
    summary: "Spring enterprise container, dependency injection, and transactional proxies.",
    detailedContent: {
      introduction: "Spring Boot simplifies enterprise Java applications through Dependency Injection and AOP transaction proxies.",
      subsections: [
        {
          heading: "1. @Transactional AOP Proxy Mechanics",
          content: "Spring wraps transactional beans in dynamic proxies. Self-invocation bypasses proxy advice."
        }
      ]
    }
  },
  {
    id: "senior-interview-question-bank",
    number: "21",
    category: "7. Modern Java & Interview Bank",
    title: "21. Comprehensive Senior Java Interview Probing Bank",
    subtitle: "Multi-Step Probing Trees for Core Java, Collections, Concurrency & Spring Architecture",
    summary: "Curated follow-up interview question trees for senior engineering rounds.",
    detailedContent: {
      introduction: "Curated interview question probing trees designed to test architectural depth.",
      subsections: [
        {
          heading: "1. HashMap Internals Probing Tree",
          content: "Q1: How does HashMap store keys?\\nQ2: What happens on hash collision?\\nQ3: Why treeify at 8 nodes?"
        }
      ]
    }
  }
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'java', 'javaRevisionNotesData.js'), fileContent);
console.log("Updated javaRevisionNotesData.js successfully!");
