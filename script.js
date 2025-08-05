// ====== Elements ======
const terminal = document.getElementById("terminal");
const cmdInput = document.getElementById("cmd-input");
const runBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
const langToggle = document.getElementById("lang-toggle");

const bioPT = document.getElementById("bio-pt");
const bioEN = document.getElementById("bio-en");
const footPT = document.getElementById("foot-pt");
const footEN = document.getElementById("foot-en");

let currentLang = "pt";

// ====== Helpers ======
function printLine(text = "") {
  const div = document.createElement("div");
  div.className = "line";
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function prompt(cmd = "") {
  const div = document.createElement("div");
  div.className = "line";
  div.innerHTML = `$ <span class="cmd">${cmd}</span>`;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function clearTerminal() {
  terminal.innerHTML = "";
}

function setLanguage(lang) {
  currentLang = lang;
  const isPT = lang === "pt";

  bioPT.classList.toggle("hidden", !isPT);
  bioEN.classList.toggle("hidden", isPT);

  footPT.classList.toggle("hidden", !isPT);
  footEN.classList.toggle("hidden", isPT);

  document.getElementById("lang-pt").classList.toggle("active", isPT);
  document.getElementById("lang-en").classList.toggle("active", !isPT);

  const placeholderPT = "Digite um comando e pressione Enter...";
  const placeholderEN = "Type a command and press Enter...";
  cmdInput.placeholder = isPT ? placeholderPT : placeholderEN;

  const titlePT = "pdro@terminal ~ whoami";
  const titleEN = "pdro@terminal ~ whoami";
  document.title = isPT ? titlePT : titleEN;

  // Print a hint after switching
  const hintPT = "Dica: use 'help' para ver os comandos.";
  const hintEN = "Tip: use 'help' to list commands.";
  printLine(isPT ? hintPT : hintEN);
}

// ====== Commands ======
function whoami() {
  // Print the bio text for the current language
  const el = currentLang === "pt" ? bioPT : bioEN;
  const text = (el?.textContent || "").trim();
  if (text) {
    text.split("\n").map(s => s.trim()).filter(Boolean).forEach(line => printLine(line));
  } else {
    printLine(currentLang === "pt" ? "Sem informações de perfil no momento." : "No profile information available.");
  }
}

function skills() {
  const skillsPT = [
    "Linguagens: Python, PHP, Go, Bash, Dart/Flutter",
    "Sistemas: Linux, Windows",
  ];
  const skillsEN = [
    "Languages: Python, PHP, Go, Bash, Dart/Flutter",
    "Systems: Linux, Windows",
  ];
  (currentLang === "pt" ? skillsPT : skillsEN).forEach(printLine);
}

function experience() {
  const expPT = [
    "2025 — Projeto Acadêmico (Visão Computacional)— Responsável por realizar uma solução utilizando ESP32 com YOLO e MiDaS, com foco em aplicações para ambientes com restrições de hardware e processamento.",
    "2025 — III Hackathon UniFECAF — Desenvolvi um chatbot utilizando LLaMA 3.2, com restrições de perguntas limitada exclusivamente a chamadas da API.",
    "2025 — Realizo pentest em aplicações web em busca de vulnerabilidades, com fornecimento de relatórios técnicos com as vulnerabilidades encontradas."
  ];
  const expEN = [
    "2025 — Academic Project (Computer Vision) — Responsible for developing a solution using ESP32 with YOLO and MiDaS, focused on applications in hardware and processing-constrained environments.",
    "2025 — III UniFECAF Hackathon — Developed a chatbot using LLaMA 3.2, with question limitations strictly enforced through API calls.",
    "2025 — Conducting Web Application Pentests — Perform penetration testing on web applications to identify vulnerabilities, providing technical reports detailing the findings."
  ];
  (currentLang === "pt" ? expPT : expEN).forEach(printLine);
}

function education() {
  const eduPT = [
    "Bacharelado em Engenharia de Computação — em andamento",
  ];
  const eduEN = [
    "B.Sc. in Computer Engineering — in progress",
  ];
  (currentLang === "pt" ? eduPT : eduEN).forEach(printLine);
}

function contact() {
  const cPT = [
    "Email: ribeiro.opedrohenrique@gmail.com",
    "GitHub: github.com/pdro",
    "LinkedIn: linkedin.com/in/pdro",
  ];
  const cEN = [
    "Email: ribeiro.opedrohenrique@gmail.com",
    "GitHub: github.com/pdro",
    "LinkedIn: linkedin.com/in/pdro",
  ];
  (currentLang === "pt" ? cPT : cEN).forEach(printLine);
}

function help() {
  const hPT = [
    "Comandos disponíveis:",
    "whoami, skills, experience, education, contact, language, clear, help",
  ];
  const hEN = [
    "Available commands:",
    "whoami, skills, experience, education, contact, language, clear, help",
  ];
  (currentLang === "pt" ? hPT : hEN).forEach(printLine);
}

function clearCmd() {
  clearTerminal();
}

function language() {
  setLanguage(currentLang === "pt" ? "en" : "pt");
}

// ====== Router ======
function runCommand(input) {
  const cmd = (input || "").trim().toLowerCase();
  if (!cmd) return;

  prompt(cmd);

  switch (cmd) {
    case "whoami":
      whoami(); break;
    case "skills":
      skills(); break;
    case "experience":
      experience(); break;
    case "education":
      education(); break;
    case "contact":
      contact(); break;
    case "language":
      language(); break;
    case "clear":
      clearCmd(); break;
    case "help":
      help(); break;
    default:
      printLine(currentLang === "pt" ? `Comando não encontrado: ${cmd}` : `Command not found: ${cmd}`);
  }
}

// ====== Events ======
document.addEventListener("DOMContentLoaded", () => {
  // Initial prompt and welcome
  prompt("help");
  help();

  // Bindings
  runBtn.addEventListener("click", () => runCommand(cmdInput.value));
  clearBtn.addEventListener("click", clearCmd);

  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runCommand(cmdInput.value);
      cmdInput.value = "";
    }
  });

  document.querySelectorAll(".command-item").forEach((btn) =>
    btn.addEventListener("click", () => runCommand(btn.dataset.command))
  );

  langToggle.addEventListener("click", (e) => {
    if (e.target.id === "lang-pt" && currentLang !== "pt") runCommand("language");
    if (e.target.id === "lang-en" && currentLang !== "en") runCommand("language");
  });

  terminal.addEventListener("click", () => cmdInput.focus());

  cmdInput.focus();
});
