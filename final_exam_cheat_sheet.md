# CSC 3350 Software Development — Final Exam "No-Diagram" Cheat Sheet Guide

This study reference is tailored specifically for your **Final Exam on Tuesday, July 28, 2026**. 

> [!CAUTION]
> **CRITICAL PROFESSOR RULE:** Your handwritten A4 cheat sheet **CANNOT HAVE ANY DIAGRAMS OR GRAPHS** drawn on it! If you sketch diagrams, your cheat sheet will be confiscated. This guide translates all UML rules, arrow directions, and class structures into **100% textual notation, pseudo-code, and SQL query templates**.

---

## 🗺️ Physical Sheet Layout (No-Diagram Blueprint)

Divide your physical A4 sheet into 4 distinct text blocks using a **0.3mm fine-point pen** (use **Blue** for code/SQL, **Red** for keywords, and **Black** for explanations):

```text
+---------------------------------------+   +---------------------------------------+
| FRONT: UML TEXT RULES & SQL SYNTAX    |   | BACK: DESIGN PATTERNS & TDD / DEBUG   |
|                                       |   |                                       |
|  QUADRANT 1:                          |   |  QUADRANT 3:                          |
|  System Modeling & UML Text Rules     |   |  Design Patterns & Exam Scenarios     |
|  - Use Case Boundary, include/extend  |   |  - Singleton, Factory Method          |
|  - Class Visibility (+/-), Rel. Text  |   |  - Adapter, Decorator, Observer       |
|  - Sequence Lifeline, Alt/Loop Frames |   |  - Strategy & Refactoring Solutions   |
|                                       |   |                                       |
|  QUADRANT 2:                          |   |  QUADRANT 4:                          |
|  SQL Queries & Master Templates       |   |  TDD, Unit Testing & Debugging        |
|  - SELECT, WHERE, LIKE, BETWEEN, IN   |   |  - Red-Green-Refactor Cycle           |
|  - GROUP BY, HAVING, Aggregate Funcs  |   |  - Unit Test Case Table Format        |
|  - INNER JOIN, LEFT JOIN, Self-JOIN   |   |  - Boundary Value Analysis (BVA)      |
|  - NULL handling & Subqueries         |   |  - Java NPE Fixes & Stream Clean Code |
+---------------------------------------+   +---------------------------------------+
```

---

## 📝 QUADRANT 1: System Modeling & UML Text Rules (No Diagrams!)

### 1. Use Case Diagram Rules
*   **System Boundary:** Draw as a vertical rectangle. System Name placed at the top-left corner inside the box.
*   **Actors:** Stick figures placed **OUTSIDE** the boundary. Represent roles (Human User, Database, External System).
*   **Use Cases:** Ovals **INSIDE** the boundary. Named with a Verb-Noun phrase (e.g., `EnrollDevice`, `ScheduleAppointment`).
*   **Relationship Text Syntax:**
    *   **Solid Line:** Association between Actor and Use Case showing interaction.
    *   `<<include>>` (Mandatory): Dashed arrow pointing **TO** the included use case.
        $$\text{Base Use Case} \quad \text{--<<include>>-->} \quad \text{Included Use Case}$$
    *   `<<extend>>` (Optional/Conditional): Dashed arrow pointing **FROM** the optional case **BACK to** the base use case.
        $$\text{Extended Use Case} \quad \text{--<<extend>>-->} \quad \text{Base Use Case}$$

### 2. Class Diagram Rules & Relationship Text
*   **3 Compartments:** Top = Class Name, Middle = Attributes, Bottom = Operations/Methods.
*   **Visibility Indicators:** `+` (Public), `-` (Private), `#` (Protected).
*   **Multiplicities:** `1..1` (Exactly 1), `0..*` (Zero or more), `1..*` (One or more), `*` (Many).
*   **Class Relationship Text Rules:**
    *   **Generalization (Inheritance):** Solid line with HOLLOW TRIANGLE pointing to parent class. (`ChildClass --|> ParentClass`).
    *   **Realization (Interface):** Dashed line with HOLLOW TRIANGLE pointing to interface. (`Class ..|> Interface`).
    *   **Aggregation (Has-a, Independent Lifecycle):** Solid line with HOLLOW DIAMOND on parent side. (e.g., `Doctor <>-- ResearchProject`; Doctor exists even if project is deleted).
    *   **Composition (Part-of, Strong Ownership):** Solid line with FILLED BLACK DIAMOND on parent side. (e.g., `Department <filled-diamond>-- LabTest`; LabTest deleted if Department is deleted).

