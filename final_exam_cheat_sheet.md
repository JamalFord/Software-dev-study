# CSC 3350 Final Exam — Handwritten Cheat Sheet Blueprint & Rule-by-Rule Visual Comparison Guide

> **IMPORTANT PROFESSOR RULE FOR CHEAT SHEET:**
> Your handwritten A4 paper cheat sheet **CANNOT HAVE ANY DIAGRAMS OR GRAPHS DRAWN ON IT**.
> To help you understand and memorize every rule for Section A & B exam questions, this document provides a **Rule-by-Rule Comparison Guide** mapping each handwritten text rule directly to its visual diagram representation.

---

## Quadrant 1: System Modeling & UML Rules (Side 1, Top-Left)

### 1. System Boundary
*   **Handwritten Text Rule:** `Boundary: Vertical rectangle. System Name placed at top-left inside rectangle.`
*   **Visual Comparison:**
```
+------------------------------------------+
| SmartHome System                         |
|                                          |
|         ( Use Case Oval )                |
|                                          |
+------------------------------------------+
```
*   **Exam Pitfall:** Do NOT place actors inside the system boundary. Actors are always outside.

---

### 2. Actor
*   **Handwritten Text Rule:** `Actor: Stick figure OUTSIDE boundary. Represents a role (Human, External DB, Weather API).`
*   **Visual Comparison:**
```
     o      [ System Boundary ]
    /|\  ---  ( Use Case )
    / \
 User / Resident
```
*   **Exam Pitfall:** Actors represent roles, not specific people's names.

---

### 3. <<include>> Relationship (Mandatory)
*   **Handwritten Text Rule:** `[Base Case] --<<include>>--> [Included Case]`
    `Dashed arrow points TO mandatory included case. Every time Base runs, Included MUST run.`
*   **Visual Comparison:**
```
( Schedule Lights ) --<<include>>--> ( Verify Auth )
```
*   **Exam Pitfall:** The arrow head points TO the included case (Verify Auth).

---

### 4. <<extend>> Relationship (Optional / Conditional)
*   **Handwritten Text Rule:** `[Optional Case] --<<extend>>--> [Base Case]`
    `Dashed arrow points FROM optional case BACK TO base case.`
*   **Visual Comparison:**
```
( Send SMS Alert ) --<<extend>>--> ( Schedule Lights )
```
*   **Exam Pitfall:** Arrow points BACK TO base case.

---

### 5. Class Generalization (Inheritance / extends)
*   **Handwritten Text Rule:** `Format: ChildClass --|> ParentClass`
    `Solid line with HOLLOW TRIANGLE pointing to parent class.`
*   **Visual Comparison:**
```
+--------------+
|    Animal    |  <-- Parent
+--------------+
       ^
       |  (Solid line + Hollow Triangle)
+--------------+
|     Dog      |  <-- Child
+--------------+
```

---

### 6. Class Realization (Interface / implements)
*   **Handwritten Text Rule:** `Format: Class ..|> Interface`
    `Dashed line with HOLLOW TRIANGLE pointing to interface.`
*   **Visual Comparison:**
```
+------------------+
| <<interface>>    |
| IPayable         |
+------------------+
         ^
         :  (Dashed line + Hollow Triangle)
+------------------+
| PayPalProcessor  |
+------------------+
```

---

### 7. Aggregation vs Composition
*   **Handwritten Text Rule:**
    *   `Aggregation: Solid line + HOLLOW DIAMOND on parent side. Independent lifecycle (Doctor <>-- Project).`
    *   `Composition: Solid line + FILLED BLACK DIAMOND on parent side. Dependent lifecycle (Department <filled-diamond>-- LabTest).`
*   **Visual Comparison:**
```
Aggregation (Shared):   Doctor  <>-----------------  ResearchProject
Composition (Part-of): Department <filled-diamond>-  LabTest
```

---

