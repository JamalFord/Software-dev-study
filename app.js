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
      title: "Practice Quizzes & Exam Simulator",
      desc: "Interactive multi-section quizzes with visual diagram questions, SQL challenges, Design Patterns refactoring, and full exam simulation."
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
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="130" y="15" width="280" height="230" fill="#ffffff" stroke="#334155" stroke-width="2" rx="6"/>
  <text x="140" y="35" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">Smart Home Automation System</text>
  
  <circle cx="60" cy="90" r="12" fill="none" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="102" x2="60" y2="140" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="115" x2="40" y2="130" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="115" x2="80" y2="130" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="140" x2="45" y2="170" stroke="#2563eb" stroke-width="2"/>
  <line x1="60" y1="140" x2="75" y2="170" stroke="#2563eb" stroke-width="2"/>
  <text x="60" y="190" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1e293b">User / Resident</text>

  <ellipse cx="230" cy="80" rx="60" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="230" y="84" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e40af">Schedule Lights</text>

  <ellipse cx="230" cy="175" rx="60" ry="22" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="230" y="179" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1e40af">Adjust Thermostat</text>

  <ellipse cx="345" cy="130" rx="50" ry="20" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="345" y="133" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#92400e">Verify Auth</text>

  <line x1="85" y1="120" x2="170" y2="80" stroke="#475569" stroke-width="1.5"/>
  <line x1="85" y1="120" x2="170" y2="175" stroke="#475569" stroke-width="1.5"/>

  <path d="M 290 80 L 335 112" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>
  <polygon points="335,112 325,107 328,116" fill="#dc2626"/>
  <text x="315" y="86" font-family="sans-serif" font-size="8.5" fill="#dc2626" font-weight="bold">&lt;&lt;include&gt;&gt;</text>
