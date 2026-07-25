document.addEventListener('DOMContentLoaded', () => {
  // Navigation & View Panels Logic
  const navLinks = document.querySelectorAll('.nav-link');
  const viewPanels = document.querySelectorAll('.view-panel');
  const pageTitle = document.querySelector('.page-title');
  const pageSubtitle = document.querySelector('.page-subtitle');

  const metaData = {
    overview: {
      title: "CSC 3350 Final Exam Study Hub",
      desc: "Comprehensive cramming hub for SQL, Design Patterns, TDD/Testing, UML (Textual Rules), and Java Debugging. Exam on Tuesday, July 28, 2026."
    },
    diagrams: {
      title: "Diagrams Visual Gallery & Memorizer",
      desc: "Interactive visual reference for Use Case, Class, Sequence, Activity, Context, ERD, and Design Pattern diagrams to memorize for Section A & B questions!"
    },
    planner: {
      title: "Text-Only Cheat Sheet Blueprint (A4)",
      desc: "STRICT NO-DIAGRAM BLUEPRINT. Formatted as clean text, SQL query templates, Java code blocks, and notation rules for your handwritten sheet."
    },
    sql: {
      title: "SQL Query Masterclass Workbench",
      desc: "Complete reference for Schemas 1 (HR), 2 (Retail), and 3 (Org Structure). Practice queries, JOINs, Grouping, and NULL handling."
    },
    patterns: {
      title: "Design Patterns Real Scenario Solutions",
      desc: "Master the 6 core patterns (Singleton, Factory, Adapter, Decorator, Observer, Strategy) with exact exam scenario answers."
    },
    testing: {
      title: "TDD & Unit Testing Laboratory",
      desc: "Red-Green-Refactor cycle, Test Case format generator, and Boundary Value Analysis (BVA) calculator for minimum test cases."
    },
    sim: {
      title: "Final Exam Practice Simulator",
      desc: "Simulate Section A (MCQs & Short Answer) and Section B (SQL, Coding, Test Cases) with instant grading and explanations."
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');

      navLinks.forEach(l => l.classList.remove('active'));
      viewPanels.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const panel = document.getElementById(`${target}-panel`);
      if (panel) panel.classList.add('active');

      if (metaData[target]) {
        pageTitle.textContent = metaData[target].title;
        pageSubtitle.textContent = metaData[target].desc;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Exam Timer (July 28, 2026 @ 2:00 PM)
  const timerDigits = document.getElementById('exam-countdown');
  const targetTime = new Date("July 28, 2026 14:00:00").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      timerDigits.textContent = "EXAM IN PROGRESS / PASSED";
      timerDigits.style.color = "var(--color-success)";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const p = (n) => String(n).padStart(2, '0');
    if (days > 0) {
      timerDigits.textContent = `${days}d ${p(hours)}h : ${p(mins)}m`;
    } else {
      timerDigits.textContent = `${p(hours)}h : ${p(mins)}m : ${p(secs)}s`;
    }
  }
  updateTimer();
  setInterval(updateTimer, 1000);

  // DIAGRAMS VISUAL GALLERY LOGIC & SVG RENDERER
  const diagTabBtns = document.querySelectorAll('.diag-tab-btn');
  const svgRenderArea = document.getElementById('svg-render-area');
  const diagTitle = document.getElementById('diag-title');
  const diagDesc = document.getElementById('diag-desc');
  const diagTips = document.getElementById('diag-tips');

  const diagramData = {
    usecase: {
      title: "1. Use Case Diagram Visual",
      desc: "Shows actors interacting with system functions. Includes system boundary, actors, use cases, <<include>> (mandatory) and <<extend>> (optional) relationships.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• <strong>Actor:</strong> Stick figure OUTSIDE boundary.<br>
• <strong>Include Arrow:</strong> Points TO the mandatory case (Base --<<include>>--> Included).<br>
• <strong>Extend Arrow:</strong> Points FROM optional BACK TO base (Optional --<<extend>>--> Base).`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  <!-- System Boundary -->
  <rect x="130" y="20" width="280" height="280" fill="#ffffff" stroke="#334155" stroke-width="2" rx="6"/>
  <text x="140" y="42" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">Smart Home Automation System</text>
  
  <!-- Actor -->
  <circle cx="60" cy="110" r="14" fill="none" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="124" x2="60" y2="170" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="140" x2="35" y2="155" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="140" x2="85" y2="155" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="170" x2="40" y2="205" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="170" x2="80" y2="205" stroke="#2563eb" stroke-width="2"/>
  <text x="60" y="225" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1e293b">User / Resident</text>

  <!-- Use Cases (Ovals) -->
  <ellipse cx="230" cy="100" rx="65" ry="25" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="230" y="104" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af">Schedule Lights</text>

  <ellipse cx="230" cy="210" rx="65" ry="25" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="230" y="214" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e40af">Adjust Thermostat</text>

  <ellipse cx="345" cy="155" rx="50" ry="22" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="345" y="159" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#92400e">Verify Auth & Session</text>

  <!-- Lines -->
  <line x1="85" y1="140" x2="165" y2="100" stroke="#475569" stroke-width="1.5"/>
  <line x1="85" y1="140" x2="165" y2="210" stroke="#475569" stroke-width="1.5"/>

  <!-- Include Arrows -->
  <path d="M 295 100 L 340 133" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>
  <polygon points="340,133 330,128 333,137" fill="#dc2626"/>
  <text x="320" y="105" font-family="sans-serif" font-size="9" fill="#dc2626" font-weight="bold">&lt;&lt;include&gt;&gt;</text>
</svg>`
    },
    classrel: {
      title: "2. Class Diagram Relationships Visual",
      desc: "UML Class box with 3 compartments (Name, Attributes, Operations) and relationship symbols: Generalization, Realization, Aggregation, Composition.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• <strong>Generalization (extends):</strong> Solid line + HOLLOW TRIANGLE pointing to parent.<br>
• <strong>Realization (implements):</strong> Dashed line + HOLLOW TRIANGLE pointing to interface.<br>
• <strong>Aggregation (has-a):</strong> Solid line + HOLLOW DIAMOND on parent side.<br>
• <strong>Composition (part-of):</strong> Solid line + FILLED BLACK DIAMOND on parent side.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Class 1: Parent -->
  <rect x="175" y="15" width="100" height="70" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <line x1="175" y1="38" x2="275" y2="38" stroke="#0f172a" stroke-width="1"/>
  <line x1="175" y1="58" x2="275" y2="58" stroke="#0f172a" stroke-width="1"/>
  <text x="225" y="30" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Animal</text>
  <text x="180" y="50" font-family="sans-serif" font-size="9">- age: int</text>
  <text x="180" y="70" font-family="sans-serif" font-size="9">+ makeSound()</text>

  <!-- Class 2: Child (Generalization) -->
  <rect x="40" y="130" width="100" height="70" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <line x1="40" y1="153" x2="140" y2="153" stroke="#0f172a" stroke-width="1"/>
  <line x1="40" y1="173" x2="140" y2="173" stroke="#0f172a" stroke-width="1"/>
  <text x="90" y="145" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Dog</text>
  <text x="45" y="165" font-family="sans-serif" font-size="9">- breed: String</text>
  <text x="45" y="185" font-family="sans-serif" font-size="9">+ bark()</text>

  <!-- Generalization Arrow -->
  <path d="M 90 130 L 90 100 L 225 100 L 225 85" stroke="#2563eb" stroke-width="1.5" fill="none"/>
  <polygon points="225,85 218,97 232,97" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="125" y="94" font-family="sans-serif" font-size="9" fill="#2563eb" font-weight="bold">extends (Generalization)</text>

  <!-- Composition -->
  <rect x="310" y="130" width="115" height="70" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <text x="367" y="145" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Department</text>
  <line x1="310" y1="153" x2="425" y2="153" stroke="#0f172a" stroke-width="1"/>
  
  <rect x="310" y="240" width="115" height="60" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <text x="367" y="255" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">LabTest</text>
  
  <line x1="367" y1="200" x2="367" y2="240" stroke="#dc2626" stroke-width="1.5"/>
  <polygon points="367,200 361,208 367,216 373,208" fill="#dc2626" stroke="#dc2626"/>
  <text x="375" y="224" font-family="sans-serif" font-size="9" fill="#dc2626" font-weight="bold">Composition (Part-of)</text>
</svg>`
    },
    sequence: {
      title: "3. Sequence Diagram Visual",
      desc: "Shows dynamic interactions over time with lifelines, activation bars, sync/async messages, return arrows, and alt/loop frames.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• <strong>Lifeline:</strong> Dashed vertical line.<br>
• <strong>Sync Message:</strong> Solid line + FILLED arrowhead (->).<br>
• <strong>Return Message:</strong> Dashed line + OPEN arrowhead (-->).<br>
• <strong>alt Frame:</strong> IF-ELSE choice divided by horizontal dashed line.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Objects -->
  <rect x="40" y="20" width="80" height="30" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="4"/>
  <text x="80" y="40" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">:User</text>
  
  <rect x="185" y="20" width="90" height="30" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="4"/>
  <text x="230" y="40" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">:MoviePlayer</text>

  <rect x="330" y="20" width="90" height="30" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="4"/>
  <text x="375" y="40" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">:AuthService</text>

  <!-- Lifelines -->
  <line x1="80" y1="50" x2="80" y2="300" stroke="#94a3b8" stroke-dasharray="4,4"/>
  <line x1="230" y1="50" x2="230" y2="300" stroke="#94a3b8" stroke-dasharray="4,4"/>
  <line x1="375" y1="50" x2="375" y2="300" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <!-- Activation Bars -->
  <rect x="224" y="80" width="12" height="180" fill="#bfdbfe" stroke="#1d4ed8"/>
  <rect x="369" y="100" width="12" height="60" fill="#bfdbfe" stroke="#1d4ed8"/>

  <!-- Messages -->
  <path d="M 80 80 L 224 80" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="224,80 214,75 214,85" fill="#0f172a"/>
  <text x="145" y="74" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold">playMovie(id)</text>

  <path d="M 236 100 L 369 100" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="369,100 359,95 359,105" fill="#0f172a"/>
  <text x="300" y="94" text-anchor="middle" font-family="sans-serif" font-size="9">verifyUser()</text>

  <!-- Return Arrow -->
  <path d="M 369 150 L 236 150" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
  <polygon points="236,150 246,145 246,155" fill="none" stroke="#2563eb"/>
  <text x="300" y="144" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#2563eb">token OK</text>

  <!-- alt frame -->
  <rect x="160" y="180" width="260" height="90" fill="none" stroke="#d97706" stroke-width="1.5"/>
  <path d="M 160 180 L 200 180 L 210 195 L 160 195 Z" fill="#fef3c7" stroke="#d97706"/>
  <text x="178" y="191" font-family="sans-serif" font-size="9" font-weight="bold" fill="#92400e">alt [valid]</text>
  <line x1="160" y1="225" x2="420" y2="225" stroke="#d97706" stroke-dasharray="4,4"/>
  <text x="170" y="240" font-family="sans-serif" font-size="8" fill="#92400e">[else]</text>
</svg>`
    },
    activity: {
      title: "4. Activity Diagram Visual",
      desc: "Flowchart style depicting step-by-step workflow with initial node, actions, decision diamonds, parallel forks/joins, and final node.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• <strong>Initial Node:</strong> Solid black circle.<br>
• <strong>Action:</strong> Rounded rectangle.<br>
• <strong>Decision Node:</strong> Diamond with branches labeled [yes]/[no].<br>
• <strong>Final Node:</strong> Bullseye circle.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Start -->
  <circle cx="225" cy="30" r="12" fill="#0f172a"/>
  <line x1="225" y1="42" x2="225" y2="70" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="225,70 220,60 230,60" fill="#0f172a"/>

  <!-- Action 1 -->
  <rect x="160" y="70" width="130" height="35" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="225" y="92" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e40af">Read Temperature</text>

  <line x1="225" y1="105" x2="225" y2="135" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="225,135 220,125 230,125" fill="#0f172a"/>

  <!-- Decision -->
  <polygon points="225,135 260,165 225,195 190,165" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="225" y="168" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#92400e">Temp > 72?</text>

  <!-- Branch Yes -->
  <path d="M 260 165 L 340 165 L 340 210" stroke="#0f172a" stroke-width="1.5" fill="none"/>
  <polygon points="340,210 335,200 345,200" fill="#0f172a"/>
  <text x="280" y="158" font-family="sans-serif" font-size="9" font-weight="bold" fill="#166534">[Yes]</text>

  <!-- Action Yes -->
  <rect x="280" y="210" width="120" height="35" rx="10" fill="#dcfce7" stroke="#166534" stroke-width="1.5"/>
  <text x="340" y="232" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#166534">Turn On AC</text>

  <!-- Branch No -->
  <path d="M 190 165 L 110 165 L 110 210" stroke="#0f172a" stroke-width="1.5" fill="none"/>
  <polygon points="110,210 105,200 115,200" fill="#0f172a"/>
  <text x="140" y="158" font-family="sans-serif" font-size="9" font-weight="bold" fill="#991b1b">[No]</text>

  <!-- Action No -->
  <rect x="50" y="210" width="120" height="35" rx="10" fill="#fee2e2" stroke="#991b1b" stroke-width="1.5"/>
  <text x="110" y="232" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#991b1b">Standby Mode</text>

  <!-- Final Node -->
  <circle cx="225" cy="285" r="12" fill="none" stroke="#0f172a" stroke-width="2"/>
  <circle cx="225" cy="285" r="7" fill="#0f172a"/>
</svg>`
    },
    context: {
      title: "5. System Context Diagram Visual",
      desc: "High-level architectural view showing central system box connected to external actors, databases, and third-party web services.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Central system in center.<br>
• External actors and databases connected via labeled bidirectional arrows.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Central System -->
  <rect x="150" y="110" width="150" height="90" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2" rx="8"/>
  <text x="225" y="150" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">SmartHome Core</text>
  <text x="225" y="170" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#bfdbfe">&lt;&lt;system&gt;&gt;</text>

  <!-- External System 1 -->
  <rect x="20" y="30" width="110" height="50" fill="#ffffff" stroke="#475569" stroke-width="1.5" rx="4"/>
  <text x="75" y="60" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Weather API</text>

  <!-- External System 2 -->
  <rect x="320" y="30" width="110" height="50" fill="#ffffff" stroke="#475569" stroke-width="1.5" rx="4"/>
  <text x="375" y="60" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">User Mobile App</text>

  <!-- External System 3 -->
  <rect x="170" y="240" width="110" height="50" fill="#ffffff" stroke="#475569" stroke-width="1.5" rx="4"/>
  <text x="225" y="270" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Database DB</text>

  <!-- Arrows -->
  <line x1="130" y1="65" x2="175" y2="110" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="320" y1="65" x2="275" y2="110" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="225" y1="200" x2="225" y2="240" stroke="#0f172a" stroke-width="1.5"/>
</svg>`
    },
    er: {
      title: "6. ER Diagram (Entity Relationship Visual)",
      desc: "Database schema entities with attributes, Primary Keys (PK underlined), Foreign Keys (FK), and Cardinalities (1:1, 1:N).",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• <strong>Entity:</strong> Rectangle.<br>
• <strong>Primary Key:</strong> Underlined attribute.<br>
• <strong>Cardinality:</strong> 1:N (One Department has Many Employees).`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Entity 1: Employees -->
  <rect x="30" y="80" width="140" height="150" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <rect x="30" y="80" width="140" height="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="100" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Employees</text>
  <text x="40" y="125" font-family="sans-serif" font-size="10" font-weight="bold" text-decoration="underline">EmployeeID (PK)</text>
  <text x="40" y="145" font-family="sans-serif" font-size="10">FirstName</text>
  <text x="40" y="165" font-family="sans-serif" font-size="10">LastName</text>
  <text x="40" y="185" font-family="sans-serif" font-size="10">Salary</text>
  <text x="40" y="205" font-family="sans-serif" font-size="10" fill="#2563eb">DepartmentID (FK)</text>

  <!-- Relationship Line -->
  <line x1="170" y1="155" x2="280" y2="155" stroke="#2563eb" stroke-width="2"/>
  <text x="180" y="148" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">N</text>
  <text x="265" y="148" font-family="sans-serif" font-size="12" font-weight="bold" fill="#2563eb">1</text>

  <!-- Entity 2: Departments -->
  <rect x="280" y="80" width="140" height="110" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <rect x="280" y="80" width="140" height="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="350" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Departments</text>
  <text x="290" y="125" font-family="sans-serif" font-size="10" font-weight="bold" text-decoration="underline">DepartmentID (PK)</text>
  <text x="290" y="145" font-family="sans-serif" font-size="10">DepartmentName</text>
</svg>`
    },
    observer: {
      title: "7. Observer Pattern Visual Structure",
      desc: "Publish/Subscribe model. Subject interface maintains list of Observers and calls notifyObservers() -> update().",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Used for course cancellation alerts (Email, SMS, Slack).<br>
• Strategy is WRONG here because Strategy handles 1 algorithm, while Observer handles broadcasting to MULTIPLE subscribers.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Subject Interface -->
  <rect x="40" y="30" width="140" height="70" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="110" y="48" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#92400e">&lt;&lt;interface&gt;&gt;</text>
  <text x="110" y="65" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Subject</text>
  <line x1="40" y1="72" x2="180" y2="72" stroke="#d97706"/>
  <text x="45" y="88" font-family="sans-serif" font-size="8.5">+ attach(Observer)</text>

  <!-- Observer Interface -->
  <rect x="270" y="30" width="140" height="70" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="340" y="48" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#92400e">&lt;&lt;interface&gt;&gt;</text>
  <text x="340" y="65" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">Observer</text>
  <line x1="270" y1="72" x2="410" y2="72" stroke="#d97706"/>
  <text x="275" y="88" font-family="sans-serif" font-size="9">+ update(msg)</text>

  <!-- Association Arrow -->
  <path d="M 180 65 L 270 65" stroke="#2563eb" stroke-width="1.5"/>
  <polygon points="270,65 260,60 260,70" fill="#2563eb"/>
  <text x="225" y="58" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#2563eb">notifies 1..*</text>
</svg>`
    },
    strategy: {
      title: "8. Strategy Pattern Visual Structure",
      desc: "Context class references Strategy interface to swap algorithms (e.g. USAShipping, CanadaShipping) dynamically at runtime.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Replaces messy if-else country ladders.<br>
• Context class holds reference to IShippingStrategy.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Context -->
  <rect x="30" y="70" width="130" height="80" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="95" y="95" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">OrderContext</text>
  <line x1="30" y1="105" x2="160" y2="105" stroke="#2563eb"/>
  <text x="35" y="125" font-family="sans-serif" font-size="8.5">- strategy: IStrategy</text>
  <text x="35" y="140" font-family="sans-serif" font-size="8.5">+ calculatePay()</text>

  <!-- Strategy Interface -->
  <rect x="270" y="70" width="140" height="60" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="340" y="88" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#92400e">&lt;&lt;interface&gt;&gt;</text>
  <text x="340" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">IShippingStrategy</text>

  <line x1="160" y1="100" x2="270" y2="100" stroke="#2563eb" stroke-width="1.5"/>
  <polygon points="270,100 260,95 260,105" fill="#2563eb"/>
</svg>`
    },
    adapter: {
      title: "9. Adapter Pattern Visual Structure",
      desc: "Wrapper object translating requests from new client interface to legacy adaptee system.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Connects new HR System to old Legacy Payroll software without editing old code.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Client -->
  <rect x="30" y="90" width="100" height="60" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="80" y="125" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">NewHRApp</text>

  <!-- Adapter -->
  <rect x="175" y="90" width="110" height="60" fill="#dcfce7" stroke="#166534" stroke-width="1.5"/>
  <text x="230" y="125" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">PayrollAdapter</text>

  <!-- Adaptee -->
  <rect x="320" y="90" width="100" height="60" fill="#fee2e2" stroke="#991b1b" stroke-width="1.5"/>
  <text x="370" y="125" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold">LegacyPayroll</text>

  <line x1="130" y1="120" x2="175" y2="120" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="285" y1="120" x2="320" y2="120" stroke="#0f172a" stroke-width="1.5"/>
</svg>`
    },
    tddcycle: {
      title: "10. Test-Driven Development (TDD) Cycle Visual",
      desc: "Red-Green-Refactor continuous cycle.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• 1. Red: Write failing test.<br>
• 2. Green: Write minimal passing code.<br>
• 3. Refactor: Clean up code without breaking tests.`,
      svg: `<svg width="450" height="320" viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="320" fill="#f8fafc"/>
  
  <!-- Red Circle -->
  <circle cx="150" cy="110" r="45" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/>
  <text x="150" y="115" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c">RED</text>

  <!-- Green Circle -->
  <circle cx="300" cy="110" r="45" fill="#dcfce7" stroke="#10b981" stroke-width="3"/>
  <text x="300" y="115" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#15803d">GREEN</text>

  <!-- Refactor Circle -->
  <circle cx="225" cy="230" r="45" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
  <text x="225" y="235" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#b45309">REFACTOR</text>

  <!-- Arrows -->
  <path d="M 195 110 L 255 110" stroke="#0f172a" stroke-width="2"/>
  <polygon points="255,110 245,105 245,115" fill="#0f172a"/>

  <path d="M 285 150 L 255 195" stroke="#0f172a" stroke-width="2"/>
  <path d="M 195 195 L 165 150" stroke="#0f172a" stroke-width="2"/>
</svg>`
    }
  };

  function renderDiagram(diagKey) {
    const data = diagramData[diagKey];
    if (!data) return;

    diagTabBtns.forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.diag-tab-btn[data-diag="${diagKey}"]`);
    if (btn) btn.classList.add('active');

    diagTitle.textContent = data.title;
    diagDesc.textContent = data.desc;
    diagTips.innerHTML = data.tips;
    svgRenderArea.innerHTML = data.svg;
  }

  diagTabBtns.forEach(b => {
    b.addEventListener('click', () => {
      const k = b.getAttribute('data-diag');
      renderDiagram(k);
    });
  });

  // Render default diagram
  renderDiagram('usecase');

  // A4 NO-DIAGRAM CHEAT SHEET PLANNER LOGIC
  const a4Quadrants = document.querySelectorAll('.a4-quadrant');
  const copyTextArea = document.getElementById('copy-text-area');
  const detailTitle = document.getElementById('detail-title');
  const detailTag = document.getElementById('detail-tag');

  const quadData = {
    "quad-1": {
      title: "Side 1, Top: System Modeling & UML Rules (Textual)",
      tag: "UML Rules & Text Syntax",
      text: `=================================================
SECTION 1: SYSTEM MODELING & UML (TEXTUAL SYNTAX)
=================================================
NO DIAGRAMS ALLOWED ON CHEAT SHEET - WRITE THESE TEXT RULES:

1. USE CASE DIAGRAM RULES:
   - System Boundary: Vertical rectangle. System Name placed at top-left.
   - Actors: Stick figures OUTSIDE boundary. Represent roles (User, Database, External System).
   - Use Cases: Ovals INSIDE boundary. Named with verb-noun (e.g. EnrollDevice).
   - Relationships:
     * Solid Line: Association between Actor and Use Case.
     * <<include>>: MANDATORY sub-case. Dashed arrow points TO included use case.
       Format: [Base Use Case] --<<include>>--> [Included Use Case]
     * <<extend>>: OPTIONAL / conditional case. Dashed arrow points FROM optional case BACK to base.
       Format: [Extended Use Case] --<<extend>>--> [Base Use Case]

2. CLASS DIAGRAM RULES & MULTIPLICITIES:
   - Compartments: Top = Class Name, Middle = Attributes, Bottom = Operations/Methods.
   - Visibility: + (Public), - (Private), # (Protected).
   - Multiplicities: 1..1 (Exactly 1), 0..* (Zero or more), 1..* (One or more), * (Many).
   - Class Relationships:
     * Generalization (Inheritance): Solid line with HOLLOW TRIANGLE pointing to parent class.
       Format: ChildClass --|> ParentClass (e.g. Dog extends Animal).
     * Realization (Interface): Dashed line with HOLLOW TRIANGLE pointing to interface.
       Format: Class ..|> Interface (e.g. PayPalProcessor implements IPaymentProcessor).
     * Aggregation (Has-a): Solid line with HOLLOW DIAMOND on parent/aggregator side. Independent lifecycle.
       Format: Doctor <>-- ResearchProject (Doctor exists even if project deleted).
     * Composition (Part-of): Solid line with FILLED BLACK DIAMOND on parent side. Strong ownership.
       Format: Department <filled-diamond>-- LabTest (LabTest deleted if Department is deleted).

3. SEQUENCE DIAGRAM RULES:
   - Lifeline: Dashed vertical line extending below class box.
   - Activation Bar: Narrow vertical rectangle over lifeline showing active method execution.
   - Synchronous Call: Solid line with FILLED arrowhead (->). Sender blocks for response.
   - Asynchronous Call: Solid line with OPEN arrowhead (->). Sender continues without blocking.
   - Return / Reply: Dashed line with OPEN arrowhead (-->).
   - Frames:
     * alt [condition]: Used for IF-ELSE / SWITCH. Box divided by dashed horizontal line. Top = [true], Bottom = [else].
     * loop [condition]: Used for WHILE / FOR iterations (e.g. loop [for each device]).

4. ACTIVITY DIAGRAM RULES:
   - Initial Node: Filled solid circle. Final Node: Bullseye (circle in circle).
   - Action: Rounded rectangle. Decision: Diamond with guarded branches [yes]/[no].
   - Fork / Join: Thick black horizontal/vertical bar for parallel workflow.
   - Swimlanes: Columns separating actions by responsible actor/system (e.g. Sensor vs Pump).`
    },
    "quad-2": {
      title: "Side 1, Bottom: SQL Queries Cheat Code & Syntax",
      tag: "SQL Queries Masterclass",
      text: `=================================================
SECTION 2: SQL SYNTAX & EXAM QUERY TEMPLATES
=================================================
SQL COMMAND TYPES:
- DDL (Data Definition): CREATE, ALTER, DROP, TRUNCATE.
- DML (Data Manipulation): SELECT, INSERT, UPDATE, DELETE.

SELECT QUERY SYNTAX TEMPLATE:
  SELECT [DISTINCT] col1, col2, col3 * 1.10 AS "New Salary"
  FROM Table1 t1
  [INNER | LEFT] JOIN Table2 t2 ON t1.id = t2.t1_id
  WHERE condition
  GROUP BY col1
  HAVING aggregate_condition
  ORDER BY col1 [ASC | DESC];

EXAM OPERATORS & PATTERNS:
1. Wildcards (LIKE):
   - WHERE LastName LIKE '%son'    --> Ends with 'son'
   - WHERE FirstName LIKE 'A%'     --> Starts with 'A'
   - WHERE FirstName LIKE '%e%'    --> Contains 'e' (case-insensitive)
   - WHERE LastName LIKE '_____'   --> Exactly 5 characters long (4 underscores)
2. Range & List:
   - WHERE Salary BETWEEN 30000 AND 60000 (Inclusive range)
   - WHERE ManagerID IN (102, 105, 108)
3. NULL Handling (CRITICAL FOR SECTION B):
   - WHERE ManagerID IS NULL       --> Find records with no manager
   - WHERE ManagerID IS NOT NULL
4. Aggregates & Grouping:
   - COUNT(*), SUM(Salary), AVG(Salary), MAX(Salary), MIN(Salary)
   - Rule: Any non-aggregated column in SELECT *must* appear in GROUP BY!
   - HAVING is used to filter AFTER GROUP BY (e.g. HAVING AVG(Salary) > 65000).

CRITICAL JOIN TEMPLATES:
- INNER JOIN (only matching rows):
  SELECT e.FirstName, e.LastName, d.DepartmentName
  FROM Employees e INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID;

- LEFT JOIN (Find missing/unassigned items):
  SELECT c.FirstName, c.LastName
  FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
  WHERE o.OrderID IS NULL; -- Customers who NEVER placed an order!

- SELF-JOIN (Employees reporting to Manager Smith):
  SELECT e.FirstName + ' ' + e.LastName AS "Employee", m.FirstName + ' ' + m.LastName AS "Manager"
  FROM Employees e INNER JOIN Employees m ON e.ManagerID = m.EmployeeID
  WHERE m.LastName = 'Smith';

- EMPLOYEES EARNING MORE THAN THEIR MANAGER:
  SELECT e.FirstName, e.Salary, m.FirstName AS MgrName, m.Salary AS MgrSalary
  FROM Employees e INNER JOIN Employees m ON e.ManagerID = m.EmployeeID
  WHERE e.Salary > m.Salary;`
    },
    "quad-3": {
      title: "Side 2, Top: Design Patterns Code & Principles",
      tag: "Design Patterns",
      text: `=================================================
SECTION 3: DESIGN PATTERNS & CODE REFACTORING
=================================================
THE 4 PATTERN ELEMENTS: Name, Problem, Solution, Consequences.

1. SINGLETON (Creational):
   - Purpose: Ensure a class has ONLY ONE instance and provide a global point of access.
   - Code Template:
     public class DatabaseConnection {
       private static DatabaseConnection _instance;
       private DatabaseConnection() {} // Private Constructor!
       public static synchronized DatabaseConnection getInstance() {
         if (_instance == null) _instance = new DatabaseConnection();
         return _instance;
       }
     }

2. FACTORY METHOD (Creational):
   - Purpose: Define interface for creating an object, but let subclasses decide which class to instantiate.

3. ADAPTER (Structural):
   - Purpose: Allow incompatible interfaces to work together (Wrapper for legacy code).
   - Code Template:
     public class PayrollAdapter implements INewHRSystem {
       private LegacyPayroll _legacy; // Reference to old legacy system
       public PayrollAdapter(LegacyPayroll legacy) { this._legacy = legacy; }
       public void processPay() { _legacy.oldPayMethod(); } // Delegates
     }

4. DECORATOR (Structural):
   - Purpose: Attach additional responsibilities to an object dynamically at runtime without subclassing (e.g. scrollbars to text box, coffee toppings).

5. OBSERVER (Behavioral):
   - Purpose: One-to-many dependency so when one object changes state, all subscribers are notified automatically (Publish/Subscribe).
   - EXAM SCENARIO: Course cancellation email/SMS/Slack alerts.
   - Subject maintains List<Observer>. notifyObservers() loops and calls observer.update().
   - Why Strategy is WRONG here: Strategy swaps 1 algorithm at a time; Observer broadcasts to MULTIPLE unknown subscribers.

6. STRATEGY (Behavioral):
   - Purpose: Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.
   - EXAM SCENARIO: Shipping calculator with if(country=="USA") else if("Canada") ladder.
   - Refactor: Create IShippingStrategy interface with calculate(Order o). Classes USAShipping, CanadaShipping implement it.`
    },
    "quad-4": {
      title: "Side 2, Bottom: TDD, Testing & Debugging Rules",
      tag: "Testing & Debugging",
      text: `=================================================
SECTION 4: TDD, UNIT TESTING & DEBUGGING
=================================================
1. TEST-DRIVEN DEVELOPMENT (TDD) CYCLE:
   - Red: Write a failing unit test first.
   - Green: Write MINIMAL code required to pass the test as fast as possible.
   - Refactor: Clean up code & structure while keeping tests green.

2. UNIT TEST CASE DOCUMENTATION TEMPLATE (Section B Question):
   - Test Case ID: TC_LOGIN_001
   - Title/Scenario: Valid User Login
   - Pre-condition: User with valid credentials exists in DB, on login page.
   - Inputs: Username: "testuser", Password: "validPass123"
   - Test Steps: 1. Enter username. 2. Enter password. 3. Click Login button.
   - Expected Output (Oracle): User redirected to Dashboard, session token created.
   - Actual Output: User redirected to Dashboard.
   - Status: PASS / FAIL
   - Post-condition / Teardown: Session token saved, user logged out.

3. TEST CASE DESIGN TECHNIQUES:
   - Equivalence Partitioning (EP): Divide input domain into valid and invalid equivalence classes. Select 1 test case per partition.
   - Boundary Value Analysis (BVA): Test values directly on the boundaries of valid ranges!
     Rule for Range [MIN, MAX]: Test 6 values:
     (MIN - 1), MIN, (MIN + 1), (MAX - 1), MAX, (MAX + 1).
     Example for Salary Range [58000, 105000]:
     Test: 57999 (Invalid), 58000 (Valid), 58001 (Valid), 104999 (Valid), 105000 (Valid), 105001 (Invalid).

4. JAVA DEBUGGING & CLEAN CODE CHECKLIST:
   - NullPointer: Always check for null before invoking methods!
     Bad:  if (input.equals("ADMIN"))
     Good: if ("ADMIN".equalsIgnoreCase(input)) OR if (input != null && input.equalsIgnoreCase("ADMIN"))
   - Resource Leak: Always close Sockets, DB Connections, File Streams inside a finally block or try-with-resources!
     try (Scanner sc = new Scanner(file)) { ... } // Auto-closed!
   - Collections: Return an empty collection (new ArrayList<>()) instead of null to prevent NPEs in caller loops.
   - Exceptions: Never catch Exception silently. Log detailed diagnostic info and throw custom exception.`
    }
  };

  function selectQuadrant(quadId) {
    const data = quadData[quadId];
    if (!data) return;

    a4Quadrants.forEach(q => q.classList.remove('active'));
    const el = document.querySelector(`.a4-quadrant[data-id="${quadId}"]`);
    if (el) el.classList.add('active');

    detailTitle.textContent = data.title;
    detailTag.textContent = data.tag;
    copyTextArea.textContent = data.text;
  }

  a4Quadrants.forEach(q => {
    q.addEventListener('click', () => {
      const quadId = q.getAttribute('data-id');
      selectQuadrant(quadId);
    });
  });

  // Select Quad 1 by default
  selectQuadrant('quad-1');

  // Copy Cheat Sheet Button
  const copyBtn = document.getElementById('copy-cheat-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(copyTextArea.textContent);
      copyBtn.textContent = "Copied to Clipboard!";
      setTimeout(() => { copyBtn.textContent = "Copy Text to Handwritten Sheet"; }, 2000);
    });
  }

  // SQL WORKBENCH LOGIC
  const schemaBtns = document.querySelectorAll('.schema-btn');
  const sqlContentArea = document.getElementById('sql-content-area');

  const sqlData = {
    schema1: {
      name: "Schema 1 — HR: Employees & Departments",
      structure: `Tables:
• Employees (EmployeeID INT PK, FirstName VARCHAR, LastName VARCHAR, JobTitle VARCHAR, DepartmentID INT FK, Salary FLOAT, HireDate DATE, ManagerID INT FK)
• Departments (DepartmentID INT PK, DepartmentName VARCHAR, ManagerID INT)`,
      queries: [
        { q: "1. Return FirstName, LastName, and JobTitle of all employees.", code: "SELECT FirstName, LastName, JobTitle \nFROM Employees;" },
        { q: "2. Return LastName, Salary, and calculated column of Salary increased by 10%.", code: "SELECT LastName, Salary, Salary * 1.10 AS \"Increased Salary\" \nFROM Employees;" },
        { q: "3. Return FirstName, LastName, and Salary renamed explicitly as 'Annual Salary'.", code: "SELECT FirstName, LastName, Salary AS \"Annual Salary\" \nFROM Employees;" },
        { q: "4. Return employees who do NOT have an assigned manager (ManagerID is NULL).", code: "SELECT FirstName, LastName, ManagerID \nFROM Employees \nWHERE ManagerID IS NULL;" },
        { q: "5. Concatenate FirstName and LastName into 'Full Name' with EmployeeID and Salary.", code: "SELECT FirstName + ' ' + LastName AS \"Full Name\", EmployeeID, Salary \nFROM Employees;" },
        { q: "6. Find all employees whose Salary is greater than $75,000.", code: "SELECT FirstName, LastName, Salary \nFROM Employees \nWHERE Salary > 75000;" },
        { q: "7. Retrieve LastName and Salary where salary falls between 30,000 and 60,000 inclusive.", code: "SELECT LastName, Salary \nFROM Employees \nWHERE Salary BETWEEN 30000 AND 60000;" },
        { q: "8. Find employees whose ManagerID is 102, 105, or 108.", code: "SELECT FirstName, LastName, ManagerID \nFROM Employees \nWHERE ManagerID IN (102, 105, 108);" },
        { q: "9. Find employees whose last name ends with 'son'.", code: "SELECT LastName, Salary \nFROM Employees \nWHERE LastName LIKE '%son';" },
        { q: "10. Find employees whose first name starts with 'A'.", code: "SELECT FirstName, LastName \nFROM Employees \nWHERE FirstName LIKE 'A%';" },
        { q: "11. Find employees whose first name contains 'e' in any position.", code: "SELECT FirstName, Salary \nFROM Employees \nWHERE FirstName LIKE '%e%';" },
        { q: "12. Find employees whose last name is exactly 5 characters long.", code: "SELECT LastName, DepartmentID \nFROM Employees \nWHERE LastName LIKE '_____'; -- 5 underscores" },
        { q: "13. List employees hired after Jan 1, 2020 sorted chronologically ascending.", code: "SELECT FirstName, LastName, HireDate \nFROM Employees \nWHERE HireDate > '2020-01-01' \nORDER BY HireDate ASC;" },
        { q: "14. Total count of employees recorded in Employees table.", code: "SELECT COUNT(*) AS \"Total Employees\" \nFROM Employees;" },
        { q: "15. Total global payroll expenditure (SUM of all salaries).", code: "SELECT SUM(Salary) AS \"Total Payroll\" \nFROM Employees;" }
      ]
    },
    schema2: {
      name: "Schema 2 — Retail: Customers, Orders & Products",
      structure: `Tables:
• Customers (CustomerID INT PK, FirstName VARCHAR, LastName VARCHAR, City VARCHAR)
• Orders (OrderID INT PK, CustomerID INT FK, OrderDate DATE)
• Products (ProductID INT PK, ProductName VARCHAR, Price DECIMAL, InStock INT)`,
      queries: [
        { q: "1. List all records and columns from Customers.", code: "SELECT * FROM Customers;" },
        { q: "2. Show only FirstName and LastName of every customer.", code: "SELECT FirstName, LastName FROM Customers;" },
        { q: "3. Products costing strictly more than $50.", code: "SELECT * FROM Products WHERE Price > 50;" },
        { q: "4. Products out of stock (InStock is 0).", code: "SELECT * FROM Products WHERE InStock = 0;" },
        { q: "5. Customers living in Atlanta.", code: "SELECT * FROM Customers WHERE City = 'Atlanta';" },
        { q: "6. Orders placed on October 1, 2025.", code: "SELECT * FROM Orders WHERE OrderDate = '2025-10-01';" },
        { q: "7. Products containing 'Phone' in ProductName.", code: "SELECT * FROM Products WHERE ProductName LIKE '%Phone%';" },
        { q: "8. Customers whose last name contains 'doe'.", code: "SELECT * FROM Customers WHERE LastName LIKE '%doe%';" },
        { q: "9. Orders sorted by OrderDate descending (newest first).", code: "SELECT * FROM Orders ORDER BY OrderDate DESC;" },
        { q: "10. JOIN: List OrderID, OrderDate, and Customer's FirstName & LastName.", code: "SELECT o.OrderID, o.OrderDate, c.FirstName, c.LastName \nFROM Orders o INNER JOIN Customers c ON o.CustomerID = c.CustomerID;" },
        { q: "11. LEFT JOIN: Find customers who NEVER placed an order.", code: "SELECT c.FirstName, c.LastName, c.City \nFROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID \nWHERE o.OrderID IS NULL;" },
        { q: "12. GROUP BY JOIN: Count total orders placed by each customer.", code: "SELECT c.CustomerID, c.FirstName, c.LastName, COUNT(o.OrderID) AS OrderCount \nFROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID \nGROUP BY c.CustomerID, c.FirstName, c.LastName;" }
      ]
    },
    schema3: {
      name: "Schema 3 — Org Structure: Employees, Depts, Projects & Towns",
      structure: `Tables:
• Employees (EmployeeID PK, FirstName, LastName, Salary, DepartmentID FK, ManagerID FK, AddressID FK)
• Departments (DepartmentID PK, Name)
• EmployeeProjects (EmployeeID FK, ProjectID FK)
• Projects (ProjectID PK, ProjectName)
• Addresses (AddressID PK, AddressText, TownID FK)
• Towns (TownID PK, TownName)`,
      queries: [
        { q: "1. List projects with FirstName & LastName of assigned employees.", code: "SELECT p.ProjectName, e.FirstName, e.LastName \nFROM Projects p \nINNER JOIN EmployeeProjects ep ON p.ProjectID = ep.ProjectID \nINNER JOIN Employees e ON ep.EmployeeID = e.EmployeeID;" },
        { q: "2. Display Department Name & employee names using LEFT JOIN.", code: "SELECT d.Name AS DepartmentName, e.FirstName, e.LastName \nFROM Departments d LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID;" },
        { q: "3. Find all towns with NO employees residing in them.", code: "SELECT t.TownName \nFROM Towns t \nLEFT JOIN Addresses a ON t.TownID = a.TownID \nLEFT JOIN Employees e ON a.AddressID = e.AddressID \nWHERE e.EmployeeID IS NULL;" },
        { q: "4. Self-Join: List employees reporting to Manager Smith.", code: "SELECT e.FirstName + ' ' + e.LastName AS EmployeeName, m.FirstName + ' ' + m.LastName AS ManagerName \nFROM Employees e \nINNER JOIN Employees m ON e.ManagerID = m.EmployeeID \nWHERE m.LastName = 'Smith';" },
        { q: "5. Department employee counts & High Salary (>65k) counts.", code: "SELECT d.Name, \n  COUNT(e.EmployeeID) AS TotalEmployees, \n  SUM(CASE WHEN e.Salary > 65000 THEN 1 ELSE 0 END) AS HighSalaryEmployees \nFROM Departments d LEFT JOIN Employees e ON d.DepartmentID = e.DepartmentID \nGROUP BY d.DepartmentID, d.Name;" },
        { q: "6. Physical location of employees (FirstName, LastName, AddressText, TownName).", code: "SELECT e.FirstName, e.LastName, a.AddressText, t.TownName \nFROM Employees e \nINNER JOIN Addresses a ON e.AddressID = a.AddressID \nINNER JOIN Towns t ON a.TownID = t.TownID;" },
        { q: "7. Employees earning strictly MORE than their direct manager.", code: "SELECT e.FirstName + ' ' + e.LastName AS Employee, e.Salary AS EmpSalary, \n       m.FirstName + ' ' + m.LastName AS Manager, m.Salary AS MgrSalary \nFROM Employees e \nINNER JOIN Employees m ON e.ManagerID = m.EmployeeID \nWHERE e.Salary > m.Salary;" }
      ]
    }
  };

  function renderSchema(schemaKey) {
    const data = sqlData[schemaKey];
    if (!data) return;

    schemaBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.schema-btn[data-schema="${schemaKey}"]`).classList.add('active');

    let html = `
      <div class="schema-table-structure">
        <h3 style="color:#ffffff; margin-bottom:0.4rem;">${data.name}</h3>
        <pre style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-secondary); white-space:pre-wrap;">${data.structure}</pre>
      </div>
    `;

    data.queries.forEach(item => {
      html += `
        <div class="query-item-card">
          <div class="query-q-text">${item.q}</div>
          <div class="query-code-block">${item.code}</div>
        </div>
      `;
    });

    sqlContentArea.innerHTML = html;
  }

  schemaBtns.forEach(b => {
    b.addEventListener('click', () => {
      const k = b.getAttribute('data-schema');
      renderSchema(k);
    });
  });

  // Default schema 1
  renderSchema('schema1');

  // BOUNDARY VALUE ANALYSIS (BVA) CALCULATOR
  const calcBtn = document.getElementById('calc-bva-btn');
  const bvaResultsBox = document.getElementById('bva-results-box');

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const minVal = parseFloat(document.getElementById('min-val').value);
      const maxVal = parseFloat(document.getElementById('max-val').value);

      if (isNaN(minVal) || isNaN(maxVal) || minVal >= maxVal) {
        bvaResultsBox.innerHTML = `<span style="color:var(--color-error)">Please enter valid numbers where MIN < MAX.</span>`;
        return;
      }

      const minMinus1 = minVal - 1;
      const minExact = minVal;
      const minPlus1 = minVal + 1;
      const maxMinus1 = maxVal - 1;
      const maxExact = maxVal;
      const maxPlus1 = maxVal + 1;

      bvaResultsBox.innerHTML = `
        <strong>6 Boundary Test Case Values to Write on Exam:</strong><br>
        1. Just below Minimum (Invalid): <span class="bva-chip">${minMinus1}</span><br>
        2. Exact Minimum (Valid Boundary): <span class="bva-chip">${minExact}</span><br>
        3. Just above Minimum (Valid): <span class="bva-chip">${minPlus1}</span><br>
        4. Just below Maximum (Valid): <span class="bva-chip">${maxMinus1}</span><br>
        5. Exact Maximum (Valid Boundary): <span class="bva-chip">${maxExact}</span><br>
        6. Just above Maximum (Invalid): <span class="bva-chip">${maxPlus1}</span>
      `;
    });
  }

  // PRACTICE EXAM SIMULATOR LOGIC
  const simQuestions = [
    {
      sec: "A",
      type: "mcq",
      q: "1. (SQL) Which SQL clause must be used to filter rows AFTER an aggregate GROUP BY operation has been performed?",
      opts: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
      correct: 1,
      exp: "WHERE filters rows before grouping. HAVING is used exclusively to filter groups after GROUP BY."
    },
    {
      sec: "A",
      type: "mcq",
      q: "2. (Design Patterns) A university registration system needs to send email, SMS, and Slack notifications whenever a course is cancelled. Which design pattern should be used?",
      opts: ["Strategy Pattern", "Observer Pattern", "Adapter Pattern", "Singleton Pattern"],
      correct: 1,
      exp: "Observer Pattern handles one-to-many publish/subscribe broadcasting to multiple notification channels without modifying the registration core."
    },
    {
      sec: "A",
      type: "mcq",
      q: "3. (TDD) In Test-Driven Development (TDD), what is the correct sequence of the development cycle?",
      opts: [
        "Write Code -> Write Test -> Refactor",
        "Write Failing Test (Red) -> Write Minimal Code to Pass (Green) -> Refactor",
        "Refactor -> Write Test -> Write Code",
        "Design Architecture -> Write Code -> Automated Testing"
      ],
      correct: 1,
      exp: "The TDD cycle is Red (Failing test) -> Green (Minimal pass code) -> Refactor."
    },
    {
      sec: "A",
      type: "mcq",
      q: "4. (Testing) If a salary increase applies to salaries in the range [58,000 to 105,000], which values represent the Boundary Value Analysis (BVA) test boundary for the lower limit?",
      opts: ["50000, 58000, 60000", "57999, 58000, 58001", "0, 58000, 100000", "58000 only"],
      correct: 1,
      exp: "BVA tests (MIN - 1), MIN, and (MIN + 1). For 58,000, the values are 57999 (invalid), 58000 (valid boundary), 58001 (valid)."
    },
    {
      sec: "B",
      type: "mcq",
      q: "5. (SQL Query Writing) How do you retrieve all customers who have NEVER placed an order using relational tables Customers and Orders?",
      opts: [
        "SELECT * FROM Customers WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders);",
        "SELECT c.FirstName, c.LastName FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID WHERE o.OrderID IS NULL;",
        "SELECT * FROM Customers INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID WHERE Orders.OrderID = 0;",
        "Both A and B are correct relational approaches."
      ],
      correct: 3,
      exp: "Both LEFT JOIN checking IS NULL and subquery NOT IN correctly isolate records with missing foreign keys."
    },
    {
      sec: "B",
      type: "mcq",
      q: "6. (Java Debugging) Why is `if (input.equals(\"ADMIN\"))` considered poor practice in Java?",
      opts: [
        "It causes a compilation error in Java 17+.",
        "If `input` is null, it throws a NullPointerException (NPE). Using `\"ADMIN\".equals(input)` avoids NPE.",
        "Strings cannot be compared using .equals() in Java.",
        "It violates the Single Responsibility Principle."
      ],
      correct: 1,
      exp: "Invoking a method on a potentially null variable causes NullPointerException. Placing the constant literal on the left side safe-guards against null."
    }
  ];

  let simIdx = 0;
  let simScore = 0;
  let simSelectedOpt = null;
  let simAnswered = false;

  const simQTitle = document.getElementById('sim-q-title');
  const simOptList = document.getElementById('sim-opt-list');
  const simExp = document.getElementById('sim-exp');
  const simNextBtn = document.getElementById('sim-next-btn');
  const simCurrentIndex = document.getElementById('sim-current-index');
  const simScoreEl = document.getElementById('sim-score');

  function loadSimQuestion() {
    simSelectedOpt = null;
    simAnswered = false;
    simNextBtn.textContent = "Submit Answer";
    simNextBtn.disabled = true;
    simExp.classList.remove('visible');

    const q = simQuestions[simIdx];
    simQTitle.textContent = q.q;
    simCurrentIndex.textContent = simIdx + 1;
    simScoreEl.textContent = simScore;

    simOptList.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'sim-opt';
      div.innerHTML = `<span>${opt}</span><span class="opt-mark"></span>`;
      div.addEventListener('click', () => {
        if (simAnswered) return;
        simSelectedOpt = i;
        document.querySelectorAll('.sim-opt').forEach(o => o.classList.remove('selected'));
        div.classList.add('selected');
        simNextBtn.disabled = false;
      });
      simOptList.appendChild(div);
    });
  }

  if (simNextBtn) {
    simNextBtn.addEventListener('click', () => {
      if (!simAnswered) {
        simAnswered = true;
        const q = simQuestions[simIdx];
        const opts = simOptList.querySelectorAll('.sim-opt');

        opts.forEach((o, i) => {
          o.classList.remove('selected');
          if (i === q.correct) {
            o.classList.add('correct');
          } else if (i === simSelectedOpt) {
            o.classList.add('incorrect');
          }
        });

        if (simSelectedOpt === q.correct) {
          simScore++;
          simScoreEl.textContent = simScore;
        }

        simExp.innerHTML = `
          <strong style="color:${simSelectedOpt === q.correct ? 'var(--color-success)' : 'var(--color-error)'}">
            ${simSelectedOpt === q.correct ? 'Correct!' : 'Incorrect.'}
          </strong>
          <p style="margin-top:4px;">${q.exp}</p>
        `;
        simExp.classList.add('visible');

        if (simIdx === simQuestions.length - 1) {
          simNextBtn.textContent = "Finish Exam";
        } else {
          simNextBtn.textContent = "Next Question";
        }
      } else {
        if (simIdx < simQuestions.length - 1) {
          simIdx++;
          loadSimQuestion();
        } else {
          // Final Score
          simQTitle.textContent = "Final Exam Simulator Complete!";
          simOptList.innerHTML = `
            <div style="text-align:center; padding:2rem;">
              <div style="font-size:3.5rem; margin-bottom:1rem;">🏆</div>
              <h3>Your Final Score: ${simScore} / ${simQuestions.length}</h3>
              <p style="color:var(--text-secondary); margin-top:0.5rem;">
                ${simScore >= 5 ? "Awesome job! You've mastered SQL, TDD, and Design Patterns!" : "Review your cheat sheet sections and retry the practice queries."}
              </p>
            </div>
          `;
          simExp.classList.remove('visible');
          simNextBtn.style.display = 'none';
        }
      }
    });
  }

  // Load first practice question
  loadSimQuestion();

  // Search Engine Across Cheat Sheet, Diagrams & SQL
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) return;

    if (q.includes('diagram') || q.includes('svg') || q.includes('visual') || q.includes('actor') || q.includes('lifeline') || q.includes('er')) {
      document.querySelector('.nav-link[data-target="diagrams"]').click();
    } else if (q.includes('sql') || q.includes('select') || q.includes('join') || q.includes('group') || q.includes('where') || q.includes('having')) {
      document.querySelector('.nav-link[data-target="sql"]').click();
    } else if (q.includes('pattern') || q.includes('singleton') || q.includes('factory') || q.includes('observer') || q.includes('adapter') || q.includes('strategy')) {
      document.querySelector('.nav-link[data-target="patterns"]').click();
    } else if (q.includes('tdd') || q.includes('test') || q.includes('boundary') || q.includes('equivalence') || q.includes('bva')) {
      document.querySelector('.nav-link[data-target="testing"]').click();
    } else if (q.includes('uml') || q.includes('include') || q.includes('extend') || q.includes('class') || q.includes('sequence')) {
      document.querySelector('.nav-link[data-target="planner"]').click();
    }
  });
});
