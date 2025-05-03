document.addEventListener('DOMContentLoaded', function() {
    const terminalContent = document.getElementById('terminal-content');
    const cmdInput = document.getElementById('cmd-input');
    const languageToggle = document.getElementById('language-toggle');
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');
    const bioPt = document.getElementById('bio-pt');
    const bioEn = document.getElementById('bio-en');
    
    // Inicializa a língua atual
    let currentLang = 'pt';
    
    // Implementação do efeito de digitação para a primeira mensagem
    function typeText(element, text, index = 0, speed = 50) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeText(element, text, index + 1, speed), speed);
        } else {
            element.innerHTML += ' <span class="cursor">█</span>';
        }
    }
    
    // Manipulação de comandos
    function processCommand(cmd) {
        cmd = cmd.trim().toLowerCase();
        
        // Limpa a entrada
        cmdInput.value = '';
        
        // Remove o cursor atual se houver
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(c => c.remove());
        
        // Adiciona o comando à tela
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = `<span class="prompt">pdro@DESKTOP:~$</span> ${cmd}`;
        terminalContent.appendChild(cmdLine);
        
        // Processa o comando
        switch(cmd) {
            case 'whoami':
                if (currentLang === 'pt') {
                    bioPt.classList.remove('hidden');
                    bioEn.classList.add('hidden');
                } else {
                    bioPt.classList.add('hidden');
                    bioEn.classList.remove('hidden');
                }
                break;
                
            case 'clear':
                // Mantém apenas a linha de input
                while (terminalContent.firstChild) {
                  if (terminalContent.lastChild === terminalContent.querySelector('.terminal-input')) {
                    break;
                  }
                  terminalContent.removeChild(terminalContent.firstChild);
                }
                return;
                
            case 'toggle-language':
            case 'language':
                toggleLanguage();
                break;
                
            case 'skills':
            case 'projects':
            case 'education':
            case 'contact':
                const templateId = `tpl-${cmd}-${currentLang}`;
                const template = document.getElementById(templateId);
                if (template) {
                    const content = template.cloneNode(true);
                    content.removeAttribute('id');
                    content.childNodes.forEach(node => {
                        if (node.nodeType === 1) { // Node.ELEMENT_NODE
                            terminalContent.appendChild(node.cloneNode(true));
                        }
                    });
                }
                break;
                
            default:
                const unknownCmd = document.createElement('div');
                unknownCmd.className = 'terminal-line';
                unknownCmd.textContent = `Comando não reconhecido: ${cmd}. Digite 'help' para ver comandos disponíveis.`;
                terminalContent.appendChild(unknownCmd);
        }
        
        // Rola para o final do terminal
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Alternador de idioma
    function toggleLanguage() {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        
        if (currentLang === 'pt') {
            langPt.classList.add('active');
            langEn.classList.remove('active');
            bioPt.classList.remove('hidden');
            bioEn.classList.add('hidden');
        } else {
            langPt.classList.remove('active');
            langEn.classList.add('active');
            bioPt.classList.add('hidden');
            bioEn.classList.remove('hidden');
        }
        
        // Adiciona linha informativa sobre a mudança de idioma
        const langLine = document.createElement('div');
        langLine.className = 'terminal-line';
        langLine.textContent = currentLang === 'pt' ? 
            'Idioma alterado para Português' : 
            'Language changed to English';
        terminalContent.appendChild(langLine);
        
        // Rola para o final do terminal
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    // Event listeners
    cmdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const cmd = cmdInput.value;
            processCommand(cmd);
        }
    });
    
    // Listener para os comandos clicáveis
    document.querySelectorAll('.command-item').forEach(item => {
        item.addEventListener('click', function() {
            const cmd = this.getAttribute('data-command');
            processCommand(cmd);
        });
    });
    
    // Listener para o alternador de idioma
    languageToggle.addEventListener('click', function(e) {
        if (e.target.id === 'lang-pt' && currentLang !== 'pt') {
            processCommand('toggle-language');
        } else if (e.target.id === 'lang-en' && currentLang !== 'en') {
            processCommand('toggle-language');
        }
    });
    
    // Foca na entrada quando clicar em qualquer lugar do terminal
    terminalContent.addEventListener('click', function() {
        cmdInput.focus();
    });
    
    // Inicializa o efeito de digitação na primeira mensagem
    const welcomeMessage = document.getElementById('welcome-message');
    typeText(welcomeMessage, 'whoami');
    
    // Foca na entrada ao carregar a página
    cmdInput.focus();
});