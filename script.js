document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DOM refs ---------- */
  const terminal = document.getElementById("terminal-content");
  const inputLine = terminal.querySelector(".terminal-input");
  const cmdInput = document.getElementById("cmd-input");
  const langToggle = document.getElementById("language-toggle");
  const langPT = document.getElementById("lang-pt");
  const langEN = document.getElementById("lang-en");
  const bioPT = document.getElementById("bio-pt");
  const bioEN = document.getElementById("bio-en");

  /* ---------- i18n ---------- */
  let currentLang = "pt";
  const MSG = {
    pt: {
      unknown: (c) => `Comando não reconhecido: ${c}. Digite 'help' para listar comandos.`,
      toPT: "Idioma alterado para Português.",
      toEN: "Idioma alterado para Inglês.",
      help:
        "Comandos disponíveis: whoami, skills, projects, education, contact, language, clear, help",
    },
    en: {
      unknown: (c) => `Unknown command: ${c}. Type 'help' to list commands.`,
      toPT: "Language changed to Portuguese.",
      toEN: "Language changed to English.",
      help:
        "Available commands: whoami, skills, projects, education, contact, language, clear, help",
    },
  };

  /* ---------- utilities ---------- */
  const promptHTML = '<span class="prompt">pdro@DESKTOP:~$</span>';

  function scrollBottom() {
    terminal.scrollTop = terminal.scrollHeight;
  }

  function printLine(html) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.innerHTML = html;
    terminal.insertBefore(line, inputLine);
  }

  function printPrompt(cmd = "") {
    printLine(`${promptHTML} ${cmd}`);
  }

  function clearTerminal() {
    /* Keep only the persistent input line */
    [...terminal.querySelectorAll(":scope > .terminal-line")].forEach((n) => n.remove());
  }

  function showTemplate(section) {
    const tplId = `tpl-${section}-${currentLang}`;
    const tpl = document.getElementById(tplId);
    if (!tpl) return;

    let fragment;
    // Works with both <template> and regular <div> blocks
    if (tpl.content) {
      fragment = tpl.content.cloneNode(true);
    } else {
      fragment = document.createDocumentFragment();
      tpl.childNodes.forEach((node) => fragment.appendChild(node.cloneNode(true)));
    }
    terminal.insertBefore(fragment, inputLine);
  }

  function toggleLanguage() {
    currentLang = currentLang === "pt" ? "en" : "pt";
    langPT.classList.toggle("active", currentLang === "pt");
    langEN.classList.toggle("active", currentLang === "en");
    bioPT.classList.toggle("hidden", currentLang !== "pt");
    bioEN.classList.toggle("hidden", currentLang === "pt");
    printLine(currentLang === "pt" ? MSG.pt.toPT : MSG.en.toEN);
  }

  /* ---------- command handlers ---------- */
  const COMMANDS = {
    whoami() {
      // ensure bio visibility matches language
      bioPT.classList.toggle("hidden", currentLang !== "pt");
      bioEN.classList.toggle("hidden", currentLang === "pt");
    },
    skills() {
      showTemplate("skills");
    },
    experience() {
      showTemplate("experience");
    },
    education() {
      showTemplate("education");
    },
    contact() {
      showTemplate("contact");
    },
    language() {
      toggleLanguage();
    },
    "toggle-language"() {
      toggleLanguage();
    },
    clear() {
      clearTerminal();
    },
    help() {
      printLine(currentLang === "pt" ? MSG.pt.help : MSG.en.help);
    },
  };

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    printPrompt(cmd);
    cmdInput.value = "";

    const fn = COMMANDS[cmd];
    if (fn) {
      fn();
    } else {
      printLine((MSG[currentLang] || MSG.pt).unknown(cmd));
    }

    scrollBottom();
  }

  /* ---------- typing effect ---------- */
  const welcome = document.getElementById("welcome-message");
  typeText(welcome, "whoami", 0, 40, () => runCommand("whoami"));

  function typeText(el, text, idx, speed, cb) {
    if (idx < text.length) {
      el.innerHTML += text.charAt(idx);
      setTimeout(() => typeText(el, text, idx + 1, speed, cb), speed);
    } else if (typeof cb === "function") cb();
  }

  /* ---------- event listeners ---------- */
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runCommand(cmdInput.value);
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