### 3. Sequence Diagram Rules
*   **Lifeline:** Dashed vertical line below class rectangle.
*   **Activation Bar:** Narrow vertical rectangle over lifeline representing active method execution.
*   **Call Types:** Synchronous (`->` filled arrow), Asynchronous (`->` open arrow), Return/Reply (`-->` dashed arrow).
*   **Frame Logic:**
    *   `alt [condition]`: Represents **IF-ELSE / SWITCH**. Frame divided by a dashed horizontal line. Top = `[true]`, Bottom = `[else]`.
    *   `loop [condition]`: Represents **WHILE / FOR** iterations (e.g., `loop [for each device]`).

---

## 💾 QUADRANT 2: SQL Queries & Exam Query Templates

### 1. SQL Query Structure Template
```sql
SELECT [DISTINCT] col1, col2, col3 * 1.10 AS "New Salary"
FROM Table1 t1
[INNER | LEFT] JOIN Table2 t2 ON t1.id = t2.t1_id
WHERE condition
GROUP BY col1, col2
HAVING aggregate_condition
ORDER BY col1 [ASC | DESC];
```

### 2. Filtering & String Matching Rules
*   `LIKE '%son'` $\rightarrow$ Ends with "son" (e.g., Harrison, Jackson).
*   `LIKE 'A%'` $\rightarrow$ Starts with "A" (e.g., Alice).
*   `LIKE '%e%'` $\rightarrow$ Contains "e" anywhere (case-insensitive).
*   `LIKE '_____'` $\rightarrow$ Exactly 5 characters long (5 underscores).
*   `BETWEEN 30000 AND 60000` $\rightarrow$ Inclusive numerical range.
*   `IN (102, 105, 108)` $\rightarrow$ Matches any ID in list.

### 3. NULL Handling & Aggregates
*   `WHERE ManagerID IS NULL` $\rightarrow$ Finds employees without a manager.
*   `COUNT(*)`, `SUM(Salary)`, `AVG(Salary)`, `MAX(Salary)`, `MIN(Salary)`.
*   **Group By Rule:** Any non-aggregated column in the `SELECT` clause **MUST** be listed in the `GROUP BY` clause!
*   **HAVING vs WHERE:** `WHERE` filters rows *before* grouping; `HAVING` filters aggregate groups *after* `GROUP BY`.

### 4. Master JOIN Templates (Crucial for Section B)
*   **LEFT JOIN (Find Missing/Unassigned Items):**
    ```sql
    -- Customers who NEVER placed an order
    SELECT c.FirstName, c.LastName, c.City
    FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
    WHERE o.OrderID IS NULL;
    ```
*   **SELF-JOIN (Employees Reporting to Manager 'Smith'):**
    ```sql
    SELECT e.FirstName + ' ' + e.LastName AS Employee, m.FirstName + ' ' + m.LastName AS Manager
    FROM Employees e INNER JOIN Employees m ON e.ManagerID = m.EmployeeID
    WHERE m.LastName = 'Smith';
    ```
*   **EMPLOYEES EARNING MORE THAN THEIR DIRECT MANAGER:**
    ```sql
    SELECT e.FirstName, e.Salary, m.FirstName AS MgrName, m.Salary AS MgrSalary
    FROM Employees e INNER JOIN Employees m ON e.ManagerID = m.EmployeeID
    WHERE e.Salary > m.Salary;
    ```

---

## 🛠️ QUADRANT 3: Design Patterns & Exam Scenario Solutions

The 4 Pattern Elements: **Name, Problem, Solution, Consequences.**

### 1. Singleton (Creational)
*   **Intent:** Ensure a class has only ONE instance and provide a global point of access.
*   **Code:**
    ```java
    public class DBConnection {
        private static DBConnection _instance;
        private DBConnection() {} // Private Constructor!
        public static synchronized DBConnection getInstance() {
            if (_instance == null) _instance = new DBConnection();
            return _instance;
        }
    }
    ```

### 2. Adapter (Structural)
*   **Intent:** Convert interface of a class into another interface clients expect (Wrapper for legacy code).
*   **Exam Scenario:** HR application needs to talk to old legacy payroll software without modifying legacy code.
*   **Code:**
    ```java
    public class PayrollAdapter implements INewHRSystem {
        private LegacyPayroll _legacy; // Reference to old class
        public PayrollAdapter(LegacyPayroll legacy) { this._legacy = legacy; }
        public void processPay() { _legacy.oldPayMethod(); } // Delegate
    }
    ```

### 3. Decorator (Structural)
*   **Intent:** Attach additional responsibilities to an object dynamically at runtime without altering the class (e.g. scrollbars to text box, coffee toppings).