### 8. Sequence Diagram Lifelines & Frames
*   **Handwritten Text Rule:**
    *   `Lifeline: Dashed vertical line under class box.`
    *   `Activation Bar: Narrow vertical rectangle showing method execution.`
    *   `alt [condition] Frame: Rectangle divided horizontally by dashed line (Top = true, Bottom = else).`
*   **Visual Comparison:**
```
:User           :MoviePlayer
  |                 |
  |---play(id)----->| [Activation Bar]
  |<--return--------| 
  |                 |
+------------------------------------+
| alt [valid]                        |
|   |---display()-->|                |
| - - - - - - - - - - - - - - - - - -|
|   |---showError()->|               |
+------------------------------------+
```

---

### 9. Activity Diagram Decision Node
*   **Handwritten Text Rule:** `Decision = Diamond node with guarded branches [Yes] and [No]. Initial = Solid circle. Final = Bullseye.`
*   **Visual Comparison:**
```
    (●) Initial Node
     |
     v
  [ Read Temp ]
     |
     v
   /   \  <-- Decision Diamond
  /     \
[Yes]   [No]
  |       |
  v       v
[AC On]  [Standby]
  \       /
   v     v
    (◎) Final Node (Bullseye)
```

---

### 10. Entity Relationship (ER) Diagram
*   **Handwritten Text Rule:** `Primary Key (PK) underlined. Foreign Key (FK) marked. 1:N cardinality line connecting entities.`
*   **Visual Comparison:**
```
+-----------------------+                    +-----------------------+
|      DEPARTMENTS      | 1                N |       EMPLOYEES       |
+-----------------------+--------------------+-----------------------+
| <u>DepartmentID (PK)</u>|                    | <u>EmployeeID (PK)</u>    |
| DepartmentName        |                    | FirstName             |
+-----------------------+                    | DepartmentID (FK)     |
                                             +-----------------------+
```

---

## Quadrant 2: SQL Queries Cheat Code (Side 1, Bottom-Right)

### Key SQL Templates to Write on Sheet:
```sql
-- 1. Standard Query Order:
SELECT [DISTINCT] col1, col2, col3 * 1.10 AS "New Salary"
FROM Table1 t1
LEFT JOIN Table2 t2 ON t1.id = t2.t1_id
WHERE condition
GROUP BY col1
HAVING aggregate_condition
ORDER BY col1 ASC;

-- 2. Find Unassigned Records (LEFT JOIN NULL check):
SELECT c.FirstName, c.LastName
FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderID IS NULL;

-- 3. Self-JOIN (Employees reporting to Manager Smith):
SELECT e.FirstName AS Employee, m.FirstName AS Manager
FROM Employees e INNER JOIN Employees m ON e.ManagerID = m.EmployeeID
WHERE m.LastName = 'Smith';
```

---

## Quadrant 3: Design Patterns Code (Side 2, Top-Left)

### 1. Singleton Code:
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

### 2. Observer Pattern Code:
```java
interface Observer { void update(String msg); }
class CourseSubject {
  private List<Observer> _observers = new ArrayList<>();
  public void notify(String msg) {
    for (Observer o : _observers) o.update(msg);
  }
}
```

### 3. Strategy Pattern Code:
```java
interface IShippingStrategy { double calculate(Order o); }
class USAShipping implements IShippingStrategy { public double calculate(Order o) { return 10.0; } }
class CanadaShipping implements IShippingStrategy { public double calculate(Order o) { return 25.0; } }
```

---

## Quadrant 4: TDD & Testing Rules (Side 2, Bottom-Right)

1. **TDD Cycle:** Red (Failing test) $\rightarrow$ Green (Minimal pass code) $\rightarrow$ Refactor (Clean code).
2. **Boundary Value Analysis (BVA):**
   *   For range $[58000, 105000]$, test 6 values:
   *   `57999` (Invalid), `58000` (Min), `58001` (Valid), `104999` (Valid), `105000` (Max), `105001` (Invalid).
3. **Java NullPointer Fix:**
   *   Bad: `if (input.equals("ADMIN"))`
   *   Good: `if ("ADMIN".equals(input))`