</svg>`
    },
    classrel: {
      title: "2. Class Diagram Relationships Visual",
      desc: "UML Class box with 3 compartments and relationship symbols.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Generalization: Solid line + HOLLOW TRIANGLE.<br>
• Realization: Dashed line + HOLLOW TRIANGLE.<br>
• Composition: Solid line + FILLED BLACK DIAMOND.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="175" y="10" width="100" height="60" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <line x1="175" y1="30" x2="275" y2="30" stroke="#0f172a"/>
  <line x1="175" y1="48" x2="275" y2="48" stroke="#0f172a"/>
  <text x="225" y="24" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Animal</text>
  
  <rect x="40" y="110" width="100" height="60" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <text x="90" y="124" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Dog</text>

  <path d="M 90 110 L 90 80 L 225 80 L 225 70" stroke="#2563eb" stroke-width="1.5" fill="none"/>
  <polygon points="225,70 218,80 232,80" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="125" y="74" font-family="sans-serif" font-size="8.5" fill="#2563eb" font-weight="bold">extends (Generalization)</text>

  <rect x="310" y="110" width="110" height="60" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <text x="365" y="124" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Department</text>
  
  <rect x="310" y="190" width="110" height="50" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <text x="365" y="204" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">LabTest</text>
  
  <line x1="365" y1="170" x2="365" y2="190" stroke="#dc2626" stroke-width="1.5"/>
  <polygon points="365,170 360,176 365,182 370,176" fill="#dc2626" stroke="#dc2626"/>
  <text x="373" y="182" font-family="sans-serif" font-size="8.5" fill="#dc2626" font-weight="bold">Composition</text>
</svg>`
    },
    sequence: {
      title: "3. Sequence Diagram Visual",
      desc: "Lifelines, sync/async messages, return arrows, and alt/loop frames.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Lifeline: Dashed vertical line.<br>
• alt Frame: IF-ELSE choice divided by horizontal dashed line.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="40" y="15" width="80" height="25" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="4"/>
  <text x="80" y="32" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">:User</text>
  <rect x="185" y="15" width="90" height="25" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="4"/>
  <text x="230" y="32" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">:MoviePlayer</text>
  <rect x="330" y="15" width="90" height="25" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="4"/>
  <text x="375" y="32" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">:AuthService</text>

  <line x1="80" y1="40" x2="80" y2="240" stroke="#94a3b8" stroke-dasharray="4,4"/>
  <line x1="230" y1="40" x2="230" y2="240" stroke="#94a3b8" stroke-dasharray="4,4"/>
  <line x1="375" y1="40" x2="375" y2="240" stroke="#94a3b8" stroke-dasharray="4,4"/>

  <rect x="224" y="65" width="12" height="150" fill="#bfdbfe" stroke="#1d4ed8"/>
  <rect x="369" y="80" width="12" height="50" fill="#bfdbfe" stroke="#1d4ed8"/>

  <path d="M 80 65 L 224 65" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="224,65 214,60 214,70" fill="#0f172a"/>
  <text x="145" y="60" text-anchor="middle" font-family="sans-serif" font-size="8.5" font-weight="bold">playMovie(id)</text>

  <path d="M 236 80 L 369 80" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="369,80 359,75 359,85" fill="#0f172a"/>
  
  <path d="M 369 120 L 236 120" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
  <polygon points="236,120 246,115 246,125" fill="none" stroke="#2563eb"/>

  <rect x="160" y="145" width="260" height="80" fill="none" stroke="#d97706" stroke-width="1.5"/>
  <path d="M 160 145 L 200 145 L 210 158 L 160 158 Z" fill="#fef3c7" stroke="#d97706"/>
  <text x="178" y="155" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#92400e">alt [valid]</text>
  <line x1="160" y1="185" x2="420" y2="185" stroke="#d97706" stroke-dasharray="4,4"/>
</svg>`
    },
    activity: {
      title: "4. Activity Diagram Visual",
      desc: "Step-by-step workflow with initial node, actions, decision diamonds, and final node.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Initial Node: Solid black circle.<br>
• Decision Node: Diamond with [Yes]/[No] branches.<br>
• Final Node: Bullseye circle.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <circle cx="225" cy="20" r="10" fill="#0f172a"/>
  <line x1="225" y1="30" x2="225" y2="50" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="225,50 220,42 230,42" fill="#0f172a"/>

  <rect x="160" y="50" width="130" height="30" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="225" y="68" text-anchor="middle" font-family="sans-serif" font-size="9.5" font-weight="bold" fill="#1e40af">Read Temperature</text>

  <line x1="225" y1="80" x2="225" y2="105" stroke="#0f172a" stroke-width="1.5"/>
  
  <polygon points="225,105 255,130 225,155 195,130" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="225" y="133" text-anchor="middle" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#92400e">Temp > 72?</text>

  <path d="M 255 130 L 330 130 L 330 170" stroke="#0f172a" stroke-width="1.5" fill="none"/>
  <polygon points="330,170 325,162 335,162" fill="#0f172a"/>
  <text x="270" y="124" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#166534">[Yes]</text>

  <rect x="275" y="170" width="110" height="30" rx="8" fill="#dcfce7" stroke="#166534" stroke-width="1.5"/>
  <text x="330" y="188" text-anchor="middle" font-family="sans-serif" font-size="9.5" font-weight="bold" fill="#166534">Turn On AC</text>

  <path d="M 195 130 L 120 130 L 120 170" stroke="#0f172a" stroke-width="1.5" fill="none"/>
  <polygon points="120,170 115,162 125,162" fill="#0f172a"/>
  <text x="145" y="124" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#991b1b">[No]</text>

  <rect x="65" y="170" width="110" height="30" rx="8" fill="#fee2e2" stroke="#991b1b" stroke-width="1.5"/>
  <text x="120" y="188" text-anchor="middle" font-family="sans-serif" font-size="9.5" font-weight="bold" fill="#991b1b">Standby Mode</text>

  <circle cx="225" cy="235" r="10" fill="none" stroke="#0f172a" stroke-width="2"/>
  <circle cx="225" cy="235" r="5" fill="#0f172a"/>
</svg>`
    },
    context: {
      title: "5. System Context Diagram Visual",
      desc: "Central system box connected to external actors, databases, and third-party web services.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Central system in center.<br>
• External actors connected via bidirectional arrows.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="160" y="90" width="130" height="75" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2" rx="6"/>
  <text x="225" y="125" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ffffff">SmartHome Core</text>
  <text x="225" y="142" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#bfdbfe">&lt;&lt;system&gt;&gt;</text>

  <rect x="20" y="25" width="100" height="40" fill="#ffffff" stroke="#475569" stroke-width="1.5" rx="4"/>
  <text x="70" y="48" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold">Weather API</text>

  <rect x="330" y="25" width="100" height="40" fill="#ffffff" stroke="#475569" stroke-width="1.5" rx="4"/>
  <text x="380" y="48" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold">User App</text>

  <rect x="175" y="195" width="100" height="40" fill="#ffffff" stroke="#475569" stroke-width="1.5" rx="4"/>
  <text x="225" y="218" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold">Database DB</text>

  <line x1="120" y1="55" x2="180" y2="90" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="330" y1="55" x2="270" y2="90" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="225" y1="165" x2="225" y2="195" stroke="#0f172a" stroke-width="1.5"/>
</svg>`
    },
    er: {
      title: "6. ER Diagram (Database Schema Visual)",
      desc: "Entities with Primary Keys (PK underlined), Foreign Keys (FK), and Cardinality (1:N).",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Primary Key: Underlined.<br>
• Cardinality: 1:N (1 Department has N Employees).`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="30" y="60" width="140" height="130" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <rect x="30" y="60" width="140" height="25" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="100" y="77" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Employees</text>
  <text x="40" y="100" font-family="sans-serif" font-size="9" font-weight="bold" text-decoration="underline">EmployeeID (PK)</text>
  <text x="40" y="118" font-family="sans-serif" font-size="9">FirstName</text>
  <text x="40" y="136" font-family="sans-serif" font-size="9">LastName</text>
  <text x="40" y="154" font-family="sans-serif" font-size="9" fill="#2563eb">DepartmentID (FK)</text>

  <line x1="170" y1="125" x2="280" y2="125" stroke="#2563eb" stroke-width="2"/>
  <text x="180" y="118" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2563eb">N</text>
  <text x="265" y="118" font-family="sans-serif" font-size="11" font-weight="bold" fill="#2563eb">1</text>

  <rect x="280" y="60" width="140" height="90" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <rect x="280" y="60" width="140" height="25" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
  <text x="350" y="77" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Departments</text>
  <text x="290" y="100" font-family="sans-serif" font-size="9" font-weight="bold" text-decoration="underline">DepartmentID (PK)</text>
  <text x="290" y="118" font-family="sans-serif" font-size="9">DepartmentName</text>
</svg>`
    },
    observer: {
      title: "7. Observer Pattern Visual Structure",
      desc: "Subject interface maintains list of Observers and calls notifyObservers() -> update().",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Used for course cancellation alerts (Email, SMS, Slack).`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="40" y="60" width="140" height="60" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="110" y="78" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#92400e">&lt;&lt;interface&gt;&gt;</text>
  <text x="110" y="94" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Subject</text>
  <line x1="40" y1="98" x2="180" y2="98" stroke="#d97706"/>
  <text x="45" y="112" font-family="sans-serif" font-size="8">+ notifyObservers()</text>

  <rect x="270" y="60" width="140" height="60" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="340" y="78" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#92400e">&lt;&lt;interface&gt;&gt;</text>
  <text x="340" y="94" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">Observer</text>
  <line x1="270" y1="98" x2="410" y2="98" stroke="#d97706"/>
  <text x="275" y="112" font-family="sans-serif" font-size="8">+ update(msg)</text>

  <line x1="180" y1="90" x2="270" y2="90" stroke="#2563eb" stroke-width="1.5"/>
  <polygon points="270,90 260,85 260,95" fill="#2563eb"/>
</svg>`
    },
    strategy: {
      title: "8. Strategy Pattern Visual Structure",
      desc: "Context class references Strategy interface to swap algorithms.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Replaces messy if-else country ladders.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="30" y="70" width="130" height="65" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="95" y="92" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">OrderContext</text>
  <line x1="30" y1="98" x2="160" y2="98" stroke="#2563eb"/>
  <text x="35" y="112" font-family="sans-serif" font-size="8">- strategy: IShipping</text>

  <rect x="270" y="70" width="140" height="55" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="340" y="88" text-anchor="middle" font-family="sans-serif" font-size="8.5" fill="#92400e">&lt;&lt;interface&gt;&gt;</text>
  <text x="340" y="103" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">IShippingStrategy</text>

  <line x1="160" y1="95" x2="270" y2="95" stroke="#2563eb" stroke-width="1.5"/>
  <polygon points="270,95 260,90 260,100" fill="#2563eb"/>
</svg>`
    },
    adapter: {
      title: "9. Adapter Pattern Visual Structure",
      desc: "Wrapper object translating requests to legacy system.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• Connects new HR System to old Legacy Payroll.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <rect x="30" y="80" width="100" height="50" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="80" y="110" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">NewHRApp</text>

  <rect x="175" y="80" width="110" height="50" fill="#dcfce7" stroke="#166534" stroke-width="1.5"/>
  <text x="230" y="110" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">PayrollAdapter</text>

  <rect x="320" y="80" width="100" height="50" fill="#fee2e2" stroke="#991b1b" stroke-width="1.5"/>
  <text x="370" y="110" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold">LegacyPayroll</text>

  <line x1="130" y1="105" x2="175" y2="105" stroke="#0f172a" stroke-width="1.5"/>
  <line x1="285" y1="105" x2="320" y2="105" stroke="#0f172a" stroke-width="1.5"/>
</svg>`
    },
    tddcycle: {
      title: "10. Test-Driven Development (TDD) Cycle Visual",
      desc: "Red-Green-Refactor continuous cycle.",
      tips: `<strong>EXAM MEMORIZATION KEYS:</strong><br>
• 1. Red -> 2. Green -> 3. Refactor.`,
      svg: `<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="450" height="260" fill="#f8fafc"/>
  <circle cx="150" cy="90" r="35" fill="#fee2e2" stroke="#ef4444" stroke-width="2.5"/>
  <text x="150" y="95" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#b91c1c">RED</text>

  <circle cx="300" cy="90" r="35" fill="#dcfce7" stroke="#10b981" stroke-width="2.5"/>
  <text x="300" y="95" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#15803d">GREEN</text>

  <circle cx="225" cy="185" r="35" fill="#fef3c7" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="225" y="190" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#b45309">REFACTOR</text>

  <path d="M 185 90 L 265 90" stroke="#0f172a" stroke-width="1.5"/>
  <polygon points="265,90 257,86 257,94" fill="#0f172a"/>

  <path d="M 285 120 L 255 155" stroke="#0f172a" stroke-width="1.5"/>
  <path d="M 195 155 L 165 120" stroke="#0f172a" stroke-width="1.5"/>
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

  selectQuadrant('quad-1');

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

  renderSchema('schema1');

  // BVA CALCULATOR
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

      bvaResultsBox.innerHTML = `
        <strong>6 Boundary Test Case Values to Write on Exam:</strong><br>
        1. Just below Minimum (Invalid): <span class="bva-chip">${minVal - 1}</span><br>
        2. Exact Minimum (Valid Boundary): <span class="bva-chip">${minVal}</span><br>
        3. Just above Minimum (Valid): <span class="bva-chip">${minVal + 1}</span><br>
        4. Just below Maximum (Valid): <span class="bva-chip">${maxVal - 1}</span><br>
        5. Exact Maximum (Valid Boundary): <span class="bva-chip">${maxVal}</span><br>
        6. Just above Maximum (Invalid): <span class="bva-chip">${maxVal + 1}</span>
      `;
    });
  }

  // MULTI-CATEGORY QUIZ ENGINE (30 QUESTIONS TOTAL WITH GRAPH QUESTIONS)
  const allQuizQuestions = [
    // --- CATEGORY 1: UML & VISUAL DIAGRAM QUESTIONS (cat: 'uml') ---
    {
      cat: "uml",
      q: "1. (Visual UML) In the Use Case Diagram below, what does the dashed red arrow labeled <<include>> pointing to 'Verify Auth' represent?",
      diag: diagramData.usecase.svg,
      opts: [
        "An optional extension that only occurs if the user forgets their password.",
        "A mandatory sub-workflow that MUST run every time 'Schedule Lights' is executed.",
        "An inheritance relationship where 'Schedule Lights' extends 'Verify Auth'.",
        "An actor association line."
      ],
      correct: 1,
      exp: "<<include>> represents a mandatory required sub-task. The arrow always points TO the included use case."
    },
    {
      cat: "uml",
      q: "2. (Visual Class Diagram) Look at the relationship between Department and LabTest below (solid line with filled black diamond). What relationship is this?",
      diag: diagramData.classrel.svg,
      opts: [
        "Generalization (Inheritance) - LabTest inherits from Department.",
        "Aggregation - LabTest exists independently if Department is deleted.",
        "Composition (Part-of) - LabTest lifecycle is strictly tied to Department; if Department is deleted, LabTest is deleted.",
        "Realization - Department implements LabTest interface."
      ],
      correct: 2,
      exp: "A filled black diamond indicates Composition (strong ownership). If the parent (Department) is deleted, child objects (LabTest) are deleted too."
    },
    {
      cat: "uml",
      q: "3. (Visual Sequence Diagram) In the Sequence Diagram below, what does the frame labeled `alt [valid]` represent?",
      diag: diagramData.sequence.svg,
      opts: [
        "A while/for loop iterating over multiple users.",
        "An IF-ELSE conditional choice branch (Top = true, Bottom = else).",
        "An asynchronous non-blocking thread execution.",
        "A database transaction commit."
      ],
      correct: 1,
      exp: "The `alt` frame represents IF-ELSE conditional branching. The frame is divided by a dashed horizontal line separating the conditions."
    },
    {
      cat: "uml",
      q: "4. (Visual Activity Diagram) In the Activity Diagram below, what does the amber diamond node containing 'Temp > 72?' represent?",
      diag: diagramData.activity.svg,
      opts: [
        "An Initial Node starting the process.",
        "A Decision Node evaluating a guard condition to branch execution into [Yes] or [No] paths.",
        "A Fork Bar running parallel threads.",
        "A Final Activity Node."
      ],
      correct: 1,
      exp: "In Activity Diagrams, diamonds represent Decision Nodes that split the workflow based on boolean guard conditions."
    },
    {
      cat: "uml",
      q: "5. (Visual ER Diagram) In the Database ER Diagram below, what is the cardinality between Departments and Employees?",
      diag: diagramData.er.svg,
      opts: [
        "1:1 - One Department has exactly One Employee.",
        "1:N - One Department can have Many (N) Employees, but an Employee belongs to One Department.",
        "N:M - Many Departments have Many Employees.",
        "0:0 - Unrelated tables."
      ],
      correct: 1,
      exp: "The relationship line shows '1' on the Departments side and 'N' on the Employees side, representing a 1-to-Many relationship."
    },
    {
      cat: "uml",
      q: "6. Which UML notation represents Realization (implementing an interface)?",
      opts: [
        "Solid line with filled black diamond",
        "Dashed line with hollow triangle pointing to the interface",
        "Solid line with hollow diamond",
        "Dashed line with open arrowhead"
      ],
      correct: 1,
      exp: "Realization (implements) is drawn as a dashed line with a hollow triangle pointing to the interface."
    },
    {
      cat: "uml",
      q: "7. What is the difference between Aggregation and Composition in UML?",
      opts: [
        "Aggregation has a filled diamond; Composition has a hollow diamond.",
        "Aggregation represents independent lifecycle (hollow diamond); Composition represents coincident/dependent lifecycle (filled black diamond).",
        "Composition only applies to interfaces.",
        "Aggregation represents inheritance."
      ],
      correct: 1,
      exp: "Aggregation (hollow diamond) = shared/independent lifecycle. Composition (filled diamond) = strong part-of ownership."
    },
    {
      cat: "uml",
      q: "8. In an Activity Diagram, what symbol represents the Final State of a process?",
      opts: ["Solid black circle", "Bullseye (circle inside a circle)", "Rounded rectangle", "Diamond"],
      correct: 1,
      exp: "The Initial State is a solid black circle; the Final State is a bullseye (circle with a border circle)."
    },

    // --- CATEGORY 2: SQL DATABASE QUERIES & JOINS (cat: 'sql') ---
    {
      cat: "sql",
      q: "9. Which SQL clause is used to filter aggregate groups AFTER a `GROUP BY` operation?",
      opts: ["WHERE", "HAVING", "ORDER BY", "FILTER"],
      correct: 1,
      exp: "WHERE filters rows before grouping. HAVING filters aggregate groups after GROUP BY."
    },
    {
      cat: "sql",
      q: "10. How do you find customers who have NEVER placed an order using relational tables Customers and Orders?",
      opts: [
        "SELECT c.FirstName, c.LastName FROM Customers c LEFT JOIN Orders o ON c.CustomerID = o.CustomerID WHERE o.OrderID IS NULL;",
        "SELECT * FROM Customers INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID WHERE Orders.OrderID = 0;",
        "SELECT * FROM Customers WHERE OrderID = NULL;",
        "SELECT COUNT(*) FROM Customers GROUP BY OrderID;"
      ],
      correct: 0,
      exp: "A LEFT JOIN preserves all customers. Checking `WHERE o.OrderID IS NULL` isolates customers with no corresponding orders."
    },
    {
      cat: "sql",
      q: "11. Which SQL wildcard pattern matches all employees whose last name ends with 'son'?",
      opts: ["LIKE 'son%'", "LIKE '%son'", "LIKE '_son'", "LIKE '[son]'"],
      correct: 1,
      exp: "`%son` matches any string ending with 'son' (e.g. Jackson, Harrison)."
    },
    {
      cat: "sql",
      q: "12. How do you write a Self-JOIN to find all employees reporting to a manager whose last name is 'Smith'?",
      opts: [
        "SELECT e.FirstName, m.FirstName FROM Employees e INNER JOIN Employees m ON e.ManagerID = m.EmployeeID WHERE m.LastName = 'Smith';",
        "SELECT * FROM Employees WHERE ManagerID = 'Smith';",
        "SELECT * FROM Employees e LEFT JOIN Departments d ON e.DepartmentID = d.DepartmentID;",
        "SELECT e.FirstName FROM Employees e WHERE e.LastName = 'Smith';"
      ],
      correct: 0,
      exp: "Self-JOIN joins the Employees table with itself (`e` for employee, `m` for manager) on `e.ManagerID = m.EmployeeID`."
    },
    {
      cat: "sql",
      q: "13. Which wildcard in SQL matches EXACTLY 5 characters long?",
      opts: ["LIKE '*****'", "LIKE '_____' (5 underscores)", "LIKE '%5%'", "LIKE '[5]'"],
      correct: 1,
      exp: "An underscore `_` matches exactly 1 character. 5 underscores `_____` matches exactly 5 characters."
    },
    {
      cat: "sql",
      q: "14. How do you calculate the total global payroll expenditure across all employee salaries?",
      opts: ["SELECT COUNT(Salary) FROM Employees;", "SELECT SUM(Salary) FROM Employees;", "SELECT AVG(Salary) FROM Employees;", "SELECT MAX(Salary) FROM Employees;"],
      correct: 1,
      exp: "`SUM(Salary)` adds all salary values to return total payroll expenditure."
    },
    {
      cat: "sql",
      q: "15. What is the fundamental rule regarding non-aggregated columns when using `GROUP BY`?",
      opts: [
        "Non-aggregated columns in SELECT must be omitted completely.",
        "Any non-aggregated column in the SELECT clause MUST appear in the GROUP BY clause.",
        "Non-aggregated columns are automatically sorted ascending.",
        "GROUP BY can only be used with 1 column."
      ],
      correct: 1,
      exp: "SQL requires all non-aggregated columns selected in the query to be explicitly grouped in the `GROUP BY` clause."
    },
    {
      cat: "sql",
      q: "16. How do you query employees earning inclusively between 30,000 and 60,000?",
      opts: [
        "WHERE Salary IN (30000, 60000)",
        "WHERE Salary BETWEEN 30000 AND 60000",
        "WHERE Salary >= 30000 OR Salary <= 60000",
        "WHERE Salary LIKE '30000-60000'"
      ],
      correct: 1,
      exp: "`BETWEEN 30000 AND 60000` evaluates inclusive numerical ranges."
    },

    // --- CATEGORY 3: DESIGN PATTERNS & REFACTORING (cat: 'patterns') ---
    {
      cat: "patterns",
      q: "17. A university registration system sends notifications (Email, SMS, Slack) when a course is cancelled. Which design pattern should be used?",
      opts: ["Strategy Pattern", "Observer Pattern", "Adapter Pattern", "Singleton Pattern"],
      correct: 1,
      exp: "Observer Pattern supports 1-to-many publish/subscribe broadcasting to multiple notification subscribers automatically."
    },
    {
      cat: "patterns",
      q: "18. Why would Strategy Pattern NOT be the best choice for the course cancellation notification scenario?",
      opts: [
        "Strategy pattern cannot be used in Java.",
        "Strategy is designed to select ONE interchangeable algorithm at a time, whereas Observer broadcasts to MULTIPLE subscribers simultaneously.",
        "Observer pattern is faster than Strategy.",
        "Strategy pattern requires database access."
      ],
      correct: 1,
      exp: "Strategy swaps out 1 algorithm at a time for a context. Observer notifies 1-to-many subscribers simultaneously."
    },
    {
      cat: "patterns",
      q: "19. A graphics editor supports Windows, macOS, and Linux UI controls (buttons, menus). Which pattern generates these widget families while keeping client code identical?",
      opts: ["Abstract Factory / Factory Method", "Decorator Pattern", "Adapter Pattern", "Singleton Pattern"],
      correct: 0,
      exp: "Abstract Factory provides an interface for creating families of related or dependent objects (WinFactory, MacFactory) without specifying concrete classes."
    },
    {
      cat: "patterns",
      q: "20. A new HR app needs to interact with an old legacy payroll system with an incompatible interface without modifying legacy code. Which pattern should be used?",
      opts: ["Adapter Pattern (Wrapper)", "Observer Pattern", "Decorator Pattern", "Strategy Pattern"],
      correct: 0,
      exp: "Adapter converts the interface of a legacy class into another target interface expected by the client."
    },
    {
      cat: "patterns",
      q: "21. A shipping service uses `if (country == \"USA\") ... else if (\"Canada\") ... else if (\"UK\")`. Which pattern refactors this code?",
      opts: ["Strategy Pattern", "Singleton Pattern", "Decorator Pattern", "Adapter Pattern"],
      correct: 0,
      exp: "Strategy encapsulates each country shipping algorithm into separate classes (`USAShipping`, `CanadaShipping`) implementing `IShippingStrategy`."
    },
    {
      cat: "patterns",
      q: "22. Which pattern allows adding scrollbars or borders to GUI widgets dynamically at runtime without modifying the base widget class?",
      opts: ["Decorator Pattern", "Factory Pattern", "Adapter Pattern", "Observer Pattern"],
      correct: 0,
      exp: "Decorator dynamically attaches additional responsibilities to an object at runtime."
    },
    {
      cat: "patterns",
      q: "23. What are the two mandatory code implementation rules for the Singleton Pattern?",
      opts: [
        "Public constructor and public static list.",
        "Private static instance variable AND private constructor with public static `getInstance()` method.",
        "Abstract class with interface implementation.",
        "Final variables only."
      ],
      correct: 1,
      exp: "Singleton requires a private constructor (prevents `new`) and a public static `getInstance()` method that returns the single instance."
    },

    // --- CATEGORY 4: TDD & TESTING LAB (cat: 'tdd') ---
    {
      cat: "tdd",
      q: "24. What is the correct 3-step sequence of Test-Driven Development (TDD)?",
      opts: [
        "Write Code -> Write Test -> Refactor",
        "Red (Failing test) -> Green (Minimal pass code) -> Refactor",
        "Refactor -> Write Code -> Test",
        "Design -> Code -> Automated Test"
      ],
      correct: 1,
      exp: "TDD cycle: 1. Red (Write failing test), 2. Green (Write minimal code to pass), 3. Refactor (Clean up code)."
    },
    {
      cat: "tdd",
      q: "25. If a valid salary range is [58,000 to 105,000], which values represent the lower boundary test set for Boundary Value Analysis (BVA)?",
      opts: ["57999 (Invalid), 58000 (Exact Min), 58001 (Valid)", "50000, 58000, 60000", "0, 58000, 100000", "58000 only"],
      correct: 0,
      exp: "BVA tests (MIN-1), MIN, and (MIN+1). For 58,000: 57999, 58000, 58001."
    },
    {
      cat: "tdd",
      q: "26. What is Equivalence Partitioning (EP)?",
      opts: [
        "Testing every single integer value in a database.",
        "Dividing the input data domain into valid and invalid partitions and testing 1 representative value per partition.",
        "Writing unit tests only for getters and setters.",
        "Testing database SQL queries."
      ],
      correct: 1,
      exp: "EP divides input domain into equivalence classes where all values inside a class are expected to be processed similarly."
    },
    {
      cat: "tdd",
      q: "27. Why is `if (input.equals(\"ADMIN\"))` considered dangerous in Java?",
      opts: [
        "It causes a syntax error.",
        "If `input` is null, it throws a `NullPointerException` (NPE). Placing the constant literal on left `\"ADMIN\".equals(input)` avoids NPE.",
        "Strings cannot be compared with .equals().",
        "It is slow."
      ],
      correct: 1,
      exp: "Calling a method on a null variable causes NPE. `\"ADMIN\".equals(input)` safely handles null inputs."
    },
    {
      cat: "tdd",
      q: "28. How should database connections or file streams be handled in Java to prevent resource leaks?",
      opts: [
        "Leave them open for the garbage collector.",
        "Close them explicitly in a `finally` block or use `try-with-resources`.",
        "Set them to null.",
        "Re-instantiate them."
      ],
      correct: 1,
      exp: "`try-with-resources` automatically closes AutoCloseable resources when execution leaves the block."
    },
    {
      cat: "tdd",
      q: "29. Why should a Java method return an empty collection `new ArrayList<>()` instead of `null`?",
      opts: [
        "It uses less memory.",
        "It prevents callers from crashing with `NullPointerException` when iterating over the returned collection.",
        "Java does not allow returning null.",
        "It speeds up database queries."
      ],
      correct: 1,
      exp: "Returning an empty collection allows callers to safely run `for (Item x : list)` without needing null checks."
    },
    {
      cat: "tdd",
      q: "30. What are the key fields required in a formal Unit Test Case document for Section B?",
      opts: [
        "Test Case ID, Test Scenario, Pre-conditions, Inputs, Test Steps, Expected Output (Oracle), Actual Output, Status, Teardown",
        "Method Name and Author",
        "Code Diff and Comments",
        "Class Name and Date"
      ],
      correct: 0,
      exp: "A complete test case includes ID, Scenario, Pre-condition, Inputs, Steps, Expected/Actual Output, Status, and Teardown."
    }
  ];

  // Quiz Engine State
  let currentCategory = "all";
  let activeQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;
  let selectedOpt = null;
  let answered = false;

  const quizSecBtns = document.querySelectorAll('.quiz-sec-btn');
  const quizCatTitle = document.getElementById('quiz-cat-title');
  const quizCatSubtitle = document.getElementById('quiz-cat-subtitle');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizDiagramBox = document.getElementById('quiz-diagram-box');
  const simQTitle = document.getElementById('sim-q-title');
  const simOptList = document.getElementById('sim-opt-list');
  const simExp = document.getElementById('sim-exp');
  const simNextBtn = document.getElementById('sim-next-btn');
  const simCurrentIndex = document.getElementById('sim-current-index');
  const simTotalIndex = document.getElementById('sim-total-index');
  const simScoreEl = document.getElementById('sim-score');
  const simTotalEl = document.getElementById('sim-total');

  const categoryMeta = {
    all: { title: "Full Final Exam Challenge", sub: "Comprehensive 30-question mix across all syllabus topics." },
    uml: { title: "Section A: UML & Visual Diagrams Quiz", sub: "8 visual diagram questions covering Use Cases, Class relations, Sequence, and Activity diagrams." },
    sql: { title: "Section B: SQL Database Queries Quiz", sub: "8 questions on SELECT, JOINs, GROUP BY, HAVING, and NULL checks." },
    patterns: { title: "Section C: Design Patterns Quiz", sub: "7 questions on Singleton, Factory, Adapter, Decorator, Observer, and Strategy." },
    tdd: { title: "Section D: TDD, Testing & Debugging Quiz", sub: "7 questions on Red-Green-Refactor, BVA, Equivalence Partitioning, and NullPointer fixes." }
  };

  function filterQuestions(cat) {
    currentCategory = cat;
    if (cat === 'all') {
      activeQuestions = [...allQuizQuestions];
    } else {
      activeQuestions = allQuizQuestions.filter(q => q.cat === cat);
    }
    quizIndex = 0;
    quizScore = 0;

    quizCatTitle.textContent = categoryMeta[cat].title;
    quizCatSubtitle.textContent = categoryMeta[cat].sub;
    simTotalEl.textContent = activeQuestions.length;
    simTotalIndex.textContent = activeQuestions.length;

    quizSecBtns.forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.quiz-sec-btn[data-cat="${cat}"]`);
    if (btn) btn.classList.add('active');

    loadQuestion();
  }

  function loadQuestion() {
    selectedOpt = null;
    answered = false;
    simNextBtn.textContent = "Submit Answer";
    simNextBtn.disabled = true;
    simNextBtn.style.display = "block";
    simExp.classList.remove('visible');

    const q = activeQuestions[quizIndex];
    simQTitle.textContent = q.q;
    simCurrentIndex.textContent = quizIndex + 1;
    simScoreEl.textContent = quizScore;

    // Progress Bar Update
    const pct = ((quizIndex) / activeQuestions.length) * 100;
    quizProgressBar.style.width = `${pct}%`;

    // Render Diagram if present
    if (q.diag) {
      quizDiagramBox.style.display = "flex";
      quizDiagramBox.innerHTML = q.diag;
    } else {
      quizDiagramBox.style.display = "none";
      quizDiagramBox.innerHTML = "";
    }

    // Options
    simOptList.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'sim-opt';
      div.innerHTML = `<span>${opt}</span><span class="opt-mark"></span>`;
      div.addEventListener('click', () => {
        if (answered) return;
        selectedOpt = i;
        document.querySelectorAll('.sim-opt').forEach(o => o.classList.remove('selected'));
        div.classList.add('selected');
        simNextBtn.disabled = false;
      });
      simOptList.appendChild(div);
    });
  }

  quizSecBtns.forEach(b => {
    b.addEventListener('click', () => {
      const cat = b.getAttribute('data-cat');
      filterQuestions(cat);
    });
  });

  if (simNextBtn) {
    simNextBtn.addEventListener('click', () => {
      if (!answered) {
        answered = true;
        const q = activeQuestions[quizIndex];
        const opts = simOptList.querySelectorAll('.sim-opt');

        opts.forEach((o, i) => {
          o.classList.remove('selected');
          if (i === q.correct) {
            o.classList.add('correct');
          } else if (i === selectedOpt) {
            o.classList.add('incorrect');
          }
        });

        if (selectedOpt === q.correct) {
          quizScore++;
          simScoreEl.textContent = quizScore;
        }

        simExp.innerHTML = `
          <strong style="color:${selectedOpt === q.correct ? 'var(--color-success)' : 'var(--color-error)'}">
            ${selectedOpt === q.correct ? 'Correct!' : 'Incorrect.'}
          </strong>
          <p style="margin-top:4px;">${q.exp}</p>
        `;
        simExp.classList.add('visible');

        if (quizIndex === activeQuestions.length - 1) {
          simNextBtn.textContent = "Finish Quiz";
        } else {
          simNextBtn.textContent = "Next Question";
        }
      } else {
        if (quizIndex < activeQuestions.length - 1) {
          quizIndex++;
          loadQuestion();
        } else {
          // Finish Quiz Analytics
          quizProgressBar.style.width = `100%`;
          quizDiagramBox.style.display = "none";
          const finalPct = Math.round((quizScore / activeQuestions.length) * 100);

          simQTitle.textContent = `${categoryMeta[currentCategory].title} Complete!`;
          simOptList.innerHTML = `
            <div style="text-align:center; padding:2rem;">
              <div style="font-size:3.5rem; margin-bottom:0.75rem;">${finalPct >= 75 ? '🏆' : '📚'}</div>
              <h3 style="font-size:1.6rem; color:#fff;">Your Score: ${quizScore} / ${activeQuestions.length} (${finalPct}%)</h3>
              <p style="color:var(--text-secondary); margin-top:0.6rem; max-width:500px; margin-left:auto; margin-right:auto;">
                ${finalPct >= 85 ? "Outstanding! You have mastered this section completely!" :
                  finalPct >= 70 ? "Good score! Review your missed questions to push past 90%!" :
                  "Keep practicing! Study the visual diagrams and SQL templates, then retry."}
              </p>
              <button class="btn-action" id="retry-quiz-btn" style="margin-top:1.5rem;">Retry Quiz Section</button>
            </div>
          `;
          simExp.classList.remove('visible');
          simNextBtn.style.display = 'none';

          document.getElementById('retry-quiz-btn').addEventListener('click', () => {
            filterQuestions(currentCategory);
          });
        }
      }
    });
  }

  // Initialize quiz with 'all'
  filterQuestions('all');

  // Search Engine
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) return;

    if (q.includes('quiz') || q.includes('question') || q.includes('exam')) {
      document.querySelector('.nav-link[data-target="sim"]').click();
    } else if (q.includes('diagram') || q.includes('svg') || q.includes('visual') || q.includes('actor')) {
      document.querySelector('.nav-link[data-target="diagrams"]').click();
    } else if (q.includes('sql') || q.includes('select') || q.includes('join') || q.includes('group')) {
      document.querySelector('.nav-link[data-target="sql"]').click();
    } else if (q.includes('pattern') || q.includes('singleton') || q.includes('observer')) {
      document.querySelector('.nav-link[data-target="patterns"]').click();
    } else if (q.includes('tdd') || q.includes('bva')) {
      document.querySelector('.nav-link[data-target="testing"]').click();
    } else if (q.includes('uml')) {
      document.querySelector('.nav-link[data-target="planner"]').click();
    }
  });
});