### 4. Observer (Behavioral)
*   **Intent:** Publish/Subscribe model. When one object changes state, all subscribers are notified automatically.
*   **Exam Scenario:** University registration system sends Email, SMS, and Slack notifications when a course is cancelled.
*   **Why Strategy is WRONG here:** Strategy swaps 1 algorithm at a time; Observer broadcasts to MULTIPLE unknown subscribers.
*   **Code:**
    ```java
    interface Observer { void update(String msg); }
    class CourseSubject {
        private List<Observer> _observers = new ArrayList<>();
        public void attach(Observer o) { _observers.add(o); }
        public void notify(String msg) {
            for (Observer o : _observers) o.update(msg);
        }
    }
    ```

### 5. Strategy (Behavioral)
*   **Intent:** Encapsulate a family of interchangeable algorithms and select the best fit at runtime.
*   **Exam Scenario:** Shipping calculator with `if (country == "USA") ... else if ("Canada")` ladder.
*   **Code:**
    ```java
    interface IShippingStrategy { double calculate(Order o); }
    class USAShipping implements IShippingStrategy { public double calculate(Order o) { return 5.0; } }
    class OrderService {
        private IShippingStrategy _strategy;
        public OrderService(IShippingStrategy s) { this._strategy = s; }
    }
    ```

---

## 🧪 QUADRANT 4: TDD, Unit Testing & Debugging Rules

### 1. Test-Driven Development (TDD) Cycle
*   **Red:** Write a failing unit test first.
*   **Green:** Write MINIMAL code required to pass the test as fast as possible.
*   **Refactor:** Clean up code structure while keeping tests green.

### 2. Unit Test Case Format (Section B Written Question)
```text
Test Case ID: TC_LOGIN_001
Test Scenario: Valid User Login
Pre-Condition: User with valid credentials exists in DB; on login page.
Inputs: Username="testuser", Password="validPass123"
Test Steps: 
  1. Enter "testuser" in username field.
  2. Enter "validPass123" in password field.
  3. Click "Login" button.
Expected Output (Oracle): User redirected to Dashboard; session token created.
Actual Output: User redirected to Dashboard.
Status: PASS
Post-Condition / Teardown: Session token saved; user logged out.
```

### 3. Boundary Value Analysis (BVA) Formula
For valid numerical range `[MIN, MAX]`, test 6 values:
$$\text{(MIN - 1), MIN, (MIN + 1), (MAX - 1), MAX, (MAX + 1)}$$
*   *Example for Salary Range `[58000, 105000]`:*
    *   **57999** (Invalid - Just below Min)
    *   **58000** (Valid - Exact Min Boundary)
    *   **58001** (Valid - Just above Min)
    *   **104999** (Valid - Just below Max)
    *   **105000** (Valid - Exact Max Boundary)
    *   **105001** (Invalid - Just above Max)

### 4. Java Debugging & Clean Code Checklist
1.  **NullPointer Prevention:** Always place constant literals on the left side of comparisons!
    *   *Bad:* `if (input.equals("ADMIN"))` $\rightarrow$ Crash if input is `null`!
    *   *Good:* `if ("ADMIN".equalsIgnoreCase(input))` $\rightarrow$ Safe against `null`!
2.  **Resource Leaks:** Always close DB connections, Sockets, and File Streams inside a `finally` block or use try-with-resources:
    ```java
    try (Scanner sc = new Scanner(new File("data.txt"))) {
        // Automatically closed upon block exit
    }
    ```
3.  **Collection Returns:** Return an empty collection (`new ArrayList<>()`) instead of `null` to avoid NPE in caller loops.
4.  **Cohesion & Refactoring:** Methods must do 1 job and be 1 to 25 lines of code. If >25 lines, refactor into separate methods.

---

## 🌐 How to Use Your Final Exam Study WebApp

We have deployed an interactive web application designed specifically for cramming:

1.  Open your browser to **[http://localhost:8080](http://localhost:8080)** or open [index.html](file:///c:/Users/jamal/Documents/final-exam-cheatsheet-webapp/index.html).
2.  Features available:
    *   **A4 Text-Only Planner:** Inspect each quadrant and copy text blocks directly to write on your physical paper.
    *   **SQL Queries Masterclass:** Complete interactive query list for Schemas 1, 2, and 3.
    *   **Design Patterns Scenario Solver:** Interactive problem-solution cards for exam scenarios (MoviePlayer, Shipping, Registration).
    *   **BVA Calculator:** Enter any range to instantly generate the 6 boundary test values.
    *   **Practice Exam Simulator:** Section A & B practice questions with immediate grading and explanations.

*Good luck on your Final Exam on Tuesday, July 28th at 2:00 PM! You've got this!*
